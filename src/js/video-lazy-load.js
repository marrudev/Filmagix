const lazyVideos = document.querySelectorAll('video.video-lazy-load');

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const sources = video.querySelectorAll('source[data-src]');
        sources.forEach(source => {
          source.src = source.getAttribute('data-src'); // Set the actual src
          source.removeAttribute('data-src'); // Clean up
        });
        video.load(); // Trigger loading of the video
        videoObserver.unobserve(video); // Stop observing
      }
    });
  });

  lazyVideos.forEach(video => {
    videoObserver.observe(video);
  });
}
