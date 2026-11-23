import { Component, input } from '@angular/core';
import { Project } from '../../profile';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly projects = input.required<Project[]>();
}
