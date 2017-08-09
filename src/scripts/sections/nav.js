theme.initNav = function() {
  var $dropdownToggles = $('[data-js-dropdown-toggle]');
  var $dropdowns = $('[data-js-dropdown]');
  var $navContainer = $('[data-js-site-nav-container]');
  var $navToggle = $('[data-js-site-nav-toggle]');

  $dropdownToggles.each(function(index, el) {
    el.onclick = function(e) {
      if($(this).parent().hasClass('site-nav--active')) {
        $(this).parent().removeClass('site-nav--active')
      } else {
        $dropdowns.removeClass('site-nav--active')
        $(this).parent().addClass('site-nav--active');
      }

      e.preventDefault();
    }
  });

  $navToggle.click(function(event) {
    console.log('fuck youuuuu');
    $navContainer.toggleClass('visible');
  });
}
