import { X, FileText, Layers, AlertCircle } from 'lucide-react';

interface TestModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGeneralTest: () => void;
  onStartTabTest: () => void;
  currentTabName?: string;
}

const TestModeModal = ({
  isOpen,
  onClose,
  onStartGeneralTest,
  onStartTabTest,
  currentTabName,
}: TestModeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-kid border-2 border-border p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-kid-blue/20 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-8 h-8 text-kid-blue" />
          </div>
          <h2 className="text-2xl font-black text-foreground">
            テストモード / Test Mode
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            実力を試そう！ / Test your skills!
          </p>
        </div>

        {/* Info box */}
        <div className="bg-kid-yellow/10 rounded-xl p-4 mb-6 border border-kid-yellow/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-kid-yellow flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-foreground">
                <strong>テストモードでは：</strong>
              </p>
              <ul className="text-muted-foreground mt-1 space-y-1">
                <li>• ヒントはありません / No hints</li>
                <li>• 図形や説明カードは非表示 / No visual aids</li>
                <li>• 最後に一括採点 / Graded at the end</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test options */}
        <div className="space-y-4">
          {/* General Test */}
          <button
            onClick={onStartGeneralTest}
            className="w-full p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-300 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">
                  総合テスト / General Test
                </h3>
                <p className="text-sm text-muted-foreground">
                  100問 / 100 questions
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  すべての単元から / From all topics
                </p>
              </div>
            </div>
          </button>

          {/* Tab Specific Test */}
          <button
            onClick={onStartTabTest}
            className="w-full p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">
                  単元テスト / Tab Test
                </h3>
                <p className="text-sm text-muted-foreground">
                  20問 / 20 questions
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentTabName || '現在の単元から / From current tab'}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl border-2 border-border hover:bg-muted transition-colors font-medium"
        >
          キャンセル / Cancel
        </button>
      </div>
    </div>
  );
};

export default TestModeModal;
