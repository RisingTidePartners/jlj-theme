theme.initNav = function() {
  var $dropdowns = $('[data-js-dropdown]');

  $dropdowns.each(function(index, el) {
    el.onclick = function(e) {
      if($(this).hasClass('site-nav--active')) {
        $(this).removeClass('site-nav--active')
      } else {
        $dropdowns.removeClass('site-nav--active')
        $(this).addClass('site-nav--active');
      }

      e.preventDefault();
    }
  });
}
