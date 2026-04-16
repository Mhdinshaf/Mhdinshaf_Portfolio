// Function to handle the Core Skills Accordion logic
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const parentItem = content.parentElement;
    
    // Check if the clicked one is already open
    const isOpen = parentItem.classList.contains('active');

    // Close all other accordions first
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
    });

    // If it wasn't open, open it now
    if (!isOpen) {
        parentItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// Open the first category (Frontend) by default when page loads
document.addEventListener("DOMContentLoaded", () => {
    toggleAccordion('frontend');
});