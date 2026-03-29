import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyOtpInputComponent, SnyButtonDirective } from 'core';
import { I18nService } from '../../i18n/i18n.service';
import { OTP_INPUT_DOC_EN } from '../../i18n/en/pages/otp-input-doc';
import { OTP_INPUT_DOC_ES } from '../../i18n/es/pages/otp-input-doc';

@Component({
  selector: 'docs-otp-input-doc',
  standalone: true,
  imports: [
    CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent,
    SnyOtpInputComponent, SnyButtonDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
        <docs-component-preview [code]="basicCode" language="markup">
          <div class="space-y-2 text-center">
            <sny-otp-input [(value)]="basicOtp" [autoFocus]="false" />
            <p class="text-sm text-muted-foreground">Value: {{ basicOtp() || '(empty)' }}</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().fourDigits }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().fourDigitsDesc }}</p>
        <docs-component-preview [code]="fourCode" language="markup">
          <sny-otp-input [(value)]="fourOtp" [length]="4" [autoFocus]="false" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().alphanumeric }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().alphanumericDesc }}</p>
        <docs-component-preview [code]="alphaCode" language="markup">
          <sny-otp-input [(value)]="alphaOtp" type="alphanumeric" [autoFocus]="false" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().masked }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().maskedDesc }}</p>
        <docs-component-preview [code]="maskCode" language="markup">
          <sny-otp-input [(value)]="maskOtp" [mask]="true" [length]="4" [autoFocus]="false" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().withSeparator }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().withSeparatorDesc }}</p>
        <docs-component-preview [code]="sepCode" language="markup">
          <sny-otp-input [(value)]="sepOtp" [separator]="3" [autoFocus]="false" />
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().fullExample }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().fullExampleDesc }}</p>
        <docs-component-preview [code]="fullCode" language="typescript">
          <div class="space-y-3 text-center">
            <p class="text-sm font-medium">Enter verification code</p>
            <sny-otp-input
              [(value)]="fullOtp"
              [length]="6"
              [separator]="3"
              [status]="otpStatus()"
              [autoFocus]="false"
              (completed)="onCompleted($event)"
            />
            @if (otpStatus() === 'loading') {
              <p class="text-sm text-muted-foreground">Verifying...</p>
            } @else if (otpStatus() === 'success') {
              <p class="text-sm text-green-600 font-medium">Code verified successfully!</p>
            } @else if (otpStatus() === 'error') {
              <p class="text-sm text-destructive">Invalid code. Try 123456.</p>
            }
            <div class="flex justify-center gap-2">
              <button snyBtn size="sm" [disabled]="fullOtp().length < 6 || otpStatus() === 'loading'" (click)="verify()">Verify</button>
              <button snyBtn variant="outline" size="sm" (click)="reset()">Reset</button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class OtpInputDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? OTP_INPUT_DOC_ES : OTP_INPUT_DOC_EN));

  readonly basicOtp = signal('');
  readonly fourOtp = signal('');
  readonly alphaOtp = signal('');
  readonly maskOtp = signal('');
  readonly sepOtp = signal('');
  readonly fullOtp = signal('');
  readonly otpStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  onCompleted(code: string): void {
    console.log('OTP completed:', code);
  }

  async verify(): Promise<void> {
    this.otpStatus.set('loading');
    await new Promise((r) => setTimeout(r, 1500));
    // Simulate: code "123456" succeeds, anything else fails
    if (this.fullOtp() === '123456') {
      this.otpStatus.set('success');
    } else {
      this.otpStatus.set('error');
      setTimeout(() => this.otpStatus.set('idle'), 2000);
    }
  }

  reset(): void {
    this.fullOtp.set('');
    this.otpStatus.set('idle');
  }

  importCode = `import { SnyOtpInputComponent } from '@sonny-ui/core';`;
  basicCode = `<sny-otp-input [(value)]="otp" />`;
  fourCode = `<sny-otp-input [(value)]="otp" [length]="4" />`;
  alphaCode = `<sny-otp-input [(value)]="otp" type="alphanumeric" />`;
  maskCode = `<sny-otp-input [(value)]="otp" [mask]="true" [length]="4" />`;
  sepCode = `<sny-otp-input [(value)]="otp" [separator]="3" />`;

  fullCode = `import { Component, signal } from '@angular/core';
import { SnyOtpInputComponent, SnyButtonDirective } from '@sonny-ui/core';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [SnyOtpInputComponent, SnyButtonDirective],
  template: \\\`
    <p>Enter verification code</p>
    <sny-otp-input
      [(value)]="otp"
      [length]="6"
      [separator]="3"
      [status]="status()"
      (completed)="onCompleted($event)"
    />
    <button snyBtn (click)="verify()">Verify</button>
    <button snyBtn variant="outline" (click)="reset()">Reset</button>
  \\\`,
})
export class OtpVerifyComponent {
  readonly otp = signal('');
  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  onCompleted(code: string) {
    console.log('Code:', code);
  }

  async verify() {
    this.status.set('loading');
    await new Promise(r => setTimeout(r, 1500));
    // Your API call here
    this.status.set(this.otp() === '123456' ? 'success' : 'error');
  }

  reset() {
    this.otp.set('');
    this.status.set('idle');
  }
}`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'value', type: 'string', default: "''", description: this.t().propDescriptions.value },
    { name: 'length', type: 'number', default: '6', description: this.t().propDescriptions.length },
    { name: 'type', type: "'number' | 'alphanumeric'", default: "'number'", description: this.t().propDescriptions.type },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'mask', type: 'boolean', default: 'false', description: this.t().propDescriptions.mask },
    { name: 'autoFocus', type: 'boolean', default: 'true', description: this.t().propDescriptions.autoFocus },
    { name: 'placeholder', type: 'string', default: "''", description: this.t().propDescriptions.placeholder },
    { name: 'separator', type: 'number | null', default: 'null', description: this.t().propDescriptions.separator },
    { name: 'status', type: "'idle' | 'loading' | 'success' | 'error'", default: "'idle'", description: 'Verification status. Controls visual feedback: loading disables inputs, success shows green borders, error shows red borders.' },
    { name: 'completed', type: 'output<string>', default: '—', description: this.t().propDescriptions.completed },
  ]);
}
