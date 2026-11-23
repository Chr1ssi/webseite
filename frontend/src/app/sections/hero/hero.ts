import { Component, input } from '@angular/core';
import { Profile } from '../../profile';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly profile = input.required<Profile>();
  // Browser-Druckdialog → "Als PDF speichern"; das Druck-Layout steht in den @media-print-Regeln der Abschnitte
  protected print() { window.print(); }
}
