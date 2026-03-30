export const TAG_INPUT_DOC_ES = {
  title: 'Tag Input',
  description: 'Un input de texto que crea etiquetas removibles. Soporta separadores Enter/coma, validación, máximo de tags y formularios reactivos.',
  accessibility: [
    'Cada botón de eliminar tiene un aria-label con el nombre de la etiqueta.',
    'El input tiene aria-label para lectores de pantalla.',
    'Backspace en input vacío elimina la última etiqueta.',
  ],
  propDescriptions: {
    value: 'Array de strings de etiquetas (enlace bidireccional).',
    placeholder: 'Texto de marcador cuando no hay etiquetas.',
    maxTags: 'Número máximo de etiquetas permitidas.',
    allowDuplicates: 'Permitir etiquetas duplicadas.',
    removable: 'Mostrar botón de eliminar en cada etiqueta.',
    addOnBlur: 'Agregar texto actual como etiqueta al perder foco.',
    separators: 'Teclas que disparan la creación de etiquetas (por defecto: Enter, coma).',
    validate: 'Función de validación personalizada. Retorna false para rechazar la etiqueta.',
    disabled: 'Deshabilitar el input.',
    size: 'Variante de tamaño: sm, md o lg.',
    tagAdded: 'Se emite cuando se agrega una etiqueta.',
    tagRemoved: 'Se emite cuando se elimina una etiqueta.',
  },
};
