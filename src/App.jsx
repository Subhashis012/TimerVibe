import React, { useState, useEffect } from "react";

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  };
}

export default function CodingVibeStopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev);
    }, 600);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(t => t + 1000), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "s") {
        setRunning(true);
      } else if (event.key === "p") {
        setRunning(false);
      } else if (event.key === "r") {
        setRunning(false);
        setTime(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <div className="text-[15vw] font-mono font-extrabold text-gray-300 tracking-tight select-none flex space-x-2">
        <span>{hours}</span>
        <span className={`${blink ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}>:</span>
        <span>{minutes}</span>
        <span className={`${blink ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}>:</span>
        <span>{seconds}</span>
      </div>

      <div className="mt-12 flex space-x-6">
        <button
          onClick={() => setRunning(true)}
          disabled={running}
          className={`px-10 cursor-pointer py-4 rounded-full font-semibold shadow-lg transition transform hover:scale-105 active:scale-95 ${
            running ? "bg-gray-500 text-gray-400 cursor-not-allowed" : "bg-blue-400 text-black"
          }`}
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          className={`px-10 cursor-pointer py-4 rounded-full font-semibold shadow-lg transition transform hover:scale-105 active:scale-95 ${
            !running ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-cyan-400 text-yellow-900"
          }`}
        >
          Pause
        </button>
        <button
          onClick={() => { setRunning(false); setTime(0); }}
          className="px-10 cursor-pointer py-4 rounded-full bg-red-500 text-white font-semibold shadow-lg hover:bg-red-700 transition transform hover:scale-105 active:scale-95"
        >
          Reset
        </button>
      </div>

      <div className="mt-12 max-w-md text-yellow-300 font-mono text-center leading-relaxed tracking-wide select-text">
        &quot;Code is like humor. When you have to explain it, it’s bad.&quot; – Cory House
      </div>
    </div>
  );
}
