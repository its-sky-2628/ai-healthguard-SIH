import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# --------------------------------------------------
# 1. LOAD DATASET
# --------------------------------------------------

DATA_PATH = "ml/data/fever_dataset.csv"

df = pd.read_csv(DATA_PATH)

print("\nDataset loaded successfully!")
print("Shape:", df.shape)


# --------------------------------------------------
# 2. REMOVE COLUMNS WE DON'T NEED
# --------------------------------------------------

# Medication should NOT be used to predict fever severity.
# Previous_Medication also contains missing values and is
# not necessary for our first model.

drop_columns = [
    "Recommended_Medication",
    "Previous_Medication"
]

df = df.drop(columns=drop_columns)


# --------------------------------------------------
# 3. TARGET
# --------------------------------------------------

TARGET = "Fever_Severity"

X = df.drop(columns=[TARGET])
y = df[TARGET]


print("\nTarget distribution:")
print(y.value_counts())


# --------------------------------------------------
# 4. ENCODE TARGET
# --------------------------------------------------

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

print("\nTarget classes:")
for i, label in enumerate(label_encoder.classes_):
    print(i, "=", label)


# --------------------------------------------------
# 5. IDENTIFY FEATURES
# --------------------------------------------------

numeric_features = [
    "Temperature",
    "Age",
    "BMI",
    "Humidity",
    "AQI",
    "Heart_Rate"
]

categorical_features = [
    "Gender",
    "Headache",
    "Body_Ache",
    "Fatigue",
    "Chronic_Conditions",
    "Allergies",
    "Smoking_History",
    "Alcohol_Consumption",
    "Physical_Activity",
    "Diet_Type",
    "Blood_Pressure"
]


# --------------------------------------------------
# 6. PREPROCESSING
# --------------------------------------------------

numeric_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ]
)

categorical_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        (
            "onehot",
            OneHotEncoder(
                handle_unknown="ignore"
            )
        )
    ]
)


preprocessor = ColumnTransformer(
    transformers=[
        (
            "num",
            numeric_transformer,
            numeric_features
        ),
        (
            "cat",
            categorical_transformer,
            categorical_features
        )
    ]
)


# --------------------------------------------------
# 7. MODEL
# --------------------------------------------------

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    class_weight="balanced"
)


pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)


# --------------------------------------------------
# 8. TRAIN / TEST SPLIT
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.20,
    random_state=42,
    stratify=y_encoded
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# --------------------------------------------------
# 9. TRAIN
# --------------------------------------------------

print("\nTraining model...")

pipeline.fit(
    X_train,
    y_train
)

print("Training completed!")


# --------------------------------------------------
# 10. PREDICTION
# --------------------------------------------------

y_pred = pipeline.predict(X_test)


# --------------------------------------------------
# 11. EVALUATION
# --------------------------------------------------

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print("Accuracy:", round(accuracy * 100, 2), "%")


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,
        target_names=label_encoder.classes_
    )
)


print("\nConfusion Matrix:")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# --------------------------------------------------
# 12. SAVE MODEL
# --------------------------------------------------

model_package = {
    "model": pipeline,
    "label_encoder": label_encoder,
    "features": numeric_features + categorical_features
}

MODEL_PATH = "ml/models/fever_model.pkl"

joblib.dump(
    model_package,
    MODEL_PATH
)

print("\nModel saved successfully!")
print("Location:", MODEL_PATH)