export type Locale = 'en' | 'es';

export interface NavTranslations {
  docs: string;
  components: string;
  github: string;
  searchPlaceholder: string;
  toggleSidebar: string;
}

export interface SearchTranslations {
  placeholder: string;
  noResults: string;
  navigate: string;
  open: string;
  close: string;
}

export interface SidebarSectionTranslation {
  title: string;
  items: { label: string; path: string }[];
}

export interface SharedTranslations {
  preview: string;
  code: string;
  copy: string;
  copied: string;
}

export interface DocSectionTranslations {
  import: string;
  usage: string;
  variants: string;
  sizes: string;
  states: string;
  examples: string;
  apiReference: string;
  accessibility: string;
  asLink: string;
  reactiveForms: string;
}

export interface PropsTableTranslations {
  prop: string;
  type: string;
  default: string;
  description: string;
}

export interface CommonTranslations {
  nav: NavTranslations;
  search: SearchTranslations;
  sidebar: SidebarSectionTranslation[];
  shared: SharedTranslations;
  docSections: DocSectionTranslations;
  propsTable: PropsTableTranslations;
}
