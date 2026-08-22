import joblib
import pandas as pd


MODEL_PATH = "ml/models/fever_model.pkl"


# ============================================
# LOAD MODEL
# ============================================

package = joblib.load(MODEL_PATH)

model = package["model"]
label_encoder = package["label_encoder"]


# ============================================
# HEADER
# ============================================

print("\n================================")
print("       AI HEALTHGUARD")
print("       FEVER ANALYSIS")
print("================================\n")


# ============================================
# PATIENT INPUT
# ============================================

temperature = float(input("Temperature (°C): "))
age = int(input("Age: "))
bmi = float(input("BMI: "))

gender = input("Gender (Male/Female): ")
headache = input("Headache (Yes/No): ")
body_ache = input("Body Ache (Yes/No): ")
fatigue = input("Fatigue (Yes/No): ")

chronic = input("Chronic Conditions (Yes/No): ")
allergies = input("Allergies (Yes/No): ")
smoking = input("Smoking History (Yes/No): ")
alcohol = input("Alcohol Consumption (Yes/No): ")

humidity = float(input("Humidity: "))
aqi = int(input("AQI: "))

activity = input(
    "Physical Activity (Active/Moderate/Sedentary): "
)

diet = input(
    "Diet Type (Vegan/Vegetarian/Non-Vegetarian): "
)

heart_rate = int(input("Heart Rate: "))

blood_pressure = input(
    "Blood Pressure (Normal/High/Low): "
)


# ============================================
# CREATE PATIENT DATAFRAME
# ============================================

patient = pd.DataFrame([{

    "Temperature": temperature,
    "Age": age,
    "BMI": bmi,

    "Gender": gender,
    "Headache": headache,
    "Body_Ache": body_ache,
    "Fatigue": fatigue,

    "Chronic_Conditions": chronic,
    "Allergies": allergies,
    "Smoking_History": smoking,
    "Alcohol_Consumption": alcohol,

    "Humidity": humidity,
    "AQI": aqi,

    "Physical_Activity": activity,
    "Diet_Type": diet,

    "Heart_Rate": heart_rate,
    "Blood_Pressure": blood_pressure
}])


# ============================================
# MODEL PREDICTION
# ============================================

prediction = model.predict(patient)[0]

probabilities = model.predict_proba(patient)[0]

severity = label_encoder.inverse_transform(
    [prediction]
)[0]


confidence = probabilities[prediction] * 100


# ============================================
# RISK LEVEL
# ============================================

if severity == "High Fever":

    risk_level = "HIGH"

elif severity == "Mild Fever":

    risk_level = "MODERATE"

else:

    risk_level = "LOW"


# ============================================
# RESULT
# ============================================

print("\n================================")
print("          RESULT")
print("================================")

print(
    f"Fever Severity : {severity}"
)

print(
    f"Confidence     : {confidence:.2f}%"
)

print(
    f"Risk Level     : {risk_level}"
)


# ============================================
# PROBABILITIES
# ============================================

print("\n--------------------------------")
print("Class Probabilities")
print("--------------------------------")

for i, probability in enumerate(probabilities):

    class_name = label_encoder.inverse_transform(
        [i]
    )[0]

    print(
        f"{class_name:<15}: {probability * 100:6.2f}%"
    )


# ============================================
# RECOMMENDATION
# ============================================

print("\n--------------------------------")
print("Recommendation")
print("--------------------------------")

if severity == "High Fever":

    print(
        "High fever risk detected."
    )

    print(
        "Please consider professional medical evaluation."
    )

elif severity == "Mild Fever":

    print(
        "Mild fever pattern detected."
    )

    print(
        "Monitor symptoms and temperature."
    )

else:

    print(
        "No fever pattern detected by the model."
    )

    print(
        "Continue monitoring if symptoms develop."
    )


print("\n================================")
print(
    "Note: This is an ML screening result,"
)
print(
    "not a medical diagnosis."
)
print("================================\n")