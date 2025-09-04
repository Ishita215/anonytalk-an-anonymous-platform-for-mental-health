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
        const colors = ['rgba(233, 69, 96, 0.3)', 'rgba(255, 107, 107, 0.3)', 'rgba(255, 158, 109, 0.3)', 'rgba(255, 255, 255, 0.1)'];
        
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

        // Scroll-based color change
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Calculate new background colors based on scroll position
            const r = Math.floor(26 + scrollPosition * 50);
            const g = Math.floor(33 + scrollPosition * 20);
            const b = Math.floor(72 + scrollPosition * 30);
            
            // Apply new background
            document.body.style.background = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), var(--primary-2))`;
            
            // Adjust header transparency
            const header = document.querySelector('.stories-header');
            if (window.scrollY > 50) {
                header.style.background = "rgba(26, 26, 46, 0.95)";
            } else {
                header.style.background = "rgba(26, 26, 46, 0.8)";
            }
        });

        // Cube Navigation
        const cube = document.getElementById('storyCube');
        let cubeRotationX = -20;
        let cubeRotationY = -20;
        
        // Set initial active state
        document.querySelector('.cube-face').classList.add('active');
        
        // Cube face click event
        document.querySelectorAll('.cube-face').forEach(face => {
            face.addEventListener('click', function() {
                // Remove active class from all faces
                document.querySelectorAll('.cube-face').forEach(f => {
                    f.classList.remove('active');
                });
                
                // Add active class to clicked face
                this.classList.add('active');
                
                // Scroll to target section
                const targetId = this.dataset.target;
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
        
        // Cube rotation controls
        document.querySelectorAll('.cube-btn').forEach(button => {
            button.addEventListener('click', function() {
                const direction = this.dataset.rotate;
                
                switch(direction) {
                    case 'left':
                        cubeRotationY -= 30;
                        break;
                    case 'right':
                        cubeRotationY += 30;
                        break;
                    case 'up':
                        cubeRotationX -= 30;
                        break;
                    case 'down':
                        cubeRotationX += 30;
                        break;
                }
                
                cube.style.transform = `rotateX(${cubeRotationX}deg) rotateY(${cubeRotationY}deg)`;
            });
        });
        
        // Animate story cards when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.story-card').forEach(card => {
            observer.observe(card);
        });
 