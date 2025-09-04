
    // Cosmic Background with Three.js
    const cosmicBG = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('cosmicCanvas').appendChild(renderer.domElement);
      
      // Create stars
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8
      });
      
      const starsVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starsVertices.push(x, y, z);
      }
      
      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
      
      // Create nebula
      const nebulaGeometry = new THREE.SphereGeometry(120, 32, 32);
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0.05
      });
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
      scene.add(nebula);
      
      // Position camera
      camera.position.z = 500;
      
      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0002;
        nebula.rotation.x += 0.0003;
        nebula.rotation.y += 0.0001;
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    };
    
    // Initialize cosmic background
    cosmicBG();
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const gameCards = document.querySelectorAll('.game-card');
    const closeBtns = document.querySelectorAll('.close-btn');
    
    gameCards.forEach(card => {
      card.addEventListener('click', () => {
        const gameId = card.dataset.game;
        const modal = document.getElementById(gameId);
        modal.classList.add('active');
      });
    });
    
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modals.forEach(modal => {
          modal.classList.remove('active');
        });
      });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
    
    // Breathing Exercise
    const breathCircle = document.getElementById('breathCircle');
    const startBtn = document.getElementById('startBreathing');
    const pauseBtn = document.getElementById('pauseBreathing');
    const resetBtn = document.getElementById('resetBreathing');
    const speedSlider = document.getElementById('breathSpeed');
    const speedValue = document.getElementById('speedValue');
    
    let isBreathing = false;
    let breathInterval;
    let breathDuration = 4; // seconds
    
    const updateBreathAnimation = () => {
      breathCircle.style.animation = `breathe ${breathDuration * 2}s ease-in-out infinite`;
    };
    
    updateBreathAnimation();
    
    startBtn.addEventListener('click', () => {
      if (isBreathing) return;
      isBreathing = true;
      breathCircle.style.animationPlayState = 'running';
      startBtn.textContent = 'Breathing...';
      startBtn.classList.add('active');
    });
    
    pauseBtn.addEventListener('click', () => {
      isBreathing = false;
      breathCircle.style.animationPlayState = 'paused';
      startBtn.textContent = 'Start';
      startBtn.classList.remove('active');
    });
    
    resetBtn.addEventListener('click', () => {
      isBreathing = false;
      breathCircle.style.animation = 'none';
      setTimeout(() => {
        updateBreathAnimation();
        breathCircle.style.animationPlayState = 'paused';
      }, 10);
      startBtn.textContent = 'Start';
      startBtn.classList.remove('active');
    });
    
    speedSlider.addEventListener('input', () => {
      breathDuration = parseFloat(speedSlider.value);
      speedValue.textContent = `${breathDuration}s`;
      updateBreathAnimation();
      
      if (isBreathing) {
        breathCircle.style.animationPlayState = 'paused';
        setTimeout(() => {
          breathCircle.style.animationPlayState = 'running';
        }, 10);
      }
    });
    
    // Memory Game
    const memoryGrid = document.getElementById('memoryGrid');
    const matchCount = document.getElementById('matchCount');
    
    const symbols = ['🌑', '🌕', '🌓', '🌗', '⭐', '🌟', '💫', '☄️'];
    let cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedPairs = 0;
    
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    
    const initMemoryGame = () => {
      memoryGrid.innerHTML = '';
      cards = shuffle([...symbols, ...symbols]);
      flippedCards = [];
      matchedPairs = 0;
      matchCount.textContent = matchedPairs;
      
      cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = `<span>${symbol}</span>`;
        card.addEventListener('click', flipCard);
        memoryGrid.appendChild(card);
      });
    };
    
    const flipCard = (e) => {
      const card = e.currentTarget;
      
      // Don't allow flipping if already flipped or matched
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
      
      // Don't allow more than 2 cards flipped
      if (flippedCards.length >= 2) return;
      
      card.classList.add('flipped');
      flippedCards.push(card);
      
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
          // Match found
          setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;
            matchCount.textContent = matchedPairs;
            
            // Check if game is complete
            if (matchedPairs === symbols.length) {
              setTimeout(() => {
                alert('Cosmic Memory Mastered! Universe applauds your focus!');
                initMemoryGame();
              }, 500);
            }
          }, 500);
        } else {
          // No match
          setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
          }, 1000);
        }
      }
    };
    
    // Initialize memory game
    initMemoryGame();
    
    // Color Therapy
    const colorCanvas = document.getElementById('colorCanvas');
    const ctx = colorCanvas.getContext('2d');
    const clearBtn = document.getElementById('clearCanvas');
    
    // Set canvas background
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    
    colorCanvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    colorCanvas.addEventListener('mousemove', draw);
    colorCanvas.addEventListener('mouseup', () => isDrawing = false);
    colorCanvas.addEventListener('mouseout', () => isDrawing = false);
    
    clearBtn.addEventListener('click', () => {
      ctx.fillStyle = '#0a0e17';
      ctx.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
    });
    
    function draw(e) {
      if (!isDrawing) return;
      
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.lineWidth = 15;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      
      [lastX, lastY] = [e.offsetX, e.offsetY];
      
      hue = (hue + 1) % 360;
      
      // Add glowing effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
    }
    
    // Focus Timer
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerBtn = document.getElementById('startTimer');
    const pauseTimerBtn = document.getElementById('pauseTimer');
    const resetTimerBtn = document.getElementById('resetTimer');
    const modeBtns = document.querySelectorAll('.mode-btn');
    
    let timerInterval;
    let totalSeconds = 25 * 60;
    let remainingSeconds = totalSeconds;
    let isRunning = false;
    
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    };
    
    const updateTimerDisplay = () => {
      timerDisplay.textContent = formatTime(remainingSeconds);
      
      // Add pulsing effect when running
      if (isRunning) {
        timerDisplay.style.textShadow = '0 0 20px rgba(0, 229, 255, 0.8)';
        setTimeout(() => {
          timerDisplay.style.textShadow = '0 0 20px rgba(0, 229, 255, 0.5)';
        }, 500);
      }
    };
    
    updateTimerDisplay();
    
    const startTimer = () => {
      if (isRunning) return;
      isRunning = true;
      
      timerInterval = setInterval(() => {
        remainingSeconds--;
        updateTimerDisplay();
        
        if (remainingSeconds <= 0) {
          clearInterval(timerInterval);
          isRunning = false;
          timerDisplay.textContent = "00:00";
          
          // Play completion sound
          const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
          audio.play();
          
          setTimeout(() => {
            alert("Cosmic cycle complete! The universe commends your focus.");
            resetTimer();
          }, 500);
        }
      }, 1000);
    };
    
    const pauseTimer = () => {
      clearInterval(timerInterval);
      isRunning = false;
    };
    
    const resetTimer = () => {
      clearInterval(timerInterval);
      isRunning = false;
      remainingSeconds = totalSeconds;
      updateTimerDisplay();
    };
    
    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);
    
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const mode = btn.dataset.mode;
        switch (mode) {
          case 'work':
            totalSeconds = 25 * 60;
            break;
          case 'shortBreak':
            totalSeconds = 5 * 60;
            break;
          case 'longBreak':
            totalSeconds = 15 * 60;
            break;
        }
        
        resetTimer();
      });
    });
 