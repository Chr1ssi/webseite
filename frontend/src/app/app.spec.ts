import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('rendert das Profil aus /api/profile', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne('/api/profile').flush({
      name: 'Max Muster', title: 'Dev', tagline: '', about: ['Hallo'], contact: { email: 'a@b.c', github: '', linkedin: '' },
      skills: [{ label: 'Gute Kenntnisse', items: ['Kotlin'] }], experience: [], education: [], projects: [],
    });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Max Muster');
    expect(el.querySelector('.skills')?.textContent).toContain('Kotlin');
  });
});
