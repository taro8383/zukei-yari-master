import { useState, useEffect } from 'react';
import { Palette, Music, BookOpen, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  getGameData,
  GameData,
  ProblemTheme,
  SoundPack,
  setProblemTheme,
  setSoundPack,
  getThemeColors,
  setTheme,
} from '@/lib/gameState';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROBLEM_THEMES: { id: ProblemTheme; icon: string; nameJa: string; nameEn: string; descriptionJa: string; descriptionEn: string }[] = [
  { id: 'default', icon: '📚', nameJa: 'ふつう', nameEn: 'Default', descriptionJa: 'いつものまんが', descriptionEn: 'Regular story' },
  { id: 'space', icon: '🚀', nameJa: 'うちゅう', nameEn: 'Space', descriptionJa: 'うちゅうをたんけん', descriptionEn: 'Explore space' },
  { id: 'cooking', icon: '👨‍🍳', nameJa: 'りょうり', nameEn: 'Cooking', descriptionJa: 'シェフになろう', descriptionEn: 'Be a chef' },
  { id: 'sports', icon: '⚽', nameJa: 'スポーツ', nameEn: 'Sports', descriptionJa: 'スポーツであそぼう', descriptionEn: 'Play sports' },
  { id: 'animals', icon: '🦁', nameJa: 'どうぶつ', nameEn: 'Animals', descriptionJa: 'どうぶつえんへ', descriptionEn: 'Visit the zoo' },
  { id: 'fantasy', icon: '🧙', nameJa: 'ファンタジー', nameEn: 'Fantasy', descriptionJa: 'まほうのせかい', descriptionEn: 'Magical world' },
];

const SOUND_PACKS: { id: SoundPack; icon: string; nameJa: string; nameEn: string; descriptionJa: string; descriptionEn: string }[] = [
  { id: 'classic', icon: '🔔', nameJa: 'クラシック', nameEn: 'Classic', descriptionJa: 'いつものおと', descriptionEn: 'Classic sounds' },
  { id: 'cartoon', icon: '🎪', nameJa: 'カートゥーン', nameEn: 'Cartoon', descriptionJa: 'ボヨン、ボン！', descriptionEn: 'Boings and bonks' },
  { id: 'nature', icon: '🌿', nameJa: 'しぜん', nameEn: 'Nature', descriptionJa: 'とりのさえずり', descriptionEn: 'Bird songs' },
  { id: 'silent', icon: '🔇', nameJa: 'おとなし', nameEn: 'Silent', descriptionJa: 'おとをださない', descriptionEn: 'No sounds' },
];

const COLOR_ACCENTS = [
  { id: 'default', nameJa: 'あお', nameEn: 'Blue', color: '#3b82f6', bg: 'bg-blue-500' },
  { id: 'color-pink', nameJa: 'ピンク', nameEn: 'Pink', color: '#ec4899', bg: 'bg-pink-500' },
  { id: 'color-green', nameJa: 'みどり', nameEn: 'Green', color: '#22c55e', bg: 'bg-green-500' },
  { id: 'color-purple', nameJa: 'むらさき', nameEn: 'Purple', color: '#a855f7', bg: 'bg-purple-500' },
  { id: 'color-orange', nameJa: 'オレンジ', nameEn: 'Orange', color: '#f97316', bg: 'bg-orange-500' },
  { id: 'color-red', nameJa: 'あか', nameEn: 'Red', color: '#ef4444', bg: 'bg-red-500' },
  { id: 'color-gold', nameJa: 'きん', nameEn: 'Gold', color: '#fbbf24', bg: 'bg-amber-400' },
];

const PersonalizationModal = ({ isOpen, onClose }: PersonalizationModalProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    if (isOpen) {
      setGameData(getGameData());
    }
  }, [isOpen]);

  const handleThemeChange = (theme: ProblemTheme) => {
    setProblemTheme(theme);
    setGameData(getGameData());
  };

  const handleSoundPackChange = (pack: SoundPack) => {
    setSoundPack(pack);
    setGameData(getGameData());
  };

  const handleColorChange = (colorId: string) => {
    if (colorId === 'default') {
      setTheme('default');
    } else {
      // Extract color from shop item and set
      setTheme(colorId);
    }
    setGameData(getGameData());
  };

  if (!gameData) return null;

  const currentTheme = gameData.settings.problemTheme;
  const currentSoundPack = gameData.settings.soundPack;
  const currentColor = gameData.player.avatarColor;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-500" />
            パーソナライズ / Personalize
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="theme">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme">
              <BookOpen className="w-4 h-4 mr-1" />
              テーマ
            </TabsTrigger>
            <TabsTrigger value="sound">
              <Music className="w-4 h-4 mr-1" />
              おと
            </TabsTrigger>
            <TabsTrigger value="color">
              <Palette className="w-4 h-4 mr-1" />
              いろ
            </TabsTrigger>
          </TabsList>

          {/* Problem Themes Tab */}
          <TabsContent value="theme" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              もんだいのはなしをえらぶ / Choose story themes for problems
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROBLEM_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all hover:scale-105",
                    currentTheme === theme.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{theme.icon}</span>
                    {currentTheme === theme.id && (
                      <Check className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <h4 className="font-bold mt-2">{theme.nameJa}</h4>
                  <p className="text-xs text-muted-foreground">{theme.nameEn}</p>
                  <p className="text-xs text-purple-600 mt-1">{theme.descriptionJa}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Sound Packs Tab */}
          <TabsContent value="sound" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              おとのパックをえらぶ / Choose sound effects pack
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SOUND_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => handleSoundPackChange(pack.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all hover:scale-105",
                    currentSoundPack === pack.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{pack.icon}</span>
                    {currentSoundPack === pack.id && (
                      <Check className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <h4 className="font-bold mt-2">{pack.nameJa}</h4>
                  <p className="text-xs text-muted-foreground">{pack.nameEn}</p>
                  <p className="text-xs text-purple-600 mt-1">{pack.descriptionJa}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Color Accents Tab */}
          <TabsContent value="color" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              アバターのいろをえらぶ / Choose avatar color
            </p>
            <div className="grid grid-cols-4 gap-3">
              {COLOR_ACCENTS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 flex flex-col items-center transition-all hover:scale-105",
                    currentColor === color.color
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-full", color.bg)} />
                  <span className="text-xs font-bold mt-2">{color.nameJa}</span>
                  <span className="text-[10px] text-muted-foreground">{color.nameEn}</span>
                  {currentColor === color.color && (
                    <Check className="w-4 h-4 text-purple-500 mt-1" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>💡 おしらせ / Note:</strong> もっといろをかいたいときはショップへ！
                <br />
                Visit the shop to buy more colors!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizationModal;
