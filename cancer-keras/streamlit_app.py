import streamlit as st
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import os
from io import BytesIO

# Streamlit config
st.set_page_config(page_title="🫁 Lung Cancer Detector", layout="centered")

# --- CSS Styling ---
st.markdown("""
    <style>
    html, body, [class*="css"] {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f9fafb;
    }
    .title {
        font-size: 2.4rem;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(to right, #2563eb, #9333ea);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
    }
    .subtitle {
        text-align: center;
        color: #64748b;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    .result-box {
        padding: 1.5rem;
        background-color: #f1f5f9;
        border-radius: 16px;
        text-align: center;
        margin-top: 2rem;
    }
    .label {
        font-size: 1.8rem;
        font-weight: 600;
        color: #0f766e;
    }
    .confidence {
        font-size: 1.1rem;
        color: #334155;
        margin-top: 8px;
    }
    </style>
""", unsafe_allow_html=True)

# --- UI Title ---
st.markdown('<div class="title">🫁 Lung Cancer Detector</div>', unsafe_allow_html=True)
st.markdown('<div class="subtitle">Upload a lung CT image and choose model to detect cancer type</div>', unsafe_allow_html=True)

# --- Model Selection ---
model_option = st.selectbox("🔍 Select Model", [
    "Advanced: 4-Class (Adeno, Large, Squamous, Normal)",
    "Basic: 3-Class (Benign, Malignant, Normal)"
])

# --- Load Model ---
@st.cache_resource
def load_advanced_model():
    return load_model("lung5.keras")

@st.cache_resource
def load_basic_model():
    return load_model("model.weights.h5")

# --- Image Preprocessing ---
def preprocess_image(img_input):
    """
    Process input which can be a file path, file object, or PIL Image
    """
    if isinstance(img_input, Image.Image):
        # Input is already a PIL Image
        img = img_input
    else:
        # Input is a file path or file-like object
        img = Image.open(img_input)
    
    img = img.convert("RGB").resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

# --- Sample Image Selector ---
def get_sample_images():
    sample_dir = "samples"  # Path to sample images folder
    sample_images = [f for f in os.listdir(sample_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]
    return sample_images

sample_images = get_sample_images()

# --- File Upload or Sample Image Selection ---
image_source = st.radio("Choose Image Source:", ("Upload your own image", "Select from sample images"))

uploaded_file = None
selected_image_path = None

if image_source == "Upload your own image":
    uploaded_file = st.file_uploader("📤 Upload CT Image", type=["jpg", "jpeg", "png"])
else:
    if sample_images:
        selected_sample = st.selectbox("Choose a sample image", sample_images)
        selected_image_path = os.path.join("samples", selected_sample)
    else:
        st.error("No sample images found in the samples directory")

# --- Setup Based on Model ---
if model_option.startswith("Advanced"):
    model = load_advanced_model()
    class_labels = ['adenocarcinoma', 'large.cell.carcinoma', 'normal', 'squamous.cell.carcinoma']
else:
    model = load_basic_model()
    class_labels = ['Benign cases', 'Malignant cases', 'Normal cases']

# --- Display and process the image ---
if uploaded_file or selected_image_path:
    # Display the selected image
    if uploaded_file:
        img = Image.open(uploaded_file)
        st.image(img, caption="Uploaded Image", use_column_width=True)
        # Reset file pointer for later processing
        uploaded_file.seek(0)
        input_for_model = uploaded_file
    else:
        img = Image.open(selected_image_path)
        st.image(img, caption="Selected Sample Image", use_column_width=True)
        input_for_model = selected_image_path
    
    # Run prediction
    img_array = preprocess_image(input_for_model)
    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    predicted_label = class_labels[predicted_index]
    confidence = float(np.max(predictions[0]))

    # --- Output ---
    st.markdown(f"""
        <div class="result-box">
            <div class="label">{predicted_label}</div>
            <div class="confidence">Confidence: {confidence:.2%}</div>
        </div>
    """, unsafe_allow_html=True)

    st.progress(confidence)

    # --- Class Probabilities ---
    st.markdown("### 📊 Class Probabilities")
    for label, prob in zip(class_labels, predictions[0]):
        st.write(f"**{label}**: `{prob:.4f}`")