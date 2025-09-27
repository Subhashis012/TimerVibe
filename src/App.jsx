import React, { useState, useEffect } from "react";
import FlipCard from "./components/FlipCard";

const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer logic
  useEffect(() => {
  let timer;
  if (isRunning) {
    const now = Date.now();
    setStartTime((prev) => prev ?? now);
    timer = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  }
  return () => clearInterval(timer);
}, [isRunning, startTime]);

  // Format helper
  const pad = (num) => String(num).padStart(2, "0");

  // Time breakdown
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // Controls
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Timer */}
      <div className="flex space-x-4 md:space-x-6 mb-12">
        <FlipCard value={pad(hours)} />
        <FlipCard value={pad(minutes)} />
        <FlipCard value={pad(secs)} />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold disabled:opacity-40 transition-all"
        >
          Start
        </button>

        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold disabled:opacity-40 transition-all"
        >
          Stop
        </button>

        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
