import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'hospital-management';
  teamMembers = [
    {
      name: 'D Moulali Saheb',
      role: 'Team Leader',
      description: 'Specialized in Java.',
      image: 'assets/images/one.jpg'
    },
    {
      name: 'Dr. Jane Smith',
      role: 'Head of Surgery',
      description: 'Expert in General Surgery with 12 years of experience.',
      image: 'assets/images/two.jpg'
    },
    {
      name: 'Dr. Mike Johnson',
      role: 'Head of Pediatrics',
      description: 'Specialized in Child Care with 10 years of experience.',
      image: 'assets/images/three.jpg'
    },
    {
      name: 'Dr. Sarah Wilson',
      role: 'Head of Neurology',
      description: 'Expert in Neurological disorders with 14 years of experience.',
      image: 'assets/images/four.jpg'
    },
    {
      name: 'Dr. Robert Brown',
      role: 'Head of Oncology',
      description: 'Specialized in Cancer Treatment with 16 years of experience.',
      image: 'assets/images/five.jpg'
    }
  ];
}
