import { CustomerInquiry } from '../../../types';

export const useReservationActions = (
  addInquiry: (inquiry: CustomerInquiry) => void,
  showToast: (title: string, message: string, isError?: boolean) => void
) => {
  const submitPreorder = (
    inquiryData: Omit<CustomerInquiry, 'id' | 'date' | 'status'>
  ) => {
    addInquiry({
      ...inquiryData,
      id: `INQ-${Math.floor(Math.random() * 900 + 100)}`,
      date: 'Justo ahora',
      status: 'Pendiente',
    });
    showToast(
      '¡Reserva Recibida!',
      `Hemos registrado tu apartado para ${inquiryData.bikeName}. Un asesor te contactará por WhatsApp.`
    );
  };

  const submitTestRide = (
    inquiryData: Omit<CustomerInquiry, 'id' | 'date' | 'status'>
  ) => {
    addInquiry({
      ...inquiryData,
      id: `TR-${Math.floor(Math.random() * 900 + 100)}`,
      date: 'Justo ahora',
      status: 'Agendada',
    });
    showToast(
      'Test Ride Agendado',
      `Turno reservado para ${inquiryData.bikeName}. Enviaremos ticket de confirmación a tu teléfono.`
    );
  };

  return { submitPreorder, submitTestRide };
};
