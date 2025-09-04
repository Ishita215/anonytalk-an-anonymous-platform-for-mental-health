// Tab Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const tabs = document.querySelectorAll('.tab');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    tabs.forEach(tab => {
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
    {text: "Your thoughts do not define you. You are more than your mind.", author: "Anonymous"},
    {text: "In the midst of chaos, there is always a calm center.", author: "Unknown"},
    {text: "Thoughts are just visitors; let them come and go.", author: "Unknown"},
    {text: "You are not your thoughts; you are the observer of your thoughts.", author: "Unknown"},
    {text: "Breathe in peace, breathe out chaos.", author: "Unknown"}
];

let currentQuoteIndex = 0;

function generateNewQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const currentQuote = quotes[currentQuoteIndex];
    
    document.getElementById('currentQuote').innerHTML = 
        `"${currentQuote.text}"<br><em>- ${currentQuote.author}</em>`;
    document.getElementById('quoteProgress').style.width = 
        `${(currentQuoteIndex + 1) / quotes.length * 100}%`;
    document.querySelector('#quoteDisplay small').textContent = 
        `Quote ${currentQuoteIndex + 1}/${quotes.length}`;
}
generateNewQuote();