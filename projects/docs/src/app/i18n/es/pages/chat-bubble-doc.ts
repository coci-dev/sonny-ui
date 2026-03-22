export const CHAT_BUBBLE_DOC_ES = {
  title: 'Chat Bubble',
  description: 'Muestra una burbuja de mensaje de chat con encabezado, contenido y pie de pagina.',
  subDirectivesTitle: 'Sub-directivas',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyChatBubbleHeader</code> — Nombre del remitente o metadatos',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyChatBubbleContent</code> — Cuerpo del mensaje con soporte de variantes',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyChatBubbleFooter</code> — Marca de tiempo o texto de estado',
  ],
  propDescriptions: {
    align: 'Alineacion de la burbuja de chat.',
    class: 'Clases CSS adicionales a aplicar.',
  },
  contentPropDescriptions: {
    variant: 'El estilo visual del contenido del mensaje.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
