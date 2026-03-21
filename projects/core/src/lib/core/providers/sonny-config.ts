import { type EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface SonnyConfig {
  prefix?: string;
  defaultTheme?: 'light' | 'dark' | 'corporate';
}

const DEFAULT_CONFIG: SonnyConfig = { prefix: 'sny', defaultTheme: 'light' };

export const SNY_CONFIG = new InjectionToken<SonnyConfig>('SNY_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_CONFIG,
});

export function provideSonnyUI(config: Partial<SonnyConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: SNY_CONFIG, useValue: { ...DEFAULT_CONFIG, ...config } },
  ]);
}
