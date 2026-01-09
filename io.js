const hamburgerMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');
const navbar = document.querySelector('.navbar');

// Toggle the mobile menu
hamburgerMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Hide the navbar when clicking anywhere outside the navbar
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navbar.style.opacity = '0';
    navbar.style.pointerEvents = 'none';
  }
});

// Show the navbar when scrolling
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY < lastScrollY) {
    navbar.style.opacity = '1';
    navbar.style.pointerEvents = 'auto';
  } else {
    navbar.style.opacity = '0';
    navbar.style.pointerEvents = 'none';
  }
  lastScrollY = window.scrollY;
});

// Banner Slider Controls & Touch Interactions
const bannerSlider = document.querySelector('.banner .slider');
const pauseBtn = document.querySelector('.banner .pause-btn');

if (bannerSlider) {
  let rotation = 0;
  let isPausedByButton = false;
  let isDragging = false;
  let startX = 0;
  let startRotation = 0;
  const autoRotateSpeed = 0.2; // Speed of auto-rotation

  // Animation Loop
  function animate() {
    if (!isPausedByButton && !isDragging) {
      rotation += autoRotateSpeed;
    }
    // Apply rotation
    bannerSlider.style.transform = `perspective(1000px) rotateX(-16deg) rotateY(${rotation}deg)`;
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);

  // Touch Events
  bannerSlider.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startRotation = rotation;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    // Adjust sensitivity (factor 0.5 seems natural)
    rotation = startRotation + (deltaX * 0.5);
  }, { passive: false });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Mouse Driver (for Desktop drag)
  bannerSlider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startRotation = rotation;
    bannerSlider.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.clientX;
    const deltaX = currentX - startX;
    rotation = startRotation + (deltaX * 0.5);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    bannerSlider.style.cursor = 'grab';
  });

  // Pause Button Handler
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPausedByButton = !isPausedByButton;
      const icon = pauseBtn.querySelector('i');

      if (isPausedByButton) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      }
    });
  }
}
