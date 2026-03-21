import { Injectable, signal, computed } from '@angular/core';
import type { ToastConfig, ToastData } from './toast.variants';

@Injectable({ providedIn: 'root' })
export class SnyToastService {
  private readonly _toasts = signal<ToastData[]>([]);
  private readonly _timers = new Map<string, ReturnType<typeof setTimeout>>();
  private _idCounter = 0;

  readonly toasts = this._toasts.asReadonly();
  readonly count = computed(() => this._toasts().length);

  show(config: ToastConfig): string {
    const id = `sny-toast-${++this._idCounter}`;
    const toast: ToastData = {
      id,
      variant: 'default',
      duration: 5000,
      ...config,
    };

    this._toasts.update(toasts => [...toasts, toast]);

    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), toast.duration);
      this._timers.set(id, timer);
    }

    return id;
  }

  dismiss(id: string): void {
    const timer = this._timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this._timers.delete(id);
    }
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  dismissAll(): void {
    for (const timer of this._timers.values()) {
      clearTimeout(timer);
    }
    this._timers.clear();
    this._toasts.set([]);
  }

  success(title: string, description?: string): string {
    return this.show({ title, description, variant: 'success' });
  }

  error(title: string, description?: string): string {
    return this.show({ title, description, variant: 'destructive' });
  }

  warning(title: string, description?: string): string {
    return this.show({ title, description, variant: 'warning' });
  }
}
