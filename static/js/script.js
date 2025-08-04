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
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("JONY RICH BARABAN SHOU website loaded successfully!")
})

// Optimize images loading
document.querySelectorAll("img").forEach((img) => {
  img.loading = "lazy"

  img.addEventListener("error", function () {
    console.log("Image failed to load:", this.src)
  })
})
