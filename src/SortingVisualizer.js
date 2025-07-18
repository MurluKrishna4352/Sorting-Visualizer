// SortingVisualizer.js
import React from 'react';

export default function SortingVisualizer({ array, highlights, step, totalSteps, isRunning, isPaused }) {
  const maxVal = Math.max(...array, 1);
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-end h-64 w-full max-w-4xl mx-auto bg-gray-100 rounded p-2 overflow-x-auto" style={{ minHeight: '16rem' }}>
        {array.map((val, idx) => {
          let color = 'bg-blue-400';
          if (highlights.includes(idx)) color = 'bg-red-400';
          return (
            <div key={idx} className={`mx-0.5 rounded ${color}`} style={{ height: `${(val / maxVal) * 100}%`, width: `${100 / array.length}%`, minWidth: '6px' }} title={val}></div>
          );
        })}
      </div>
      <div className="mt-2 text-sm text-gray-700">Step: {step} / {totalSteps} {isRunning ? (isPaused ? '(Paused)' : '(Running)') : ''}</div>
    </div>
  );
}
