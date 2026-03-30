export const AVATAR_GROUP_DOC_ES = {
  title: 'Avatar Group',
  description: 'Un grupo apilado de avatares con contador de desbordamiento, soportando imágenes e iniciales de respaldo.',
  accessibility: [
    'El contenedor del grupo tiene <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="group"</code> con aria-label.',
    'Las imágenes tienen atributos alt para lectores de pantalla.',
  ],
  propDescriptions: {
    items: 'Array de items de avatar con src, alt y/o iniciales de respaldo.',
    max: 'Número máximo de avatares visibles.',
    size: 'Tamaño del avatar: sm, md o lg.',
    spacing: 'Espaciado de superposición: tight o normal.',
  },
};
