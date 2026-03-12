import { useState, useMemo } from 'react';
import { History, Trophy, X, Calendar, BookOpen, Filter, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface HistoryEntry {
  id: string;
  date: string;
  timestamp: number;
  tabKey: string;
  tabName: string;
  tabNameEn: string;
  topicKey: string;
  topicName: string;
  topicNameEn: string;
  score: number;
  totalQuestions: number;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onClearHistory: () => void;
}

const TAB_COLORS: Record<string, string> = {
  geometry: 'bg-blue-500',
  ratios: 'bg-green-500',
  'accuracy-rate': 'bg-yellow-500',
  'large-numbers': 'bg-purple-500',
  'calculation-rules': 'bg-pink-500',
  division: 'bg-orange-500',
  decimals: 'bg-cyan-500',
  'line-graphs': 'bg-red-500',
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const HistoryModal = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
}: HistoryModalProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [showChart, setShowChart] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Get unique tabs from history
  const availableTabs = useMemo(() => {
    const tabs = new Map<string, { key: string; name: string; nameEn: string }>();
    history.forEach(entry => {
      if (!tabs.has(entry.tabKey)) {
        tabs.set(entry.tabKey, { key: entry.tabKey, name: entry.tabName, nameEn: entry.tabNameEn });
      }
    });
    return Array.from(tabs.values());
  }, [history]);

  // Get unique topics for selected tab
  const availableTopics = useMemo(() => {
    const topics = new Map<string, { key: string; name: string; nameEn: string }>();
    history
      .filter(entry => selectedTab === 'all' || entry.tabKey === selectedTab)
      .forEach(entry => {
        if (!topics.has(entry.topicKey)) {
          topics.set(entry.topicKey, { key: entry.topicKey, name: entry.topicName, nameEn: entry.topicNameEn });
        }
      });
    return Array.from(topics.values());
  }, [history, selectedTab]);

  // Filter history based on selections
  const filteredHistory = useMemo(() => {
    return history.filter(entry => {
      const tabMatch = selectedTab === 'all' || entry.tabKey === selectedTab;
      const topicMatch = selectedTopic === 'all' || entry.topicKey === selectedTopic;
      return tabMatch && topicMatch;
    });
  }, [history, selectedTab, selectedTopic]);

  // Calculate progress data for chart
  const progressData = useMemo(() => {
    const groupedByTopic = new Map<string, HistoryEntry[]>();

    filteredHistory.forEach(entry => {
      const key = `${entry.tabKey}-${entry.topicKey}`;
      if (!groupedByTopic.has(key)) {
        groupedByTopic.set(key, []);
      }
      groupedByTopic.get(key)!.push(entry);
    });

    // Sort each group by date and calculate trend
    const trends = new Map<string, { topic: string; scores: number[]; avgScore: number; improvement: number }>();

    groupedByTopic.forEach((entries, key) => {
      const sorted = entries.sort((a, b) => a.timestamp - b.timestamp);
      const scores = sorted.map(e => (e.score / e.totalQuestions) * 100);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
      const secondHalf = scores.slice(Math.floor(scores.length / 2));
      const firstAvg = firstHalf.length ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length : 0;
      const secondAvg = secondHalf.length ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : 0;
      const improvement = secondAvg - firstAvg;

      trends.set(key, {
        topic: entries[0].topicName,
        scores,
        avgScore,
        improvement
      });
    });

    return trends;
  }, [filteredHistory]);

  // Group filtered history by date
  const groupedHistory = useMemo(() => {
    const grouped = filteredHistory.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {} as Record<string, HistoryEntry[]>);

    const sortedDates = Object.keys(grouped).sort((a, b) => {
      const dateA = grouped[a][0]?.timestamp || 0;
      const dateB = grouped[b][0]?.timestamp || 0;
      return dateB - dateA;
    });

    return { grouped, sortedDates };
  }, [filteredHistory]);

  const { grouped, sortedDates } = groupedHistory;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <History className="w-6 h-6 text-primary" />
            <span>れきし / History</span>
          </DialogTitle>
        </DialogHeader>

        {/* Filters */}
        {history.length > 0 && (
          <div className="space-y-4 py-4 border-b border-border">
            {/* Tab Filter */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                タブでふるいわける / Filter by Tab:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedTab('all');
                    setSelectedTopic('all');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTab === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  すべて / All
                </button>
                {availableTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setSelectedTab(tab.key);
                      setSelectedTopic('all');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedTab === tab.key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            {availableTopics.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">
                  トピックでふるいわける / Filter by Topic:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTopic('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedTopic === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    すべて / All
                  </button>
                  {availableTopics.map((topic) => (
                    <button
                      key={topic.key}
                      onClick={() => setSelectedTopic(topic.key)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedTopic === topic.key
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={showChart ? 'outline' : 'default'}
                size="sm"
                onClick={() => setShowChart(false)}
                className="flex-1"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                リスト / List
              </Button>
              <Button
                variant={showChart ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowChart(true)}
                className="flex-1"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                グラフ / Chart
              </Button>
            </div>
          </div>
        )}

        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              まだきろくがありません
            </p>
            <p className="text-sm text-muted-foreground">
              No records yet
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              もんだいをといて「こたえあわせ」をするときろくされます
            </p>
            <p className="text-xs text-muted-foreground">
              Records are saved when you check answers
            </p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              ふるいわけのけっかがありません
            </p>
            <p className="text-sm text-muted-foreground">
              No results match your filters
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ほかのタブやトピックをえらんでみてください
            </p>
            <p className="text-xs text-muted-foreground">
              Try selecting different tabs or topics
            </p>
          </div>
        ) : showChart ? (
          /* Chart View */
          <div className="space-y-6 py-4">
            {Array.from(progressData.entries()).map(([key, data]) => {
              const lastScores = data.scores.slice(-5);
              const avgScore = Math.round(data.avgScore);
              return (
                <div key={key} className="bg-muted/50 rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm">{data.topic}</h3>
                    <div className="flex items-center gap-2">
                      {data.improvement > 0 && (
                        <span className="text-xs text-green-600 font-medium flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{Math.round(data.improvement)}%
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        平均 / Avg: {avgScore}%
                      </span>
                    </div>
                  </div>
                  {/* Simple Bar Chart */}
                  <div className="flex items-end gap-1 h-20">
                    {lastScores.map((score, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div className="relative w-full">
                          <div
                            className={`w-full rounded-t transition-all duration-500 ${
                              score >= 80
                                ? 'bg-green-500'
                                : score >= 60
                                ? 'bg-kid-orange'
                                : 'bg-red-400'
                            }`}
                            style={{ height: `${score * 0.6}px` }}
                          />
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold">
                            {Math.round(score)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>過去 {lastScores.length} 回 / Last {lastScores.length}</span>
                    <span>最新 →</span>
                  </div>
                </div>
              );
            })}

            {/* Clear History Button */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearHistory}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                きろくをけす / Clear History
              </Button>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6 py-4">
            {sortedDates.map((date) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{date}</span>
                </div>
                <div className="space-y-2">
                  {grouped[date].map((entry) => {
                    const scorePercent = Math.round((entry.score / entry.totalQuestions) * 100);
                    return (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-xl border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              scorePercent === 100
                                ? 'bg-kid-yellow/20 text-kid-yellow'
                                : scorePercent >= 60
                                ? 'bg-kid-orange/20 text-kid-orange'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <Trophy className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {entry.tabName} · {entry.topicName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {entry.tabNameEn} · {entry.topicNameEn}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {formatDate(entry.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black">{scorePercent}点</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.score}/{entry.totalQuestions} せいかい
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Clear History Button */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <X className="w-4 h-4 mr-2" />
                きろくをけす / Clear History
              </Button>
            </div>
          </div>
        )}

        {/* Clear History Confirmation */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-kid-lg border border-border">
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  きろくをけしますか？
                </h3>
                <p className="text-sm text-muted-foreground">
                  これらのきろくがすべてなくなります。この操作は元に戻せません。
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Clear all history? This cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowClearConfirm(false)}
                >
                  キャンセル / Cancel
                </Button>
                <Button
                  variant="generate"
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    onClearHistory();
                    setShowClearConfirm(false);
                  }}
                >
                  けす / Clear
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
