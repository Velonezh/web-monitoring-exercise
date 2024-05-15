import React, { useRef } from 'react';

const VideoCapture = ({ onStart, onStop }) => {
    const videoRef = useRef(null);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            if (onStart) onStart(stream);
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    const stopVideo = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            if (onStop) onStop();
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay></video>
            <div className="controls">
                <button onClick={startVideo}>Start</button>
                <button onClick={stopVideo}>Stop</button>
            </div>
        </div>
    );
};

export default VideoCapture;


// import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';

// const VideoCapture = () => {
//     const videoRef = useRef(null);
//     const [exerciseClass, setExerciseClass] = useState('');
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const getVideo = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 videoRef.current.srcObject = stream;
//             } catch (err) {
//                 console.error('Error accessing webcam:', err);
//             }
//         };
//         getVideo();

//         const sendFrame = () => {
//             if (videoRef.current) {
//                 const canvas = document.createElement('canvas');
//                 canvas.width = videoRef.current.videoWidth;
//                 canvas.height = videoRef.current.videoHeight;
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//                 canvas.toBlob(async (blob) => {
//                     if (blob) {
//                         const formData = new FormData();
//                         formData.append('frame', blob, 'frame.jpg');
//                         try {
//                             const response = await axios.post('http://localhost:5000/process_frame', formData, {
//                                 headers: {
//                                     'Content-Type': 'multipart/form-data'
//                                 }
//                             });
//                             const className = response.data.class_name;
//                             setExerciseClass(className);
//                             // Provide feedback based on the classification
//                             if (className === 'squat') {
//                                 setMessage('Great job! Keep squatting.');
//                             } else if (className === 'jumping_jacks') {
//                                 setMessage('Good! Keep doing jumping jacks.');
//                             } else {
//                                 setMessage('Perform the correct exercise.');
//                             }
//                         } catch (err) {
//                             console.error('Error sending frame:', err);
//                         }
//                     } else {
//                         console.error('Failed to create blob from canvas');
//                     }
//                 }, 'image/jpeg');
//             }
//         };

//         const interval = setInterval(sendFrame, 1000); // Send frame every second
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div>
//             <video ref={videoRef} autoPlay />
//             <div>
//                 <h2>Exercise Classification: {exerciseClass}</h2>
//                 <p>{message}</p>
//             </div>
//         </div>
//     );
// };

// export default VideoCapture;
