import { Component, OnInit } from '@angular/core';

interface PaymentRecord {
  paymentId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  paymentDate: string;
  amount: number;
  tax: number;
  discount: number;
  netAmount: number;
  method: 'UPI' | 'Card' | 'Net Banking' | 'Cash' | 'Wallet';
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  transactionId: string;
  invoiceNo: string;
  remarks: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  pageTitle = 'Payment Management';
  pageSubtitle = 'Monitor transactions, revenue, payment status, and billing activity';

  loading = true;

  payments: PaymentRecord[] = [];
  filteredPayments: PaymentRecord[] = [];
  selectedPayment: PaymentRecord | null = null;

  searchTerm = '';
  selectedStatus = 'All';
  selectedMethod = 'All';
  selectedDepartment = 'All';

  statusOptions: string[] = ['All', 'Paid', 'Pending', 'Failed', 'Refunded'];
  methodOptions: string[] = ['All', 'UPI', 'Card', 'Net Banking', 'Cash', 'Wallet'];
  departmentOptions: string[] = ['All', 'Neurology', 'Cardiology', 'Orthopedics', 'Dermatology', 'Pediatrics'];

  sortColumn: keyof PaymentRecord | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  pageSize = 5;

  constructor() { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;

    setTimeout(() => {
      this.payments = [
        {
          paymentId: 'PAY-1001',
          patientName: 'Rahul Kumar',
          patientEmail: 'rahul@gmail.com',
          patientPhone: '9876543210',
          doctorName: 'Dr. Abhilipsa Pati',
          department: 'Neurology',
          appointmentDate: '2026-03-15',
          paymentDate: '2026-03-15',
          amount: 1500,
          tax: 150,
          discount: 100,
          netAmount: 1550,
          method: 'UPI',
          status: 'Paid',
          transactionId: 'TXN-UPI-908712',
          invoiceNo: 'INV-5001',
          remarks: 'Consultation fee collected successfully'
        },
        {
          paymentId: 'PAY-1002',
          patientName: 'Sneha Sharma',
          patientEmail: 'sneha@gmail.com',
          patientPhone: '9123456780',
          doctorName: 'Dr. Rajesh Verma',
          department: 'Cardiology',
          appointmentDate: '2026-03-15',
          paymentDate: '2026-03-15',
          amount: 2200,
          tax: 220,
          discount: 0,
          netAmount: 2420,
          method: 'Card',
          status: 'Pending',
          transactionId: 'TXN-CRD-777891',
          invoiceNo: 'INV-5002',
          remarks: 'Awaiting gateway confirmation'
        },
        {
          paymentId: 'PAY-1003',
          patientName: 'Aman Ali',
          patientEmail: 'aman@gmail.com',
          patientPhone: '9988776655',
          doctorName: 'Dr. Priya Nair',
          department: 'Orthopedics',
          appointmentDate: '2026-03-14',
          paymentDate: '2026-03-14',
          amount: 1200,
          tax: 120,
          discount: 50,
          netAmount: 1270,
          method: 'Cash',
          status: 'Paid',
          transactionId: 'TXN-CSH-224411',
          invoiceNo: 'INV-5003',
          remarks: 'Payment received at billing counter'
        },
        {
          paymentId: 'PAY-1004',
          patientName: 'Pooja Singh',
          patientEmail: 'pooja@gmail.com',
          patientPhone: '9090909090',
          doctorName: 'Dr. Abhilipsa Pati',
          department: 'Neurology',
          appointmentDate: '2026-03-13',
          paymentDate: '2026-03-13',
          amount: 1800,
          tax: 180,
          discount: 80,
          netAmount: 1900,
          method: 'Net Banking',
          status: 'Failed',
          transactionId: 'TXN-NB-618299',
          invoiceNo: 'INV-5004',
          remarks: 'Bank server timeout'
        },
        {
          paymentId: 'PAY-1005',
          patientName: 'Karan Das',
          patientEmail: 'karan@gmail.com',
          patientPhone: '9011223344',
          doctorName: 'Dr. Meena Iyer',
          department: 'Dermatology',
          appointmentDate: '2026-03-12',
          paymentDate: '2026-03-12',
          amount: 900,
          tax: 90,
          discount: 40,
          netAmount: 950,
          method: 'Wallet',
          status: 'Refunded',
          transactionId: 'TXN-WLT-119902',
          invoiceNo: 'INV-5005',
          remarks: 'Refund processed for cancelled appointment'
        },
        {
          paymentId: 'PAY-1006',
          patientName: 'Anjali Gupta',
          patientEmail: 'anjali@gmail.com',
          patientPhone: '9345678901',
          doctorName: 'Dr. Suresh Rao',
          department: 'Pediatrics',
          appointmentDate: '2026-03-11',
          paymentDate: '2026-03-11',
          amount: 1600,
          tax: 160,
          discount: 60,
          netAmount: 1700,
          method: 'UPI',
          status: 'Paid',
          transactionId: 'TXN-UPI-887621',
          invoiceNo: 'INV-5006',
          remarks: 'Paid via QR billing'
        }
      ];

      this.filteredPayments = [...this.payments];
      this.loading = false;
      this.applySorting();
    }, 700);
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredPayments = this.payments.filter((payment) => {
      const matchesSearch =
        !search ||
        payment.paymentId.toLowerCase().includes(search) ||
        payment.patientName.toLowerCase().includes(search) ||
        payment.patientEmail.toLowerCase().includes(search) ||
        payment.patientPhone.toLowerCase().includes(search) ||
        payment.doctorName.toLowerCase().includes(search) ||
        payment.department.toLowerCase().includes(search) ||
        payment.transactionId.toLowerCase().includes(search) ||
        payment.invoiceNo.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' || payment.status === this.selectedStatus;

      const matchesMethod =
        this.selectedMethod === 'All' || payment.method === this.selectedMethod;

      const matchesDepartment =
        this.selectedDepartment === 'All' || payment.department === this.selectedDepartment;

      return matchesSearch && matchesStatus && matchesMethod && matchesDepartment;
    });

    this.currentPage = 1;
    this.applySorting();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'All';
    this.selectedMethod = 'All';
    this.selectedDepartment = 'All';
    this.filteredPayments = [...this.payments];
    this.currentPage = 1;
    this.applySorting();
  }

  sortBy(column: keyof PaymentRecord): void {
    if (this.sortColumn === column)
    {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else
    {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.applySorting();
  }

  applySorting(): void {
    if (!this.sortColumn)
    {
      return;
    }

    const column = this.sortColumn;

    this.filteredPayments = [...this.filteredPayments].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (typeof valueA === 'number' && typeof valueB === 'number')
      {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      const textA = String(valueA).toLowerCase();
      const textB = String(valueB).toLowerCase();

      if (textA < textB) return this.sortDirection === 'asc' ? -1 : 1;
      if (textA > textB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get paginatedPayments(): PaymentRecord[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredPayments.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPayments.length / this.pageSize) || 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages)
    {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1)
    {
      this.currentPage--;
    }
  }

  viewDetails(payment: PaymentRecord): void {
    this.selectedPayment = payment;
  }

  closeDetails(): void {
    this.selectedPayment = null;
  }

  markAsPaid(payment: PaymentRecord): void {
    payment.status = 'Paid';
    this.applyFilters();
  }

  markAsRefunded(payment: PaymentRecord): void {
    payment.status = 'Refunded';
    this.applyFilters();
  }

  retryPayment(payment: PaymentRecord): void {
    payment.status = 'Pending';
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    switch (status)
    {
      case 'Paid':
        return 'status-paid';
      case 'Pending':
        return 'status-pending';
      case 'Failed':
        return 'status-failed';
      case 'Refunded':
        return 'status-refunded';
      default:
        return '';
    }
  }

  getTotalPayments(): number {
    return this.payments.length;
  }

  getTotalRevenue(): number {
    return this.payments
      .filter((p) => p.status === 'Paid')
      .reduce((sum, p) => sum + p.netAmount, 0);
  }

  getPendingCount(): number {
    return this.payments.filter((p) => p.status === 'Pending').length;
  }

  getFailedCount(): number {
    return this.payments.filter((p) => p.status === 'Failed').length;
  }

  getRefundedCount(): number {
    return this.payments.filter((p) => p.status === 'Refunded').length;
  }

  getSuccessRate(): number {
    if (!this.payments.length) return 0;
    const paid = this.payments.filter((p) => p.status === 'Paid').length;
    return Math.round((paid / this.payments.length) * 100);
  }

  trackByPayment(index: number, payment: PaymentRecord): string {
    return payment.paymentId;
  }
}