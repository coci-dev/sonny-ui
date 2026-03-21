export const SHEET_DOC_ES = {
  title: 'Sheet',
  description: 'Un panel que se desliza desde el borde de la pantalla.',
  cartSheet: 'Panel de Carrito',
  snySheetService: 'SnySheetService',
  snySheetConfig: 'SnySheetConfig',
  contentDirectives: 'Directivas de contenido',
  contentDirectivesList: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snySheetHeader</code> — Sección de encabezado',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snySheetTitle</code> — Título del panel',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snySheetDescription</code> — Texto de descripción',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snySheetContent</code> — Área de contenido',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snySheetClose</code> — Botón de cerrar',
  ],
  accessibility: [
    'Usa <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="dialog"</code> con <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-modal</code> para lectores de pantalla.',
    'El foco queda atrapado dentro del panel cuando está abierto.',
    'Se cierra al presionar la tecla <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Escape</code> por defecto.',
  ],
  servicePropDescriptions: {
    open: 'Abrir un panel con el componente dado.',
    closeAll: 'Cerrar todos los paneles abiertos.',
  },
  configPropDescriptions: {
    side: 'Borde desde el que se desliza.',
    closeOnBackdrop: 'Cerrar al hacer clic en el fondo.',
    closeOnEsc: 'Cerrar con la tecla Escape.',
    data: 'Datos para inyectar en el componente del panel.',
  },
};
