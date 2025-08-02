// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const closeBtn = document.getElementById("close-btn")

if (hamburger && navMenu && closeBtn) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.add("active")
    navMenu.classList.add("active")
  })

  closeBtn.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const elementPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header scroll effect
let lastScrollTop = 0
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScrollTop = scrollTop
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("loading")
  observer.observe(section)
})

// Products Carousel
let currentProductSlide = 0
const productSlides = document.querySelectorAll(".product-slide")
const productDots = document.querySelectorAll("#products-pagination .dot")

function showProductSlide(index) {
  const carousel = document.getElementById("products-carousel")
  if (carousel) {
    carousel.style.transform = `translateX(-${index * 100}%)`
  }

  // Update dots
  productDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })

  currentProductSlide = index
}

function changeProductSlide(direction) {
  const newIndex = currentProductSlide + direction

  if (newIndex >= 0 && newIndex < productSlides.length) {
    showProductSlide(newIndex)
  } else if (newIndex < 0) {
    showProductSlide(productSlides.length - 1)
  } else {
    showProductSlide(0)
  }
}

function goToProductSlide(index) {
  showProductSlide(index)
}

// Prizes Carousel
let currentPrizeSlide = 0
const prizeSlides = document.querySelectorAll(".prize-slide")
const prizeDots = document.querySelectorAll("#prizes-pagination .dot")

function showPrizeSlide(index) {
  const carousel = document.getElementById("prizes-carousel")
  if (carousel) {
    carousel.style.transform = `translateX(-${index * 100}%)`
  }

  // Update dots
  prizeDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })

  currentPrizeSlide = index
}

function changePrizeSlide(direction) {
  const newIndex = currentPrizeSlide + direction

  if (newIndex >= 0 && newIndex < prizeSlides.length) {
    showPrizeSlide(newIndex)
  } else if (newIndex < 0) {
    showPrizeSlide(prizeSlides.length - 1)
  } else {
    showPrizeSlide(0)
  }
}

function goToPrizeSlide(index) {
  showPrizeSlide(index)
}

// Auto-play carousels on mobile
let productAutoPlay, prizeAutoPlay

function startAutoPlay() {
  if (window.innerWidth <= 768) {
    productAutoPlay = setInterval(() => {
      changeProductSlide(1)
    }, 4000)

    prizeAutoPlay = setInterval(() => {
      changePrizeSlide(1)
    }, 5000)
  }
}

function stopAutoPlay() {
  if (productAutoPlay) clearInterval(productAutoPlay)
  if (prizeAutoPlay) clearInterval(prizeAutoPlay)
}

// Touch-friendly interactions
document.querySelectorAll("button, .product-card, .prize-card, .host-card").forEach((element) => {
  element.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.98)"
  })

  element.addEventListener("touchend", function () {
    this.style.transform = ""
  })
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("JONY RICH website loaded successfully!")

  // Initialize carousels
  showProductSlide(0)
  showPrizeSlide(0)

  // Start auto-play on mobile
  if (window.innerWidth <= 768) {
    startAutoPlay()
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  stopAutoPlay()
  if (window.innerWidth <= 768) {
    startAutoPlay()
  }
})

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0
document.addEventListener(
  "touchend",
  (event) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false,
)

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  const header = document.querySelector(".header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Add loading state management
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger animations for visible elements
  document.querySelectorAll(".loading").forEach((element) => {
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      element.classList.add("loaded")
    }
  })
})

// Touch-friendly button interactions
document.querySelectorAll("button, .btn-primary, .btn-secondary").forEach((button) => {
  // Add touch feedback
  button.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.98)"
  })

  button.addEventListener("touchend", function () {
    this.style.transform = ""
  })

  // Add click feedback with ripple effect
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Optimize images loading
document.querySelectorAll("img").forEach((img) => {
  img.loading = "lazy"

  // Add error handling
  img.addEventListener("error", function () {
    console.log("Image failed to load:", this.src)
  })
})

// Add special effects for game show feel
function createConfetti() {
  const colors = ["#ffd700", "#ff6b35", "#ff1493", "#00ff00", "#1e90ff"]

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div")
    confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 9999;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            border-radius: 50%;
        `
    document.body.appendChild(confetti)

    setTimeout(() => {
      confetti.remove()
    }, 5000)
  }
}

// Add confetti animation CSS
const confettiStyle = document.createElement("style")
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(confettiStyle)

// Trigger confetti on button clicks
document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("click", () => {
    createConfetti()
  })
})
