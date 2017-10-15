theme.initNav = function() {
  var dropdownToggles = document.querySelectorAll('[data-js-dropdown-toggle]');
  var dropdowns = document.querySelectorAll('[data-js-dropdown]');
  var $navContainer = $('[data-js-site-nav-container]');
  var $navToggle = $('[data-js-site-nav-toggle]');

  // jQuery actually can't do this elegantly

  window.setNav = function() {
    var activeNavWrap = document.querySelector('[js-nav-active]')
    var activeNav = document.querySelector('[js-nav-active] [data-js-dropdown]')

    if (activeNav) {
      activeNav.style.maxHeight = activeNav.scrollHeight * 1.11 + 'px';
      activeNavWrap.classList.remove('site-nav--initial');
    }
  }

  dropdownToggles.forEach(function(el, i) {
    el.menuToToggle = dropdowns[i]
    el.onclick = function(e) {
      if(this.menuToToggle.style.maxHeight.indexOf('px') >= 0) {
        this.menuToToggle.style.maxHeight = null;
      } else {
        dropdowns.forEach(function(el) {
          el.style.maxHeight = null;
        });
        this.menuToToggle.style.maxHeight = this.menuToToggle.scrollHeight + 'px';
      }

      e.preventDefault();
    }
  });

  $navToggle.click(function(event) {
    $navContainer.toggleClass('visible');
    $('body').toggleClass('nav-open');
  });
}
