// Create the cursor dot element
const cursorDot = document.createElement('div');
cursorDot.id = 'cursor-dot';
document.body.appendChild(cursorDot);

// Get the hero section
const heroSection = document.querySelector('.hero');

// Mouse move event on the hero section
document.addEventListener('mousemove', (e) => {
    cursorDot.style.display = 'block';
    cursorDot.style.left = `${e.pageX}px`;
    cursorDot.style.top = `${e.pageY}px`;
});

// Hide the dot when the mouse leaves the hero section
heroSection.addEventListener('mouseleave', () => {
    cursorDot.style.display = 'none';
});

// Select the nav and hero elements
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');

// Function to check scroll position
const onScroll = () => {
    // Check if the scroll position is past the hero section
    if (window.scrollY > hero.offsetHeight) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

// Listen for the scroll event
window.addEventListener('scroll', onScroll);


document.addEventListener('DOMContentLoaded', () => {
    // Select the hero section
    const hero = document.querySelector('.hero');

    // Add mousemove event listener
    hero.addEventListener('mousemove', (e) => {
        const width = hero.offsetWidth;
        const height = hero.offsetHeight;

        const mouseX = e.pageX - hero.offsetLeft;
        const mouseY = e.pageY - hero.offsetTop;

        const xPercent = (mouseX / width) * 100;
        const yPercent = (mouseY / height) * 100;

        const xShift = (xPercent - 50) / 20;
        const yShift = (yPercent - 50) / 20;

        hero.style.backgroundPosition = `${50 + xShift}% ${50 + yShift}%`;
    });
});
