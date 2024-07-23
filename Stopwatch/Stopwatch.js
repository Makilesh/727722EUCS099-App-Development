// src/Stopwatch.js
import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  // State variables
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); // Update every 10ms for milliseconds
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Event handlers
  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${time % 100}`.slice(-2);
    const getSeconds = `0${Math.floor(time / 10) % 60}`.slice(-2);
    const minutes = Math.floor(time / 600);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 36000)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={handleStart} disabled={isActive}>Start</button>
      <button onClick={handleStop} disabled={!isActive}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;