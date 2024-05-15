import React, { useRef, useEffect } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const VideoCapture = ({ onStop }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const handleStart = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        };
        handleStart();
    }, []);

    return (
        <ReactMediaRecorder
            video
            render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                <div>
                    <video ref={videoRef} autoPlay></video>
                    <div className="controls">
                        <button onClick={startRecording}>Start</button>
                        <button onClick={() => {
                            stopRecording();
                            onStop(mediaBlobUrl);
                        }}>Stop</button>
                    </div>
                </div>
            )}
        />
    );
};

export default VideoCapture;
