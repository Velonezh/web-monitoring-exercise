import React, { useState } from 'react';
import VideoCapture from './components/VideoCapture';
import VideoPlayer from './components/VideoPlayer';
import './index.css';

const App = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [activity, setActivity] = useState('None');

  const handleStop = async (mediaBlobUrl) => {
    setVideoSrc(mediaBlobUrl);
    setActivity('Processing...');

    try {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', blob, 'exercise-video.webm');

      const result = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      });
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      setActivity(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setActivity('Failed to fetch');
    }
  };

  return (
    <div className="App">
      <h1>Elderly Exercise Monitoring</h1>
      <div className="video-windows">
        <div className="video-window">
          <h2>Recording State</h2>
          <VideoCapture onStop={handleStop} />
        </div>
        <div className="video-window">
          <VideoPlayer videoSrc={videoSrc} />
        </div>
      </div>
      <div id="activityOutput">Detected Activity: {activity}</div>
    </div>
  );
};

export default App;
