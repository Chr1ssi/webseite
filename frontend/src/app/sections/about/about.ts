import { Component, input } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="about">
      <h2><span>01</span> Über mich</h2>
      @for (para of paragraphs(); track $index) { <p>{{ para }}</p> }
    </section>
  `,
  styles: `
    :host { display: block; }
    .about p { font-size: 1.1rem; max-width: 46rem; color: var(--text); }
    @media print { .about p { font-size: 10pt; margin: 0 0 .4rem; } }
  `,
})
export class About {
  readonly paragraphs = input.required<string[]>();
}
