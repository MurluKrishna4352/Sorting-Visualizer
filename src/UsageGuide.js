// UsageGuide.js
import React from 'react';

export default function UsageGuide() {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">How to Use</h2>
      <ul className="list-disc pl-5 text-sm">
        <li>Select a sorting algorithm from the dropdown.</li>
        <li>Adjust array size and animation speed as desired.</li>
        <li>Click "New Array" to generate a random array.</li>
        <li>Click "Start" to begin visualization. Pause/Resume as needed.</li>
        <li>Reset to start over. Hover over controls for tooltips.</li>
        <li>Bars being compared or swapped are highlighted in red.</li>
        <li>Algorithm info is shown below the controls.</li>
      </ul>
    </div>
  );
}
