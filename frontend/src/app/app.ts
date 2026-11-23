import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Profile } from './profile';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Projects } from './sections/projects/projects';
import { Timeline } from './sections/timeline/timeline';
import { Skills } from './sections/skills/skills';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Hero, About, Projects, Timeline, Skills, Contact],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly profile = toSignal(inject(HttpClient).get<Profile>('/api/profile'));
}
