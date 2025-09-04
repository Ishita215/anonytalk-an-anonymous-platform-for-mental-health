
// Animated Background Particles
const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.reset();
        this.velocity = Math.random() * 0.5 + 0.5;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y += this.velocity;
        if(this.y > canvas.height) this.reset();
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = Array.from({ length: 100 }, () => new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Habit Tracker System
let habitState = JSON.parse(localStorage.getItem('habitState')) || {};
let breathingActive = false;
const breathCircle = document.querySelector('.breath-circle');

function toggleHabit(button) {
    const habitItem = button.closest('li');
    const habitId = habitItem.dataset.habit;
    
    const isCompleted = !habitState[habitId]?.completed;
    habitState[habitId] = {
        completed: isCompleted,
        date: new Date().toISOString()
    };
    
    habitItem.classList.toggle('completed', isCompleted);
    button.textContent = isCompleted ? 'Completed ✓' : 'Start';
    localStorage.setItem('habitState', JSON.stringify(habitState));
    updateProgress();
}

// Breathing Exercise
function toggleBreathing() {
    breathingActive = !breathingActive;
    if(breathingActive) {
        breathCircle.style.animation = 'breathe 4s infinite';
        document.querySelector('#mindfulness button').textContent = 'Stop Exercise';
    } else {
        breathCircle.style.animation = '';
        document.querySelector('#mindfulness button').textContent = 'Start Breathing Exercise';
    }
}

// Progress Tracking
function updateProgress() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    const today = new Date();
    for(let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const hasHabit = Object.values(habitState).some(habit => 
            habit.date.startsWith(dateStr)
        );
        
        const day = document.createElement('div');
        day.className = `calendar-day ${hasHabit ? 'completed' : ''}`;
        day.innerHTML = hasHabit ? '✓' : '';
        calendar.appendChild(day);
    }

    const completedCount = Object.values(habitState).filter(h => h.completed).length;
    document.getElementById('totalCompleted').textContent = `${completedCount} Habits`;
    
    let streak = 0;
    let currentDate = new Date();
    while(true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if(Object.values(habitState).some(h => h.date.startsWith(dateStr))) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    document.getElementById('streak').textContent = `${streak} Days`;
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateParticles();
    
    document.querySelectorAll('.habit-item').forEach(item => {
        const habitId = item.dataset.habit;
        if(habitState[habitId]?.completed) {
            item.classList.add('completed');
            item.querySelector('button').textContent = 'Completed ✓';
        }
    });
    
    updateProgress();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

