// script.js
// Preloader with progress simulation
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progress');
  
  // Simulate loading progress
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    } else {
      width += 2;
      progress.style.width = width + '%';
    }
  }, 40);
});

// Create floating particles
const particlesContainer = document.getElementById('particles');
const colors = ['rgba(255, 138, 0, 0.3)', 'rgba(229, 46, 113, 0.3)', 'rgba(120, 115, 245, 0.3)', 'rgba(255, 255, 255, 0.2)'];

for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random properties
  const size = Math.random() * 15 + 5;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const delay = Math.random() * 15;
  const duration = 15 + Math.random() * 20;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.background = color;
  particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
  
  particlesContainer.appendChild(particle);
}

// Card hover effect enhancement
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.zIndex = '10';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.zIndex = '2';
  });
});

// Scroll down functionality
const scrollDown = document.getElementById('scrollDown');
const exploreSection = document.getElementById('exploreSection');

scrollDown.addEventListener('click', () => {
  exploreSection.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
});