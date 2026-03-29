import { Routes } from '@angular/router';

const docsChildren: Routes = [
  {
    path: '',
    redirectTo: 'getting-started/installation',
    pathMatch: 'full',
  },
  {
    path: 'getting-started/installation',
    loadComponent: () =>
      import('./pages/getting-started/installation').then((m) => m.InstallationComponent),
  },
  {
    path: 'getting-started/quick-start',
    loadComponent: () =>
      import('./pages/getting-started/quick-start').then((m) => m.QuickStartComponent),
  },
  {
    path: 'theming/overview',
    loadComponent: () =>
      import('./pages/theming/overview').then((m) => m.ThemingOverviewComponent),
  },
  {
    path: 'theming/dark-mode',
    loadComponent: () =>
      import('./pages/theming/dark-mode').then((m) => m.DarkModeComponent),
  },
  {
    path: 'theming/custom-themes',
    loadComponent: () =>
      import('./pages/theming/custom-themes').then((m) => m.CustomThemesComponent),
  },
  {
    path: 'components/button',
    loadComponent: () =>
      import('./pages/components/button-doc').then((m) => m.ButtonDocComponent),
  },
  {
    path: 'components/card',
    loadComponent: () =>
      import('./pages/components/card-doc').then((m) => m.CardDocComponent),
  },
  
  {
    path: 'components/toast',
    loadComponent: () =>
      import('./pages/components/toast-doc').then((m) => m.ToastDocComponent),
  },
  {
    path: 'components/modal',
    loadComponent: () =>
      import('./pages/components/modal-doc').then((m) => m.ModalDocComponent),
  },
  {
    path: 'components/accordion',
    loadComponent: () =>
      import('./pages/components/accordion-doc').then((m) => m.AccordionDocComponent),
  },
  {
    path: 'components/alert',
    loadComponent: () =>
      import('./pages/components/alert-doc').then((m) => m.AlertDocComponent),
  },
  {
    path: 'components/avatar',
    loadComponent: () =>
      import('./pages/components/avatar-doc').then((m) => m.AvatarDocComponent),
  },
  {
    path: 'components/badge',
    loadComponent: () =>
      import('./pages/components/badge-doc').then((m) => m.BadgeDocComponent),
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () =>
      import('./pages/components/breadcrumb-doc').then((m) => m.BreadcrumbDocComponent),
  },
  {
    path: 'components/button-group',
    loadComponent: () =>
      import('./pages/components/button-group-doc').then((m) => m.ButtonGroupDocComponent),
  },
  {
    path: 'components/checkbox',
    loadComponent: () =>
      import('./pages/components/checkbox-doc').then((m) => m.CheckboxDocComponent),
  },
  {
    path: 'components/color-picker',
    loadComponent: () =>
      import('./pages/components/color-picker-doc').then((m) => m.ColorPickerDocComponent),
  },
  {
    path: 'components/combobox',
    loadComponent: () =>
      import('./pages/components/combobox-doc').then((m) => m.ComboboxDocComponent),
  },
  {
    path: 'components/data-table',
    loadComponent: () =>
      import('./pages/components/data-table-doc').then((m) => m.DataTableDocComponent),
  },
  {
    path: 'components/date-picker',
    loadComponent: () =>
      import('./pages/components/date-picker-doc').then((m) => m.DatePickerDocComponent),
  },
  {
    path: 'components/date-range-picker',
    loadComponent: () =>
      import('./pages/components/date-range-picker-doc').then((m) => m.DateRangePickerDocComponent),
  },
  {
    path: 'components/dropdown',
    loadComponent: () =>
      import('./pages/components/dropdown-doc').then((m) => m.DropdownDocComponent),
  },
  {
    path: 'components/skeleton',
    loadComponent: () =>
      import('./pages/components/skeleton-doc').then((m) => m.SkeletonDocComponent),
  },
  {
    path: 'components/radio',
    loadComponent: () =>
      import('./pages/components/radio-doc').then((m) => m.RadioDocComponent),
  },
  {
    path: 'components/switch',
    loadComponent: () =>
      import('./pages/components/switch-doc').then((m) => m.SwitchDocComponent),
  },
  {
    path: 'components/toggle',
    loadComponent: () =>
      import('./pages/components/toggle-doc').then((m) => m.ToggleDocComponent),
  },
  {
    path: 'components/tooltip',
    loadComponent: () =>
      import('./pages/components/tooltip-doc').then((m) => m.TooltipDocComponent),
  },
  {
    path: 'components/slider',
    loadComponent: () =>
      import('./pages/components/slider-doc').then((m) => m.SliderDocComponent),
  },
  {
    path: 'components/loader',
    loadComponent: () =>
      import('./pages/components/loader-doc').then((m) => m.LoaderDocComponent),
  },
  {
    path: 'components/progress',
    loadComponent: () =>
      import('./pages/components/progress-doc').then((m) => m.ProgressDocComponent),
  },
  {
    path: 'components/tabs',
    loadComponent: () =>
      import('./pages/components/tabs-doc').then((m) => m.TabsDocComponent),
  },
  {
    path: 'components/select',
    loadComponent: () =>
      import('./pages/components/select-doc').then((m) => m.SelectDocComponent),
  },
  {
    path: 'components/table',
    loadComponent: () =>
      import('./pages/components/table-doc').then((m) => m.TableDocComponent),
  },
  {
    path: 'components/textarea',
    loadComponent: () =>
      import('./pages/components/textarea-doc').then((m) => m.TextareaDocComponent),
  },
  {
    path: 'components/sheet',
    loadComponent: () =>
      import('./pages/components/sheet-doc').then((m) => m.SheetDocComponent),
  },
  {
    path: 'components/fieldset',
    loadComponent: () =>
      import('./pages/components/fieldset-doc').then((m) => m.FieldsetDocComponent),
  },
  {
    path: 'components/file-input',
    loadComponent: () =>
      import('./pages/components/file-input-doc').then((m) => m.FileInputDocComponent),
  },
  {
    path: 'components/rating',
    loadComponent: () =>
      import('./pages/components/rating-doc').then((m) => m.RatingDocComponent),
  },
  {
    path: 'components/navbar',
    loadComponent: () =>
      import('./pages/components/navbar-doc').then((m) => m.NavbarDocComponent),
  },
  {
    path: 'components/drawer',
    loadComponent: () =>
      import('./pages/components/drawer-doc').then((m) => m.DrawerDocComponent),
  },
  {
    path: 'components/pagination',
    loadComponent: () =>
      import('./pages/components/pagination-doc').then((m) => m.PaginationDocComponent),
  },
  {
    path: 'components/divider',
    loadComponent: () =>
      import('./pages/components/divider-doc').then((m) => m.DividerDocComponent),
  },
  {
    path: 'components/steps',
    loadComponent: () =>
      import('./pages/components/steps-doc').then((m) => m.StepsDocComponent),
  },
  {
    path: 'components/stat',
    loadComponent: () =>
      import('./pages/components/stat-doc').then((m) => m.StatDocComponent),
  },
  {
    path: 'components/timeline',
    loadComponent: () =>
      import('./pages/components/timeline-doc').then((m) => m.TimelineDocComponent),
  },
  {
    path: 'components/kbd',
    loadComponent: () =>
      import('./pages/components/kbd-doc').then((m) => m.KbdDocComponent),
  },
  {
    path: 'components/list',
    loadComponent: () =>
      import('./pages/components/list-doc').then((m) => m.ListDocComponent),
  },
  {
    path: 'components/status',
    loadComponent: () =>
      import('./pages/components/status-doc').then((m) => m.StatusDocComponent),
  },
  {
    path: 'components/indicator',
    loadComponent: () =>
      import('./pages/components/indicator-doc').then((m) => m.IndicatorDocComponent),
  },
  {
    path: 'components/chat-bubble',
    loadComponent: () =>
      import('./pages/components/chat-bubble-doc').then((m) => m.ChatBubbleDocComponent),
  },
  {
    path: 'components/carousel',
    loadComponent: () =>
      import('./pages/components/carousel-doc').then((m) => m.CarouselDocComponent),
  },
  {
    path: 'components/dock',
    loadComponent: () =>
      import('./pages/components/dock-doc').then((m) => m.DockDocComponent),
  },
  {
    path: 'components/fab',
    loadComponent: () =>
      import('./pages/components/fab-doc').then((m) => m.FabDocComponent),
  },
  {
    path: 'components/radial-progress',
    loadComponent: () =>
      import('./pages/components/radial-progress-doc').then((m) => m.RadialProgressDocComponent),
  },
  {
    path: 'components/diff',
    loadComponent: () =>
      import('./pages/components/diff-doc').then((m) => m.DiffDocComponent),
  },
  {
    path: 'components/link',
    loadComponent: () =>
      import('./pages/components/link-doc').then((m) => m.LinkDocComponent),
  },
  {
    path: 'components/calendar',
    loadComponent: () =>
      import('./pages/components/calendar-doc').then((m) => m.CalendarDocComponent),
  },
  {
    path: 'components/validator',
    loadComponent: () =>
      import('./pages/components/validator-doc').then((m) => m.ValidatorDocComponent),
  },
  {
    path: 'schematics/ng-add',
    loadComponent: () =>
      import('./pages/schematics/ng-add').then((m) => m.NgAddComponent),
  },
  {
    path: 'schematics/copy-paste',
    loadComponent: () =>
      import('./pages/schematics/copy-paste').then((m) => m.CopyPasteComponent),
  },
  {
    path: 'contributing/development',
    loadComponent: () =>
      import('./pages/contributing/development').then((m) => m.DevelopmentComponent),
  },
  {
    path: 'changelog',
    loadComponent: () =>
      import('./pages/changelog').then((m) => m.ChangelogComponent),
  },
  {
    path: 'components/input',
    loadComponent: () =>
      import('./pages/components/input-doc').then((m) => m.InputDocComponent),
  },
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.HomeComponent),
  },
  {
    path: 'docs',
    children: docsChildren,
  },
  {
    path: 'es',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home').then((m) => m.HomeComponent),
      },
      {
        path: 'docs',
        children: docsChildren,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
