export const CAROUSEL_DOC_ES = {
  title: 'Carousel',
  description: 'Un componente de presentación para recorrer elementos como imágenes o tarjetas.',
  carousel: 'Carousel',
  carouselItem: 'CarouselItem',
  withControls: 'Con Controles',
  propDescriptions: {
    orientation: 'La orientación del carrusel.',
    autoplay: 'Si el carrusel avanza automáticamente.',
    interval: 'El intervalo en milisegundos entre avances automáticos.',
    loop: 'Si el carrusel vuelve al inicio al llegar al final.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  accessibility: [
    'Usa <code>role="region"</code> con <code>aria-roledescription="carousel"</code> para la semántica ARIA correcta.',
    '<code>ArrowLeft</code>/<code>ArrowRight</code> navegan a la diapositiva anterior/siguiente cuando el carrusel tiene el foco.',
    'Cada diapositiva usa <code>role="group"</code> con <code>aria-roledescription="slide"</code>.',
    'Los botones Anterior/Siguiente tienen <code>aria-label</code> para accesibilidad con lectores de pantalla.',
  ],
  itemPropDescriptions: {
    class: 'Clases CSS adicionales a aplicar.',
  },
};
