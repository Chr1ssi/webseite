import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  template: `
    @if (status() === 'sent') {
      <p role="status">Danke für deine Nachricht! Ich melde mich bald.</p>
    } @else {
      <form [formGroup]="form" (ngSubmit)="send()">
        <label>Name <input formControlName="name" autocomplete="name" maxlength="100" /></label>
        <label>E-Mail <input formControlName="email" type="email" autocomplete="email" maxlength="200" /></label>
        <label>Nachricht <textarea formControlName="message" rows="6" maxlength="5000"></textarea></label>
        <!-- Honeypot: für Menschen versteckt -->
        <input formControlName="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <button type="submit" [disabled]="form.invalid || status() === 'sending'">Senden</button>
        @if (status() === 'error') { <p role="alert">Senden fehlgeschlagen. Bitte versuche es später erneut.</p> }
      </form>
    }
  `,
  styles: `
    form { display: grid; gap: 1rem; max-width: 40rem; }
    label { display: grid; gap: .35rem; color: var(--muted); font-size: .95rem; }
    input, textarea { font: inherit; color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: .6rem .75rem; }
    input:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent); }
    button { justify-self: start; font: inherit; font-weight: 600; cursor: pointer; color: var(--bg); background: var(--accent); border: 0; border-radius: 6px; padding: .6rem 1.4rem; }
    button:disabled { opacity: .45; cursor: not-allowed; }
    [role=status] { color: var(--accent); }
    [role=alert] { color: #ff7b72; margin: 0; }
    .hp { position: absolute; left: -9999px; }
  `,
})
export class ContactForm {
  private readonly http = inject(HttpClient);
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''],
  });

  protected send() {
    this.status.set('sending');
    this.http.post('/api/contact', this.form.getRawValue()).subscribe({
      next: () => this.status.set('sent'),
      error: () => this.status.set('error'),
    });
  }
}
