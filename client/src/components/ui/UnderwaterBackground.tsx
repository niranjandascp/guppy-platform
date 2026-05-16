import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import LiquidEther from './LiquidEther';
import WaterRippleBackground from './WaterRippleBackground';
import FishParticleBackground from './FishParticleBackground';
import FloatingModelBackground from './FloatingModelBackground';

const Bubble = ({ size, delay, x }: { size: number; delay: number; x: string }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.6, 0.6, 0],
      x: ['0px', '20px', '-20px', '0px']
    }}
    transition={{ 
      duration: 15 + Math.random() * 10, 
      delay, 
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      position: 'absolute',
      left: x,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.05))',
      border: '0.5px solid rgba(255, 255, 255, 0.3)',
      zIndex: 1,
    }}
  />
);

export default function UnderwaterBackground() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: 4 + Math.random() * 14,
      delay: Math.random() * 20,
      x: `${Math.random() * 100}%`
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
      {/* The Main Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/assets/bg/underwater.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay to darken slightly and add blue tint for text readability */}
      <div 
        className="absolute inset-0 z-[1] bg-slate-950/40"
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 0.7) 100%)',
        }}
      />

      <div className="absolute inset-0 z-[1] opacity-30 mix-blend-screen">
        <LiquidEther
          colors={['#06B6D4', '#22D3EE', '#0891B2', '#155e75', '#042f2e']}
          mouseForce={30}
          cursorSize={140}
          isViscous={true}
          viscous={40}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={3.0}
        />
      </div>

      {/* Dynamic Fish Particle Background */}
      <FishParticleBackground />

      {/* Floating 3D Models Layer */}
      <FloatingModelBackground />

      {/* Interactive Water Ripple Layer */}
      <WaterRippleBackground color="#22D3EE" strength={15} radius={4} />

      {/* Surface Light Rays Overlay */}
      <div 
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Animated Bubbles */}
      {bubbles.map(bubble => (
        <Bubble key={bubble.id} {...bubble} />
      ))}

      {/* Floating Dust/Plankton */}
      <div className="absolute inset-0 z-[3]">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [0, -60],
              x: [0, Math.random() * 30 - 15]
            }}
            transition={{ 
              duration: 8 + Math.random() * 8, 
              delay: Math.random() * 10, 
              repeat: Infinity 
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '1.5px',
              height: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 6px white',
            }}
          />
        ))}
      </div>
    </div>
  );
}
