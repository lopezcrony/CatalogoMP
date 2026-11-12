import { describe, expect, it } from 'vitest';
import { adaptSupabaseMotorcycle } from '../../src/features/catalog/services/supabaseMotorcycleAdapter';

const baseRecord = {
  id: 'moto-1',
  marca_id: 'brand-1',
  modelo: 'N160',
  anio: 2026,
  descripcion: 'Moto de prueba del caso unitario',
  estado: 'en_espera' as const,
  fecha_ultima_revision: null,
  fecha_proxima_revision: null,
  estado_revision: 'pendiente' as const,
  requiere_revision: true,
  precio_sin_papeles: 10999000,
  precio_con_papeles: 12500000,
  marcas: { id: 'brand-1', nombre: 'Bajaj' },
};

describe('adaptSupabaseMotorcycle', () => {
  it('convierte el estado remoto en espera al estado usado por la interfaz', () => {
    const motorcycle = adaptSupabaseMotorcycle(baseRecord, 0);

    expect(motorcycle.status).toBe('espera');
    expect(motorcycle.statusLabel).toBe('En espera');
  });

  it('mapea colores y características técnicas remotas', () => {
    const motorcycle = adaptSupabaseMotorcycle({
      ...baseRecord,
      variantes_color: [{ id: 'color-1', nombre_color: 'Negro', codigo_hex: '#000000', estado: 'disponible' }],
      moto_caracteristicas: [{
        caracteristica_id: 'feature-1',
        valor: '164.82',
        caracteristicas: {
          id: 'feature-1',
          categoria_id: 'engine',
          nombre: 'Cilindraje',
          unidad: 'cc',
          tipo_dato: 'number',
          categorias_caracteristicas: { id: 'engine', nombre: 'Motor', orden: 1 },
        },
      }],
    }, 0);

    expect(motorcycle.colors[0]).toMatchObject({ name: 'Negro', status: 'disponible', colorHex: '#000000' });
    expect(motorcycle.characteristics?.[0]).toMatchObject({
      categoryName: 'Motor',
      name: 'Cilindraje',
      value: '164.82',
      unit: 'cc',
    });
  });
});
