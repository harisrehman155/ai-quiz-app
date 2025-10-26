// components/Loader.tsx
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-32 w-32 animate-pulse rounded-full bg-blue-500"></div>
    </div>
  );
};

export default Loader;
