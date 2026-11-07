import { BikeStatus, Motorcycle } from '../../types';

export const CATALOG_BRANDS = ['Todas', 'Yamaha', 'Kawasaki', 'BMW', 'Ducati', 'Honda', 'KTM'];

export const CATALOG_DISPLACEMENTS = [
  'todos',
  '125-250 cc',
  '300-500 cc',
  '650-900 cc',
  '1000 cc+',
] as const;

export const CATALOG_STATUSES: Array<{
  value: 'todos' | BikeStatus;
  label: string;
}> = [
  { value: 'todos', label: 'Todos' },
  { value: 'disponible', label: 'Disponible' },
  { value: 'espera', label: 'En Espera' },
  { value: 'agotada', label: 'Agotado' },
  { value: 'revision', label: 'Revisión' },
];

export const matchesMotorcycleSearch = (bike: Motorcycle, searchQuery: string): boolean => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  return [
    bike.name,
    bike.brand,
    bike.description,
    bike.chassis,
    bike.brakes,
    bike.displacement,
  ].some((value) => value.toLowerCase().includes(query));
};
