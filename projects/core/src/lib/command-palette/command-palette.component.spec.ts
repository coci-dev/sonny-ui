import { Component, inject } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SnyCommandPaletteService } from './command-palette.service';
import { SnyDialogService } from '../modal/dialog.service';
import type { Command } from './command-palette.types';

function createCommands(): Command[] {
  return [
    { id: 'light', label: 'Set Light Theme', group: 'Theme', action: vi.fn() },
    { id: 'dark', label: 'Set Dark Theme', group: 'Theme', action: vi.fn() },
    { id: 'home', label: 'Go to Home', group: 'Navigation', action: vi.fn(), shortcut: 'Ctrl+H' },
    { id: 'settings', label: 'Open Settings', group: 'Navigation', action: vi.fn(), description: 'Open the settings page' },
    { id: 'copy', label: 'Copy URL', action: vi.fn(), keywords: ['clipboard', 'link'] },
    { id: 'disabled', label: 'Disabled Command', disabled: true, action: vi.fn() },
  ];
}

@Component({
  standalone: true,
  template: `<button (click)="open()">Open</button>`,
})
class TestHostComponent {
  readonly service = inject(SnyCommandPaletteService);
  commands = createCommands();

  open(): void {
    this.service.open({ commands: this.commands });
  }
}

describe('SnyCommandPaletteComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [SnyDialogService, SnyCommandPaletteService],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function openPalette(): void {
    host.open();
    fixture.detectChanges();
  }

  function getPaletteEl(): HTMLElement | null {
    return document.querySelector('sny-command-palette');
  }

  function getButtons(): HTMLButtonElement[] {
    const el = getPaletteEl();
    return el ? Array.from(el.querySelectorAll('button[data-cmd-idx]')) as HTMLButtonElement[] : [];
  }

  function getInput(): HTMLInputElement | null {
    const el = getPaletteEl();
    return el ? el.querySelector('input') : null;
  }

  afterEach(() => {
    host.service.close();
    fixture.detectChanges();
  });

  it('should open the palette via service', () => {
    openPalette();
    expect(getPaletteEl()).not.toBeNull();
  });

  it('should prevent double open', () => {
    openPalette();
    host.open();
    fixture.detectChanges();
    const palettes = document.querySelectorAll('sny-command-palette');
    expect(palettes.length).toBe(1);
  });

  it('should render search input with placeholder', () => {
    openPalette();
    const input = getInput();
    expect(input).not.toBeNull();
    expect(input?.placeholder).toBe('Type a command...');
  });

  it('should render commands (excluding disabled)', () => {
    openPalette();
    const buttons = getButtons();
    // 6 commands minus 1 disabled = 5
    expect(buttons.length).toBe(5);
  });

  it('should render group headers', () => {
    openPalette();
    const el = getPaletteEl()!;
    const groups = el.querySelectorAll('.uppercase');
    const groupNames = Array.from(groups).map((g) => g.textContent?.trim());
    expect(groupNames).toContain('Theme');
    expect(groupNames).toContain('Navigation');
  });

  it('should filter commands by query', () => {
    openPalette();
    const input = getInput()!;
    input.value = 'dark';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const buttons = getButtons();
    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent).toContain('Set Dark Theme');
  });

  it('should filter by keywords', () => {
    openPalette();
    const input = getInput()!;
    input.value = 'clipboard';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const buttons = getButtons();
    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent).toContain('Copy URL');
  });

  it('should show empty state when no results', () => {
    openPalette();
    const input = getInput()!;
    input.value = 'xyznonexistent';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const el = getPaletteEl()!;
    expect(el.textContent).toContain('No results found.');
  });

  it('should render shortcuts', () => {
    openPalette();
    const el = getPaletteEl()!;
    const kbds = el.querySelectorAll('kbd');
    const texts = Array.from(kbds).map((k) => k.textContent?.trim());
    expect(texts).toContain('Ctrl+H');
  });

  it('should render descriptions', () => {
    openPalette();
    const el = getPaletteEl()!;
    expect(el.textContent).toContain('Open the settings page');
  });

  it('should execute command on click and close', () => {
    openPalette();
    const buttons = getButtons();
    buttons[0].click();
    fixture.detectChanges();

    expect(host.commands[0].action).toHaveBeenCalled();
    // Palette should be closed
    setTimeout(() => {
      expect(getPaletteEl()).toBeNull();
    });
  });

  it('should navigate with arrow keys', () => {
    openPalette();
    const el = getPaletteEl()!;

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    const buttons = getButtons();
    // Second button should be active
    expect(buttons[1].className).toContain('bg-accent');
  });
});
