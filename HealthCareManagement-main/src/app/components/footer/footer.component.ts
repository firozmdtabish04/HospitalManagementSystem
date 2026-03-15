import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface FooterLink {
  label: string;
  route?: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  hospitalName = 'Healthcare Management System';
  hospitalTagline = 'Smart Care • Secure Access • 24/7 Digital Healthcare';
  address = 'Jehanabad, Bagwar, Bihar [804427]';
  supportEmail = 'support@healthcarems.com';
  emergencyPhoneDisplay = '+91 8102946894';
  emergencyPhone = '918102946894';

  googleMapUrl!: SafeResourceUrl;

  quickLinks: FooterLink[] = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Registration', route: '/registration' },
    { label: 'Login', route: '/login' }
  ];

  serviceLinks: FooterLink[] = [
    { label: 'Doctor Consultation', route: '/services' },
    { label: 'Patient Management', route: '/services' },
    { label: 'Emergency Support', route: '/services' },
    { label: 'Online Appointment', route: '/services' },
    { label: 'Digital Records', route: '/services' }
  ];

  legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', route: '/privacy-policy' },
    { label: 'Terms & Conditions', route: '/terms' },
    { label: 'Help Center', route: '/contact' }
  ];

  socialLinks: FooterLink[] = [
    { label: 'Facebook', icon: 'fa fa-facebook', url: 'https://www.facebook.com/' },
    { label: 'Twitter', icon: 'fa fa-twitter', url: 'https://twitter.com/' },
    { label: 'LinkedIn', icon: 'fa fa-linkedin', url: 'https://www.linkedin.com/' },
    { label: 'Instagram', icon: 'fa fa-instagram', url: 'https://www.instagram.com/' },
    { label: 'GitHub', icon: 'fa fa-github', url: 'https://github.com/' }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=25.1329364,84.993787&z=17&output=embed'
    );
  }

  openWhatsApp(): void {
    const message = `Hello, I would like to connect with ${this.hospitalName} support.`;
    const whatsappUrl = `https://wa.me/${this.emergencyPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  makeCall(): void {
    window.location.href = `tel:${this.emergencyPhone}`;
  }

  sendMail(): void {
    window.location.href = `mailto:${this.supportEmail}`;
  }

  trackByLabel(index: number, item: FooterLink): string {
    return item.label;
  }
}