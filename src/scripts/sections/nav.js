theme.initNav = function() {
  var $dropdownToggles = $('[data-js-dropdown-toggle]');
  var $dropdowns = $('[data-js-dropdown]')

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
}
