import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    VANTA?: any;
    THREE?: any;
  }
}

interface VantaBackgroundProps {
  className?: string;
  color?: number;
  waveSpeed?: number;
  zoom?: number;
}

const VantaBackground = ({ 
  className = "", 
  color = 0x60606,
  waveSpeed = 1.0,
  zoom = 1.0 
}: VantaBackgroundProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      // Load Three.js
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.async = true;
      
      // Load Vanta Waves
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js';
      vantaScript.async = true;

      document.head.appendChild(threeScript);
      
      threeScript.onload = () => {
        document.head.appendChild(vantaScript);
      };

      vantaScript.onload = () => {
        setScriptsLoaded(true);
      };

      return () => {
        if (document.head.contains(threeScript)) {
          document.head.removeChild(threeScript);
        }
        if (document.head.contains(vantaScript)) {
          document.head.removeChild(vantaScript);
        }
      };
    };

    loadScripts();
  }, []);

  useEffect(() => {
    if (!scriptsLoaded || !vantaRef.current || !window.VANTA) return;

    vantaEffect.current = window.VANTA.WAVES({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: color,
      waveSpeed: waveSpeed,
      zoom: zoom,
    });

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [scriptsLoaded, color, waveSpeed, zoom]);

  return (
    <div 
      ref={vantaRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        zIndex: 0,
        backgroundColor: '#0a0a0a' // Fallback color
      }}
    />
  );
};

export default VantaBackground;
