export const TOGGLE_DOC_ES = {
  title: 'Toggle',
  description: 'Un botón de dos estados que puede estar activado o desactivado.',
  textFormatting: 'Formato de Texto',
  accessibility: [
    'Usa <code>aria-pressed</code> para transmitir el estado del toggle a las tecnologías de asistencia.',
    'Soporta activación por teclado con <code>Space</code> y <code>Enter</code>.',
    'El foco es claramente visible con un indicador de anillo.',
  ],
  propDescriptions: {
    variant: 'El estilo visual del toggle.',
    size: 'El tamaño del toggle.',
    pressed: 'Si el toggle está presionado. Soporta enlace bidireccional.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
