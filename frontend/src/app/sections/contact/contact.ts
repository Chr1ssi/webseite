import { Component } from '@angular/core';
import { ContactForm } from './contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactForm],
  template: `
    <section id="kontakt" class="contact">
      <h2><span>06</span> Kontakt</h2>
      <p>Interesse an einem Gespräch? Schreib mir – ich antworte in der Regel innerhalb von ein, zwei Tagen.</p>
      <app-contact-form />
    </section>
  `,
  styles: `
    :host { display: block; }
    .contact > p { color: var(--muted); max-width: 40rem; }
    @media print { :host { display: none; } } /* ein Formular gehört nicht in den Lebenslauf */
  `,
})
export class Contact {}
