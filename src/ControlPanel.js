// ControlPanel.js
import React from 'react';

export default function ControlPanel({
  algorithm, setAlgorithm,
  arraySizeInput, setArraySizeInput,
  arraySize, setArraySize,
  speed, setSpeed,
  onGenerateArray,
  onStart, onPause, onReset,
  isRunning, isPaused
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-4 bg-white rounded shadow mb-4">
      <div>
        <label className="block text-sm font-medium mb-1">Algorithm</label>
        <select className="p-2 border rounded" value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
          {['Bubble Sort','Selection Sort','Insertion Sort','Merge Sort','Quick Sort'].map(name => <option key={name}>{name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Array Size</label>
        <input type="number" min="10" max="100" value={arraySizeInput} onChange={e => setArraySizeInput(e.target.value)} onBlur={e => {
          let val = Number(e.target.value);
          if (isNaN(val)) val = 20;
          val = Math.max(10, Math.min(100, val));
          setArraySize(val);
          setArraySizeInput(val.toString());
        }} className="p-2 border rounded w-20" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Speed (ms)</label>
        <input type="range" min="10" max="1000" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-32" />
        <span className="ml-2 text-sm">{speed}ms</span>
      </div>
      <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onGenerateArray} title="Generate new random array">New Array</button>
      <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={onStart} disabled={isRunning && !isPaused} title="Start sorting">Start</button>
      <button className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={onPause} disabled={!isRunning} title="Pause sorting">{isPaused ? 'Resume' : 'Pause'}</button>
      <button className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={onReset} title="Reset visualization">Reset</button>
    </div>
  );
}
