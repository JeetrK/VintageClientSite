document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menuToggle');
  var sideNav = document.getElementById('sideNav');
  var closeNav = document.getElementById('closeNav');
  var navOverlay = document.getElementById('navOverlay');
  var mainContainer = document.querySelector('.container');

  function openNav() {
    sideNav.classList.add('open');
    navOverlay.classList.add('open');
    if (mainContainer) mainContainer.classList.add('nav-open');
    sideNav.setAttribute('aria-hidden', 'false');
    navOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeNavPanel() {
    sideNav.classList.remove('open');
    navOverlay.classList.remove('open');
    if (mainContainer) mainContainer.classList.remove('nav-open');
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

  // Fading slideshow logic
  var slides = document.querySelectorAll('.slide');
  var currentSlide = 0;

  function showSlide(index) {
    slides.forEach(function(slide, idx) {
      slide.classList.toggle('active', idx === index);
    });
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 2800);
  }

  // Catalog item details modal
  var catalogModal = document.getElementById('catalogModal');
  var modalOverlay = document.querySelector('.catalog-modal-overlay');
  var modalClose = document.querySelector('.modal-close');
  var modalTitle = document.getElementById('modalTitle');
  var modalPrice = document.querySelector('.modal-price');
  var modalDescription = document.querySelector('.modal-description');
  var modalDetails = document.querySelector('.modal-details');
  var modalCarousel = document.querySelector('.modal-carousel');
  var modalPrev = document.querySelector('.modal-prev');
  var modalNext = document.querySelector('.modal-next');
  var catalogButtons = document.querySelectorAll('.catalog-item-btn');
  var currentModalIndex = 0;
  var currentModalImages = [];
  var currentImageCount = 0;

  function createSlide(imagePath, idx) {
    var slide = document.createElement('div');
    slide.className = 'modal-slide';
    slide.dataset.label = imagePath ? imagePath.replace(/^.*[\\/]/, '') : 'Image ' + (idx + 1);

    if (imagePath && /\.(jpe?g|png|webp|gif)$/i.test(imagePath)) {
      var img = document.createElement('img');
      img.src = imagePath.startsWith('http') || imagePath.startsWith('/') ? imagePath : 'imgs/' + imagePath;
      img.alt = slide.dataset.label;
      slide.appendChild(img);
    } else {
      slide.textContent = imagePath || 'No image available';
    }

    return slide;
  }

  function updateModalSlides(images) {
    currentModalImages = images.filter(function(image) {
      return image.trim() !== '';
    });

    if (currentModalImages.length === 0) {
      currentModalImages = [''];
    }

    currentImageCount = currentModalImages.length;
    currentModalIndex = 0;

    if (modalCarousel) {
      modalCarousel.innerHTML = '';
      currentModalImages.forEach(function(imagePath, idx) {
        var slide = createSlide(imagePath, idx);
        if (idx === currentModalIndex) {
          slide.classList.add('active');
        }
        modalCarousel.appendChild(slide);
      });
    }

    if (modalPrev && modalNext) {
      var disableControls = currentImageCount <= 1;
      modalPrev.disabled = disableControls;
      modalNext.disabled = disableControls;
    }
  }

  function showModalImage(index) {
    if (currentImageCount <= 0 || !modalCarousel) return;
    currentModalIndex = ((index % currentImageCount) + currentImageCount) % currentImageCount;
    var slides = modalCarousel.querySelectorAll('.modal-slide');
    slides.forEach(function(slide, idx) {
      slide.classList.toggle('active', idx === currentModalIndex);
    });
  }

  function openCatalogModal(button) {
    if (!catalogModal) return;
    currentModalIndex = 0;
    modalTitle.textContent = button.dataset.title || 'Item Details';
    modalPrice.textContent = button.dataset.price || '';
    modalDescription.textContent = button.dataset.description || '';
    modalDetails.innerHTML = '';

    var details = (button.dataset.details || '').split('|');
    details.forEach(function(detail) {
      if (detail.trim()) {
        var listItem = document.createElement('li');
        listItem.textContent = detail.trim();
        modalDetails.appendChild(listItem);
      }
    });

    var images = (button.dataset.images || 'Front view|Back view|Detail view').split('|');
    updateModalSlides(images);
    catalogModal.classList.add('open');
    catalogModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCatalogModal() {
    if (!catalogModal) return;
    catalogModal.classList.remove('open');
    catalogModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  catalogButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      openCatalogModal(button);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeCatalogModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeCatalogModal);
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', function() {
      showModalImage(currentModalIndex - 1);
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', function() {
      showModalImage(currentModalIndex + 1);
    });
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && catalogModal && catalogModal.classList.contains('open')) {
      closeCatalogModal();
    }

    if (catalogModal && catalogModal.classList.contains('open')) {
      if (event.key === 'ArrowLeft') {
        showModalImage(currentModalIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        showModalImage(currentModalIndex + 1);
      }
    }
  });
});
