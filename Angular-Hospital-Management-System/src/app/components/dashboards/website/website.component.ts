import { Component } from '@angular/core';

@Component({
  selector: 'app-website',
  standalone: false,
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent {
  title = 'Hospital-Management';
  team = [
    { name: 'D Moulali Saheb', college: 'REVA University', role: 'Software Developer', image: 'images/one.jpg' },
    { name: 'N Indraneel', college: 'REVA University', role: 'Software Developer', image: 'images/two.jpg' },
    { name: 'S Chandrasekhar', college: 'REVA University', role: 'Software Developer', image: 'images/three.jpg' },
    { name: 'A Movin Reddy', college: 'REVA University', role: 'Software Developer', image: 'images/four.jpg' },
    { name: 'M Chetan Reddy', college: 'REVA University', role: 'Software Developer', image: 'images/five.jpg' },
  ];
}