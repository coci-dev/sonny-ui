export const NG_ADD_ES = {
  title: 'ng add',
  description: 'Configura SonnyUI automáticamente en tu proyecto Angular.',
  usage: 'Uso',
  whatItDoes: 'Qué hace',
  whatItDoesDesc: 'El esquemático realiza los siguientes pasos:',
  steps: [
    { strong: 'Instala dependencias', text: ' — Agrega <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&#64;sonny-ui/core</code> a tu package.json.' },
    { strong: 'Importa el CSS del tema', text: ' — Agrega la importación del tema SonnyUI a tu hoja de estilos global.' },
    { strong: 'Configura Tailwind', text: ' — Agrega la directiva <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&#64;source</code> para que Tailwind escanee las clases de SonnyUI.' },
    { strong: 'Agrega el provider', text: ' — Agrega <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">provideSonnyUI()</code> a la configuración de tu app.' },
  ],
  options: 'Opciones',
  optionsList: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--project</code> — Nombre del proyecto destino (por defecto el proyecto principal)',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--theme</code> — Tema predeterminado: <code class="font-mono text-xs">light</code>, <code class="font-mono text-xs">dark</code>, o <code class="font-mono text-xs">corporate</code>',
  ],
  afterInstallation: 'Después de la instalación',
  afterInstallationDesc: 'Ya puedes usar los componentes de SonnyUI. Importa cualquier directiva y úsala en tus templates:',
};
