import { useMemo, useState } from 'react';
import { Motorcycle } from '../../../types';
import { matchesMotorcycleSearch } from '../catalog.constants';

export const useCatalogFilters = (motorcycles: Motorcycle[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');

  const filteredBikes = useMemo(
    () =>
      motorcycles.filter(
        (bike) =>
          matchesMotorcycleSearch(bike, searchQuery) &&
          (selectedBrand === 'Todas' ||
            bike.brand.toLowerCase() === selectedBrand.toLowerCase()) &&
          (selectedStatus === 'todos' || bike.status === selectedStatus)
      ),
    [motorcycles, searchQuery, selectedBrand, selectedStatus]
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('Todas');
    setSelectedStatus('todos');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    selectedStatus,
    setSelectedStatus,
    filteredBikes,
    resetFilters,
  };
};
