if(document.querySelector('[data-js-more-link]')) {
  var pInfScrLoading = false;
  var pInfScrDelay = 100;

  function pInfScrExecute() {
    if($(document).height() - 800 < ($(document).scrollTop() + $(window).height())) {
      var loadingImage;
      var pInfScrNode = $('[data-js-more-link]');
      var pInfScrURL = $('[data-js-more-link]').attr("href");
      
      if(!pInfScrLoading && pInfScrNode.length > 0 && pInfScrNode.css('display') != 'none') {
        $.ajax({
          type: 'GET',
          url: pInfScrURL,
          beforeSend: function() {
            pInfScrLoading = true;
            loadingImage = pInfScrNode.clone().empty().append('<img src=\"http://cdn.shopify.com/s/files/1/0068/2162/assets/loading.gif?105791\" />');
            loadingImage.insertAfter(pInfScrNode);
            pInfScrNode.hide();
          },
          success: function(data) {
            // remove loading feedback
            var filteredData = $(data).find('[data-js-product-grid]');
            filteredData.insertBefore( $('[data-js-products-end]') );
            loadingImage.remove();          
            pInfScrLoading = false;

            var nextLink = $(data).find('[data-js-more-link]').attr('href');

            if(nextLink) {
              var nextLink = $(data).find('[data-js-more-link]').attr('href');
              pInfScrNode.attr('href', nextLink);
              pInfScrNode.show();
            }
          },
          dataType: "html"
        });
      }
    }
  }

  $(window).scroll(function(){
    $.doTimeout( 'scroll', pInfScrDelay, pInfScrExecute);
    if( $(document).height() - 800 > $(document).scrollTop() + $(window).height() ) {
      pInfScrDelay = 100;
    }
  });
}
