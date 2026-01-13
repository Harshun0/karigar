import React, { useRef, useState } from 'react';

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CometCard({ children, className = "" }: CometCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Comet effect overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      
      {/* 3D transform effect */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateY(${(mousePosition.x - 150) * 0.01}deg) rotateX(${(mousePosition.y - 200) * -0.01}deg)`
            : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}
