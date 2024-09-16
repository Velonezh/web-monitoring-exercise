import React from 'react';

const VideoPlayer = ({ videoSrc }) => {
    return (
        <div>
            <h2>Classify the Exercise</h2>
            <video src={videoSrc} controls></video>
        </div>
    );
};

export default VideoPlayer;
