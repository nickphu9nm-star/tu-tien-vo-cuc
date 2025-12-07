import React from 'react';

interface Props { current: number; max: number; label?: string; colorClass?: string; }

const ProgressBar: React.FC<Props> = ({ current, max, label, colorClass = "bg-gradient-to-r from-teal-800 to-qi-500" }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  return (
    <div className="w-full relative h-6 bg-void-900 border border-void-600 rounded overflow-hidden shadow-inner">
      <div className={`h-full transition-all duration-300 ease-out ${colorClass}`} style={{ width: `${percentage}%` }} />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md z-10">
        {label ? `${label}: ` : ''}{current.toLocaleString()} / {max.toLocaleString()}
      </div>
    </div>
  );
};
export default ProgressBar;
