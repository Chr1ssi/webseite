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
    @media print { :host { display: none; } } /* Freitext nur auf der Webseite */
  `,
})
export class About {
  readonly paragraphs = input.required<string[]>();
}
