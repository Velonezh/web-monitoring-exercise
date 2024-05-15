from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import tempfile
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = tf.keras.models.load_model('model-6-layers-1.3.h5')

def process_video(video_path):
    # Implement video processing and prediction logic here
    # For demonstration, we'll just return a dummy prediction
    return "Exercise Class"

@app.route('/predict', methods=['POST'])
def predict():
    video_file = request.files['file']
    temp_dir = tempfile.mkdtemp()
    video_path = os.path.join(temp_dir, video_file.filename)
    video_file.save(video_path)

    prediction = process_video(video_path)
    os.remove(video_path)
    os.rmdir(temp_dir)

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
