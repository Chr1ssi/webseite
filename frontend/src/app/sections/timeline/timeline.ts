import { Component, input } from '@angular/core';
import { Entry } from '../../profile';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline {
  readonly number = input.required<string>();
  readonly heading = input.required<string>();
  readonly entries = input.required<Entry[]>();
}
