from flask import Flask, redirect, render_template, request, jsonify
import requests
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# --- Database connection ---
db = mysql.connector.connect(
    host="localhost",
    user="Renne",      
    password="pass",    
    database="Mood_journal"
)
cursor = db.cursor()

# --- Home page ---
@app.route("/")
def home():
    cursor.execute("SELECT entry_text, mood FROM entries ORDER BY id DESC")
    entries = cursor.fetchall()
    return render_template("index.html", entries=entries)
    
# --- Add entry route ---
@app.route("/add", methods=["POST"])
def add_entry():
    data = request.form
    text = data.get("entry_text")
    created_at = datetime.now()

    # --- Call Hugging Face API for sentiment ---
    API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment"
    headers = {"Authorization": "Bearer MoodJournalApp"}  # Replace with real key

    response = requests.post(API_URL, headers=headers, json={"inputs": text})
    result = response.json()

    # Extract sentiment safely
    if isinstance(result, list) and len(result) > 0:
        predictions = result[0]
        best = max(predictions, key=lambda x: x["score"])
        mood = best["label"]   # e.g., "positive", "negative", "neutral"
    else:
        mood = "neutral"  # fallback

    # Save into database
    entry_text = text;
    cursor.execute(
        "INSERT INTO entries (entry_text, mood, created_at) VALUES (%s, %s, %s)",
        (entry_text, mood, created_at)
    )
    db.commit()

    return redirect("/")


# --- Get all entries ---
@app.route("/get_entries", methods=["GET"])
def get_entries():
    cursor.execute("SELECT * FROM entries ORDER BY created_at DESC")
    rows = cursor.fetchall()
    return jsonify(rows)
    

if __name__ == "__main__":
 app.run(debug=True)
