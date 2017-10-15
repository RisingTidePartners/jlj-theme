theme.initLookbook = function() {
  var lookbookContainer = document.querySelector('[data-js-lookbook-container]')
  var lookbookSlides = document.querySelectorAll('[data-js-lookbook-slide]')
  var nextSlideButton = document.querySelector('[data-js-next-slide]')
  var prevSlideButton = document.querySelector('[data-js-prev-slide]')
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

    if (img) {
      img.setAttribute('src', img.getAttribute('data-src'))
      img.setAttribute('srcset', img.getAttribute('data-srcset'))
      
      img.onload = function() {
        currentSlide.classList.add('loaded')
      }
    } else {
      currentSlide.classList.add('loaded')
    }

    visibilityTimeout = setTimeout(function() {
      currentSlide.classList.add('visible')
      lookbookContainer.style.height = currentSlide.scrollHeight + 'px'
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
