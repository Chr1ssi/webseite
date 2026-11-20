import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ContactForm],
    providers: [provideHttpClient(), provideHttpClientTesting()],
  }));

  it('schickt das Formular an /api/contact und zeigt Danke', async () => {
    const fixture = TestBed.createComponent(ContactForm);
    const el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
    expect(el.querySelector('button')?.disabled).toBe(true);

    const fill = (sel: string, v: string) => {
      const i = el.querySelector(sel) as HTMLInputElement;
      i.value = v; i.dispatchEvent(new Event('input'));
    };
    fill('[formControlName=name]', 'Max');
    fill('[formControlName=email]', 'max@example.com');
    fill('[formControlName=message]', 'Hallo');
    await fixture.whenStable();
    el.querySelector('button')!.click();

    const req = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(req.request.body).toEqual({ name: 'Max', email: 'max@example.com', message: 'Hallo', website: '' });
    req.flush(null, { status: 204, statusText: 'No Content' });
    await fixture.whenStable();
    expect(el.textContent).toContain('Danke');
  });
});
