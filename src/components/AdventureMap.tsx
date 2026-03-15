import { useState, useEffect } from 'react';
import { Lock, Star, MapPin, ChevronRight, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGameData, GameData } from '@/lib/gameState';

export type MapRegion = {
  id: string;
  nameJa: string;
  nameEn: string;
  icon: string;
  emoji: string;
  color: string;
  position: { x: number; y: number }; // Percentage positions
  prerequisites?: string[]; // Region IDs required to unlock
  topicCount: number;
};

const REGIONS: MapRegion[] = [
  {
    id: 'number-castle',
    nameJa: 'かずのお城',
    nameEn: 'Number Castle',
    icon: '🏰',
    emoji: '🔢',
    color: 'from-blue-400 to-blue-600',
    position: { x: 15, y: 20 },
    topicCount: 4,
  },
  {
    id: 'geometry-mountains',
    nameJa: 'ずけい山脈',
    nameEn: 'Geometry Mountains',
    icon: '🏔️',
    emoji: '📐',
    color: 'from-emerald-400 to-emerald-600',
    position: { x: 50, y: 15 },
    topicCount: 2,
  },
  {
    id: 'ratio-ocean',
    nameJa: 'わり算の海',
    nameEn: 'Division Ocean',
    icon: '🌊',
    emoji: '➗',
    color: 'from-cyan-400 to-cyan-600',
    position: { x: 85, y: 25 },
    topicCount: 2,
  },
  {
    id: 'decimal-forest',
    nameJa: 'しょうすうの森',
    nameEn: 'Decimal Forest',
    icon: '🌲',
    emoji: '🔵',
    color: 'from-green-400 to-green-600',
    position: { x: 25, y: 55 },
    prerequisites: ['number-castle'],
    topicCount: 1,
  },
  {
    id: 'fraction-volcano',
    nameJa: 'ぶんすう火山',
    nameEn: 'Fraction Volcano',
    icon: '🌋',
    emoji: '🍕',
    color: 'from-orange-400 to-red-500',
    position: { x: 70, y: 50 },
    prerequisites: ['ratio-ocean'],
    topicCount: 1,
  },
  {
    id: 'graph-island',
    nameJa: 'グラフ島',
    nameEn: 'Graph Island',
    icon: '🏝️',
    emoji: '📊',
    color: 'from-purple-400 to-purple-600',
    position: { x: 50, y: 75 },
    prerequisites: ['decimal-forest', 'fraction-volcano'],
    topicCount: 2,
  },
  {
    id: 'accuracy-peaks',
    nameJa: 'せいかく度の峰',
    nameEn: 'Accuracy Peaks',
    icon: '⛰️',
    emoji: '🎯',
    color: 'from-yellow-400 to-amber-500',
    position: { x: 80, y: 80 },
    prerequisites: ['graph-island'],
    topicCount: 1,
  },
];

// Map region IDs to tab IDs
const REGION_TO_TABS: Record<string, string[]> = {
  'number-castle': ['large-numbers', 'calculation-rules'],
  'geometry-mountains': ['geometry'],
  'ratio-ocean': ['division', 'ratios'],
  'decimal-forest': ['decimals'],
  'fraction-volcano': ['fractions'],
  'graph-island': ['line-graphs', 'investigating-changes'],
  'accuracy-peaks': ['accuracy-rate'],
};

interface AdventureMapProps {
  onSelectRegion: (regionId: string, tabId: string) => void;
  activeTab?: string;
  onOpenStoryMode?: () => void;
}

interface RegionProgress {
  totalQuestions: number;
  correctAnswers: number;
  averageAccuracy: number;
  stars: number;
  isLocked: boolean;
}

const AdventureMap = ({ onSelectRegion, activeTab, onOpenStoryMode }: AdventureMapProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    setGameData(getGameData());

    // Refresh data periodically
    const interval = setInterval(() => {
      setGameData(getGameData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = () => {
      setGameData(getGameData());
    };

    window.addEventListener('coins-changed', handleProgressUpdate);
    return () => window.removeEventListener('coins-changed', handleProgressUpdate);
  }, []);

  if (!gameData) return null;

  // Calculate progress for each region
  const getRegionProgress = (region: MapRegion): RegionProgress => {
    const tabIds = REGION_TO_TABS[region.id] || [];
    let totalQuestions = 0;
    let correctAnswers = 0;

    // Check prerequisites
    const isLocked = region.prerequisites?.some((prereqId) => {
      const prereqTabs = REGION_TO_TABS[prereqId] || [];
      const prereqProgress = getTabsProgress(prereqTabs);
      return prereqProgress.averageAccuracy < 60; // Need 60% to unlock
    }) ?? false;

    tabIds.forEach((tabId) => {
      // Get all topic progress for this tab
      Object.entries(gameData.progress).forEach(([topicId, progress]) => {
        if (topicId.startsWith(tabId)) {
          totalQuestions += progress.questionsAttempted;
          correctAnswers += progress.questionsCorrect;
        }
      });
    });

    const averageAccuracy = totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

    // Calculate stars (0-3)
    let stars = 0;
    if (averageAccuracy >= 60) stars = 1;
    if (averageAccuracy >= 80) stars = 2;
    if (averageAccuracy >= 95) stars = 3;

    return {
      totalQuestions,
      correctAnswers,
      averageAccuracy,
      stars,
      isLocked,
    };
  };

  const getTabsProgress = (tabIds: string[]) => {
    let totalQuestions = 0;
    let correctAnswers = 0;

    tabIds.forEach((tabId) => {
      Object.entries(gameData.progress).forEach(([topicId, progress]) => {
        if (topicId.startsWith(tabId)) {
          totalQuestions += progress.questionsAttempted;
          correctAnswers += progress.questionsCorrect;
        }
      });
    });

    const averageAccuracy = totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

    return { totalQuestions, correctAnswers, averageAccuracy };
  };

  const handleRegionClick = (region: MapRegion) => {
    const progress = getRegionProgress(region);
    if (progress.isLocked) return;

    const tabIds = REGION_TO_TABS[region.id];
    if (tabIds && tabIds.length > 0) {
      setSelectedRegion(region.id);
      onSelectRegion(region.id, tabIds[0]);
    }
  };

  // Generate SVG paths between connected regions
  const generatePaths = () => {
    const paths: JSX.Element[] = [];

    REGIONS.forEach((region) => {
      if (region.prerequisites) {
        region.prerequisites.forEach((prereqId) => {
          const prereq = REGIONS.find((r) => r.id === prereqId);
          if (prereq) {
            const isUnlocked = !getRegionProgress(region).isLocked;
            paths.push(
              <path
                key={`${prereqId}-${region.id}`}
                d={`M ${prereq.position.x}% ${prereq.position.y}% Q ${(prereq.position.x + region.position.x) / 2}% ${Math.min(prereq.position.y, region.position.y) - 10}% ${region.position.x}% ${region.position.y}%`}
                fill="none"
                stroke={isUnlocked ? '#22c55e' : '#94a3b8'}
                strokeWidth="3"
                strokeDasharray={isUnlocked ? '0' : '5,5'}
                className="transition-all duration-500"
              />
            );
          }
        });
      }
    });

    return paths;
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-sky-100 via-sky-50 to-green-50 rounded-3xl overflow-hidden shadow-kid border-4 border-sky-200">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sun */}
        <div className="absolute top-4 right-8 w-16 h-16 bg-yellow-300 rounded-full shadow-lg animate-pulse" />
        {/* Clouds */}
        <div className="absolute top-8 left-1/4 text-4xl opacity-60">☁️</div>
        <div className="absolute top-12 right-1/3 text-3xl opacity-40">☁️</div>
        <div className="absolute top-20 left-1/3 text-2xl opacity-50">☁️</div>
      </div>

      {/* Map container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full">
        {/* SVG Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {generatePaths()}
        </svg>

        {/* Regions */}
        {REGIONS.map((region) => {
          const progress = getRegionProgress(region);
          const isActive = selectedRegion === region.id;
          const isHovered = hoveredRegion === region.id;

          return (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={cn(
                'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
                progress.isLocked && 'cursor-not-allowed',
                isActive && 'scale-110 z-10',
                isHovered && !progress.isLocked && 'scale-105 z-10'
              )}
              style={{
                left: `${region.position.x}%`,
                top: `${region.position.y}%`,
              }}
            >
              {/* Region node */}
              <div
                className={cn(
                  'relative flex flex-col items-center p-3 rounded-2xl border-4 shadow-kid transition-all',
                  progress.isLocked
                    ? 'bg-gray-200 border-gray-300 opacity-70'
                    : `bg-gradient-to-br ${region.color} border-white`,
                  isActive && 'ring-4 ring-yellow-300'
                )}
              >
                {/* Icon */}
                <div className="text-3xl sm:text-4xl mb-1">{region.icon}</div>

                {/* Stars */}
                {!progress.isLocked && (
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'w-3 h-3 sm:w-4 sm:h-4',
                          star <= progress.stars
                            ? 'fill-yellow-300 text-yellow-400'
                            : 'fill-gray-300 text-gray-400'
                        )}
                      />
                    ))}
                  </div>
                )}

                {/* Lock indicator */}
                {progress.isLocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <MapPin className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div
                className={cn(
                  'mt-2 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap',
                  progress.isLocked
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-white/90 text-gray-800 shadow-sm'
                )}
              >
                <div>{region.nameJa}</div>
                <div className="text-[10px] opacity-70">{region.nameEn}</div>
              </div>

              {/* Progress tooltip on hover */}
              {isHovered && !progress.isLocked && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-xl shadow-lg border-2 border-gray-100 whitespace-nowrap z-20">
                  <div className="text-xs font-bold text-gray-800">
                    せいかい率 / Accuracy: {progress.averageAccuracy}%
                  </div>
                  <div className="text-[10px] text-gray-500">
                    もんだい / Questions: {progress.totalQuestions}
                  </div>
                  {progress.stars === 3 && (
                    <div className="text-[10px] text-yellow-600 font-bold mt-1">
                      ⭐ マスター！ / Mastered!
                    </div>
                  )}
                </div>
              )}

              {/* Unlock requirement tooltip */}
              {isHovered && progress.isLocked && region.prerequisites && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white rounded-xl shadow-lg text-xs whitespace-nowrap z-20">
                  <div>🔒 ロック中 / Locked</div>
                  <div className="text-[10px] opacity-80 mt-1">
                    前のエリアを60%以上クリア / Clear previous area to 60%
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* Player avatar position indicator */}
        {selectedRegion && (
          <div
            className="absolute w-8 h-8 pointer-events-none transition-all duration-500 z-20"
            style={{
              left: `${REGIONS.find((r) => r.id === selectedRegion)?.position.x}%`,
              top: `${(REGIONS.find((r) => r.id === selectedRegion)?.position.y || 0) - 8}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="w-full h-full bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg animate-bounce">
              {gameData.player.name.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Legend / Stats bar */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-400" />
              <span className="text-gray-600">0-2星 / stars: がんばろう</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">3星: マスター! / Mastered!</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenStoryMode && (
              <button
                onClick={onOpenStoryMode}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full text-sm font-medium transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>ストーリー / Story</span>
              </button>
            )}
            <div className="text-xs text-gray-500">
              エリアをクリックしてスタート! / Click an area to start!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureMap;
