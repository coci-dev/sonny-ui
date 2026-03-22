export const TABS_DOC_ES = {
  title: 'Tabs',
  description: 'Un conjunto de secciones de contenido en capas que se muestran una a la vez.',
  tabsLabel: 'Tabs',
  tabsTriggerLabel: 'TabsTrigger',
  tabsContentLabel: 'TabsContent',
  accessibility: [
    'Usa <code>role="tablist"</code>, <code>role="tab"</code> y <code>role="tabpanel"</code> para la semántica ARIA correcta.',
    '<code>ArrowLeft</code>/<code>ArrowRight</code> navegan entre pestañas con <code>tabindex</code> itinerante. <code>Home</code>/<code>End</code> saltan a la primera/última pestaña.',
    'La pestaña activa tiene <code>tabindex="0"</code>, las inactivas tienen <code>tabindex="-1"</code> (patrón roving tabindex).',
    'Cada pestaña está vinculada a su panel mediante <code>aria-controls</code> y <code>aria-labelledby</code>.',
  ],
  propDescriptions: {
    tabsValue: 'El valor de la pestaña activa. Soporta enlace bidireccional.',
    tabsClass: 'Clases CSS adicionales a aplicar.',
    triggerValue: 'El valor que identifica este disparador de pestaña.',
    triggerClass: 'Clases CSS adicionales a aplicar.',
    contentValue: 'El valor que identifica este panel de contenido de pestaña.',
    contentClass: 'Clases CSS adicionales a aplicar.',
  },
};
