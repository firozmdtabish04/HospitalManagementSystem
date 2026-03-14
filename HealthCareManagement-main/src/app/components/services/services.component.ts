import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {

  constructor(private router: Router) { }

  // Services list
  services = [
    { title: 'Cardiology', text: 'Heart specialists for all ages.', icon: 'fa fa-heart', link: '/cardiology' },
    { title: 'Neurology', text: 'Brain and nervous system care.', icon: 'fa fa-bolt', link: '/neurology' },
    { title: 'Orthopedics', text: 'Bone and joint care.', icon: 'fa fa-user-md', link: '/orthopedics' },
    { title: 'Dentistry', text: 'Oral care & hygiene.', icon: 'fa fa-medkit', link: '/dentistry' },
    { title: 'Pediatrics', text: 'Caring for your little ones.', icon: 'fa fa-child', link: '/pediatrics' },
    { title: 'Oncology', text: 'Cancer treatment & support.', icon: 'fa fa-shield', link: '/oncology' },
    { title: 'Dermatology', text: 'Skin & hair care.', icon: 'fa fa-user', link: '/dermatology' },
    { title: 'Emergency', text: '24/7 emergency services.', icon: 'fa fa-ambulance', link: '/emergency' },
    { title: 'Radiology', text: 'Advanced imaging & diagnostics.', icon: 'fa fa-camera', link: '/radiology' },
    { title: 'Urology', text: 'Urinary & kidney care.', icon: 'fa fa-tint', link: '/urology' },
    { title: 'Gastroenterology', text: 'Digestive system specialists.', icon: 'fa fa-stethoscope', link: '/gastroenterology' },
    { title: 'Ophthalmology', text: 'Eye care and vision correction.', icon: 'fa fa-eye', link: '/ophthalmology' },
    { title: 'ENT', text: 'Ear, Nose & Throat care.', icon: 'fa fa-user-md', link: '/ent' },
    { title: 'Psychiatry', text: 'Mental health and counseling.', icon: 'fa fa-heartbeat', link: '/psychiatry' },
    { title: 'Physiotherapy', text: 'Rehabilitation therapy.', icon: 'fa fa-wheelchair', link: '/physiotherapy' },
    { title: 'Nephrology', text: 'Kidney care and dialysis.', icon: 'fa fa-tint', link: '/nephrology' },
    { title: 'Pulmonology', text: 'Respiratory system care.', icon: 'fa fa-heartbeat', link: '/pulmonology' },
    { title: 'Endocrinology', text: 'Hormone disorders.', icon: 'fa fa-flask', link: '/endocrinology' },
    { title: 'Plastic Surgery', text: 'Cosmetic procedures.', icon: 'fa fa-scissors', link: '/plasticsurgery' },
    { title: 'Nutrition', text: 'Diet & nutrition.', icon: 'fa fa-leaf', link: '/nutrition' },
    { title: 'Vaccination', text: 'Vaccination services.', icon: 'fa fa-shield', link: '/vaccination' },
    { title: 'Laboratory', text: 'Diagnostics & tests.', icon: 'fa fa-flask', link: '/laboratory' }
  ];

  // Reviews
  reviews = [
    {
      name: 'John Doe',
      designation: 'Patient',
      text: 'Excellent care and friendly staff.'
    },
    {
      name: 'Jane Smith',
      designation: 'Patient',
      text: 'Highly professional doctors.'
    },
    {
      name: 'Mark Wilson',
      designation: 'Patient',
      text: 'Great facilities and service.'
    }
  ];

  // Animation observer
  ngAfterViewInit(): void {

    const cards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting)
        {

          entry.target.classList.add('visible');

        }

      });

    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

  }

  // Scroll top
  scrollToTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  // Book appointment
  bookAppointment(serviceTitle: string): void {

    this.router.navigate(['/bookappointment'], {

      queryParams: {
        speciality: serviceTitle
      }

    });

  }

}
