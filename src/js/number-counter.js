document.addEventListener('DOMContentLoaded', function () {
  // Helper to insert spaces as thousand separators
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const duration = 1250; // 1 seconds

  // Function to start the counter animation
  function startCounter(counterEl) {
    const targetValue = parseInt(counterEl.textContent.replace(/\s/g, ''), 10);
    let startTime = null;

    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // Cap progress at 1
      const currentValue = Math.floor(progress * targetValue);
      counterEl.textContent = formatNumber(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counterEl.textContent = formatNumber(targetValue);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Options for the Intersection Observer:
  // When 20% of the element is visible, the callback is triggered.
  const observerOptions = {
    root: null, // relative to the viewport
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        // Stop observing after the counter starts
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with the class "number-counter"
  const counters = document.querySelectorAll('.number-counter');
  counters.forEach(counterEl => {
    observer.observe(counterEl);
  });
});
