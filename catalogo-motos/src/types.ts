export type BikeStatus = 'disponible' | 'espera' | 'agotada' | 'revision';

export interface ColorVariant {
  id: string;
  name: string;
  code: string;
  stock: number;
  transitStock?: number;
  status: 'disponible' | 'espera' | 'agotada' | 'revision';
  statusText: string;
  colorHex: string;
  secondaryHex?: string;
}

export interface BikeSlide {
  url: string;
  title: string;
}

export interface Motorcycle {
  id: number;
  brand: string;
  brandSubtitle: string;
  name: string;
  year: number;
  displacement: string;
  displacementSegment: '125-250 cc' | '300-500 cc' | '650-900 cc' | '1000 cc+';
  status: BikeStatus;
  statusLabel: string;
  priceRawCop: number;
  priceDocsCop: number;
  monthlyFinanceCop: number;
  chassis: string;
  power: string;
  torque: string;
  brakes: string;
  suspension: string;
  weight: string;
  transmission: string;
  emissions: string;
  consumption: string;
  acceleration: string;
  description: string;
  colors: ColorVariant[];
  slides: BikeSlide[];
  extras: string[];
  verifiedVin?: string;
  badge?: string;
}

export interface CustomerInquiry {
  id: string;
  bikeId: number;
  bikeName: string;
  clientName: string;
  documentId: string;
  phone: string;
  email: string;
  type: 'reserva' | 'testride' | 'alerta';
  date: string;
  status: 'Pendiente' | 'Validada' | 'Agendada' | 'Entregada';
  depositAmount?: string;
  preferredTime?: string;
  city?: string;
}

export interface HomologationModel {
  id: string;
  name: string;
  subtitle: string;
  status: 'selected' | 'pending';
  outgoing: {
    year: number;
    badge: string;
    image: string;
    display: string;
    brakes: string;
    electronics: string;
    priceCop: string;
    stockInfo: string;
  };
  incoming: {
    year: number;
    badge: string;
    image: string;
    display: string;
    displayDiff: string;
    brakes: string;
    brakesDiff: string;
    electronics: string;
    electronicsDiff: string;
    priceCop: string;
    priceGrowth: string;
    availability: string;
  };
  checklist: Array<{
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    badgeClass: string;
    completed: boolean;
  }>;
  approved: boolean;
}
