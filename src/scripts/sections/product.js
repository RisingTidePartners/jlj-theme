/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
   * @namespace product
 */

theme.Product = (function() {

  var selectors = {
    cartForm: '[data-cart-submit]',
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productFeaturedImage: '[data-product-featured-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productThumbs: '[data-product-single-thumbnail]',
    singleOptionSelector: '[data-single-option-selector]',
    zoom: '[data-js-zoom]'
  };

  function destroyZoom() {
    $(selectors.zoom).trigger('zoom.destroy')
  }

  function activateZoom() {
    $(selectors.zoom).zoom({
      url: $(selectors.zoom).attr('data-zoom-src'),
      on: 'click',
      onZoomIn: function() {
        $(selectors.zoom).addClass('zoomed');
      },
      onZoomOut: function() {
        $(selectors.zoom).removeClass('zoomed');
      },
    });
  }

  function swapFeaturedImage(featuredSrc, featuredSrcset, zoomSrc) {
    $el = $(selectors.productFeaturedImage);

    $el.fadeOut(250, function() {
      $el.attr('src', featuredSrc);
      $el.attr('srcset', featuredSrcset);
      $(selectors.zoom).attr('data-zoom-src', zoomSrc);
      destroyZoom();
      activateZoom();
      $el.load(function() {
        $el.fadeIn(250);
      });
    });
  }

  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    this.$container = $(container);
    var sectionId = this.$container.attr('data-section-id');

    this.settings = {};
    this.namespace = '.product';

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());
    this.settings.imageSize = slate.Image.imageSize($(selectors.productFeaturedImage, this.$container).attr('src'));

    slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);

    this.initVariants();

    $(selectors.addToCart).click(function() {
      $(this).blur();
    })

    $(document).on('cart.requestStarted', function(event, cart) {
      $(selectors.addToCart).attr('disabled', true);
    });

    $(document).on('cart.requestComplete', function(event, cart) {
      $(selectors.addToCart).attr('disabled', false);
    });

    $(selectors.productThumbs).each(function() {
      $(this).click(function(e) {
        $(selectors.productThumbs).removeClass('active');
        $(this).addClass('active');
        swapFeaturedImage($(this).attr('href'), $(this).attr('data-srcset'), $(this).attr('data-zoom-src'));
        e.preventDefault();
      });
    });

    activateZoom();
  }

  Product.prototype = $.extend({}, Product.prototype, {

    /**
     * Handles change events from the variant inputs
     */
    initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState: this.$container.data('enable-history-state') || false,
        singleOptionSelector: selectors.singleOptionSelector,
        originalSelectorId: selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);

      this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
      this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
      this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));
    },

    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass('hide');
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        $(selectors.priceWrapper, this.$container).addClass('hide');
        return;
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop('disabled', false);
        $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function(evt) {
      var variant = evt.variant;
      var $comparePrice = $(selectors.comparePrice, this.$container);
      var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

      $(selectors.productPrice, this.$container)
        .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
        $compareEls.removeClass('hide');
      } else {
        $comparePrice.html('');
        $compareEls.addClass('hide');
      }
    },

    /**
     * Updates the DOM with the specified image URL
     *
     * @param {string} src - Image src URL
     */
    updateProductImage: function(evt) {
      var variant = evt.variant;
      var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);

      var srcset = slate.Image.getSizedImageUrl(variant.featured_image.src, '2048x2048') + ' 2048w,'
                 + slate.Image.getSizedImageUrl(variant.featured_image.src, '1024x1024') + ' 1024w,'
                 + slate.Image.getSizedImageUrl(variant.featured_image.src, '600x600') + ' 600w,'
                 + slate.Image.getSizedImageUrl(variant.featured_image.src, '480x480') + ' 480w';

      var zoomSrc = slate.Image.getSizedImageUrl(variant.featured_image.src, '2048x2048');
      $(selectors.productThumbs).removeClass('active');

      swapFeaturedImage(sizedImgUrl, srcset, zoomSrc);
    },

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    }
  });

  return Product;
})();
