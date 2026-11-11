import type { Motorcycle, BikeStatus, ColorVariant, BikeSlide } from '../../../types';

type SupabaseBrand = { id: string; nombre: string };
type SupabaseColor = {
  id: string;
  nombre_color: string;
  codigo_hex: string | null;
  estado: 'disponible' | 'agotada' | 'en_espera' | null;
};
type SupabaseImage = {
  id: string;
  url_imagen: string;
  es_principal: boolean | null;
  orden: number | null;
};
type SupabaseTechnicalLink = {
  caracteristica_id: string;
  valor: string;
  caracteristicas: {
    id: string;
    categoria_id: string | null;
    nombre: string;
    unidad: string | null;
    tipo_dato: string;
    categorias_caracteristicas?: { id: string; nombre: string; orden: number | null } | null;
  } | null;
};
export type SupabaseMotorcycle = {
  id: string;
  marca_id: string;
  modelo: string;
  anio: number;
  descripcion: string | null;
  estado: 'disponible' | 'agotada' | 'en_espera' | 'revision' | 'inactiva';
  fecha_ultima_revision: string | null;
  fecha_proxima_revision: string | null;
  estado_revision: 'pendiente' | 'revisada' | null;
  requiere_revision: boolean | null;
  precio_sin_papeles: number | null;
  precio_con_papeles: number | null;
  marcas: SupabaseBrand | null;
  variantes_color?: SupabaseColor[];
  imagenes_moto?: SupabaseImage[];
  moto_caracteristicas?: SupabaseTechnicalLink[];
};

const statusLabels: Record<BikeStatus, string> = {
  disponible: 'Disponible',
  agotada: 'Agotada',
  espera: 'En espera',
  revision: 'En revisión',
};

function mapStatus(status: SupabaseMotorcycle['estado']): BikeStatus {
  return status === 'en_espera' ? 'espera' : status === 'inactiva' ? 'agotada' : status;
}

function mapColor(color: SupabaseColor): ColorVariant {
  const status = color.estado === 'en_espera' ? 'espera' : color.estado === 'agotada' ? 'agotada' : 'disponible';
  return {
    id: color.id,
    name: color.nombre_color,
    code: color.codigo_hex || '',
    stock: 0,
    status,
    statusText: statusLabels[status],
    colorHex: color.codigo_hex || '#64748b',
  };
}

function mapImage(image: SupabaseImage, index: number): BikeSlide {
  return { url: image.url_imagen, title: `Imagen ${index + 1}`, remoteId: image.id, isPrimary: image.es_principal ?? false, order: image.orden ?? index };
}

export function adaptSupabaseMotorcycle(record: SupabaseMotorcycle, index: number): Motorcycle {
  const status = mapStatus(record.estado);
  const images = [...(record.imagenes_moto || [])]
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
    .slice(0, 6)
    .map(mapImage);

  return {
    id: index + 1,
    remoteId: record.id,
    brandId: record.marca_id,
    brand: record.marcas?.nombre || 'Marca sin asignar',
    brandSubtitle: record.marcas?.nombre || 'Catálogo de motocicletas',
    name: record.modelo,
    year: record.anio,
    displacement: '',
    displacementSegment: '125-250 cc',
    status,
    statusLabel: statusLabels[status],
    priceRawCop: record.precio_sin_papeles || 0,
    priceDocsCop: record.precio_con_papeles || 0,
    chassis: '',
    power: '',
    torque: '',
    brakes: '',
    suspension: '',
    weight: '',
    transmission: '',
    emissions: '',
    consumption: '',
    acceleration: '',
    description: record.descripcion || '',
    colors: (record.variantes_color || []).map(mapColor),
    slides: images,
    extras: [],
    characteristics: (record.moto_caracteristicas || [])
      .filter((link) => link.caracteristicas)
      .map((link) => ({
        id: link.caracteristicas!.id,
        categoryId: link.caracteristicas!.categoria_id || '',
        categoryName: link.caracteristicas!.categorias_caracteristicas?.nombre || 'Ficha técnica',
        name: link.caracteristicas!.nombre,
        unit: link.caracteristicas!.unidad || undefined,
        value: link.valor,
      })),
    fechaUltimaRevision: record.fecha_ultima_revision || undefined,
    fechaProximaRevision: record.fecha_proxima_revision || undefined,
    estadoRevision: record.estado_revision || undefined,
    requiereRevision: record.requiere_revision ?? false,
  };
}
