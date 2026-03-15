import { Component } from '@angular/core';

interface AboutStat {
  label: string;
  value: string;
  icon: string;
  description: string;
}

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface LeadershipItem {
  name: string;
  role: string;
  image: string;
}

interface QualityItem {
  title: string;
  status: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  hospitalName = 'Our Care Hospital';
  establishedYear = 2002;
  teamSize = 120;

  heroBadge = 'Trusted Multi-Speciality Healthcare';
  location = 'Bhubaneswar, Odisha';
  supportAvailability = '24/7 Emergency & Patient Support';

  get yearsOfService(): number {
    return new Date().getFullYear() - this.establishedYear;
  }

  coreValues: ValueItem[] = [
    {
      title: 'Compassion',
      description: 'We treat every patient with empathy, dignity, and human-centered care.',
      icon: 'fa fa-heart'
    },
    {
      title: 'Integrity',
      description: 'We follow ethical medical practices with honesty and accountability.',
      icon: 'fa fa-shield'
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in treatment, safety, and service.',
      icon: 'fa fa-star'
    },
    {
      title: 'Innovation',
      description: 'We adopt modern healthcare systems and technology for better outcomes.',
      icon: 'fa fa-lightbulb-o'
    }
  ];

  highlights: AboutStat[] = [
    {
      label: 'Medical Experts',
      value: `${this.teamSize}+`,
      icon: 'fa fa-user-md',
      description: 'Experienced doctors, nurses, and specialists'
    },
    {
      label: 'Years of Service',
      value: `${this.yearsOfService}+`,
      icon: 'fa fa-hospital-o',
      description: 'Serving patients with trust since inception'
    },
    {
      label: 'Patients Served',
      value: '50K+',
      icon: 'fa fa-users',
      description: 'Successful consultations and treatment journeys'
    },
    {
      label: 'Departments',
      value: '22+',
      icon: 'fa fa-stethoscope',
      description: 'Comprehensive care across multiple specialities'
    }
  ];

  qualityIndicators: QualityItem[] = [
    {
      title: 'Patient Safety Protocols',
      status: 'Strong',
      icon: 'fa fa-check-circle'
    },
    {
      title: 'Emergency Readiness',
      status: '24/7 Active',
      icon: 'fa fa-ambulance'
    },
    {
      title: 'Digital Healthcare Workflow',
      status: 'Enabled',
      icon: 'fa fa-laptop'
    },
    {
      title: 'Care Coordination',
      status: 'Integrated',
      icon: 'fa fa-sitemap'
    }
  ];

  timeline: TimelineItem[] = [
    {
      year: '2002',
      title: 'Hospital Founded',
      description: 'Started with a mission to provide dependable and compassionate healthcare.'
    },
    {
      year: '2009',
      title: 'Expanded Specialist Services',
      description: 'Introduced advanced departments for heart care, orthopedics, and diagnostics.'
    },
    {
      year: '2016',
      title: 'Technology Modernization',
      description: 'Adopted digital patient workflows, reporting systems, and service coordination.'
    },
    {
      year: '2023',
      title: 'Enterprise Care Experience',
      description: 'Strengthened patient support, appointment systems, and integrated care operations.'
    }
  ];

  leadershipTeam: LeadershipItem[] = [
    {
      name: 'Tabish Firoz',
      role: 'Managing Director',
      image: 'assets/img/tabish.jpg'
    },
    {
      name: 'Dr. Roshan Kumar Patra',
      role: 'Chief Medical Director',
      image: 'assets/img/admin.png'
    },
    {
      name: 'Dr. Abhilipsa Pati',
      role: 'Director of Hospital Administration',
      image: 'assets/img/femaleuser.png'
    },
    {
      name: 'Dr. Mandal Nandkishor',
      role: 'Head of Clinical Services',
      image: 'assets/img/admin.png'
    },
    {
      name: 'Dr. Baidya Narayan Pati',
      role: 'Senior Consultant Physician',
      image: 'assets/img/admin.png'
    }
  ];

  mission =
    'To provide compassionate, high-quality healthcare and improve lives through innovation, education, safety, and empathy.';

  vision =
    'To be a trusted healthcare institution recognized for clinical excellence, patient-first service, and modern healthcare delivery.';

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}