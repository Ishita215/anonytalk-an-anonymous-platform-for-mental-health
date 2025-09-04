 // Data Storage
 let userData = JSON.parse(localStorage.getItem('mindfulData')) || {
    moodLog: {},
    thoughts: [],
    challenges: {},
    quotesViewed: 0
};

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
function logMood(emoji) {
    const today = new Date().toISOString().split('T')[0];
    userData.moodLog[today] = emoji;
    saveData();
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
        day.textContent = userData.moodLog[dateString] || '○';
        calendar.appendChild(day);
    }
}

// Thought Journal
let currentTags = new Set();

function toggleTag(tag) {
    const tagElement = event.target;
    tagElement.classList.toggle('active');
    currentTags.has(tag) ? currentTags.delete(tag) : currentTags.add(tag);
}

function analyzeSentiment(text) {
    const positiveWords = ['happy', 'good', 'great', 'joy', 'love'];
    const negativeWords = ['sad', 'bad', 'angry', 'stress', 'hate'];
    
    const score = text.toLowerCase().split(' ').reduce((acc, word) => {
        if(positiveWords.includes(word)) acc += 1;
        if(negativeWords.includes(word)) acc -= 1;
        return acc;
    }, 0);

    return score > 0 ? '😊 Positive' : score < 0 ? '😞 Negative' : '😐 Neutral';
}

function saveThought() {
    const text = document.getElementById('thoughtInput').value.trim();
    if(text) {
        const entry = {
            text,
            date: new Date().toISOString(),
            tags: Array.from(currentTags),
            sentiment: analyzeSentiment(text)
        };
        
        userData.thoughts.push(entry);
        saveData();
        updateThoughtHistory();
        document.getElementById('thoughtInput').value = '';
        currentTags.clear();
        document.querySelectorAll('.thought-tag').forEach(t => t.classList.remove('active'));
        document.getElementById('sentimentResult').textContent = 
            `Detected Sentiment: ${entry.sentiment}`;
    }
}

function updateThoughtHistory() {
    const historyDiv = document.getElementById('thoughtHistory');
    historyDiv.innerHTML = userData.thoughts.map(thought => `
        <div class="card">
            <p>${thought.text}</p>
            <small>${new Date(thought.date).toLocaleDateString()} • 
            ${thought.tags.join(', ')} • ${thought.sentiment}</small>
        </div>
    `).reverse().join('');
}

// Challenges
function toggleChallenge(btn) {
    const challenge = btn.parentElement;
    challenge.classList.toggle('completed');
    const challengeText = challenge.querySelector('span').textContent;
    userData.challenges[challengeText] = !userData.challenges[challengeText];
    btn.textContent = userData.challenges[challengeText] ? 'Undo' : 'Complete';
    saveData();
}

// Professional Support Functions
function logMedication() {
    const lastLogged = localStorage.getItem('lastMedicationLog') || 'Never';
    if(confirm(`Last logged: ${lastLogged}\nUpdate medication status?`)) {
        localStorage.setItem('lastMedicationLog', new Date().toLocaleString());
    }
}

function therapyPrep() {
    const questions = [
        "What emotions have been dominant this week?",
        "What progress do I want to share?",
        "What challenges need addressing?"
    ];
    const journalEntry = questions.join('\n\n');
    document.getElementById('thoughtInput').value = journalEntry;
    showSection('thoughts');
}

// Quotes Generator
const quotes = [
    {text: "Healing is not linear, but every step forward counts", author: "Anonymous"},
    {text: "Your illness does not define you. Your strength and courage does", author: "Unknown"},
    {text: "The strongest people are those who win battles we know nothing about", author: "Jonathan Harnisch"},
    {text: "Mental health is not a destination, but a process", author: "Noam Shpancer"},
    {text: "You are allowed to be both a masterpiece and a work in progress", author: "Sophia Bush"}
];

function generateNewQuote() {
    userData.quotesViewed = (userData.quotesViewed + 1) % quotes.length;
    const quote = quotes[userData.quotesViewed];
    document.getElementById('currentQuote').innerHTML = 
        `"${quote.text}"<br><em>- ${quote.author}</em>`;
    document.getElementById('quoteProgress').style.width = 
        `${(userData.quotesViewed + 1) / quotes.length * 100}%`;
    document.querySelector('#quoteDisplay small').textContent = 
        `Quote ${userData.quotesViewed + 1}/${quotes.length}`;
    saveData();
}

// Helper Functions
function saveData() {
    localStorage.setItem('mindfulData', JSON.stringify(userData));
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    updateMoodCalendar();
    updateThoughtHistory();
    generateNewQuote();
    
    document.querySelectorAll('.challenge-item').forEach(item => {
        const challengeText = item.querySelector('span').textContent;
        if(userData.challenges[challengeText]) {
            item.classList.add('completed');
            item.querySelector('button').textContent = 'Undo';
        }
    });
});