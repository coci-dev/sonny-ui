export const CAROUSEL_DOC_EN = {
  title: 'Carousel',
  description: 'A slideshow component for cycling through elements such as images or cards.',
  carousel: 'Carousel',
  carouselItem: 'CarouselItem',
  withControls: 'With Controls',
  propDescriptions: {
    orientation: 'The orientation of the carousel.',
    autoplay: 'Whether the carousel auto-advances.',
    interval: 'The interval in milliseconds between auto-advances.',
    loop: 'Whether the carousel loops back to the start.',
    class: 'Additional CSS classes to apply.',
  },
  accessibility: [
    'Uses <code>role="region"</code> with <code>aria-roledescription="carousel"</code> for proper ARIA semantics.',
    '<code>ArrowLeft</code>/<code>ArrowRight</code> navigate to previous/next slide when the carousel is focused.',
    'Each slide uses <code>role="group"</code> with <code>aria-roledescription="slide"</code>.',
    'Previous/Next buttons have <code>aria-label</code> for screen reader accessibility.',
  ],
  itemPropDescriptions: {
    class: 'Additional CSS classes to apply.',
  },
};
