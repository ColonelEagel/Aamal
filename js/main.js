function startCounting() {
    // Select all elements with the 'counter' class
    const counters = document.querySelectorAll('.counter');
  
    // Function to handle counting on scroll
    function countOnScroll() {
      counters.forEach((counter) => {
        // Get the bounding rectangle of the counter element
        const rect = counter.getBoundingClientRect();
        // Check if the counter element is partially visible
        const isPartiallyVisible = rect.top < window.innerHeight && rect.bottom >= 0;
  
        if (isPartiallyVisible && !counter.classList.contains('counted')) {
          // Mark the counter as counted to prevent re-counting
          counter.classList.add('counted');
  
          // Get the target count value from the 'data-target' attribute
          const target = +counter.getAttribute('data-target');
          // Calculate the counting step
          const step = target / 100;
  
          // Initialize the current count value
          let currentCount = 0;
  
          // Function to update the counter value
          const updateCounter = () => {
            currentCount += step;
            // Update the counter text content with the rounded current count
            counter.textContent = Math.round(currentCount);
  
            if (currentCount < target) {
              // Continue the counting animation using requestAnimationFrame
              requestAnimationFrame(updateCounter);
            }
          };
  
          // Start the counting animation
          updateCounter();
        } else if (!isPartiallyVisible) {
          // Reset the count when not visible in the entire screen
          counter.classList.remove('counted');
          counter.textContent = '0';
        }
      });
    }
  
    // Listen for scroll events
    window.addEventListener('scroll', countOnScroll);
  
    // Initial counting check in case the section is already visible
    countOnScroll();
  }
  
  // Trigger counting when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', startCounting);
  