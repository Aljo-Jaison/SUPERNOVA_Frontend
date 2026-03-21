'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const StarComponent = ({ initialStar }: { initialStar: Star }) => {
  const [pos, setPos] = useState({ x: initialStar.x, y: initialStar.y });

  return (
    <div
      className="absolute bg-white rounded-full star"
      style={{
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        width: `${initialStar.size}px`,
        height: `${initialStar.size}px`,
        '--delay': `${initialStar.delay}s`,
        '--duration': `${initialStar.duration}s`,
      } as React.CSSProperties}
      onAnimationIteration={() => {
        setPos({ x: Math.random() * 100, y: Math.random() * 100 });
      }}
    />
  );
};

const SparkleComponent = ({ initialSparkle }: { initialSparkle: Sparkle }) => {
  const [pos, setPos] = useState({ x: initialSparkle.x, y: initialSparkle.y });

  return (
    <div
      className="absolute sparkle flex items-center justify-center"
      style={{
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        width: `${initialSparkle.size}px`,
        height: `${initialSparkle.size}px`,
        '--delay': `${initialSparkle.delay}s`,
        '--duration': `${initialSparkle.duration}s`,
      } as React.CSSProperties}
      onAnimationIteration={() => {
        setPos({ x: Math.random() * 100, y: Math.random() * 100 });
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-lg">
        <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="currentColor" />
      </svg>
    </div>
  );
};

const LongStarComponent = ({ initialStar }: { initialStar: Star }) => {
  const [pos, setPos] = useState({ x: initialStar.x, y: initialStar.y });

  return (
    <div
      className="absolute bg-white rounded-full long-star"
      style={{
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        width: `${initialStar.size}px`,
        height: `${initialStar.size}px`,
        '--delay': `${initialStar.delay}s`,
        '--duration': `${initialStar.duration}s`,
      } as React.CSSProperties}
      onAnimationIteration={() => {
        setPos({ x: Math.random() * 100, y: Math.random() * 100 });
      }}
    />
  );
};

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [longStars, setLongStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate glittering stars
    setStars(prev => {
      if (prev.length > 0) return prev;
      const generatedStars: Star[] = [];
      for (let i = 0; i < 90; i++) {
        generatedStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2.5 + 0.5,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 1.5,
        });
      }
      return generatedStars;
    });

    // Generate bigger sparkles (non-round)
    setSparkles(prev => {
      if (prev.length > 0) return prev;
      const generatedSparkles: Sparkle[] = [];
      for (let i = 0; i < 10; i++) {
        generatedSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 6,
          delay: Math.random() * 5,
          duration: Math.random() * 1.5 + 0.8, // 0.8s to 2.3s (much shorter)
        });
      }
      return generatedSparkles;
    });

    // Generate long glowing stars
    setLongStars(prev => {
      if (prev.length > 0) return prev;
      const generatedLongStars: Star[] = [];
      for (let i = 0; i < 25; i++) {
        generatedLongStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1.5, // 1.5px to 3.5px
          delay: Math.random() * 10,
          duration: Math.random() * 6 + 6, // 6s to 12s (much longer)
        });
      }
      return generatedLongStars;
    });

    // Dynamic shooting stars logic
    let timeoutId: ReturnType<typeof setTimeout>;

    const spawnShootingStars = () => {
      const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 stars
      const newShootingStars: ShootingStar[] = Array.from({ length: count }).map(() => ({
        id: Math.random(),
        top: Math.random() * 100, // Start anywhere vertically
        left: Math.random() * 80 + 20, // Start shifted right
        delay: Math.random() * 1.5, // 0s to 1.5s delay
        duration: Math.random() * 1.5 + 1.5, // 1.5s to 3s duration
      }));

      setShootingStars(newShootingStars);

      // Calculate when this batch finishes
      const maxTime = Math.max(...newShootingStars.map(s => s.delay + s.duration)) * 1000;
      
      // Schedule next batch (wait for current to finish + random 2-6 seconds pause)
      const nextSpawnDelay = maxTime + Math.random() * 4000 + 2000;
      
      timeoutId = setTimeout(spawnShootingStars, nextSpawnDelay);
    };

    // Initial delay of 2 seconds before the first spawn
    timeoutId = setTimeout(spawnShootingStars, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 z-[5] overflow-hidden pointer-events-none">
      {/* Glittering Stars */}
      {stars.map((star) => (
        <StarComponent key={`star-${star.id}`} initialStar={star} />
      ))}

      {/* Long Glowing Stars */}
      {longStars.map((star) => (
        <LongStarComponent key={`long-star-${star.id}`} initialStar={star} />
      ))}

      {/* Sparkles (Bigger, non-round stars) */}
      {sparkles.map((sparkle) => (
        <SparkleComponent key={`sparkle-${sparkle.id}`} initialSparkle={sparkle} />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            '--delay': `${star.delay}s`,
            '--duration': `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
