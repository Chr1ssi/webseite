import { Component, input } from '@angular/core';
import { SkillGroup } from '../../profile';

@Component({
  selector: 'app-skills',
  template: `
    <section class="skills">
      <h2><span>05</span> Kenntnisse</h2>
      @for (g of groups(); track g.label) {
        <div class="skill-group">
          <span class="label">{{ g.label }}</span>
          <ul class="chips">@for (s of g.items; track s) { <li>{{ s }}</li> }</ul>
        </div>
      }
    </section>
  `,
  styles: `
    :host { display: block; }
    .skill-group { display: grid; grid-template-columns: 10rem 1fr; gap: 1rem; align-items: start; }
    .label { color: var(--muted); padding-top: .1rem; }
    @media (max-width: 40rem) { .skill-group { grid-template-columns: 1fr; gap: .1rem; } }
    @media print { .skill-group, .skills { break-inside: avoid; } }
  `,
})
export class Skills {
  readonly groups = input.required<SkillGroup[]>();
}
