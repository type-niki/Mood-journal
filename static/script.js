// ===== Select Elements =====
const textarea = document.querySelector("textarea");
const form = document.querySelector("form");

// ===== Character Counter =====
const counter = document.createElement("p");
counter.style.fontSize = "0.9rem";
counter.style.color = "#6b21a8";
textarea.parentNode.insertBefore(counter, textarea.nextSibling);

textarea.addEventListener("input", () => {
    counter.textContent = `Characters: ${textarea.value.length}/250`;
});

// ===== Form Submission & Mood Alert =====
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop default submit

    const entryText = textarea.value.toLowerCase();

    if (entryText.includes("happy") || entryText.includes("great")) {
        alert("👩‍💻 Wow! AI thinks your mood is Positive!");
    } else if (entryText.includes("sad") || entryText.includes("tired")) {
        alert("👩‍💻 Tomorrow will be better, AI thinks your mood is Negative 🌹");
    } else {
        alert("👩‍💻 You've got this, just try to cheer up!");
    }

    form.submit(); // Submit after alert
});

// ===== Chart.js Visualization =====

// Get entries JSON from hidden element
const moodData = JSON.parse(document.getElementById('moodData').textContent);

// Count moods
const moodCounts = { positive: 0, neutral: 0, negative: 0 };
moodData.forEach(entry => {
    const mood = entry[1]; // entry[1] is the mood
    if (mood === "positive") moodCounts.positive++;
    else if (mood === "negative") moodCounts.negative++;
    else moodCounts.neutral++;
});

// Render Chart
const ctx = document.getElementById('moodChart').getContext('2d');
new Chart(ctx, {
    type: 'bar', // Can also be 'pie' or 'doughnut'
    data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
            label: 'Mood Counts',
            data: [moodCounts.positive, moodCounts.neutral, moodCounts.negative],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(201, 203, 207, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(201, 203, 207, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                precision: 0
            }
        }
    }
});
