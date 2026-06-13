from transformers import pipeline

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

def summarize_incident(text: str):

    result = summarizer(
        text,
        max_length=60,
        min_length=15,
        do_sample=False
    )

    return {
        "summary":
        result[0]["summary_text"]
    }