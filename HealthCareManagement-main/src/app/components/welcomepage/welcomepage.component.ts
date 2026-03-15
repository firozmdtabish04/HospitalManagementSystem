import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PortalCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  route: string;
  badge: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface StatCard {
  value: string;
  label: string;
}

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {
  isMenuOpen = false;

  portals: PortalCard[] = [
    {
      title: 'Admin Portal',
      subtitle: 'Hospital Operations',
      description: 'Manage doctors, departments, scheduling, billing, analytics and system control.',
      image: 'assets/img/admin.png',
      icon: 'fa fa-briefcase',
      route: '/login',
      badge: 'Management'
    },
    {
      title: 'Doctor Portal',
      subtitle: 'Clinical Workflow',
      description: 'Access appointments, patient records, prescriptions, reports and treatment workflow.',
      image: 'assets/img/maledoctor.png',
      icon: 'fa fa-user-md',
      route: '/login',
      badge: 'Professional'
    },
    {
      title: 'Patient Portal',
      subtitle: 'Digital Healthcare',
      description: 'Book appointments, view doctors, track records, reports and healthcare services online.',
      image: 'assets/img/maleuser.png',
      icon: 'fa fa-user',
      route: '/login',
      badge: 'Self Service'
    }
  ];

  features: FeatureCard[] = [
    {
      icon: 'fa fa-calendar-check-o',
      title: 'Smart Appointment Scheduling',
      description: 'Digitally manage consultation slots, doctor availability and booking flow.'
    },
    {
      icon: 'fa fa-file-text-o',
      title: 'Electronic Medical Records',
      description: 'Securely maintain patient history, diagnosis, prescriptions and reports.'
    },
    {
      icon: 'fa fa-line-chart',
      title: 'Analytics & Monitoring',
      description: 'Track hospital activity, staff performance, patient flow and service insights.'
    },
    {
      icon: 'fa fa-shield',
      title: 'Secure Access Control',
      description: 'Role-based access with better security and controlled data visibility.'
    },
    {
      icon: 'fa fa-credit-card',
      title: 'Billing & Payments',
      description: 'Streamline billing workflow, invoices, payment history and financial tracking.'
    },
    {
      icon: 'fa fa-ambulance',
      title: 'Emergency Response Support',
      description: 'Support critical operations with faster information access and coordination.'
    }
  ];

  stats: StatCard[] = [
    { value: '25K+', label: 'Patients Served' },
    { value: '150+', label: 'Expert Doctors' },
    { value: '40+', label: 'Departments' },
    { value: '24/7', label: 'Emergency Support' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element)
    {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    this.isMenuOpen = false;
  }
}