theme.initLookbook = function() {
  lookbookSlides = document.querySelectorAll('[data-js-lookbook-slide]')
  nextSlideButton = document.querySelector('[data-js-next-slide')
  prevSlideButton = document.querySelector('[data-js-prev-slide')
  var currentSlideIndex
  var visibilityTimeout

  function loadSlide() {
    var imgLoaded = false
    clearTimeout(visibilityTimeout)

    if(currentSlideIndex + 1 > lookbookSlides.length) {
      currentSlideIndex = 0
    }

    if(currentSlideIndex < 0) {
      currentSlideIndex = lookbookSlides.length - 1
    }

    var visibleSlide = document.querySelector('[data-js-lookbook-slide].visible')
    var currentSlide = lookbookSlides[currentSlideIndex]
    
    if (visibleSlide) {
      visibleSlide.classList.remove('visible')
    }

    var img = currentSlide.querySelector('[data-js-lookbook-image]')
    img.setAttribute('src', img.getAttribute('data-src'))
    img.setAttribute('srcset', img.getAttribute('data-srcset'))
    
    img.onload = function() {
      currentSlide.classList.add('loaded')
    }

    visibilityTimeout = setTimeout(function() {
      currentSlide.classList.add('visible')
    }, 400)
  }

  if (nextSlideButton) {
    nextSlideButton.onclick = function(e) {
      currentSlideIndex++
      loadSlide(currentSlideIndex)
      e.preventDefault()
    }
  }

  if (prevSlideButton) {
    prevSlideButton.onclick = function(e) {
      currentSlideIndex--
      loadSlide(currentSlideIndex)
      e.preventDefault()
    }
  }

  if (lookbookSlides.length > 1) {
    currentSlideIndex = 0
    loadSlide()
  }
}
