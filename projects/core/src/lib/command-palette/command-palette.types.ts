export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  group?: string;
  keywords?: string[];
  shortcut?: string;
  disabled?: boolean;
  action: () => void;
}

export interface CommandGroup {
  name: string;
  commands: Command[];
}

export interface CommandPaletteConfig {
  commands: Command[];
  placeholder?: string;
  emptyText?: string;
  width?: string;
}
