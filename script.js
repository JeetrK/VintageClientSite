document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menuToggle');
  var sideNav = document.getElementById('sideNav');
  var closeNav = document.getElementById('closeNav');
  var navOverlay = document.getElementById('navOverlay');

  function openNav() {
    sideNav.classList.add('open');
    navOverlay.classList.add('open');
    sideNav.setAttribute('aria-hidden', 'false');
    navOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeNavPanel() {
    sideNav.classList.remove('open');
    navOverlay.classList.remove('open');
    sideNav.setAttribute('aria-hidden', 'true');
    navOverlay.setAttribute('aria-hidden', 'true');
  }

  menuToggle.addEventListener('click', openNav);
  closeNav.addEventListener('click', closeNavPanel);
  navOverlay.addEventListener('click', closeNavPanel);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && sideNav.classList.contains('open')) {
      closeNavPanel();
    }
  });

  // Carousel logic
  var track = document.querySelector('.carousel-track');
  var slides = document.querySelectorAll('.carousel-track .carousel-card');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var nextBtn = document.querySelector('.carousel-btn.next');
  var currentIndex = 0;

  function updateCarousel() {
    var slideWidth = slides[0]?.getBoundingClientRect().width || 0;
    var gap = 26;
    var containerWidth = document.querySelector('.carousel').getBoundingClientRect().width;
    var offset = (containerWidth - slideWidth) / 2 - currentIndex * (slideWidth + gap);
    track.style.transform = 'translateX(' + offset + 'px)';

    slides.forEach(function(slide, index) {
      slide.classList.remove('active', 'nearby');
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index === currentIndex - 1 || index === currentIndex + 1) {
        slide.classList.add('nearby');
      }
    });
  }

  function clampIndex() {
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > slides.length - 1) currentIndex = slides.length - 1;
  }

  prevBtn?.addEventListener('click', function() {
    currentIndex -= 1;
    clampIndex();
    updateCarousel();
  });

  nextBtn?.addEventListener('click', function() {
    currentIndex += 1;
    clampIndex();
    updateCarousel();
  });

  window.addEventListener('resize', function() {
    updateCarousel();
  });

  updateCarousel();
});
