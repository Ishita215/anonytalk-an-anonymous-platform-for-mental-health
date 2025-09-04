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

// 3D Avatar Setup
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

// Scroll-linked avatar interaction
gsap.to(camera.position, {
  scrollTrigger: {
    trigger: "#vision",
    start: "top bottom",
    end: "bottom center",
    scrub: true
  },
  z: 12
});

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: "#safety",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
  z: 8
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

// Add parallax effect to background on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  scene.rotation.y = scrollY * 0.0005;
  scene.rotation.x = scrollY * 0.0002;
});