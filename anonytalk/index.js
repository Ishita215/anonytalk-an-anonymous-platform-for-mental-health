  
  
 
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Create floating particles
    const particleContainer = document.querySelector('.floating-particles');
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      
      // Random animation
      const duration = Math.random() * 10 + 10;
      particle.style.animation = `float ${duration}s infinite linear`;
      
      // Create animation
      const keyframes = `
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
        }
      `;
      
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      particleContainer.appendChild(particle);
    }

    // Mood Test Functionality
    const moodQuestions = [
      {
        question: "How are you feeling right now?",
        options: ["😊 Happy", "😢 Sad", "😠 Angry", "😨 Anxious", "😌 Peaceful", "😴 Tired"]
      },
      {
        question: "How was your day?",
        options: ["🌟 Great", "👍 Good", "😐 Okay", "👎 Tough", "💀 Terrible"]
      },
      {
        question: "What do you need most right now?",
        options: ["💬 Someone to talk to", "🤗 Comfort", "🎯 Motivation", "😴 Rest", "🎉 Fun"]
      }
    ];

    let currentMoodQuestion = 0;
    let moodAnswers = [];
    const moodQuestionEl = document.getElementById('moodQuestion');
    const moodOptionsEl = document.getElementById('moodOptions');
    const moodResultEl = document.getElementById('moodResult');
    const moodResultTextEl = document.getElementById('moodResultText');
    const moodEmojiEl = document.getElementById('moodEmoji');

    function showMoodQuestion() {
      if (currentMoodQuestion >= moodQuestions.length) {
        showMoodResult();
        return;
      }
      
      moodQuestionEl.textContent = moodQuestions[currentMoodQuestion].question;
      moodOptionsEl.innerHTML = '';
      
      moodQuestions[currentMoodQuestion].options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'mood-option';
        button.textContent = option;
        button.onclick = () => selectMoodAnswer(option);
        moodOptionsEl.appendChild(button);
      });
    }

    function selectMoodAnswer(answer) {
      moodAnswers.push(answer);
      currentMoodQuestion++;
      showMoodQuestion();
    }

    function showMoodResult() {
      document.getElementById('moodQuestionContainer').style.display = 'none';
      moodResultEl.style.display = 'block';
      
      // Determine result based on answers
      const firstAnswer = moodAnswers[0];
      let result = "";
      let emoji = "💭";
      
      if (firstAnswer.includes("Happy") || firstAnswer.includes("Great") || firstAnswer.includes("Peaceful")) {
        result = "It's wonderful that you're feeling positive! Remember to spread that joy to others who might need it.";
        emoji = "😊";
      } else if (firstAnswer.includes("Sad") || firstAnswer.includes("Tough") || firstAnswer.includes("Tired")) {
        result = "It's okay to feel this way. You're not alone, and your feelings are valid. Consider reaching out to someone you trust.";
        emoji = "🤗";
      } else if (firstAnswer.includes("Angry") || firstAnswer.includes("Terrible")) {
        result = "Anger is a natural emotion. Try to find healthy ways to express it, like journaling or physical activity.";
        emoji = "🧘";
      } else if (firstAnswer.includes("Anxious") || firstAnswer.includes("Rest")) {
        result = "Anxiety can be challenging. Remember to breathe deeply and focus on the present moment. You've gotten through tough times before.";
        emoji = "🌬️";
      } else {
        result = "Your emotions are complex and valid. Remember that it's okay to feel whatever you're feeling right now.";
        emoji = "💖";
      }
      
      moodEmojiEl.textContent = emoji;
      moodResultTextEl.textContent = result;
    }

    function resetMoodTest() {
      currentMoodQuestion = 0;
      moodAnswers = [];
      document.getElementById('moodQuestionContainer').style.display = 'block';
      moodResultEl.style.display = 'none';
      showMoodQuestion();
    }

    // Daily Affirmation
    const affirmations = [
      "You are enough just as you are.",
      "Your feelings are valid and important.",
      "It's okay to not be okay sometimes.",
      "You have survived 100% of your bad days so far.",
      "Progress, not perfection, is what matters.",
      "You are stronger than you think.",
      "Your voice matters and deserves to be heard.",
      "Self-care is not selfish—it's essential.",
      "You are worthy of love and belonging.",
      "This feeling is temporary. Brighter days are ahead."
    ];

    function newAffirmation() {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      document.getElementById('affirmationText').textContent = `"${affirmations[randomIndex]}"`;
      
      // Add animation
      gsap.from("#affirmationText", {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: "power2.out"
      });
    }

    // Animate stats on scroll
    gsap.utils.toArray(".stat-number").forEach(stat => {
      gsap.from(stat, {
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out"
      });
    });

    // Initialize mood test
    showMoodQuestion();

    // 3D Avatar Setup (same as intro.js)
    const canvas = document.getElementById("avatarCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 1, 100);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Create multiple floating avatars
    const avatars = [];
    const avatarCount = 15;

    const createAvatar = () => {
      const group = new THREE.Group();
      
      // Create abstract avatar
      const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4a86e8,
        shininess: 100,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.2,
        wireframe: true
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      group.add(head);
      
      // Body
      const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3a75d1,
        shininess: 80,
        emissive: 0x00a0ff,
        emissiveIntensity: 0.1,
        wireframe: true
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = -0.9;
      group.add(body);
      
      // Particles around avatar
      const particleCount = 50;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 1.5 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.cos(phi);
        positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        
        // Random color with blue/pink bias
        colors[i3] = Math.random() * 0.5 + 0.5; // R: 0.5-1.0
        colors[i3 + 1] = Math.random() * 0.3;   // G: 0-0.3
        colors[i3 + 2] = Math.random() * 0.5 + 0.5; // B: 0.5-1.0
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      group.add(particles);
      
      return { group, particles };
    };

    // Create multiple avatars at random positions
    for (let i = 0; i < avatarCount; i++) {
      const avatar = createAvatar();
      
      // Random position
      avatar.group.position.x = (Math.random() - 0.5) * 20;
      avatar.group.position.y = (Math.random() - 0.5) * 10;
      avatar.group.position.z = (Math.random() - 0.5) * 20;
      
      // Random scale
      const scale = Math.random() * 0.5 + 0.3;
      avatar.group.scale.set(scale, scale, scale);
      
      // Random rotation speed
      avatar.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };
      
      // Random movement speed
      avatar.movementSpeed = {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      };
      
      scene.add(avatar.group);
      avatars.push(avatar);
    }

    camera.position.z = 15;

    // Mouse movement variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    // Handle mouse movement
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.5;
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Smoothly interpolate rotation towards target
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      // Rotate entire scene based on mouse position
      scene.rotation.x = currentRotationX;
      scene.rotation.y = currentRotationY;
      
      // Update each avatar
      avatars.forEach(avatar => {
        // Rotate avatar
        avatar.group.rotation.x += avatar.rotationSpeed.x;
        avatar.group.rotation.y += avatar.rotationSpeed.y;
        avatar.group.rotation.z += avatar.rotationSpeed.z;
        
        // Move avatar
        avatar.group.position.x += avatar.movementSpeed.x;
        avatar.group.position.y += avatar.movementSpeed.y;
        avatar.group.position.z += avatar.movementSpeed.z;
        
        // Boundary check - if avatar moves too far, reverse direction
        if (Math.abs(avatar.group.position.x) > 12) {
          avatar.movementSpeed.x *= -1;
        }
        if (Math.abs(avatar.group.position.y) > 8) {
          avatar.movementSpeed.y *= -1;
        }
        if (Math.abs(avatar.group.position.z) > 12) {
          avatar.movementSpeed.z *= -1;
        }
        
        // Move particles
        const positions = avatar.particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += (Math.random() - 0.5) * 0.02;
          positions[i + 1] += (Math.random() - 0.5) * 0.02;
          positions[i + 2] += (Math.random() - 0.5) * 0.02;
          
          const distance = Math.sqrt(
            positions[i] * positions[i] + 
            positions[i + 1] * positions[i + 1] + 
            positions[i + 2] * positions[i + 2]
          );
          
          if (distance > 2.2) {
            const scale = 2.0 / distance;
            positions[i] *= scale;
            positions[i + 1] *= scale;
            positions[i + 2] *= scale;
          }
        }
        avatar.particles.geometry.attributes.position.needsUpdate = true;
      });
      
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animate sections on scroll
    gsap.utils.toArray("section").forEach(section => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });
    });
  