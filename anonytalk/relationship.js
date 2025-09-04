
        // Particle Background
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

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        // Tracker System
        let moodLog = JSON.parse(localStorage.getItem('moodLog')) || {};

        function generateCalendar() {
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';
            
            const today = new Date();
            for(let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                
                const day = document.createElement('div');
                day.className = `day ${moodLog[dateStr] ? 'filled' : ''}`;
                day.innerHTML = `
                    ${moodLog[dateStr] || ''}
                    <small>${date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</small>
                `;
                calendar.appendChild(day);
            }
        }

        function logMood(emoji) {
            const today = new Date().toISOString().split('T')[0];
            moodLog[today] = emoji;
            localStorage.setItem('moodLog', JSON.stringify(moodLog));
            generateCalendar();
        }

        // Challenges System
        let challengesState = JSON.parse(localStorage.getItem('challengesState')) || {};

        function toggleChallenge(btn) {
            const challengeItem = btn.closest('li');
            const challengeId = challengeItem.getAttribute('data-challenge');
            
            const isCompleted = !challengesState[challengeId];
            challengesState[challengeId] = isCompleted;
            
            challengeItem.classList.toggle('completed', isCompleted);
            btn.textContent = isCompleted ? 'Completed ✓' : 'Start';
            btn.style.backgroundColor = isCompleted ? '#4CAF50' : 'var(--primary)';
            
            localStorage.setItem('challengesState', JSON.stringify(challengesState));
        }

        // Initialize challenges
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.challenges li').forEach(item => {
                const challengeId = item.getAttribute('data-challenge');
                if(challengesState[challengeId]) {
                    item.classList.add('completed');
                    const btn = item.querySelector('button');
                    btn.textContent = 'Completed ✓';
                    btn.style.backgroundColor = '#4CAF50';
                }
            });
        });

        // Quotes System
        const quotes = [
            {text: "Love is not about possession. Love is about appreciation", author: "Osho", source: "The Book of Understanding"},
            {text: "The quality of your relationships determines the quality of your life", author: "Esther Perel", source: "Mating in Captivity"},
            {text: "Vulnerability is the birthplace of connection", author: "Brené Brown", source: "Daring Greatly"},
            {text: "A successful relationship requires falling in love multiple times with the same person", author: "Mignon McLaughlin", source: "The Neurotic's Notebook"},
            {text: "Love is an act of endless forgiveness", author: "Peter Ustinov", source: "Dear Me"},
            {text: "The meeting of two personalities is like chemical substances: if there's reaction, both transform", author: "Carl Jung", source: "Modern Man in Search of a Soul"},
            {text: "Love is that condition where another's happiness is essential to yours", author: "Robert A. Heinlein", source: "Stranger in a Strange Land"},
            {text: "Great relationships appreciate similarities and respect differences", author: "Unknown", source: "Relationship Wisdom"},
            {text: "The best love awakens the soul and brings peace to the mind", author: "Nicholas Sparks", source: "The Notebook"},
            {text: "Love is not something you feel. It's something you do", author: "David Wilkerson", source: "The Cross and the Switchblade"}
        ];

        let currentQuoteIndex = 0;

        function updateQuoteDisplay() {
            const quote = quotes[currentQuoteIndex];
            document.getElementById('currentQuote').innerHTML = `
                <h3>"${quote.text}"</h3>
                <p>— ${quote.author}</p>
                <small>${quote.source}</small>
            `;
            document.getElementById('quoteProgress').textContent = 
                `${currentQuoteIndex + 1}/${quotes.length}`;
        }

        function nextQuote() {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            updateQuoteDisplay();
        }

        function prevQuote() {
            currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
            updateQuoteDisplay();
        }

        // Navigation System
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            event.currentTarget.classList.add('active');
        }

        // Initial setup
        generateCalendar();
        updateQuoteDisplay();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
   
