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
  remoteId?: string;
  isPrimary?: boolean;
  order?: number;
}

export interface MotorcycleCharacteristic {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  unit?: string;
  value: string;
}

export interface CharacteristicCategory {
  id: string;
  name: string;
  order: number;
  characteristics: Array<{
    id: string;
    name: string;
    unit?: string;
    dataType: 'text' | 'number' | 'boolean';
    active: boolean;
  }>;
}

export interface Motorcycle {
  id: number;
  remoteId?: string;
  brandId?: string;
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
  characteristics?: MotorcycleCharacteristic[];
  verifiedVin?: string;
  badge?: string;
  fechaUltimaRevision?: string;
  fechaProximaRevision?: string;
  estadoRevision?: 'pendiente' | 'revisada';
  requiereRevision?: boolean;
}
