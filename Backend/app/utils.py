from tensorflow.keras.models import load_model
from django.conf import settings
import numpy as np
import pickle, random


# Output Prediction Classes

activity_classes = ['Lying', 'Running', 'Running', 'Running', 'Walking', 'Sitting']

hypertension_classes = ['No Hypertension','Hypertension']

ecg_classes = [
    "Non-Ectopic Beats (Normal)", 
    "Supraventricular-Ectopic Beats (Abnormal but not Life Threatening)",
    "Ventricular-Ectopic Beats (Abnormal and Life Threatening)",
    "Fusion Beats (Abnormal)",
    "Unknown"
]


# predicts current activity of the person 
def predict_activity(height, weight, steps, calories, distance, heart_rate):
    arr = np.array([[height, weight, steps, calories, distance, heart_rate]])
    ml_model_pl = pickle.load(open(f"{settings.BASE_DIR}/Health_Care_Model1.pickle", 'rb'))
    pred = ml_model_pl.predict(arr)
    return activity_classes[int(pred)]


# ECG Classification
def ecg_classification(arr):
    y = arr
    y = np.expand_dims(y,axis=0)
    model = load_model(f"{settings.BASE_DIR}/best_model.h5")
    pred = model.predict(y)
    op = pred.argmax()
    return op, ecg_classes[op]


def hypertension_classifier(age,sex,trestbps,fbs,restecg):
    slope = random.randint(0, 3)
    ca = random.randint(0, 4)
    ml_model_pl = pickle.load(open(f"{settings.BASE_DIR}/hypertension.pickle", 'rb'))
    pred = ml_model_pl.predict([[age,sex,trestbps,fbs,restecg,slope,ca]])
    if int(pred) == 0:
        return False
    return True
    # return hypertension_classes[int(pred)]

