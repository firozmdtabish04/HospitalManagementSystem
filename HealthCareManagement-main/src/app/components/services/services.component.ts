import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';

interface ServiceItem {
  title: string;
  text: string;
  icon: string;
  link: string;
  category: string;
  availability: string;
  badge: string;
  rating: number;
  featured: boolean;
}

interface ReviewItem {
  name: string;
  designation: string;
  text: string;
  image: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  constructor(private router: Router) { }

  observer?: IntersectionObserver;

  searchTerm = '';
  selectedCategory = 'All';
  selectedAvailability = 'All';
  showOnlyFeatured = false;

  isFetchingLocation = false;

  emergencyPhoneNumber = '918102946894';
  emergencyCallNumber = '+918102946894';
  emergencySmsNumber = '8102946894';

  hospitalStats = [
    { label: 'Departments', value: '22+', icon: 'fa fa-hospital-o' },
    { label: 'Doctors', value: '120+', icon: 'fa fa-user-md' },
    { label: 'Happy Patients', value: '15K+', icon: 'fa fa-users' },
    { label: 'Emergency Support', value: '24/7', icon: 'fa fa-ambulance' }
  ];

  categories: string[] = [
    'All',
    'Critical Care',
    'Heart Care',
    'Neuro Care',
    'Bone & Joint',
    'Women & Child',
    'Diagnostics',
    'Surgical Care',
    'General Care'
  ];

  services: ServiceItem[] = [
    {
      title: 'Cardiology',
      text: 'Advanced heart care, diagnostics, preventive screenings, and cardiac treatment plans.',
      icon: 'fa fa-heartbeat',
      link: '/cardiology',
      category: 'Heart Care',
      availability: '24/7',
      badge: 'Top Rated',
      rating: 4.9,
      featured: true
    },
    {
      title: 'Neurology',
      text: 'Specialized care for brain, spine, nerves, stroke recovery, and neurological disorders.',
      icon: 'fa fa-bolt',
      link: '/neurology',
      category: 'Neuro Care',
      availability: 'Mon-Sat',
      badge: 'Advanced Care',
      rating: 4.8,
      featured: true
    },
    {
      title: 'Orthopedics',
      text: 'Bone, joint, ligament, fracture, arthritis, and mobility-focused orthopedic solutions.',
      icon: 'fa fa-user-md',
      link: '/orthopedics',
      category: 'Bone & Joint',
      availability: 'Mon-Sat',
      badge: 'Popular',
      rating: 4.7,
      featured: true
    },
    {
      title: 'Dentistry',
      text: 'Complete oral care including cleaning, root canal, braces, and cosmetic dental treatment.',
      icon: 'fa fa-medkit',
      link: '/dentistry',
      category: 'General Care',
      availability: 'Mon-Sat',
      badge: 'Trusted',
      rating: 4.6,
      featured: false
    },
    {
      title: 'Pediatrics',
      text: 'Comprehensive medical care for infants, children, adolescents, and preventive wellness.',
      icon: 'fa fa-child',
      link: '/pediatrics',
      category: 'Women & Child',
      availability: '24/7',
      badge: 'Family Choice',
      rating: 4.9,
      featured: true
    },
    {
      title: 'Oncology',
      text: 'Cancer screening, diagnosis, treatment planning, chemotherapy support, and recovery guidance.',
      icon: 'fa fa-shield',
      link: '/oncology',
      category: 'Critical Care',
      availability: 'Mon-Sat',
      badge: 'Specialized',
      rating: 4.8,
      featured: true
    },
    {
      title: 'Emergency Care',
      text: 'Round-the-clock emergency response, trauma support, critical stabilization, and urgent care.',
      icon: 'fa fa-ambulance',
      link: '/emergency',
      category: 'Critical Care',
      availability: '24/7',
      badge: '24/7 Emergency',
      rating: 5.0,
      featured: true
    },
    {
      title: 'Radiology',
      text: 'Advanced imaging services including X-ray, ultrasound, CT scan, and diagnostic support.',
      icon: 'fa fa-camera',
      link: '/radiology',
      category: 'Diagnostics',
      availability: '24/7',
      badge: 'High Precision',
      rating: 4.7,
      featured: false
    },
    {
      title: 'Laboratory',
      text: 'Reliable diagnostic tests, blood work, pathology, and routine health investigations.',
      icon: 'fa fa-flask',
      link: '/laboratory',
      category: 'Diagnostics',
      availability: '24/7',
      badge: 'Fast Reports',
      rating: 4.8,
      featured: true
    }
  ];

  reviews: ReviewItem[] = [
    {
      name: 'Tabish Firoz',
      designation: 'Cardiology Patient',
      text: 'Excellent medical care, smooth appointment process, and supportive staff throughout treatment.',
      image: 'assets/img/tabish.jpg',
      rating: 4
    },
    {
      name: 'Roshan Kumar Patra',
      designation: 'Neurology Patient',
      text: 'The doctors were highly professional and explained every step very clearly.',
      image: 'assets/img/admin.png',
      rating: 5
    },
    {
      name: 'Rishav Raaj',
      designation: 'Orthopedics Patient',
      text: 'Clean facilities, fast service, and a very organized hospital management experience.',
      image: 'assets/img/admin.png',
      rating: 4
    }
  ];

  faqs: FaqItem[] = [
    {
      question: 'How can I book an appointment for a specific department?',
      answer: 'You can click the Book Appointment button on any service card. The selected speciality will be passed automatically to the appointment page.',
      isOpen: true
    },
    {
      question: 'Are emergency services available all day?',
      answer: 'Yes, our emergency care department is available 24/7 for urgent and critical cases.'
    },
    {
      question: 'Can I search services by speciality?',
      answer: 'Yes, use the search bar and category filters to quickly find the right department or medical service.'
    }
  ];

  get filteredServices(): ServiceItem[] {
    return this.services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.text.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' || service.category === this.selectedCategory;

      const matchesAvailability =
        this.selectedAvailability === 'All' || service.availability === this.selectedAvailability;

      const matchesFeatured = !this.showOnlyFeatured || service.featured;

      return matchesSearch && matchesCategory && matchesAvailability && matchesFeatured;
    });
  }

  get featuredServices(): ServiceItem[] {
    return this.services.filter(service => service.featured).slice(0, 6);
  }

  ngAfterViewInit(): void {
    this.setupObserver();

    this.serviceCards.changes.subscribe(() => {
      this.observeCards();
    });

    this.observeCards();
  }

  setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
          {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  observeCards(): void {
    if (!this.observer || !this.serviceCards) return;

    this.serviceCards.forEach((card) => {
      const el = card.nativeElement;
      el.classList.add('visible');
      this.observer?.observe(el);
    });
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All';
    this.selectedAvailability = 'All';
    this.showOnlyFeatured = false;
  }

  toggleFaq(index: number): void {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    }));
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bookAppointment(serviceTitle: string): void {
    this.router.navigate(['/bookappointment'], {
      queryParams: { speciality: serviceTitle }
    });
  }

  viewService(service: ServiceItem): void {
    this.router.navigate(['/bookappointment'], {
      queryParams: {
        speciality: service.title,
        source: 'services-page'
      }
    });
  }

  openEmergencyWhatsApp(): void {
    const baseMessage =
      'Hello, this is an emergency. I need immediate medical assistance.';

    this.isFetchingLocation = true;

    if (!navigator.geolocation)
    {
      this.isFetchingLocation = false;
      const whatsappUrl = `https://wa.me/${this.emergencyPhoneNumber}?text=${encodeURIComponent(baseMessage)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `${baseMessage} My current location is: ${locationLink}`;

        this.isFetchingLocation = false;

        const whatsappUrl = `https://wa.me/${this.emergencyPhoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      },
      () => {
        this.isFetchingLocation = false;

        const whatsappUrl = `https://wa.me/${this.emergencyPhoneNumber}?text=${encodeURIComponent(baseMessage)}`;
        window.open(whatsappUrl, '_blank');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  callEmergency(): void {
    window.location.href = `tel:${this.emergencyCallNumber}`;
  }

  openEmergencySms(): void {
    const message = 'Hello, this is an emergency. I need immediate medical assistance.';
    window.location.href = `sms:${this.emergencySmsNumber}?body=${encodeURIComponent(message)}`;
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  trackByService(index: number, service: ServiceItem): string {
    return service.title;
  }

  trackByReview(index: number, review: ReviewItem): string {
    return review.name + review.designation;
  }

  trackByFaq(index: number, faq: FaqItem): string {
    return faq.question;
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}