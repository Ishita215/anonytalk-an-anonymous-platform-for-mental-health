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
        const colors = ['rgba(106, 224, 217, 0.3)', 'rgba(77, 160, 255, 0.3)', 'rgba(120, 115, 245, 0.3)', 'rgba(255, 255, 255, 0.1)'];
        
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

        // Background Music Control
        const musicToggle = document.getElementById('musicToggle');
        const backgroundMusic = document.getElementById('backgroundMusic');
        const musicStatus = document.querySelector('.music-status');
        let isPlaying = false;

        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                musicStatus.textContent = 'Music Off';
            } else {
                backgroundMusic.play();
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicStatus.textContent = 'Music On';
            }
            isPlaying = !isPlaying;
        });

        // Eye Exercise Functionality
        const eyeDot = document.getElementById('eyeDot');
        const startBtn = document.getElementById('startExercise');
        const stopBtn = document.getElementById('stopExercise');
        const resetBtn = document.getElementById('resetExercise');
        const timerElement = document.getElementById('exerciseTimer');
        
        let exerciseInterval;
        let exerciseActive = false;
        let seconds = 0;
        let pathIndex = 0;
        
        // Circular path for eye exercise
        const eyePath = [];
        const numPoints = 8;
        const radius = 30; // 30% of container
        
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            eyePath.push({ x, y });
        }
        
        function moveDot() {
            const container = eyeDot.parentElement;
            const point = eyePath[pathIndex];
            
            // Calculate position based on percentage
            const xPos = (point.x / 100) * container.offsetWidth;
            const yPos = (point.y / 100) * container.offsetHeight;
            
            // Move the dot with smooth transition
            eyeDot.style.transition = 'all 2s ease-in-out';
            eyeDot.style.left = `${xPos}px`;
            eyeDot.style.top = `${yPos}px`;
            
            // Move to next point in the path
            pathIndex = (pathIndex + 1) % eyePath.length;
        }
        
        function startExercise() {
            if (exerciseActive) return;
            
            exerciseActive = true;
            seconds = 0;
            pathIndex = 0;
            updateTimer();
            
            // Start moving the dot
            moveDot();
            exerciseInterval = setInterval(moveDot, 2000);
            
            // Start timer
            timerInterval = setInterval(() => {
                seconds++;
                updateTimer();
            }, 1000);
        }
        
        function stopExercise() {
            clearInterval(exerciseInterval);
            clearInterval(timerInterval);
            exerciseActive = false;
        }
        
        function resetExercise() {
            stopExercise();
            seconds = 0;
            updateTimer();
            
            // Reset dot position to center
            const container = eyeDot.parentElement;
            eyeDot.style.transition = 'all 1s ease-in-out';
            eyeDot.style.left = `${container.offsetWidth / 2}px`;
            eyeDot.style.top = `${container.offsetHeight / 2}px`;
        }
        
        function updateTimer() {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timerElement.textContent = `Duration: ${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        
        startBtn.addEventListener('click', startExercise);
        stopBtn.addEventListener('click', stopExercise);
        resetBtn.addEventListener('click', resetExercise);
        
        // Initialize dot position to center
        window.addEventListener('load', () => {
            const container = eyeDot.parentElement;
            eyeDot.style.left = `${container.offsetWidth / 2}px`;
            eyeDot.style.top = `${container.offsetHeight / 2}px`;
        });
 