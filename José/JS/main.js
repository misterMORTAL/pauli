document.addEventListener("DOMContentLoaded", () => {
  const elementosCarousel = document.querySelectorAll(".carousel");
  M.Carousel.init(elementosCarousel,{
      duration: 150,
      dist: -80,
      shift: 12,
      padding: 12,
      numVisible: 3,
      indicators: true,
      noWrap: false,
  });
});