import { TestBed } from '@angular/core/testing';
import { SnyToastService } from './toast.service';

describe('SnyToastService', () => {
  let service: SnyToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnyToastService);
  });

  it('should create a toast', () => {
    const id = service.show({ title: 'Test', duration: 0 });
    expect(id).toBeTruthy();
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].title).toBe('Test');
  });

  it('should create toast with variant', () => {
    service.show({ title: 'Error', variant: 'destructive', duration: 0 });
    expect(service.toasts()[0].variant).toBe('destructive');
  });

  it('should dismiss a toast', () => {
    const id = service.show({ title: 'Test', duration: 0 });
    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });

  it('should dismiss all toasts', () => {
    service.show({ title: 'Test 1', duration: 0 });
    service.show({ title: 'Test 2', duration: 0 });
    expect(service.toasts().length).toBe(2);
    service.dismissAll();
    expect(service.toasts().length).toBe(0);
  });

  it('should auto-dismiss after duration', async () => {
    service.show({ title: 'Test', duration: 50 });
    expect(service.toasts().length).toBe(1);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(service.toasts().length).toBe(0);
  });

  it('should provide success shortcut', () => {
    service.success('Done', 'Task completed');
    const toast = service.toasts()[0];
    expect(toast.variant).toBe('success');
    expect(toast.description).toBe('Task completed');
    service.dismiss(toast.id);
  });

  it('should provide error shortcut', () => {
    service.error('Failed');
    expect(service.toasts()[0].variant).toBe('destructive');
    service.dismissAll();
  });

  it('should provide warning shortcut', () => {
    service.warning('Caution');
    expect(service.toasts()[0].variant).toBe('warning');
    service.dismissAll();
  });

  it('should track count', () => {
    expect(service.count()).toBe(0);
    service.show({ title: 'A', duration: 0 });
    service.show({ title: 'B', duration: 0 });
    expect(service.count()).toBe(2);
  });
});
