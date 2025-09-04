 
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

        // Motivational Quotes (40+)
        const quotes = [
            { text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.", author: "Steve Jobs" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
            { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
            { text: "The harder the struggle, the more glorious the triumph.", author: "Swami Vivekananda" },
            { text: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger" },
            { text: "The mind is everything. What you think you become.", author: "Buddha" },
            { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats" },
            { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
            { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
            { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
            { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
            { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
            { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
            { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
            { text: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", author: "Jordan Belfort" },
            { text: "The best revenge is massive success.", author: "Frank Sinatra" },
            { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
            { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
            { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
            { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
            { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
            { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { text: "Get busy living or get busy dying.", author: "Stephen King" },
            { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
            { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
            { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
            { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
            { text: "The mind is not a vessel to be filled but a fire to be kindled.", author: "Plutarch" },
            { text: "The only real failure in life is not to be true to the best one knows.", author: "Buddha" },
            { text: "The best preparation for tomorrow is doing your best today.", author: "H. Jackson Brown Jr." },
            { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
            { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
            { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
            { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
            { text: "The purpose of human life is to serve, and to show compassion and the will to help others.", author: "Albert Schweitzer" },
            { text: "Every strike brings me closer to the next home run.", author: "Babe Ruth" },
            { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
            { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
            { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
            { text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas A. Edison" }
        ];

        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const refreshQuote = document.getElementById('refreshQuote');

        function getRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }

        function displayRandomQuote() {
            const quote = getRandomQuote();
            quoteText.style.opacity = 0;
            quoteAuthor.style.opacity = 0;
            
            setTimeout(() => {
                quoteText.textContent = quote.text;
                quoteAuthor.textContent = quote.author;
                quoteText.style.opacity = 1;
                quoteAuthor.style.opacity = 1;
            }, 500);
        }

        refreshQuote.addEventListener('click', displayRandomQuote);
        
        // Display initial quote
        displayRandomQuote();

        // 3D Cube Controls
        const cube = document.getElementById('motivationCube');
        let rotateX = 0;
        let rotateY = 0;
        
        document.getElementById('cubeLeft').addEventListener('click', () => {
            rotateY -= 90;
            cube.style.transform = `translateZ(-150px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        document.getElementById('cubeRight').addEventListener('click', () => {
            rotateY += 90;
            cube.style.transform = `translateZ(-150px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        document.getElementById('cubeUp').addEventListener('click', () => {
            rotateX += 90;
            cube.style.transform = `translateZ(-150px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        document.getElementById('cubeDown').addEventListener('click', () => {
            rotateX -= 90;
            cube.style.transform = `translateZ(-150px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        // Auto rotate cube
        setInterval(() => {
            rotateY += 1;
            cube.style.transform = `translateZ(-150px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        }, 50);

        // Video Modal
        const videoCards = document.querySelectorAll('.video-card');
        const videoModal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        const closeModal = document.getElementById('closeModal');

        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSrc = card.getAttribute('data-video') + "?autoplay=1";
                modalVideo.src = videoSrc;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', () => {
            modalVideo.src = '';
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                modalVideo.src = '';
                videoModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
