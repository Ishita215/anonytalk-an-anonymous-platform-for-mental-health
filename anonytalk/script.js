// Background Animations
function createParticles() {
    const container = document.body;
    for(let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);
    }
}

function animateCircuit() {
    const path = document.querySelector('.digital-circuit path');
    const length = path.getTotalLength();
    
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    path.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
    ], {
        duration: 15000,
        iterations: Infinity
    });
}

// Mood Test Functionality
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    animateCircuit();

    const questions = [
        { question: "How do you feel right now?", options: ["Happy", "Sad", "Angry", "Anxious"] },
        { question: "How was your day?", options: ["Great", "Okay", "Not good", "Terrible"] },
        { question: "Are you feeling stressed?", options: ["Not at all", "A little", "Quite a bit", "Very much"] },
        { question: "Do you feel socially connected?", options: ["Yes", "Somewhat", "Not really", "No"] }
    ];

    let currentQuestion = 0;
    let answers = [];
    const questionContainer = document.getElementById("questionContainer");
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");

    const showQuestion = () => {
        if (currentQuestion >= questions.length) {
            calculateMood();
            return;
        }
        
        questionText.textContent = questions[currentQuestion].question;
        optionsContainer.innerHTML = "";
        questions[currentQuestion].options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.className = "px-6 py-2 rounded-full bg-cyber-teal text-deep-space font-semibold hover:bg-white transition-all duration-300 m-2";
            button.onclick = () => selectAnswer(option);
            optionsContainer.appendChild(button);
        });
    };

    const selectAnswer = (answer) => {
        answers.push(answer);
        currentQuestion++;
        showQuestion();
    };

    const calculateMood = () => {
        questionContainer.style.display = "none";
        resultContainer.style.display = "block";
        
        const moodScores = {
            Happy: 2, Sad: -2, Angry: -3, Anxious: -2,
            Great: 2, Okay: 1, "Not good": -1, Terrible: -3,
            "Not at all": 2, "A little": 1, "Quite a bit": -1, "Very much": -2,
            Yes: 2, Somewhat: 1, "Not really": -1, No: -2
        };
        
        let totalScore = answers.reduce((acc, ans) => acc + (moodScores[ans] || 0), 0);
        let mood = "Neutral";
        if (totalScore > 3) mood = "Happy";
        else if (totalScore >= 0) mood = "Calm";
        else if (totalScore >= -3) mood = "Stressed";
        else mood = "Upset";
        
        resultText.textContent = `Your current mood is: ${mood}`;
    };

    showQuestion();
});