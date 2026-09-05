export type ScreenMode = 'storefront' | 'gallery' | 'admin';
export type AdminTab = 'overview' | 'customers' | 'appointments' | 'offers' | 'gallery' | 'analytics' | 'settings';
export type StorefrontSection = 'home' | 'dresses' | 'western' | 'traditional' | 'offers' | 'contact';
export type GalleryCategory = 'all' | 'blouses' | 'traditional' | 'western' | 'party' | 'custom';

export type AppointmentStatus = 'Pending' | 'Approved' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  clientName: string;
  initials: string;
  phone: string;
  email?: string;
  service: string;
  category: string;
  dateTime: string;
  dateStr: string;
  timeStr: string;
  status: AppointmentStatus;
  fabricStatus?: string;
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'blouses' | 'traditional' | 'western' | 'party' | 'custom';
  categoryLabel: string;
  description: string;
  fabric: string;
  imageUrl: string;
  fittingTime?: string;
  customization?: string;
  priceEstimate?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  lastVisit: string;
  favoriteCategory: string;
  measurementsSummary?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  validTill: string;
  active: boolean;
}
