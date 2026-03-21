import { useEffect, useState } from 'react';
import { PET_TYPES, getPetEmotion, checkPetStatus, GameData } from '@/lib/gameState';

interface PetAvatarProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  gameData: GameData | null;
}

const PetAvatar = ({ onClick, size = 'md', gameData }: PetAvatarProps) => {
  const [emotion, setEmotion] = useState(getPetEmotion());
  const [missedMessage, setMissedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (gameData?.pet?.petType) {
      const status = checkPetStatus();
      setEmotion(getPetEmotion());
      setMissedMessage(status.message);
    }
  }, [gameData]);

  // Listen for pet changes
  useEffect(() => {
    const handlePetChange = () => {
      setEmotion(getPetEmotion());
    };
    window.addEventListener('pet-changed', handlePetChange);
    window.addEventListener('pet-fed', handlePetChange);
    return () => {
      window.removeEventListener('pet-changed', handlePetChange);
      window.removeEventListener('pet-fed', handlePetChange);
    };
  }, []);

  if (!gameData?.pet?.petType) {
    return (
      <button
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-dashed border-purple-300 flex items-center justify-center hover:border-purple-500 transition-colors"
        title="ペットをえらぶ / Choose Pet"
      >
        <span className="text-lg">❓</span>
      </button>
    );
  }

  const pet = PET_TYPES.find(p => p.id === gameData.pet.petType);
  if (!pet) return null;

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
  };

  // Happiness indicator color
  const happinessColor =
    gameData.pet.happiness >= 70 ? 'bg-green-400' :
    gameData.pet.happiness >= 30 ? 'bg-yellow-400' :
    'bg-red-400';

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 flex items-center justify-center hover:scale-110 transition-transform relative`}
      title={`${pet.nameJa} (${emotion.textJa}) / ${pet.nameEn} (${emotion.textEn})${missedMessage ? ` - ${missedMessage}` : ''}`}
    >
      <span>{pet.icon}</span>
      {/* Happiness indicator dot */}
      <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${happinessColor} rounded-full border-2 border-white`} />
    </button>
  );
};

export default PetAvatar;
