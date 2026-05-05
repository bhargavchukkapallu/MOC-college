import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const BannerBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 30, stiffness: 100 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate normalized position (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Multiple layers of movement for parallax effect
  const x1 = useTransform(dx, [-0.5, 0.5], [-30, 30]);
  const y1 = useTransform(dy, [-0.5, 0.5], [-30, 30]);
  
  const x2 = useTransform(dx, [-0.5, 0.5], [40, -40]);
  const y2 = useTransform(dy, [-0.5, 0.5], [40, -40]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-auto bg-brand-primary"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ethereal Spiritual Smoke - Polished & Optimized */}
      <div className="absolute inset-0 opacity-50">
        {[
          { color: "rgba(255, 255, 255, 0.4)", gold: "rgba(255, 215, 0, 0.3)", speed: 25, y: "35%", delay: 0 },
          { color: "rgba(255, 255, 255, 0.3)", gold: "rgba(255, 215, 0, 0.2)", speed: 35, y: "50%", delay: 2 },
          { color: "rgba(255, 255, 255, 0.2)", gold: "rgba(255, 215, 0, 0.4)", speed: 30, y: "25%", delay: 4 },
          { color: "rgba(255, 255, 255, 0.4)", gold: "rgba(255, 215, 0, 0.1)", speed: 40, y: "60%", delay: 1 }
        ].map((layer, i) => (
          <motion.div
            key={i}
            className="absolute left-0 w-[250%] h-80 mix-blend-screen"
            style={{ 
              top: layer.y,
              x: i % 2 === 0 ? x1 : x2,
              y: i % 2 === 0 ? y1 : y2,
              background: `radial-gradient(ellipse at center, ${i % 2 === 0 ? layer.color : layer.gold} 0%, transparent 70%)`,
              filter: `blur(${60 + i * 15}px)`,
              willChange: "transform",
            }}
            animate={{ 
              translateX: ["-30%", "0%"],
              opacity: [0.2, 0.5, 0.2],
              scaleY: [1, 1.15, 1],
            }}
            transition={{ 
              translateX: { duration: layer.speed, repeat: Infinity, ease: "linear" },
              opacity: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: layer.delay },
              scaleY: { duration: layer.speed / 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </div>

      {/* Bottom Vignette for grounding */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent opacity-80" />
      
      {/* Interactive Focal Point */}
      <motion.div 
        style={{ x: x1, y: y1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none"
      />
    </div>
  );
};

export default BannerBackground;
