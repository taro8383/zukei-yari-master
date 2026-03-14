import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Check, Lightbulb, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  getLearningInsights,
  acknowledgeInsight,
  getErrorPatternsSummary,
  getTopicAccuracyTrend,
  LearningInsight,
  ErrorCategory,
} from '@/lib/gameState';

interface LearningInsightsProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic?: string;
}

const getCategoryIcon = (category?: ErrorCategory): string => {
  const icons: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': '✕➗',
    'add-subtract-confusion': '➕➖',
    'decimal-point-error': '0.0',
    'place-value-error': '123',
    'unit-conversion-error': '📏',
    'formula-misapplication': '📐',
    'calculation-error': '🧮',
    'wrong-operation': '❓',
    'other': '📝',
  };
  return category ? icons[category] : '💡';
};

const getCategoryColor = (category?: ErrorCategory): string => {
  const colors: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': 'bg-orange-100 text-orange-700 border-orange-200',
    'add-subtract-confusion': 'bg-blue-100 text-blue-700 border-blue-200',
    'decimal-point-error': 'bg-green-100 text-green-700 border-green-200',
    'place-value-error': 'bg-purple-100 text-purple-700 border-purple-200',
    'unit-conversion-error': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'formula-misapplication': 'bg-pink-100 text-pink-700 border-pink-200',
    'calculation-error': 'bg-red-100 text-red-700 border-red-200',
    'wrong-operation': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'other': 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return category ? colors[category] : 'bg-primary/10 text-primary border-primary/20';
};

export const LearningInsights = ({ isOpen, onClose, currentTopic }: LearningInsightsProps) => {
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [patterns, setPatterns] = useState<{ totalMistakes: number; topWeakness: ErrorCategory | null }>({
    totalMistakes: 0,
    topWeakness: null,
  });
  const [topicTrend, setTopicTrend] = useState<{ improving: boolean; accuracy: number }>({
    improving: false,
    accuracy: 100,
  });
  const [activeTab, setActiveTab] = useState<'insights' | 'patterns'>('insights');

  const loadData = () => {
    const currentInsights = getLearningInsights();
    setInsights(currentInsights);

    const summary = getErrorPatternsSummary();
    setPatterns(summary);

    if (currentTopic) {
      const trend = getTopicAccuracyTrend(currentTopic);
      setTopicTrend(trend);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, currentTopic]);

  const handleAcknowledge = (insightId: string) => {
    acknowledgeInsight(insightId);
    loadData();
  };

  const dismissAll = () => {
    insights.forEach((i) => acknowledgeInsight(i.id));
    loadData();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-2xl">がくしゅうインサイト / Learning Insights</span>
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('insights')}
            className={cn(
              'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'insights'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            💡 インサイト / Insights
            {insights.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {insights.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={cn(
              'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'patterns'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            📊 パターン / Patterns
          </button>
        </div>

        {/* Topic Trend Card (if applicable) */}
        {currentTopic && activeTab === 'insights' && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">
                このトピックの進歩 / This Topic Progress
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">
                  {topicTrend.improving
                    ? '上達しています！/ Improving!'
                    : 'もうすこし練習を！/ Keep practicing!'}
                </p>
                <p className="text-xs text-green-600">
                  正答率 / Accuracy: {topicTrend.accuracy}%
                </p>
              </div>
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-lg',
                topicTrend.improving ? 'bg-green-200' : 'bg-yellow-200'
              )}>
                {topicTrend.improving ? '📈' : '💪'}
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <>
            {insights.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  🌟
                </div>
                <p className="font-bold text-lg text-green-700 mb-1">
                  すばらしい！/ Great job!
                </p>
                <p className="text-sm text-muted-foreground">
                  いまは新しいインサイトはありません。<br />
                  No new insights right now.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  問題を解き続けると、パターンが見つかります。<br />
                  Keep solving to discover patterns.
                </p>
              </div>
            ) : (
              <>
                {/* Dismiss All Button */}
                {insights.length > 1 && (
                  <button
                    onClick={dismissAll}
                    className="w-full mb-4 text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 py-2 border border-dashed border-border rounded-lg"
                  >
                    <X className="w-3 h-3" />
                    すべて了解 / Dismiss All
                  </button>
                )}

                {/* Insights List */}
                <div className="space-y-3">
                  {insights.map((insight) => (
                    <div
                      key={insight.id}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all',
                        insight.type === 'improvement'
                          ? 'bg-green-50 border-green-200'
                          : insight.type === 'milestone'
                          ? 'bg-purple-50 border-purple-200'
                          : 'bg-card border-border'
                      )}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={cn(
                            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border',
                            getCategoryColor(insight.category)
                          )}
                        >
                          {insight.type === 'improvement'
                            ? '📈'
                            : insight.type === 'milestone'
                            ? '🏆'
                            : getCategoryIcon(insight.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm">
                              {insight.type === 'pattern-detected'
                                ? 'パターン検出 / Pattern Detected'
                                : insight.type === 'improvement'
                                ? '上達しました！/ Improvement!'
                                : 'マイルストーン / Milestone'}
                            </h3>
                          </div>
                          <p className="text-sm text-foreground mt-1">
                            {insight.messageJa}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {insight.messageEn}
                          </p>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="bg-white/50 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs font-medium text-muted-foreground">
                            おすすめ / Recommendation
                          </span>
                        </div>
                        <p className="text-sm">{insight.recommendationJa}</p>
                        <p className="text-xs text-muted-foreground">
                          {insight.recommendationEn}
                        </p>
                      </div>

                      {/* Suggested Practice */}
                      {insight.suggestedPractice && (
                        <div className="bg-primary/5 rounded-lg p-2 mb-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-primary">
                              練習をすすめる / Suggested Practice
                            </span>
                          </div>
                          <p className="text-xs mt-1 capitalize">
                            {insight.suggestedPractice.replace(/-/g, ' ')}
                          </p>
                        </div>
                      )}

                      {/* Acknowledge Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAcknowledge(insight.id)}
                        className="w-full"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        了解 / Got it
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {/* Overview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <div className="text-3xl font-black text-blue-600">
                  {patterns.totalMistakes}
                </div>
                <div className="text-xs text-blue-700">
                  記録されたミス<br />Mistakes Tracked
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                <div className="text-3xl font-black text-orange-600">
                  {patterns.topWeakness ? '🔍' : '✅'}
                </div>
                <div className="text-xs text-orange-700">
                  {patterns.topWeakness
                    ? '改善エリアあり\nFocus Area Found'
                    : '問題なし\nNo Issues'}
                </div>
              </div>
            </div>

            {/* Pattern List */}
            {patterns.topWeakness && (
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  よくあるミスパターン / Common Mistake Patterns
                </h3>
                <div className="space-y-2">
                  {getErrorPatternsSummary().patterns.slice(0, 5).map((pattern, index) => (
                    <div
                      key={pattern.category}
                      className="flex items-center gap-3 p-2 bg-muted rounded-lg"
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center text-sm',
                          getCategoryColor(pattern.category)
                        )}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {getCategoryLabel(pattern.category)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pattern.count}回 / {pattern.count} times
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
              <h4 className="font-bold text-purple-800 mb-2">
                💡 学習のヒント / Learning Tips
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• ミスは成長のチャンスです</li>
                <li>• 同じ間違いを3回すると、パターンが検出されます</li>
                <li>• 推奨される練習で弱点を克服しましょう</li>
              </ul>
              <ul className="text-xs text-purple-600 mt-2 space-y-1">
                <li>• Mistakes are opportunities to grow</li>
                <li>• Patterns are detected after 3 similar errors</li>
                <li>• Use recommended practice to improve</li>
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get category label
const getCategoryLabel = (category: ErrorCategory): string => {
  const labels: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': '×と÷の混乱',
    'add-subtract-confusion': '+と-の混乱',
    'decimal-point-error': '小数点エラー',
    'place-value-error': '位取りエラー',
    'unit-conversion-error': '単位換算',
    'formula-misapplication': '公式の誤用',
    'calculation-error': '計算ミス',
    'wrong-operation': '計算の選び方',
    'other': 'その他',
  };
  return labels[category] || category;
};

export default LearningInsights;
