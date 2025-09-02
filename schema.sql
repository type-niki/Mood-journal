CREATE DATABASE Mood_journal;
USE Mood_journal;

CREATE TABLE entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entry_text TEXT NOT NULL,
    mood VARCHAR(50),
    tag VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);