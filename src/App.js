// App.js
import React, { useState, useRef, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import ControlPanel from './ControlPanel';
import SortingVisualizer from './SortingVisualizer';
import AlgorithmInfo from './AlgorithmInfo';
import UsageGuide from './UsageGuide';
import { ALGORITHMS, generateArray } from './sortingAlgorithms';

function playSubtleSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = type === 'swap' ? 320 : 220;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
    osc.onended = () => ctx.close();
  } catch (e) {}
}

export default function App() {
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [arraySizeInput, setArraySizeInput] = useState('20');
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(generateArray(20));
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setSteps(ALGORITHMS[algorithm].fn(array));
    setStepIdx(0);
    setIsRunning(false);
    setIsPaused(false);
  }, [array, algorithm]);

  useEffect(() => {
    if (isRunning && !isPaused && stepIdx < steps.length - 1) {
      timerRef.current = setTimeout(() => {
        const t = steps[stepIdx + 1]?.type;
        if (t === 'swap' || t === 'compare') playSubtleSound(t);
        setStepIdx(idx => idx + 1);
      }, speed);
    } else {
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, isPaused, stepIdx, steps, speed]);

  useEffect(() => {
    setArraySizeInput(arraySize.toString());
  }, [arraySize]);

  const handleGenerateArray = () => {
    setArray(generateArray(arraySize));
  };
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsPaused(paused => !paused);
  };
  const handleReset = () => {
    setStepIdx(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (arraySize < 10 || arraySize > 100) setArraySize(20);
  }, [arraySize]);

  const currentStep = steps[stepIdx] || { array, highlights: [], type: '' };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Sorting Visualizer</h1>
      <ErrorBoundary>
        <ControlPanel
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          arraySizeInput={arraySizeInput}
          setArraySizeInput={setArraySizeInput}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          onGenerateArray={handleGenerateArray}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          isRunning={isRunning}
          isPaused={isPaused}
        />
        <SortingVisualizer
          array={currentStep.array}
          highlights={currentStep.highlights}
          step={stepIdx}
          totalSteps={steps.length - 1}
          isRunning={isRunning}
          isPaused={isPaused}
        />
        <AlgorithmInfo algorithm={algorithm} />
        <UsageGuide />
      </ErrorBoundary>
      <footer className="mt-8 text-center text-xs text-gray-500">© 2025 Sorting Visualizer. Made with ♥ by Krishna Nagpal</footer>
    </div>
  );
}
