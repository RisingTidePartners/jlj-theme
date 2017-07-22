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
  $(document).on('cart.ready', function(event, cart) {
    alert('cart is ready')
  });

  $(document).on('cart.requestStarted', function(event, cart) {
    alert('request started')
  });

  $(document).on('cart.requestComplete', function(event, cart) {
    alert('request completed')
  });  
});
