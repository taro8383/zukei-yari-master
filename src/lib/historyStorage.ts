import { HistoryEntry } from '@/components/HistoryModal';

const STORAGE_KEY = 'kei-kun-math-history';

export const saveHistoryEntry = (entry: Omit<HistoryEntry, 'id'>): void => {
  try {
    const existingHistory = getHistory();
    const newEntry: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    const updatedHistory = [newEntry, ...existingHistory];
    // Keep only last 100 entries to prevent storage issues
    const trimmedHistory = updatedHistory.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
};

export const getHistory = (): HistoryEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};

// Tab name mapping for history
export const TAB_NAMES: Record<string, { ja: string; en: string }> = {
  geometry: { ja: '図形', en: 'Geometry' },
  ratios: { ja: '割合', en: 'Ratios' },
  'accuracy-rate': { ja: '正答率', en: 'Accuracy' },
  'large-numbers': { ja: '大きな数', en: 'Big Numbers' },
  'calculation-rules': { ja: '計算のきまり', en: 'Rules' },
  division: { ja: 'わり算', en: 'Division' },
  decimals: { ja: '小数', en: 'Decimals' },
  'line-graphs': { ja: '折れ線', en: 'Line Graphs' },
  fractions: { ja: '分数', en: 'Fractions' },
  'investigating-changes': { ja: '変わり方', en: 'Changes' },
};
