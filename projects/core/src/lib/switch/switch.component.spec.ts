import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SnySwitchComponent } from './switch.component';

@Component({
  standalone: true,
  imports: [SnySwitchComponent],
  template: `<sny-switch [(checked)]="checked" [disabled]="disabled()" />`,
})
class TestHostComponent {
  checked = signal(false);
  disabled = signal(false);
}

describe('SnySwitchComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should have switch role', () => {
    expect(button.getAttribute('role')).toBe('switch');
  });

  it('should be unchecked by default', () => {
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(button.className).toContain('bg-input');
  });

  it('should toggle on click', () => {
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.className).toContain('bg-primary');
  });

  it('should not toggle when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
  });
});
