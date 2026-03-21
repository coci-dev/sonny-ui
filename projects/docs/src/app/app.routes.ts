import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.HomeComponent),
  },
  {
    path: 'docs',
    children: [
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
        path: 'components/input',
        loadComponent: () =>
          import('./pages/components/input-doc').then((m) => m.InputDocComponent),
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
        path: 'components/combobox',
        loadComponent: () =>
          import('./pages/components/combobox-doc').then((m) => m.ComboboxDocComponent),
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
        path: 'components/sheet',
        loadComponent: () =>
          import('./pages/components/sheet-doc').then((m) => m.SheetDocComponent),
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
    ],
  },
  { path: '**', redirectTo: '' },
];
