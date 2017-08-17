/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {

  /**
   * Browser cookies are required to use the cart. This function checks if
   * cookies are enabled in the browser.
   */
  cookiesEnabled: function() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled){
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
    }
    return cookieEnabled;
  }
};

theme.initCart = (function() {
  $('[data-cart-link]').click(function(e){
    $('[data-cart-drawer]').addClass('cart-open');
    e.preventDefault();
  });

  $('[data-cart-close]').click(function(e){
    $('[data-cart-drawer]').removeClass('cart-open');
    e.preventDefault();
  });

  $(document).on('cart.requestComplete', function(event, cart) {
    $('[data-cart-drawer]').addClass('cart-open');
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/cart.js',
      success: function(data) {
        $('[data-cart-item-counter]').html(data.item_count);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Error: ' + errorThrown + '!');
      }
    });
  });
});
