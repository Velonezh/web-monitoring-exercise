import React, { useState } from 'react';
import VideoCapture from './components/VideoCapture';
import './index.css';

const App = () => {
  const [activity, setActivity] = useState('None');

  const handleStart = async (stream) => {
    // Implement model loading and activity classification logic here
    setActivity('Analyzing...');
    // Example of sending a frame to the backend for prediction
    // You would replace this with actual video frame processing
    // and prediction logic
  };

  const handleStop = () => {
    setActivity('None');
  };

  return (
    <div className="App">
      <h1>Elderly Exercise Activity Monitor</h1>
      <VideoCapture onStart={handleStart} onStop={handleStop} />
      <div id="activityOutput">Detected Activity: {activity}</div>
    </div>
  );
};

export default App;
