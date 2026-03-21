export const NG_ADD_EN = {
  title: 'ng add',
  description: 'Automatically set up SonnyUI in your Angular project.',
  usage: 'Usage',
  whatItDoes: 'What it does',
  whatItDoesDesc: 'The schematic performs the following steps:',
  steps: [
    { strong: 'Installs dependencies', text: ' — Adds <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&#64;sonny-ui/core</code> to your package.json.' },
    { strong: 'Imports theme CSS', text: ' — Adds the SonnyUI theme import to your global stylesheet.' },
    { strong: 'Configures Tailwind', text: ' — Adds the <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&#64;source</code> directive so Tailwind scans SonnyUI classes.' },
    { strong: 'Adds provider', text: ' — Adds <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">provideSonnyUI()</code> to your app config.' },
  ],
  options: 'Options',
  optionsList: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--project</code> — Target project name (defaults to the default project)',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--theme</code> — Default theme: <code class="font-mono text-xs">light</code>, <code class="font-mono text-xs">dark</code>, or <code class="font-mono text-xs">corporate</code>',
  ],
  afterInstallation: 'After installation',
  afterInstallationDesc: 'You\'re ready to use SonnyUI components. Import any directive and use it in your templates:',
};
