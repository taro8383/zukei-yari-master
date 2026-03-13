import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InvestigatingChangesQuestion } from '@/lib/investigatingChanges';

interface InvestigatingChangesQuestionItemProps {
  question: InvestigatingChangesQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const InvestigatingChangesQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
}: InvestigatingChangesQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'completing-table':
        if (question.ruleType === 'multiply') {
          return {
            ja: `💡 ヒント：〇が1増えると、△は${question.ruleValue}増える\n式：〇 × ${question.ruleValue} = △`,
            en: `Hint: When 〇 increases by 1, △ increases by ${question.ruleValue}\nFormula: 〇 × ${question.ruleValue} = △`,
          };
        } else {
          return {
            ja: `💡 ヒント：〇が1増えると、△は${question.ruleValue}増える`,
            en: `Hint: When 〇 increases by 1, △ increases by ${question.ruleValue}`,
          };
        }
      case 'finding-rule':
        return {
          ja: '💡 ヒント：表の数字を見て、〇が1増えるときに△がどう変わるか考えよう',
          en: 'Hint: Look at the table and think about how △ changes when 〇 increases by 1',
        };
      case 'writing-equation':
        return {
          ja: '💡 ヒント：△はいつも〇の何倍ですか？それを式にしよう',
          en: 'Hint: How many times bigger is △ than 〇? Turn that into an equation',
        };
      default:
        return { ja: '', en: '' };
    }
  };

  const hintText = getHintText();

  // Check topic types
  const isCompletingTable = question.topic === 'completing-table';
  const isFindingRule = question.topic === 'finding-rule';
  const isWritingEquation = question.topic === 'writing-equation';

  // Render table for completing-table and finding-rule topics
  const renderTable = () => {
    if (!question.tableData) return null;

    return (
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-sm text-muted-foreground">
          表 / Table
        </p>
        <div className="overflow-x-auto">
          <table className="border rounded-lg bg-white">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-3 border-b-2 border-r-2 border-primary font-bold text-foreground">〇</th>
                {question.tableData.map((row, i) => (
                  <th key={`x-${i}`} className="p-3 border-b border-primary/30 font-bold text-foreground min-w-[60px]">
                    {row.x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-3 border-r-2 border-primary font-bold text-foreground bg-primary/10">△</th>
                {question.tableData.map((row, i) => (
                  <td key={`y-${i}`} className="p-3 border-b border-primary/20 text-center">
                    {row.isInput && !graded ? (
                      <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        className="w-16 h-10 text-center text-lg font-bold rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
                        placeholder="?"
                      />
                    ) : (
                      <span className="text-lg font-bold">{row.y}</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render rule options for finding-rule topic
  const renderRuleOptions = () => {
    if (!isFindingRule || !question.ruleOptions) return null;

    return (
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          きまりを選ぼう / Choose the rule:
        </p>
        <div className="flex flex-wrap gap-2">
          {question.ruleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => !graded && onAnswerChange(option.value)}
              disabled={graded}
              className={cn(
                'px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all active:scale-95',
                graded
                  ? option.isCorrect
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : userAnswer === option.value
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-muted text-muted-foreground border-input'
                  : userAnswer === option.value
                    ? 'bg-primary/20 border-primary text-foreground'
                    : 'bg-muted text-muted-foreground border-input hover:border-primary/50'
              )}
            >
              <span className="block">{option.ja}</span>
              <span className="block text-xs opacity-70">{option.en}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render equation builder for writing-equation topic
  const renderEquationBuilder = () => {
    if (!isWritingEquation) return null;

    const operators = ['×', '+', '-'];
    // Show all constants 2-10 for all operators
    const constants = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Parse current answer
    const [selectedOp, selectedConst] = userAnswer ? userAnswer.split('-') : ['', ''];

    return (
      <div className="flex flex-col items-center gap-4 mb-4">
        <p className="text-sm text-muted-foreground">
          式を完成させよう / Complete the equation:
        </p>
        <div className="flex items-center gap-3 text-2xl font-bold">
          <span className="px-4 py-2 bg-kid-blue/20 rounded-lg">〇</span>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground text-center">演算子 / Operator</span>
            <div className="flex gap-1">
              {operators.map((op) => (
                <button
                  key={op}
                  onClick={() => !graded && onAnswerChange(`${op}-${selectedConst || ''}`)}
                  disabled={graded}
                  className={cn(
                    'w-10 h-10 rounded-lg border-2 font-bold text-lg transition-all',
                    graded
                      ? op === question.correctOperator
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : selectedOp === op
                          ? 'bg-red-100 border-red-500 text-red-700'
                          : 'bg-muted border-input'
                      : selectedOp === op
                        ? 'bg-primary/20 border-primary text-foreground'
                        : 'bg-muted border-input hover:border-primary/50'
                  )}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground text-center">数 / Number</span>
            <div className="flex flex-wrap gap-1 max-w-[200px] justify-center">
              {constants.map((num) => (
                <button
                  key={num}
                  onClick={() => !graded && onAnswerChange(`${selectedOp || question.correctOperator}-${num}`)}
                  disabled={graded}
                  className={cn(
                    'w-10 h-10 rounded-lg border-2 font-bold text-sm transition-all',
                    graded
                      ? num === question.correctConstant
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : selectedConst === String(num)
                          ? 'bg-red-100 border-red-500 text-red-700'
                          : 'bg-muted border-input'
                      : selectedConst === String(num)
                        ? 'bg-primary/20 border-primary text-foreground'
                        : 'bg-muted border-input hover:border-primary/50'
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <span className="px-4 py-2 bg-kid-purple/20 rounded-lg">△</span>
        </div>
        {selectedOp && selectedConst && (
          <p className="text-lg font-bold text-primary">
            〇 {selectedOp} {selectedConst} = △
          </p>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'bg-card rounded-2xl shadow-kid p-5 border-2 transition-all',
        graded
          ? isCorrect
            ? 'border-correct'
            : 'border-incorrect'
          : 'border-border hover:border-primary/30'
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{question.text}</p>
          <p className="text-sm text-gray-500 mb-4">{question.textEn}</p>

          {/* Visual Aids */}
          {(isCompletingTable || isFindingRule || isWritingEquation) && renderTable()}
          {isWritingEquation && renderEquationBuilder()}
          {isFindingRule && renderRuleOptions()}

          {/* Hint Toggle */}
          {!graded && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-gray-500 hover:text-primary transition-colors mb-3 flex items-center gap-1"
            >
              <span>{showHint ? '💡 ヒントをかくす' : '💡 ヒントをみる'}</span>
              <span className="text-xs">({showHint ? 'Hide hint' : 'Show hint'})</span>
            </button>
          )}

          {/* Hint */}
          {(showHint || graded) && !isCorrect && (
            <div className="bg-kid-yellow/10 rounded-lg p-3 mb-4 text-sm">
              {graded ? (
                <>
                  <p className="font-medium text-foreground whitespace-pre-line">{question.explanation}</p>
                  <p className="text-gray-500 whitespace-pre-line">{question.explanationEn}</p>
                </>
              ) : (
                <>
                  <div className="font-medium text-foreground whitespace-pre-line">{hintText.ja}</div>
                  <div className="text-gray-500 whitespace-pre-line">{hintText.en}</div>
                </>
              )}
            </div>
          )}

          {/* Answer Input Section (only for completing-table) */}
          {isCompletingTable && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col">
                <span className="text-foreground font-medium">答え：</span>
                <span className="text-xs text-gray-500">Answer:</span>
              </div>
              {!graded ? (
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={graded}
                  className="w-32 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  placeholder="?"
                />
              ) : (
                <>
                  <input
                    type="number"
                    value={userAnswer}
                    disabled
                    className="w-32 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                  />
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="text-4xl font-black text-green-500">〇</span>
                    ) : (
                      <span className="text-3xl font-black text-red-500">×</span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Correct answer display for incorrect answers */}
          {graded && !isCorrect && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-red-500 font-bold">
                正解：{question.explanation.split('\n')[0]}
              </span>
              <span className="text-xs text-red-400 block">
                Correct: {question.explanationEn.split('\n')[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestigatingChangesQuestionItem;
