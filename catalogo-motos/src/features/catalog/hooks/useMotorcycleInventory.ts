import { useState } from 'react';
import { INITIAL_MOTORCYCLES } from '../../../data/bikes';
import { Motorcycle } from '../../../types';

export const useMotorcycleInventory = (
  onSelectedBikeUpdated: (bike: Motorcycle) => void
) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>(INITIAL_MOTORCYCLES);

  const updateMotorcycle = (updatedBike: Motorcycle) => {
    setMotorcycles((previous) =>
      previous.map((bike) => (bike.id === updatedBike.id ? updatedBike : bike))
    );
    onSelectedBikeUpdated(updatedBike);
  };

  const deleteMotorcycle = (bikeId: number) => {
    setMotorcycles((previous) => previous.filter((bike) => bike.id !== bikeId));
  };

  const addMotorcycle = (newBike: Motorcycle) => {
    setMotorcycles((previous) => [newBike, ...previous]);
  };

  const approveMt07Homologation = () => {
    setMotorcycles((previous) =>
      previous.map((bike) => {
        if (bike.id !== 7 && !bike.name.includes('MT-07')) return bike;

        return {
          ...bike,
          year: 2025,
          name: 'MT-07 Pure (2025)',
          status: 'disponible',
          statusLabel: 'Disponible (Homologado 2025)',
          priceRawCop: 49900000,
          priceDocsCop: 52900000,
          power: '74.8 CV @ 8,750 rpm · 68 Nm @ 6,500 rpm',
          brakes: 'Doble disco flotante 298 mm + IMU Cornering ABS',
          transmission: '6 velocidades con Y-CCT Ride-by-Wire y D-Mode',
          extras: [
            'Pantalla TFT 5" a color con Y-Connect y navegación',
            'Acelerador electrónico Y-CCT con 3 modos D-Mode',
            'Unidad inercial IMU con Cornering ABS adaptativo',
            'Embrague asistido y antirrebote A&S',
            'Control de tracción TCS desconectable',
          ],
        };
      })
    );
  };

  return {
    motorcycles,
    updateMotorcycle,
    deleteMotorcycle,
    addMotorcycle,
    approveMt07Homologation,
  };
};
