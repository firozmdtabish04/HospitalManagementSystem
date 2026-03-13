import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  hospitalName = "Our Care Hospital";

  establishedYear = 2002;

  teamSize = 120;

  coreValues = [
    "Compassion",
    "Integrity",
    "Excellence",
    "Innovation"
  ];

  get yearsOfService(): number {
    return new Date().getFullYear() - this.establishedYear;
  }

}
