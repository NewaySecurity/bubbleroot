// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Navbar toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Simple form submission
    const contactForm = document.getElementById('contactForm');
    const affiliateForm = document.getElementById('affiliateForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    });

    affiliateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Welcome to the Affiliate Program!');
        affiliateForm.reset();
    });

    // AI Image Generator mock implementation
    const generateBtn = document.getElementById('generate-btn');
    const imageOutput = document.getElementById('image-output');
    const imageActions = document.querySelector('.image-actions');

    generateBtn.addEventListener('click', () => {
        // Mock image generation
        imageOutput.innerHTML = '<img src="https://via.placeholder.com/512" alt="Generated Image">';
        imageActions.style.display = 'flex';
    });

    const downloadBtn = document.getElementById('download-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');

    downloadBtn.addEventListener('click', () => {
        alert('Image downloaded!');
    });

    regenerateBtn.addEventListener('click', () => {
        imageOutput.innerHTML = '<p>Your new image will appear here shortly.</p>';
        imageActions.style.display = 'none';
    });
});
