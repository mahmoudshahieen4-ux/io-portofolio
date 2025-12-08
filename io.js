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

// Banner Slider Controls - Pause button only
const bannerSlider = document.querySelector('.banner .slider');
const pauseBtn = document.querySelector('.banner .pause-btn');

if (bannerSlider) {
  let isPausedByButton = false;

  // Function to pause animation at current position
  function pauseAnimation() {
    bannerSlider.style.animationPlayState = 'paused';
  }

  // Function to resume animation from current position
  function resumeAnimation() {
    bannerSlider.style.animationPlayState = 'running';
  }

  // Pause button handler
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPausedByButton = !isPausedByButton;

      const icon = pauseBtn.querySelector('i');

      if (isPausedByButton) {
        // Pause
        pauseAnimation();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      } else {
        // Resume
        resumeAnimation();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      }
    });
  }
}
