import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (isVideoLoaded || videoError) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded, videoError, onLoadingComplete]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsVideoLoaded(true);
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {!videoError ? (
        <div className="w-full h-full max-w-md mx-auto flex items-center justify-center">
          <video
            className="w-full h-full object-contain"
            autoPlay
            muted
            playsInline
            onEnded={() => setIsVideoLoaded(true)}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={handleVideoError}
          >
            <source src="/videos/logofinal.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border-4 border-blue-400 rounded-full animate-spin-slow" style={{ animationDelay: '-0.5s' }}></div>
            <div className="absolute inset-4 border-4 border-blue-300 rounded-full animate-spin-slow" style={{ animationDelay: '-1s' }}></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen; 