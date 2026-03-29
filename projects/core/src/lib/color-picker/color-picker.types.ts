export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface ColorPickerPreset {
  label?: string;
  colors: string[];
}
