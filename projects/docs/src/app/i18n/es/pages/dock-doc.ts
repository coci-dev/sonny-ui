export const DOCK_DOC_ES = {
  title: 'Dock',
  description: 'Un componente estilo dock de macOS con efecto de magnificación al pasar el cursor.',
  dock: 'Dock',
  dockItem: 'DockItem',
  propDescriptions: {
    position: 'La posición del dock en la pantalla.',
    magnification: 'Si el efecto de magnificación está habilitado.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  accessibility: [
    'Usa <code>role="toolbar"</code> con <code>aria-label</code> para la semántica ARIA correcta.',
    '<code>ArrowLeft</code>/<code>ArrowRight</code> navegan entre elementos del dock con <code>tabindex</code> itinerante. <code>Home</code>/<code>End</code> saltan al primero/último.',
    'El elemento activo tiene <code>tabindex="0"</code>, los inactivos tienen <code>tabindex="-1"</code>.',
  ],
  itemPropDescriptions: {
    label: 'La etiqueta del tooltip para el elemento del dock.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
