
// Tab Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`.tab[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Mood Tracker
let moodLog = JSON.parse(localStorage.getItem('moodLog')) || {};

function logMood(emoji) {
    const today = new Date().toISOString().split('T')[0];
    moodLog[today] = emoji;
    localStorage.setItem('moodLog', JSON.stringify(moodLog));
    updateMoodCalendar();
}

function updateMoodCalendar() {
    const calendar = document.getElementById('moodCalendar');
    calendar.innerHTML = '';
    
    for (let i = -6; i <= 0; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        
        const day = document.createElement('div');
        day.className = 'mood-day';
        day.textContent = moodLog[dateString] || '○';
        calendar.appendChild(day);
    }
}
updateMoodCalendar();

// Challenges
function toggleChallenge(btn) {
    const challenge = btn.parentElement;
    challenge.classList.toggle('completed');
    btn.textContent = challenge.classList.contains('completed') ? 'Undo' : 'Mark Complete';
}

// Quotes Generator
const quotes = [
    {text: "Healing is not linear, but every step forward counts", author: "Anonymous"},
    {text: "Your illness does not define you. Your strength and courage does", author: "Unknown"},
    {text: "The strongest people are those who win battles we know nothing about", author: "Jonathan Harnisch"},
    {text: "Mental health is not a destination, but a process", author: "Noam Shpancer"},
    {text: "You are allowed to be both a masterpiece and a work in progress", author: "Sophia Bush"}
];

let currentQuote = 0;

function generateNewQuote() {
    currentQuote = (currentQuote + 1) % quotes.length;
    document.getElementById('currentQuote').innerHTML = 
        `"${quotes[currentQuote].text}"<br><em>- ${quotes[currentQuote].author}</em>`;
    document.getElementById('quoteProgress').style.width = 
        `${(currentQuote + 1) / quotes.length * 100}%`;
    document.querySelector('#quoteDisplay small').textContent = 
        `Quote ${currentQuote + 1}/${quotes.length}`;
}
generateNewQuote();

