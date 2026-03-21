import { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Sparkles } from 'lucide-react';
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
  PET_TYPES,
  SHOP_ITEMS,
  PetType,
  selectPet,
  feedPet,
  getPetEmotion,
  checkPetStatus,
  buyAccessory,
  toggleAccessory,
  isAccessoryCompatible,
  getEquippedAccessories,
} from '@/lib/gameState';

interface MathPetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MathPetModal = ({ isOpen, onClose }: MathPetModalProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [activeTab, setActiveTab] = useState('mypet');
  const [emotion, setEmotion] = useState(getPetEmotion());
  const [missedMessage, setMissedMessage] = useState<string | null>(null);
  const [feedAnimation, setFeedAnimation] = useState(false);
  const [buyMessage, setBuyMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    const data = getGameData();
    setGameData(data);
    setEmotion(getPetEmotion());
    const status = checkPetStatus();
    setMissedMessage(status.message);
  };

  // Listen for pet changes
  useEffect(() => {
    const handlePetChange = () => refreshData();
    window.addEventListener('pet-changed', handlePetChange);
    window.addEventListener('pet-fed', handlePetChange);
    window.addEventListener('coins-changed', handlePetChange);
    return () => {
      window.removeEventListener('pet-changed', handlePetChange);
      window.removeEventListener('pet-fed', handlePetChange);
      window.removeEventListener('coins-changed', handlePetChange);
    };
  }, []);

  const handleSelectPet = (petType: PetType) => {
    selectPet(petType);
    refreshData();
    setActiveTab('mypet');
  };

  const handleFeed = () => {
    const result = feedPet(true);
    setFeedAnimation(true);
    setTimeout(() => setFeedAnimation(false), 1000);
    refreshData();
  };

  const handleBuyAccessory = (accessoryId: string) => {
    const result = buyAccessory(accessoryId);
    setBuyMessage(result.message);
    setTimeout(() => setBuyMessage(null), 3000);
    if (result.success) {
      refreshData();
    }
  };

  const handleToggleAccessory = (accessoryId: string) => {
    toggleAccessory(accessoryId);
    refreshData();
  };

  if (!gameData) return null;

  const pet = gameData.pet.petType ? PET_TYPES.find(p => p.id === gameData.pet.petType) : null;
  const equipped = getEquippedAccessories();
  const happinessPercent = gameData.pet.happiness;

  // Get accessories from SHOP_ITEMS
  const accessories = SHOP_ITEMS.filter(item => item.type === 'accessory');
  const universalAccessories = accessories.filter(a =>
    !['acc-robot-antenna', 'acc-cat-bell', 'acc-dog-collar', 'acc-alien-ufo', 'acc-penguin-skates', 'acc-dragon-fire'].includes(a.id)
  );
  const petSpecificAccessories = pet ? accessories.filter(a => {
    if (a.id === 'acc-robot-antenna') return pet.id === 'robot';
    if (a.id === 'acc-cat-bell') return pet.id === 'cat';
    if (a.id === 'acc-dog-collar') return pet.id === 'dog';
    if (a.id === 'acc-alien-ufo') return pet.id === 'alien';
    if (a.id === 'acc-penguin-skates') return pet.id === 'penguin';
    if (a.id === 'acc-dragon-fire') return pet.id === 'dragon';
    return false;
  }) : [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            マイペット / My Pet
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mypet">マイペット</TabsTrigger>
            <TabsTrigger value="choose">ペットをえらぶ</TabsTrigger>
            <TabsTrigger value="accessories">アクセサリー</TabsTrigger>
          </TabsList>

          {/* My Pet Tab */}
          <TabsContent value="mypet" className="space-y-4">
            {pet ? (
              <>
                {/* Pet Display */}
                <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  {/* Pet with accessories */}
                  <div className="relative">
                    <div className={cn(
                      "text-8xl transition-transform",
                      feedAnimation && "scale-125",
                      emotion.emotion === 'sad' && "grayscale"
                    )}>
                      {pet.icon}
                    </div>
                    {/* Equipped accessories overlay */}
                    <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                      {equipped.map(acc => (
                        <span key={acc.id} className="text-2xl" title={acc.nameJa}>
                          {acc.icon}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pet info */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{pet.nameJa}</h3>
                    <p className="text-sm text-muted-foreground">{pet.nameEn}</p>
                    <p className="text-xs text-purple-600 mt-1">{pet.personalityJa}</p>
                  </div>

                  {/* Emotion */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                    <span className="text-2xl">{emotion.icon}</span>
                    <span className="font-bold">{emotion.textJa}</span>
                    <span className="text-sm text-muted-foreground">({emotion.textEn})</span>
                  </div>

                  {/* Missed message */}
                  {missedMessage && (
                    <div className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                      {missedMessage}
                    </div>
                  )}

                  {/* Happiness bar */}
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        しあわせ / Happiness
                      </span>
                      <span className="font-bold">{happinessPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={cn(
                          "h-3 rounded-full transition-all",
                          happinessPercent >= 70 ? "bg-green-500" :
                          happinessPercent >= 30 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${happinessPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Feed button */}
                  <Button
                    onClick={handleFeed}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    🍖 えさをあげる / Feed Pet
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">えさをあげたかいすう</p>
                    <p className="text-lg font-bold text-blue-600">{gameData.pet.totalCorrectFeeds} かい</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">そうゆうアクセサリー</p>
                    <p className="text-lg font-bold text-purple-600">{gameData.inventory.accessories.length} こ</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">ペットをえらびましょう！</p>
                <p className="text-sm text-muted-foreground mb-4">Choose your pet!</p>
                <Button onClick={() => setActiveTab('choose')}>
                  ペットをえらぶ / Choose Pet
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Choose Pet Tab */}
          <TabsContent value="choose">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PET_TYPES.map((petType) => (
                <button
                  key={petType.id}
                  onClick={() => handleSelectPet(petType.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all hover:scale-105",
                    gameData.pet.petType === petType.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  )}
                >
                  <span className="text-4xl">{petType.icon}</span>
                  <h4 className="font-bold mt-2">{petType.nameJa}</h4>
                  <p className="text-xs text-muted-foreground">{petType.nameEn}</p>
                  <p className="text-xs text-purple-600 mt-1">{petType.personalityJa}</p>
                  {gameData.pet.petType === petType.id && (
                    <span className="inline-block mt-2 text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                      せんたくちゅう / Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Accessories Tab */}
          <TabsContent value="accessories">
            {buyMessage && (
              <div className="mb-3 p-2 bg-green-100 text-green-700 rounded-lg text-sm text-center">
                {buyMessage}
              </div>
            )}

            {!pet && (
              <div className="text-center py-4 text-muted-foreground">
                まずペットをえらんでください / Please choose a pet first
              </div>
            )}

            {/* Universal Accessories */}
            <div className="mb-4">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                みんなにつけられる / Universal
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {universalAccessories.map((item) => {
                  const owned = gameData.inventory.accessories.includes(item.id);
                  const equipped = gameData.pet.equippedAccessories.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "p-3 rounded-lg border-2 text-center",
                        equipped ? "border-purple-500 bg-purple-50" :
                        owned ? "border-green-300 bg-green-50" :
                        "border-gray-200"
                      )}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-sm font-bold">{item.nameJa}</p>
                      <p className="text-xs text-muted-foreground">{item.nameEn}</p>
                      {owned ? (
                        <button
                          onClick={() => handleToggleAccessory(item.id)}
                          className={cn(
                            "mt-2 text-xs px-3 py-1 rounded-full",
                            equipped
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          )}
                        >
                          {equipped ? 'はずす / Unequip' : 'つける / Equip'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyAccessory(item.id)}
                          disabled={gameData.player.coins < item.price}
                          className="mt-2 text-xs bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold disabled:opacity-50"
                        >
                          💰 {item.price}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pet-Specific Accessories */}
            {pet && petSpecificAccessories.length > 0 && (
              <div>
                <h4 className="font-bold mb-2">
                  {pet.nameJa}だけ / {pet.nameEn} Only
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {petSpecificAccessories.map((item) => {
                    const owned = gameData.inventory.accessories.includes(item.id);
                    const equipped = gameData.pet.equippedAccessories.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "p-3 rounded-lg border-2 text-center",
                          equipped ? "border-purple-500 bg-purple-50" :
                          owned ? "border-green-300 bg-green-50" :
                          "border-gray-200"
                        )}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <p className="text-sm font-bold">{item.nameJa}</p>
                        <p className="text-xs text-muted-foreground">{item.nameEn}</p>
                        {owned ? (
                          <button
                            onClick={() => handleToggleAccessory(item.id)}
                            className={cn(
                              "mt-2 text-xs px-3 py-1 rounded-full",
                              equipped
                                ? "bg-purple-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            )}
                          >
                            {equipped ? 'はずす / Unequip' : 'つける / Equip'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBuyAccessory(item.id)}
                            disabled={gameData.player.coins < item.price}
                            className="mt-2 text-xs bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold disabled:opacity-50"
                          >
                            💰 {item.price}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MathPetModal;
