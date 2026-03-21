export const SWITCH_DOC_ES = {
  title: 'Switch',
  description: 'Un interruptor para activar o desactivar configuraciones.',
  settingsPanel: 'Panel de Configuración',
  accessibility: [
    'Usa <code>role="switch"</code> con <code>aria-checked</code> para lectores de pantalla.',
    'Soporta activación por teclado con <code>Space</code> y <code>Enter</code>.',
    'El estado deshabilitado se transmite mediante <code>aria-disabled</code>.',
  ],
  propDescriptions: {
    checked: 'Si el interruptor está activado. Soporta enlace bidireccional.',
    disabled: 'Si el interruptor está deshabilitado.',
    size: 'El tamaño del interruptor.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
