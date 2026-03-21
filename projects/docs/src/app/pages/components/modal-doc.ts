import { Component, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  SnyButtonDirective,
  SnyDialogService,
  SNY_DIALOG_DATA,
  SnyDialogContentDirective,
  SnyDialogHeaderDirective,
  SnyDialogTitleDirective,
  SnyDialogDescriptionDirective,
  SnyDialogFooterDirective,
  SnyInputDirective,
  SnyLabelDirective,
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardDescriptionDirective,
  SnyToastService,
} from 'core';

interface ProfileData {
  name: string;
  email: string;
}

@Component({
  selector: 'docs-modal-doc',
  standalone: true,
  imports: [
    CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyButtonDirective,
    SnyCardDirective, SnyCardHeaderDirective, SnyCardTitleDirective, SnyCardDescriptionDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Modal / Dialog</h1>
        <p class="text-muted-foreground mt-2">A modal dialog that interrupts the user with important content.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Dialog</h2>
        <docs-component-preview [code]="basicCode">
          <button snyBtn (click)="openBasic()">Open Dialog</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Confirmation Dialog</h2>
        <docs-component-preview [code]="confirmCode">
          <button snyBtn variant="destructive" (click)="openConfirm()">Delete Item</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <p class="text-sm text-muted-foreground">Real-world usage patterns with state management.</p>

        <h3 class="text-lg font-medium">Edit Form in Dialog</h3>
        <docs-component-preview [code]="editFormCode" language="typescript">
          <div class="space-y-3">
            <button snyBtn (click)="openEditProfile()">Edit Profile</button>
            @if (profile().name) {
              <div snyCard class="w-full max-w-sm">
                <div snyCardHeader>
                  <h3 snyCardTitle class="text-base">{{ profile().name }}</h3>
                  <p snyCardDescription>{{ profile().email }}</p>
                </div>
              </div>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <h3 class="text-lg font-medium">SnyDialogService</h3>
        <docs-props-table [props]="serviceProps" />
        <h3 class="text-lg font-medium mt-4">SnyDialogConfig</h3>
        <docs-props-table [props]="configProps" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Content directives</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyDialogContent</code> — Main container with styling</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyDialogHeader</code> — Header section</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyDialogTitle</code> — Dialog title</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyDialogDescription</code> — Description text</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyDialogFooter</code> — Footer with actions</li>
          <li><code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">snyDialogClose</code> — Close button</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Built on Angular CDK Dialog for robust focus management</li>
          <li>Traps focus within the dialog when open</li>
          <li>Closes on Escape key by default</li>
          <li>Supports <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">ariaLabelledBy</code> and <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">ariaDescribedBy</code></li>
        </ul>
      </section>
    </div>
  `,
})
export class ModalDocComponent {
  private readonly dialogService = inject(SnyDialogService);
  private readonly toastService = inject(SnyToastService);

  importCode = `import {
  SnyDialogService,
  SnyDialogContentDirective,
  SnyDialogHeaderDirective,
  SnyDialogTitleDirective,
  SnyDialogDescriptionDirective,
  SnyDialogFooterDirective,
  SnyDialogCloseDirective,
} from '@sonny-ui/core';`;

  basicCode = `const dialogService = inject(SnyDialogService);

dialogService.open(MyDialogComponent);`;

  confirmCode = `const ref = dialogService.open(ConfirmComponent, {
  width: '24rem',
});

ref.closed.subscribe(result => {
  if (result) {
    console.log('Confirmed');
  }
});`;

  serviceProps: PropDef[] = [
    { name: 'open(component, config?)', type: 'SnyDialogRef<R>', default: '-', description: 'Open a dialog with the given component.' },
    { name: 'closeAll()', type: 'void', default: '-', description: 'Close all open dialogs.' },
  ];

  configProps: PropDef[] = [
    { name: 'width', type: 'string', default: "'28rem'", description: 'Dialog width.' },
    { name: 'maxWidth', type: 'string', default: "'90vw'", description: 'Maximum dialog width.' },
    { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop.' },
    { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Close on Escape key.' },
    { name: 'data', type: 'unknown', default: '-', description: 'Data to inject into the dialog component.' },
    { name: 'ariaLabelledBy', type: 'string', default: '-', description: 'ID of the element labelling the dialog.' },
    { name: 'ariaDescribedBy', type: 'string', default: '-', description: 'ID of the element describing the dialog.' },
  ];

  // Examples state
  readonly profile = signal<ProfileData>({ name: 'Jane Doe', email: 'jane@example.com' });

  openEditProfile() {
    const ref = this.dialogService.open(EditProfileDialogComponent, {
      data: this.profile(),
    });
    ref.closed.subscribe(result => {
      if (result) {
        this.profile.set(result as ProfileData);
        this.toastService.success('Profile updated!');
      }
    });
  }

  editFormCode = `@Component({
  imports: [SnyButtonDirective, SnyCardDirective, SnyCardHeaderDirective,
            SnyCardTitleDirective, SnyCardDescriptionDirective],
  template: \`
    <div class="space-y-3">
      <button snyBtn (click)="openEditProfile()">Edit Profile</button>
      @if (profile().name) {
        <div snyCard class="w-full max-w-sm">
          <div snyCardHeader>
            <h3 snyCardTitle class="text-base">{{ profile().name }}</h3>
            <p snyCardDescription>{{ profile().email }}</p>
          </div>
        </div>
      }
    </div>
  \`,
})
export class EditProfileExample {
  private readonly dialogService = inject(SnyDialogService);
  private readonly toastService = inject(SnyToastService);
  readonly profile = signal<ProfileData>({ name: 'Jane Doe', email: 'jane@example.com' });

  openEditProfile() {
    const ref = this.dialogService.open(EditProfileDialogComponent, {
      data: this.profile(),
    });
    ref.closed.subscribe(result => {
      if (result) {
        this.profile.set(result as ProfileData);
        this.toastService.success('Profile updated!');
      }
    });
  }
}

@Component({
  imports: [ReactiveFormsModule, SnyDialogContentDirective, SnyDialogHeaderDirective,
            SnyDialogTitleDirective, SnyDialogDescriptionDirective, SnyDialogFooterDirective,
            SnyButtonDirective, SnyInputDirective, SnyLabelDirective],
  template: \`
    <div snyDialogContent>
      <div snyDialogHeader>
        <h2 snyDialogTitle>Edit Profile</h2>
        <p snyDialogDescription>Update your profile information.</p>
      </div>
      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4 py-4">
        <div class="space-y-2">
          <label snyLabel>Name</label>
          <input snyInput formControlName="name" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <label snyLabel>Email</label>
          <input snyInput formControlName="email" type="email" placeholder="you@example.com" />
        </div>
      </form>
      <div snyDialogFooter>
        <button snyBtn variant="outline" (click)="dialogRef.close()">Cancel</button>
        <button snyBtn (click)="save()" [disabled]="form.invalid">Save</button>
      </div>
    </div>
  \`,
})
class EditProfileDialogComponent {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject<ProfileData>(SNY_DIALOG_DATA);
  readonly form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}`;

  openBasic() {
    this.dialogService.open(BasicDialogComponent);
  }

  openConfirm() {
    const ref = this.dialogService.open(ConfirmDialogComponent, { width: '24rem' });
    ref.closed.subscribe((result) => {
      if (result) {
        console.log('Confirmed deletion');
      }
    });
  }
}

@Component({
  standalone: true,
  imports: [
    SnyDialogContentDirective,
    SnyDialogHeaderDirective,
    SnyDialogTitleDirective,
    SnyDialogDescriptionDirective,
    SnyDialogFooterDirective,
    SnyButtonDirective,
  ],
  template: `
    <div snyDialogContent>
      <div snyDialogHeader>
        <h2 snyDialogTitle>Basic Dialog</h2>
        <p snyDialogDescription>This is a basic dialog example.</p>
      </div>
      <p class="py-4 text-sm">Dialog content goes here. You can put any content you need.</p>
      <div snyDialogFooter>
        <button snyBtn variant="outline" (click)="dialogRef.close()">Cancel</button>
        <button snyBtn (click)="dialogRef.close()">Continue</button>
      </div>
    </div>
  `,
})
class BasicDialogComponent {
  readonly dialogRef = inject(DialogRef);
}

@Component({
  standalone: true,
  imports: [
    SnyDialogContentDirective,
    SnyDialogHeaderDirective,
    SnyDialogTitleDirective,
    SnyDialogDescriptionDirective,
    SnyDialogFooterDirective,
    SnyButtonDirective,
  ],
  template: `
    <div snyDialogContent>
      <div snyDialogHeader>
        <h2 snyDialogTitle>Are you sure?</h2>
        <p snyDialogDescription>This action cannot be undone. This will permanently delete the item.</p>
      </div>
      <div snyDialogFooter class="mt-4">
        <button snyBtn variant="outline" (click)="dialogRef.close(false)">Cancel</button>
        <button snyBtn variant="destructive" (click)="dialogRef.close(true)">Delete</button>
      </div>
    </div>
  `,
})
class ConfirmDialogComponent {
  readonly dialogRef = inject(DialogRef);
}

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SnyDialogContentDirective,
    SnyDialogHeaderDirective,
    SnyDialogTitleDirective,
    SnyDialogDescriptionDirective,
    SnyDialogFooterDirective,
    SnyButtonDirective,
    SnyInputDirective,
    SnyLabelDirective,
  ],
  template: `
    <div snyDialogContent>
      <div snyDialogHeader>
        <h2 snyDialogTitle>Edit Profile</h2>
        <p snyDialogDescription>Update your profile information.</p>
      </div>
      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4 py-4">
        <div class="space-y-2">
          <label snyLabel>Name</label>
          <input snyInput formControlName="name" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <label snyLabel>Email</label>
          <input snyInput formControlName="email" type="email" placeholder="you@example.com" />
        </div>
      </form>
      <div snyDialogFooter>
        <button snyBtn variant="outline" (click)="dialogRef.close()">Cancel</button>
        <button snyBtn (click)="save()" [disabled]="form.invalid">Save</button>
      </div>
    </div>
  `,
})
class EditProfileDialogComponent {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject<ProfileData>(SNY_DIALOG_DATA);
  readonly form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
