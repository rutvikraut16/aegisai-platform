from transformers import pipeline


severity_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)


def predict_severity(text: str):

    severity_labels = [
        "Low",
        "Medium",
        "High",
        "Critical"
    ]

    result = severity_classifier(
        text,
        candidate_labels=severity_labels
    )

    return {
        "incident": text,
        "predicted_severity": result["labels"][0],
        "confidence": round(
            result["scores"][0],
            4
        )
    }