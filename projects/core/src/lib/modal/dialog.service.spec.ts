import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DialogModule } from '@angular/cdk/dialog';
import { SnyDialogService } from './dialog.service';

@Component({
  standalone: true,
  template: `<div>Dialog Content</div>`,
})
class TestDialogComponent {}

describe('SnyDialogService', () => {
  let service: SnyDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule],
    });
    service = TestBed.inject(SnyDialogService);
  });

  afterEach(() => {
    service.closeAll();
  });

  it('should open a dialog', () => {
    const ref = service.open(TestDialogComponent);
    expect(ref).toBeTruthy();
    ref.close();
  });

  it('should close a dialog', async () => {
    const ref = service.open(TestDialogComponent);
    let closed = false;
    ref.closed.subscribe(() => (closed = true));
    ref.close();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(closed).toBe(true);
  });

  it('should close all dialogs', () => {
    service.open(TestDialogComponent);
    service.open(TestDialogComponent);
    service.closeAll();
  });

  it('should accept width config', () => {
    const ref = service.open(TestDialogComponent, { width: '600px' });
    expect(ref).toBeTruthy();
    ref.close();
  });
});
