from transformers import pipeline


classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)


def classify_incident(text: str):

    labels = [
        "Database",
        "Security",
        "Network",
        "Infrastructure",
        "Application",
        "Cloud",
        "Authentication"
    ]

    result = classifier(
        text,
        candidate_labels=labels
    )

    return {
        "text": text,
        "predicted_category": result["labels"][0],
        "confidence": round(result["scores"][0], 4)
    }