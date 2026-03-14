import { useState, useEffect } from 'react';
import { X, ShoppingBag, Coins, Check, Sparkles, Palette, Zap, Moon, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getGameData, buyItem, setTheme, SHOP_ITEMS, ShopItem, GameData } from '@/lib/gameState';

type ShopCategory = 'all' | 'themes' | 'colors' | 'powerups';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopModal = ({ isOpen, onClose }: ShopModalProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [activeCategory, setActiveCategory] = useState<ShopCategory>('all');
  const [purchaseMessage, setPurchaseMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setGameData(getGameData());
    }
  }, [isOpen]);

  // Listen for inventory changes
  useEffect(() => {
    const handleInventoryChange = () => {
      setGameData(getGameData());
    };

    window.addEventListener('inventory-changed', handleInventoryChange);
    window.addEventListener('coins-changed', handleInventoryChange);

    return () => {
      window.removeEventListener('inventory-changed', handleInventoryChange);
      window.removeEventListener('coins-changed', handleInventoryChange);
    };
  }, []);

  if (!gameData) return null;

  const categories: { id: ShopCategory; nameJa: string; nameEn: string; icon: React.ReactNode }[] = [
    { id: 'all', nameJa: 'すべて', nameEn: 'All', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'themes', nameJa: 'テーマ', nameEn: 'Themes', icon: <Palette className="w-4 h-4" /> },
    { id: 'colors', nameJa: '色', nameEn: 'Colors', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'powerups', nameJa: 'アイテム', nameEn: 'Power-ups', icon: <Zap className="w-4 h-4" /> },
  ];

  const filteredItems = activeCategory === 'all'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter(item => {
        if (activeCategory === 'themes') return item.type === 'theme';
        if (activeCategory === 'colors') return item.type === 'avatarColor';
        if (activeCategory === 'powerups') return item.type === 'powerup';
        return true;
      });

  const handleBuy = (item: ShopItem) => {
    const result = buyItem(item.id);
    setPurchaseMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });

    if (result.success) {
      setGameData(getGameData());
    }

    // Clear message after 2 seconds
    setTimeout(() => setPurchaseMessage(null), 2000);
  };

  const handleSetTheme = (themeId: string) => {
    setTheme(themeId);
    setGameData(getGameData());
  };

  const isOwned = (item: ShopItem): boolean => {
    if (item.type === 'theme') {
      return gameData.inventory.themes.includes(item.id);
    }
    if (item.type === 'avatarColor') {
      return gameData.player.avatarColor === item.effect;
    }
    return false;
  };

  const isActive = (item: ShopItem): boolean => {
    if (item.type === 'theme') {
      return gameData.settings.theme === item.id;
    }
    if (item.type === 'avatarColor') {
      return gameData.player.avatarColor === item.effect;
    }
    return false;
  };

  const getPowerupCount = (itemId: string): number => {
    return gameData.inventory.powerups[itemId] || 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <span className="text-2xl">ショップ / Shop</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Coin display */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-700">
              {gameData.player.coins} コイン / coins
            </span>
          </div>
        </div>

        {/* Purchase message */}
        {purchaseMessage && (
          <div
            className={cn(
              'text-center py-2 px-4 rounded-lg mb-4 font-medium',
              purchaseMessage.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            {purchaseMessage.text}
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all',
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-kid'
                  : 'bg-muted hover:bg-muted/80'
              )}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.nameJa}</span>
              <span className="text-xs opacity-80">{category.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const owned = isOwned(item);
            const active = isActive(item);
            const powerupCount = item.type === 'powerup' ? getPowerupCount(item.id) : 0;
            const canAfford = gameData.player.coins >= item.price;

            return (
              <div
                key={item.id}
                className={cn(
                  'relative p-4 rounded-xl border-2 transition-all',
                  active
                    ? 'border-primary bg-primary/5'
                    : owned
                    ? 'border-green-300 bg-green-50/50'
                    : 'border-border bg-card'
                )}
              >
                {/* Owned/Active badge */}
                {(owned || active) && (
                  <div className="absolute top-2 right-2">
                    {active ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                        <Check className="w-3 h-3" />
                        使用中 / Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                        <Check className="w-3 h-3" />
                        所持 / Owned
                      </span>
                    )}
                  </div>
                )}

                {/* Powerup count badge */}
                {item.type === 'powerup' && powerupCount > 0 && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">
                      ×{powerupCount}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-3xl">
                    {item.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground">{item.nameJa}</h3>
                    <p className="text-xs text-muted-foreground">{item.nameEn}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.descriptionJa}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-600 font-bold">
                    <Coins className="w-4 h-4" />
                    {item.price}
                  </div>

                  {item.type === 'theme' && owned ? (
                    <Button
                      size="sm"
                      variant={active ? 'outline' : 'default'}
                      onClick={() => handleSetTheme(active ? 'default' : item.id)}
                      disabled={active}
                    >
                      {active ? '使用中 / Active' : '使う / Use'}
                    </Button>
                  ) : item.type === 'avatarColor' ? (
                    <Button
                      size="sm"
                      variant={active ? 'outline' : 'default'}
                      onClick={() => handleBuy(item)}
                      disabled={active || !canAfford}
                    >
                      {active ? '使用中 / Active' : canAfford ? 'かう / Buy' : 'コイン不足 / Need coins'}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                    >
                      {canAfford ? 'かう / Buy' : 'コイン不足 / Need coins'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current theme preview */}
        {activeCategory === 'all' || activeCategory === 'themes' ? (
          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              現在のテーマ / Current Theme
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => handleSetTheme('default')}
                  className={cn(
                    'w-10 h-10 rounded-lg border-2 transition-all',
                    gameData.settings.theme === 'default'
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border hover:border-primary/50'
                  )}
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}
                  title="Default"
                />
                {gameData.inventory.themes.map((themeId) => {
                  const theme = SHOP_ITEMS.find(i => i.id === themeId);
                  if (!theme) return null;
                  return (
                    <button
                      key={themeId}
                      onClick={() => handleSetTheme(themeId)}
                      className={cn(
                        'w-10 h-10 rounded-lg border-2 transition-all flex items-center justify-center text-lg',
                        gameData.settings.theme === themeId
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-border hover:border-primary/50'
                      )}
                      title={theme.nameJa}
                    >
                      {theme.icon}
                    </button>
                  );
                })}
              </div>
              <span className="text-sm text-muted-foreground">
                クリックしてテーマを変更 / Click to change theme
              </span>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ShopModal;
