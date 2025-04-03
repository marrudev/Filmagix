var swiper = new Swiper('.swiper-featured-work', {
  slidesPerView: 4,
  spaceBetween: 16,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    560: {
      slidesPerView: 2
    },
    900: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4
    }
  }
});
