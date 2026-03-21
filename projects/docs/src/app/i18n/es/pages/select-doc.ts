export const SELECT_DOC_ES = {
  title: 'Select',
  description: 'Muestra una lista de opciones para que el usuario elija.',
  userProfileForm: 'Formulario de Perfil de Usuario',
  accessibility: [
    'Usa un menú desplegable personalizado con semántica de <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="listbox"</code> y <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="option"</code>.',
    'Soporta navegación por teclado con las teclas de <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Flecha</code>, <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Enter</code> y <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Escape</code>.',
    'El estado deshabilitado se transmite mediante <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-disabled</code>.',
  ],
  propDescriptions: {
    options: 'Array de objetos { value, label }.',
    value: 'Valor seleccionado. Soporta enlace bidireccional.',
    placeholder: 'Texto de marcador de posición.',
    disabled: 'Si el selector está deshabilitado.',
    size: 'El tamaño del disparador del selector.',
  },
};
