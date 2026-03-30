export const NUMBER_INPUT_DOC_ES = {
  title: 'Number Input',
  description: 'Un input numérico con botones de incremento/decremento, límites mín/máx, paso y soporte de teclado.',
  accessibility: [
    'Usa <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="spinbutton"</code> con aria-valuemin, aria-valuemax, aria-valuenow.',
    'Las teclas Flecha Arriba/Abajo incrementan/decrementan el valor.',
    'Los botones tienen aria-label para lectores de pantalla.',
  ],
  propDescriptions: {
    value: 'El valor numérico (enlace bidireccional).',
    min: 'Valor mínimo permitido.',
    max: 'Valor máximo permitido.',
    step: 'Paso de incremento/decremento.',
    disabled: 'Deshabilitar el input.',
    size: 'Variante de tamaño: sm, md o lg.',
    placeholder: 'Texto de marcador.',
  },
};
