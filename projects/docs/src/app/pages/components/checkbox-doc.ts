import { Component, signal, computed } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { SnyCheckboxDirective, SnyLabelDirective } from 'core';

@Component({
  selector: 'docs-checkbox-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, SnyCheckboxDirective, SnyLabelDirective],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Checkbox</h1>
        <p class="text-muted-foreground mt-2">A control that allows the user to toggle between checked and not checked.</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Usage</h2>
        <docs-component-preview [code]="basicCode">
          <div class="flex items-center gap-2">
            <input type="checkbox" snyCheckbox id="terms" />
            <label snyLabel for="terms">Accept terms and conditions</label>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Sizes</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <input type="checkbox" snyCheckbox size="sm" id="cb-sm" />
              <label snyLabel for="cb-sm">Small</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" snyCheckbox size="md" id="cb-md" />
              <label snyLabel for="cb-md">Medium</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" snyCheckbox size="lg" id="cb-lg" />
              <label snyLabel for="cb-lg">Large</label>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Examples</h2>
        <h3 class="text-lg font-medium">Todo List</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-3 max-w-sm">
            <p class="text-sm text-muted-foreground">Completed: {{ completedCount() }} / {{ todos.length }}</p>
            @for (todo of todos; track todo.id) {
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  snyCheckbox
                  [id]="'todo-' + todo.id"
                  [checked]="todo.done()"
                  (change)="todo.done.set(!todo.done())"
                />
                <label
                  snyLabel
                  [for]="'todo-' + todo.id"
                  [class]="todo.done() ? 'line-through text-muted-foreground' : ''"
                >
                  {{ todo.text }}
                </label>
              </div>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">API Reference</h2>
        <docs-props-table [props]="props" />
      </section>
    </div>
  `,
})
export class CheckboxDocComponent {
  importCode = `import { SnyCheckboxDirective } from '@sonny-ui/core';`;
  basicCode = `<div class="flex items-center gap-2">
  <input type="checkbox" snyCheckbox id="terms" />
  <label snyLabel for="terms">Accept terms</label>
</div>`;
  sizesCode = `<input type="checkbox" snyCheckbox size="sm" />
<input type="checkbox" snyCheckbox size="md" />
<input type="checkbox" snyCheckbox size="lg" />`;
  exampleCode = `todos = [
  { id: 1, text: 'Buy groceries', done: signal(false) },
  { id: 2, text: 'Walk the dog', done: signal(true) },
];
completedCount = computed(() => this.todos.filter(t => t.done()).length);

<input type="checkbox" snyCheckbox [checked]="todo.done()"
       (change)="todo.done.set(!todo.done())" />`;

  todos = [
    { id: 1, text: 'Buy groceries', done: signal(false) },
    { id: 2, text: 'Walk the dog', done: signal(true) },
    { id: 3, text: 'Read a book', done: signal(false) },
    { id: 4, text: 'Write code', done: signal(true) },
  ];

  readonly completedCount = computed(() => this.todos.filter(t => t.done()).length);

  props: PropDef[] = [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the checkbox.' },
    { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes to apply.' },
  ];
}
