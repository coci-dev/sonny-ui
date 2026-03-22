export const ACCORDION_DOC_ES = {
  title: 'Accordion',
  description: 'Un conjunto de encabezados interactivos apilados verticalmente que revelan contenido.',
  faqWithMultiMode: 'FAQ con Modo Múltiple',
  accordion: 'Accordion',
  accordionItem: 'AccordionItem',
  propDescriptions: {
    multi: 'Permitir que múltiples elementos estén abiertos a la vez.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  accessibility: [
    'Los disparadores usan <code>aria-expanded</code> para indicar el estado abierto/cerrado.',
    '<code>ArrowUp</code>/<code>ArrowDown</code> navegan entre disparadores del acordeón. <code>Home</code>/<code>End</code> saltan al primero/último.',
    'Las regiones de contenido usan <code>role="region"</code> para la semántica ARIA correcta.',
  ],
  itemPropDescriptions: {
    value: 'Identificador único para el elemento del acordeón.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
