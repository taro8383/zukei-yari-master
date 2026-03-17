import { X, Check, Layers } from 'lucide-react';
import { useState } from 'react';

interface TabOption {
  id: string;
  name: string;
  icon: string;
}

interface TabSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedTabs: string[]) => void;
  currentTab: string;
}

const TAB_OPTIONS: TabOption[] = [
  { id: 'geometry', name: '図形 / Geometry', icon: '📐' },
  { id: 'ratios', name: '割合 / Ratios', icon: '⚖️' },
  { id: 'accuracy-rate', name: '正答率 / Accuracy', icon: '🔋' },
  { id: 'large-numbers', name: '大きな数 / Big Numbers', icon: '🔢' },
  { id: 'calculation-rules', name: '計算のきまり / Rules', icon: '📝' },
  { id: 'division', name: 'わり算 / Division', icon: '➗' },
  { id: 'decimals', name: '小数 / Decimals', icon: '🔹' },
  { id: 'line-graphs', name: '折れ線 / Line Graphs', icon: '📈' },
  { id: 'fractions', name: '分数 / Fractions', icon: '🍕' },
  { id: 'investigating-changes', name: '変わり方 / Changes', icon: '📉' },
];

const TabSelectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentTab,
}: TabSelectionModalProps) => {
  const [selectedTabs, setSelectedTabs] = useState<string[]>([currentTab]);

  if (!isOpen) return null;

  const toggleTab = (tabId: string) => {
    setSelectedTabs((prev) =>
      prev.includes(tabId)
        ? prev.filter((t) => t !== tabId)
        : [...prev, tabId]
    );
  };

  const handleConfirm = () => {
    if (selectedTabs.length > 0) {
      onConfirm(selectedTabs);
    }
  };

  const selectAll = () => {
    setSelectedTabs(TAB_OPTIONS.map((t) => t.id));
  };

  const selectNone = () => {
    setSelectedTabs([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-kid border-2 border-border p-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-kid-green/20 flex items-center justify-center mx-auto mb-3">
            <Layers className="w-8 h-8 text-kid-green" />
          </div>
          <h2 className="text-2xl font-black text-foreground">
            単元を選ぼう / Select Tabs
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            テストしたい単元を選んでください / Choose which tabs to test
          </p>
        </div>

        {/* Selection buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={selectAll}
            className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 rounded-lg font-medium transition-colors"
          >
            すべて選択 / Select All
          </button>
          <button
            onClick={selectNone}
            className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
          >
            クリア / Clear
          </button>
        </div>

        {/* Tab options */}
        <div className="space-y-2 mb-6">
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => toggleTab(tab.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                selectedTabs.includes(tab.id)
                  ? 'bg-kid-green/10 border-kid-green'
                  : 'bg-muted/30 border-border hover:border-primary/30'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  selectedTabs.includes(tab.id)
                    ? 'bg-kid-green text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {selectedTabs.includes(tab.id) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{tab.icon}</span>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-bold ${
                    selectedTabs.includes(tab.id)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {tab.name}
                </p>
              </div>
              {tab.id === currentTab && (
                <span className="text-xs bg-kid-blue/20 text-kid-blue px-2 py-1 rounded-full font-medium">
                  現在 / Current
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Question count */}
        <div className="bg-muted/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            選択した単元 / Selected tabs:
          </p>
          <p className="text-2xl font-black text-primary">
            {selectedTabs.length} / {TAB_OPTIONS.length}
          </p>
          <p className="text-sm text-muted-foreground">
            予定問題数 / Estimated questions: {selectedTabs.length > 0 ? '20問 (各単元から2問ずつ)' : '0'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedTabs.length > 0 ? '20 total (at least 2 per topic)' : ''}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-border hover:bg-muted transition-colors font-medium"
          >
            キャンセル / Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedTabs.length === 0}
            className="flex-1 py-3 rounded-xl bg-kid-green text-white font-bold hover:bg-kid-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            テスト開始 / Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabSelectionModal;
