import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type ParticleType = 'confetti' | 'sparkle' | 'coin' | 'star' | 'firework' | 'bubble';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  color: string;
  emoji: string;
  life: number;
  maxLife: number;
}

interface ParticleBurstProps {
  type: ParticleType;
  originX: number;
  originY: number;
  count?: number;
  onComplete?: () => void;
}

// Particle configuration by type
const PARTICLE_CONFIG: Record<ParticleType, { emojis: string[]; colors: string[]; gravity: number; spread: number }> = {
  confetti: {
    emojis: ['🎉', '🎊', '✨', '💫'],
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'],
    gravity: 0.3,
    spread: 2,
  },
  sparkle: {
    emojis: ['✨', '⭐', '🌟', '💫'],
    colors: ['#ffd700', '#ffed4e', '#fff3b0', '#ffe082'],
    gravity: -0.1,
    spread: 1.5,
  },
  coin: {
    emojis: ['🪙', '💰', '💵', '✨'],
    colors: ['#ffd700', '#ffed4e', '#ffc107'],
    gravity: 0.5,
    spread: 1,
  },
  star: {
    emojis: ['⭐', '🌟', '✦', '✧'],
    colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#a29bfe'],
    gravity: 0.2,
    spread: 1.8,
  },
  firework: {
    emojis: ['🎆', '✨', '💥', '🌟'],
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8'],
    gravity: 0.1,
    spread: 3,
  },
  bubble: {
    emojis: ['🫧', '○', '●', '◌'],
    colors: ['#74b9ff', '#a29bfe', '#fd79a8', '#00cec9'],
    gravity: -0.3,
    spread: 1.2,
  },
};

// Generate particles for a burst
const generateParticles = (type: ParticleType, originX: number, originY: number, count: number): Particle[] => {
  const config = PARTICLE_CONFIG[type];
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = Math.random() * 5 + 3;
    const vx = Math.cos(angle) * speed * config.spread;
    const vy = Math.sin(angle) * speed * config.spread - 2;

    particles.push({
      id: Date.now() + i,
      x: originX,
      y: originY,
      vx,
      vy,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      scale: Math.random() * 0.5 + 0.8,
      opacity: 1,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      emoji: config.emojis[Math.floor(Math.random() * config.emojis.length)],
      life: 0,
      maxLife: 60 + Math.random() * 30,
    });
  }

  return particles;
};

// Single burst component
export const ParticleBurst = ({ type, originX, originY, count = 20, onComplete }: ParticleBurstProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(type, originX, originY, count));
  }, [type, originX, originY, count]);

  useEffect(() => {
    if (particles.length === 0) return;

    const config = PARTICLE_CONFIG[type];
    let animationId: number;

    const animate = () => {
      setParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + config.gravity,
            vx: p.vx * 0.98,
            rotation: p.rotation + p.rotationSpeed,
            life: p.life + 1,
            opacity: 1 - p.life / p.maxLife,
          }))
          .filter((p) => p.life < p.maxLife);

        if (updated.length === 0) {
          onComplete?.();
        }

        return updated;
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [particles.length, type, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-2xl transition-none"
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale})`,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

// Global particle manager
interface ParticleEffect {
  id: string;
  type: ParticleType;
  x: number;
  y: number;
  count: number;
}

interface ParticleManagerProps {
  enabled?: boolean;
}

export const ParticleManager = ({ enabled = true }: ParticleManagerProps) => {
  const [effects, setEffects] = useState<ParticleEffect[]>([]);

  const triggerEffect = useCallback((type: ParticleType, x?: number, y?: number, count?: number) => {
    if (!enabled) return;

    const rect = { width: window.innerWidth, height: window.innerHeight };
    const effectX = x ?? rect.width / 2;
    const effectY = y ?? rect.height / 2;

    const newEffect: ParticleEffect = {
      id: Date.now().toString() + Math.random(),
      type,
      x: effectX,
      y: effectY,
      count: count ?? (type === 'firework' ? 30 : 20),
    };

    setEffects((prev) => [...prev, newEffect]);
  }, [enabled]);

  // Listen for particle trigger events
  useEffect(() => {
    const handleTrigger = (e: CustomEvent<{ type: ParticleType; x?: number; y?: number; count?: number }>) => {
      triggerEffect(e.detail.type, e.detail.x, e.detail.y, e.detail.count);
    };

    window.addEventListener('trigger-particles', handleTrigger as EventListener);
    return () => window.removeEventListener('trigger-particles', handleTrigger as EventListener);
  }, [triggerEffect]);

  const handleComplete = (id: string) => {
    setEffects((prev) => prev.filter((e) => e.id !== id));
  };

  if (!enabled || effects.length === 0) return null;

  return (
    <>
      {effects.map((effect) => (
        <ParticleBurst
          key={effect.id}
          type={effect.type}
          originX={effect.x}
          originY={effect.y}
          count={effect.count}
          onComplete={() => handleComplete(effect.id)}
        />
      ))}
    </>
  );
};

// Helper function to trigger particles from anywhere
export const triggerParticles = (type: ParticleType, x?: number, y?: number, count?: number) => {
  window.dispatchEvent(new CustomEvent('trigger-particles', { detail: { type, x, y, count } }));
};

// Predefined celebration effects
export const celebrateCorrect = (element?: HTMLElement) => {
  const rect = element?.getBoundingClientRect();
  triggerParticles('sparkle', rect ? rect.left + rect.width / 2 : undefined, rect?.top);
};

export const celebratePerfect = () => {
  triggerParticles('confetti', window.innerWidth / 2, window.innerHeight / 2, 50);
  setTimeout(() => triggerParticles('star', window.innerWidth / 2, window.innerHeight / 2, 30), 200);
};

export const celebrateCoin = (element?: HTMLElement) => {
  const rect = element?.getBoundingClientRect();
  triggerParticles('coin', rect ? rect.left + rect.width / 2 : undefined, rect?.top, 10);
};

export const celebrateAchievement = () => {
  triggerParticles('firework', window.innerWidth / 2, window.innerHeight / 2, 40);
};

export const celebrateLevelUp = () => {
  triggerParticles('star', window.innerWidth / 2, window.innerHeight / 2, 35);
  setTimeout(() => triggerParticles('sparkle', window.innerWidth / 2, window.innerHeight / 2, 25), 300);
};

// Floating text effect for +coins, +XP, etc.
interface FloatingTextProps {
  text: string;
  x: number;
  y: number;
  color?: string;
  onComplete?: () => void;
}

export const FloatingText = ({ text, x, y, color = '#fbbf24', onComplete }: FloatingTextProps) => {
  const [opacity, setOpacity] = useState(1);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 1000;

      if (progress < 1) {
        setOpacity(1 - progress);
        setOffsetY(-progress * 50);
        animationId = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50 text-2xl font-black"
      style={{
        left: x,
        top: y + offsetY,
        transform: 'translate(-50%, -50%)',
        opacity,
        color,
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      }}
    >
      {text}
    </div>
  );
};

export default ParticleManager;
