import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactForm } from './contact-form';

interface Entry { period: string; role: string; company: string; description: string; }
interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string[];
  contact: { email: string; github: string; linkedin: string };
  skills: { label: string; items: string[] }[];
  experience: Entry[];
  education: Entry[];
  projects: { name: string; tagline: string; description: string; highlights: string[]; tech: string[]; url: string }[];
}

@Component({
  selector: 'app-root',
  imports: [ContactForm],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly profile = toSignal(inject(HttpClient).get<Profile>('/api/profile'));
  // Browser-Druckdialog → "Als PDF speichern"; das Layout kommt aus @media print in app.css
  protected print() { window.print(); }
}
