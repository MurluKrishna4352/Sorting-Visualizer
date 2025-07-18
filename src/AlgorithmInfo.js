// AlgorithmInfo.js
import React from 'react';
import { ALGORITHMS } from './sortingAlgorithms';

export default function AlgorithmInfo({ algorithm }) {
  const info = ALGORITHMS[algorithm];
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">{algorithm}</h2>
      <p className="mb-2">{info.description}</p>
      <div className="text-sm">
        <span className="font-semibold">Time Complexity:</span> Best: {info.complexity.best}, Average: {info.complexity.average}, Worst: {info.complexity.worst}<br/>
        <span className="font-semibold">Space Complexity:</span> {info.complexity.space}
      </div>
    </div>
  );
}
