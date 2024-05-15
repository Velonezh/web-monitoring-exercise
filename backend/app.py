from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
model = load_model('C:\\Users\\Amikr\\Documents\\Thesis\\main\\monitoring-web\\backend\\model-6-layers-1.3.h5')  # Update the path to your model file

def preprocess_image(image):
    # Example preprocessing - modify based on your model's requirements
    image = image.resize((224, 224))  # Resize the image if your model requires it
    image = np.array(image)
    image = image / 255.0  # Normalize the image if required
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/process_frame', methods=['POST'])
def process_frame():
    file = request.files['frame']
    image = Image.open(io.BytesIO(file.read()))
    preprocessed_image = preprocess_image(image)
    prediction = model.predict(preprocessed_image)
    class_name = np.argmax(prediction, axis=1)[0]  # Modify based on your model's output
    return jsonify({'class_name': str(class_name)})

if __name__ == '__main__':
    app.run(debug=True)
