import { Component, computed, input, signal } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';

@Component({
  selector: 'docs-code-block',
  standalone: true,
  template: `
    <div class="relative group rounded-lg border border-border bg-muted/30 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <span class="text-xs text-muted-foreground font-mono">{{ language() }}</span>
        <button
          (click)="copy()"
          class="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-sm hover:bg-accent"
        >
          {{ copied() ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <pre class="p-4 overflow-x-auto text-sm m-0"><code [innerHTML]="highlighted()"></code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');

  readonly copied = signal(false);

  readonly highlighted = computed(() => {
    const lang = this.language();
    const grammar = Prism.languages[lang] || Prism.languages['plaintext'];
    return Prism.highlight(this.code(), grammar, lang);
  });

  copy(): void {
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
