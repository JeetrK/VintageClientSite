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
});
