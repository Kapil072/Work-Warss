import React, { useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <style>{`
        @keyframes bounce {
          0%   { transform: translateY(0); }
          20%  { transform: translateY(-100px); }
          40%  { transform: translateY(0); }
          60%  { transform: translateY(-60px); }
          80%  { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        @keyframes shadow-dynamic {
          0%   { transform: translateX(-50%) scaleX(1.2) scaleY(0.6); opacity: 0.8; }
          20%  { transform: translateX(-50%) scaleX(0.6) scaleY(0.3); opacity: 0.5; }
          40%  { transform: translateX(-50%) scaleX(1.2) scaleY(0.6); opacity: 0.8; }
          60%  { transform: translateX(-50%) scaleX(0.8) scaleY(0.4); opacity: 0.6; }
          80%  { transform: translateX(-50%) scaleX(1.2) scaleY(0.6); opacity: 0.8; }
          100% { transform: translateX(-50%) scaleX(1.2) scaleY(0.6); opacity: 0.8; }
        }
      `}</style>
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="relative w-[150px]">
            <img
              src="/logo.ico"
              alt="Logo"
              style={{ width: '100%', position: 'relative', zIndex: 2, animation: 'bounce 2s ease-in-out forwards' }}
            />
            <div
              className="shadow"
              style={{
                position: 'absolute',
                bottom: -5,
                left: '50%',
                width: 80,
                height: 15,
                background: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
                zIndex: 1,
                animation: 'shadow-dynamic 2s ease-in-out forwards',
                transform: 'translateX(-50%) scaleX(1) scaleY(1)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 