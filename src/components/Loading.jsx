import React from 'react';

// Full Page Loading Component
export const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#E69B83] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-[#f48965] border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="text-gray-700 font-medium text-lg">{message}</p>
      </div>
    </div>
  );
};

// Button Loading Component (Inline) - Orange spinning circle
export const ButtonLoading = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]}`}>
      <div className={`${sizeClasses[size]} border-2 border-orange-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

// Card Loading Skeleton
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-32 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
};

// Spinner Only (for small areas)
export const Spinner = ({ className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
      <div className="w-5 h-5 border-2 border-[#E69B83] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;

