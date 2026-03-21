import { Component, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyInputDirective, SnyLabelDirective, SnyButtonDirective } from 'core';

@Component({
  selector: 'docs-input-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyInputDirective, SnyLabelDirective, SnyButtonDirective, ReactiveFormsModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Input</h1>
        <p class="text-muted-foreground mt-2">Displays a form input field.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <input snyInput placeholder="Enter your email" class="max-w-sm" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">With Label</h2>
        <docs-component-preview [code]="labelCode">
          <div class="space-y-2 w-full max-w-sm">
            <label snyLabel>Email</label>
            <input snyInput type="email" placeholder="you&#64;example.com" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-3 w-full max-w-sm">
            <input snyInput placeholder="Default" />
            <input snyInput variant="error" placeholder="Error state" />
            <input snyInput variant="success" placeholder="Success state" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizes</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="space-y-3 w-full max-w-sm">
            <input snyInput inputSize="sm" placeholder="Small" />
            <input snyInput inputSize="md" placeholder="Medium" />
            <input snyInput inputSize="lg" placeholder="Large" />
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Disabled</h2>
        <docs-component-preview [code]="disabledCode">
          <input snyInput disabled placeholder="Disabled input" class="max-w-sm" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <p class="text-sm text-muted-foreground">Real-world usage patterns with state management.</p>

        <h3 class="text-lg font-medium">Form with Reactive Validation</h3>
        <docs-component-preview [code]="validationFormCode" language="typescript">
          <form class="space-y-4 w-full max-w-sm" (ngSubmit)="onSubmit()">
            <div class="space-y-2">
              <label snyLabel [variant]="emailVariant()">Email</label>
              <input
                snyInput
                type="email"
                placeholder="you&#64;example.com"
                [variant]="emailVariant()"
                [formControl]="email"
              />
              @if (email.touched && email.invalid) {
                <p class="text-xs text-destructive">Please enter a valid email address.</p>
              }
            </div>
            <div class="space-y-2">
              <label snyLabel [variant]="messageVariant()">Message</label>
              <textarea
                snyInput
                placeholder="Your message..."
                rows="3"
                [variant]="messageVariant()"
                [formControl]="message"
              ></textarea>
              <p class="text-xs text-muted-foreground">{{ message.value?.length || 0 }}/500 characters</p>
            </div>
            <button snyBtn type="submit" [disabled]="!email.valid || !message.valid">
              Send Message
            </button>
            @if (submitted()) {
              <p class="text-sm text-green-600">Message sent successfully!</p>
            }
          </form>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">SnyInputDirective</h3>
        <docs-props-table [props]="inputProps" />
        <h3 class="text-lg font-medium mt-4">SnyLabelDirective</h3>
        <docs-props-table [props]="labelProps" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Sets <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-invalid</code> when variant is "error"</li>
          <li>Supports <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-describedby</code> for error messages</li>
          <li>Works with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;input&gt;</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;textarea&gt;</code></li>
        </ul>
      </section>
    </div>
  `,
})
export class InputDocComponent {
  importCode = `import { SnyInputDirective, SnyLabelDirective } from '@sonny-ui/core';`;

  basicCode = `<input snyInput placeholder="Enter your email" />`;

  labelCode = `<label snyLabel>Email</label>
<input snyInput type="email" placeholder="you@example.com" />`;

  variantsCode = `<input snyInput placeholder="Default" />
<input snyInput variant="error" placeholder="Error state" />
<input snyInput variant="success" placeholder="Success state" />`;

  sizesCode = `<input snyInput inputSize="sm" placeholder="Small" />
<input snyInput inputSize="md" placeholder="Medium" />
<input snyInput inputSize="lg" placeholder="Large" />`;

  disabledCode = `<input snyInput disabled placeholder="Disabled input" />`;

  // Examples state
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly message = new FormControl('', [Validators.required, Validators.maxLength(500)]);
  readonly submitted = signal(false);

  // toSignal(control.events) converts FormControl events to a signal so computed() re-evaluates
  private readonly emailEvents = toSignal(this.email.events);
  private readonly messageEvents = toSignal(this.message.events);

  readonly emailVariant = computed((): 'default' | 'error' | 'success' => {
    this.emailEvents(); // track form control changes
    if (!this.email.touched) return 'default';
    return this.email.valid ? 'success' : 'error';
  });

  readonly messageVariant = computed((): 'default' | 'error' | 'success' => {
    this.messageEvents(); // track form control changes
    if (!this.message.touched) return 'default';
    return this.message.valid ? 'success' : 'error';
  });

  onSubmit() {
    if (this.email.valid && this.message.valid) {
      this.submitted.set(true);
      setTimeout(() => this.submitted.set(false), 3000);
      this.email.reset();
      this.message.reset();
    }
  }

  validationFormCode = `@Component({
  imports: [ReactiveFormsModule, SnyInputDirective, SnyLabelDirective, SnyButtonDirective],
  template: \`
    <form class="space-y-4 w-full max-w-sm" (ngSubmit)="onSubmit()">
      <div class="space-y-2">
        <label snyLabel [variant]="emailVariant()">Email</label>
        <input snyInput type="email" placeholder="you@example.com"
               [variant]="emailVariant()" [formControl]="email" />
        @if (email.touched && email.invalid) {
          <p class="text-xs text-destructive">Please enter a valid email address.</p>
        }
      </div>
      <div class="space-y-2">
        <label snyLabel [variant]="messageVariant()">Message</label>
        <textarea snyInput placeholder="Your message..." rows="3"
                  [variant]="messageVariant()" [formControl]="message"></textarea>
        <p class="text-xs text-muted-foreground">{{ message.value?.length || 0 }}/500 characters</p>
      </div>
      <button snyBtn type="submit" [disabled]="!email.valid || !message.valid">Send Message</button>
      @if (submitted()) {
        <p class="text-sm text-green-600">Message sent successfully!</p>
      }
    </form>
  \`,
})
export class ContactFormExample {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly message = new FormControl('', [Validators.required, Validators.maxLength(500)]);
  readonly submitted = signal(false);

  // toSignal converts FormControl events into signals so computed() re-evaluates on form changes
  private readonly emailEvents = toSignal(this.email.events);
  private readonly messageEvents = toSignal(this.message.events);

  readonly emailVariant = computed((): 'default' | 'error' | 'success' => {
    this.emailEvents(); // track form control changes
    if (!this.email.touched) return 'default';
    return this.email.valid ? 'success' : 'error';
  });

  readonly messageVariant = computed((): 'default' | 'error' | 'success' => {
    this.messageEvents(); // track form control changes
    if (!this.message.touched) return 'default';
    return this.message.valid ? 'success' : 'error';
  });

  onSubmit() {
    if (this.email.valid && this.message.valid) {
      this.submitted.set(true);
      setTimeout(() => this.submitted.set(false), 3000);
      this.email.reset();
      this.message.reset();
    }
  }
}`;

  inputProps: PropDef[] = [
    { name: 'variant', type: "'default' | 'error' | 'success'", default: "'default'", description: 'The visual state of the input.' },
    { name: 'inputSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the input.' },
    { name: 'ariaDescribedBy', type: 'string', default: "''", description: 'ID of the element describing the input.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];

  labelProps: PropDef[] = [
    { name: 'variant', type: "'default' | 'error' | 'success'", default: "'default'", description: 'Matches the input variant for consistent styling.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
