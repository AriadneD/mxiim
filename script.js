// Create the cursor dot element
const cursorDot = document.createElement("div");
cursorDot.id = "cursor-dot";
document.body.appendChild(cursorDot);

// Get the hero section
const heroSection = document.querySelector(".hero");

// Mouse move event on the hero section
heroSection.addEventListener("mousemove", (e) => {
  cursorDot.style.display = "block";
  cursorDot.style.left = `${e.pageX}px`;
  cursorDot.style.top = `${e.pageY}px`;
});

// Hide the dot when the mouse leaves the hero section
heroSection.addEventListener("mouseleave", () => {
  cursorDot.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  // Select the hero section
  const hero = document.querySelector(".hero");

  /*// Add mousemove event listener
  hero.addEventListener("mousemove", (e) => {
    const width = hero.offsetWidth;
    const height = hero.offsetHeight;

    const mouseX = e.pageX - hero.offsetLeft;
    const mouseY = e.pageY - hero.offsetTop;

    const xPercent = (mouseX / width) * 100;
    const yPercent = (mouseY / height) * 100;

    const xShift = (xPercent - 50) / 20;
    const yShift = (yPercent - 50) / 20;

    hero.style.backgroundPosition = `${50 + xShift}% ${50 + yShift}%`;
  });*/

  function loadHTML(url, id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status !== 200) return;
      document.getElementById(id).innerHTML = this.responseText;
      if (callback) callback(); // Call the callback after loading the content
    };
    xhr.send();
  }

  loadHTML("/navigation.html", "navigation-placeholder", function () {
    const nav = document.querySelector(".nav");
    const hero = document.querySelector(".hero");
    const menuToggle = document.querySelector(".menu-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Function to check scroll position
    const onScroll = () => {
      if (window.scrollY > hero.offsetHeight) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    // Listen for the scroll event
    window.addEventListener("scroll", onScroll);

    // Toggle dropdown menu on click
    menuToggle.addEventListener("click", () => {
      dropdownMenu.classList.toggle("active");
      nav.classList.toggle("menu-open");
    });
  });

  loadHTML("/footer.html", "footer-placeholder");
  loadHTML("/categories.html", "categories-placeholder");

  loadHTML("/faq.html", "faq-placeholder", function () {
    // Select all FAQ items
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".faq-icon");

      question.addEventListener("click", () => {
        // Toggle the 'open' class on the answer
        answer.classList.toggle("open");

        // Toggle between + and -
        if (icon.textContent === "+") {
          icon.textContent = "-";
        } else {
          icon.textContent = "+";
        }
      });
    });
  });
});
