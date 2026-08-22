from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd


# ============================================
# LOAD MODEL
# ============================================

MODEL_PATH = "models/fever_model.pkl"

package = joblib.load(MODEL_PATH)

model = package["model"]
label_encoder = package["label_encoder"]


# ============================================
# FASTAPI
# ============================================

app = FastAPI(
    title="AI HealthGuard ML API",
    description="Fever screening ML service",
    version="1.0.0"
)


# ============================================
# REQUEST MODEL
# ============================================

class FeverInput(BaseModel):

    Temperature: float
    Age: int
    BMI: float

    Gender: str
    Headache: str
    Body_Ache: str
    Fatigue: str

    Chronic_Conditions: str
    Allergies: str
    Smoking_History: str
    Alcohol_Consumption: str

    Humidity: float
    AQI: int

    Physical_Activity: str
    Diet_Type: str

    Heart_Rate: int
    Blood_Pressure: str


# ============================================
# HEALTH CHECK
# ============================================

@app.get("/")
def home():

    return {
        "success": True,
        "service": "AI HealthGuard ML API",
        "model": "Fever Random Forest",
        "status": "running"
    }


# ============================================
# PREDICT FEVER
# ============================================

@app.post("/predict-fever")
def predict_fever(data: FeverInput):

    try:

        patient = pd.DataFrame([data.model_dump()])

        prediction = model.predict(patient)[0]

        probabilities = model.predict_proba(patient)[0]

        severity = label_encoder.inverse_transform(
            [prediction]
        )[0]

        confidence = float(
            probabilities[prediction] * 100
        )


        # Risk level

        if severity == "High Fever":
            risk_level = "HIGH"

        elif severity == "Mild Fever":
            risk_level = "MODERATE"

        else:
            risk_level = "LOW"


        # Probability dictionary

        class_probabilities = {}

        for i, probability in enumerate(probabilities):

            class_name = label_encoder.inverse_transform(
                [i]
            )[0]

            class_probabilities[class_name] = round(
                float(probability * 100),
                2
            )


        return {

            "success": True,

            "prediction": {
                "severity": severity,
                "confidence": round(confidence, 2),
                "risk_level": risk_level
            },

            "probabilities": class_probabilities,

            "disclaimer":
                "This is an ML screening result, "
                "not a medical diagnosis."

        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )