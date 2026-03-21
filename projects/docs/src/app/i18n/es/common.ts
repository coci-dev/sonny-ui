import type { CommonTranslations } from '../i18n.types';

export const COMMON_ES: CommonTranslations = {
  nav: {
    docs: 'Docs',
    components: 'Componentes',
    github: 'GitHub',
    searchPlaceholder: 'Buscar docs...',
    alpha: 'alpha',
    toggleSidebar: 'Alternar barra lateral',
  },
  search: {
    placeholder: 'Buscar docs...',
    noResults: 'No se encontraron resultados.',
    navigate: 'Navegar',
    open: 'Abrir',
    close: 'Cerrar',
  },
  sidebar: [
    {
      title: 'Primeros Pasos',
      items: [
        { label: 'Instalación', path: '/es/docs/getting-started/installation' },
        { label: 'Inicio Rápido', path: '/es/docs/getting-started/quick-start' },
      ],
    },
    {
      title: 'Temas',
      items: [
        { label: 'Descripción General', path: '/es/docs/theming/overview' },
        { label: 'Modo Oscuro', path: '/es/docs/theming/dark-mode' },
        { label: 'Temas Personalizados', path: '/es/docs/theming/custom-themes' },
      ],
    },
    {
      title: 'Componentes',
      items: [
        { label: 'Accordion', path: '/es/docs/components/accordion' },
        { label: 'Avatar', path: '/es/docs/components/avatar' },
        { label: 'Badge', path: '/es/docs/components/badge' },
        { label: 'Breadcrumb', path: '/es/docs/components/breadcrumb' },
        { label: 'Button', path: '/es/docs/components/button' },
        { label: 'Button Group', path: '/es/docs/components/button-group' },
        { label: 'Card', path: '/es/docs/components/card' },
        { label: 'Checkbox', path: '/es/docs/components/checkbox' },
        { label: 'Combobox', path: '/es/docs/components/combobox' },
        { label: 'Input', path: '/es/docs/components/input' },
        { label: 'Loader', path: '/es/docs/components/loader' },
        { label: 'Modal', path: '/es/docs/components/modal' },
        { label: 'Radio', path: '/es/docs/components/radio' },
        { label: 'Select', path: '/es/docs/components/select' },
        { label: 'Sheet', path: '/es/docs/components/sheet' },
        { label: 'Skeleton', path: '/es/docs/components/skeleton' },
        { label: 'Slider', path: '/es/docs/components/slider' },
        { label: 'Switch', path: '/es/docs/components/switch' },
        { label: 'Table', path: '/es/docs/components/table' },
        { label: 'Tabs', path: '/es/docs/components/tabs' },
        { label: 'Toast', path: '/es/docs/components/toast' },
        { label: 'Toggle', path: '/es/docs/components/toggle' },
      ],
    },
    {
      title: 'Esquemáticos',
      items: [
        { label: 'ng add', path: '/es/docs/schematics/ng-add' },
        { label: 'Copiar y Pegar', path: '/es/docs/schematics/copy-paste' },
      ],
    },
    {
      title: 'Contribuir',
      items: [{ label: 'Desarrollo', path: '/es/docs/contributing/development' }],
    },
  ],
  shared: {
    preview: 'Vista Previa',
    code: 'Código',
    copy: 'Copiar',
    copied: '¡Copiado!',
  },
  docSections: {
    import: 'Importar',
    usage: 'Uso',
    variants: 'Variantes',
    sizes: 'Tamaños',
    states: 'Estados',
    examples: 'Ejemplos',
    apiReference: 'Referencia de API',
    accessibility: 'Accesibilidad',
    asLink: 'Como Enlace',
  },
  propsTable: {
    prop: 'Prop',
    type: 'Tipo',
    default: 'Predeterminado',
    description: 'Descripción',
  },
};
