import React, { useState } from 'react';
import { CustomerInquiry, Motorcycle } from '../../../types';

interface PreorderModalProps {
  bike: Motorcycle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inquiry: Omit<CustomerInquiry, 'id' | 'date' | 'status'>) => void;
}

export const PreorderModal: React.FC<PreorderModalProps> = ({
  bike,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [docId, setDocId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !bike) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bikeId: bike.id,
      bikeName: `${bike.brand} ${bike.name} ${bike.year}`,
      clientName: name,
      documentId: docId,
      phone,
      email,
      type: 'reserva',
      depositAmount: '$2.000.000 COP',
      city: 'Showroom Central Apex',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setDocId('');
      setPhone('');
      setEmail('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1326]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#171f33] border border-[#2d3449] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#bec8d2] hover:text-[#dae2fd] p-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0053db]/30 text-[#89ceff] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">bookmark_added</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-[#89ceff] uppercase tracking-wider block font-bold">
              Preventa Prioritaria Apex
            </span>
            <h4 className="font-headline-sm text-headline-sm text-[#dae2fd]">
              {bike.brand} {bike.name} {bike.year}
            </h4>
          </div>
        </div>

        <p className="font-body-md text-body-md text-[#bec8d2] mb-6 leading-relaxed">
          Garantiza la asignación de número de chasis (VIN) de esta unidad antes de su arribo a showroom.
          El depósito es 100% abonable al valor total o reembolsable si decides no concretar en el Test Ride previo.
        </p>

        <div className="bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl mb-6 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase block">Arribo Estimado</span>
            <span className="font-spec-data text-spec-data text-[#89ceff] font-bold">
              {bike.status === 'espera' ? '15 Días Hábiles' : 'Lote Especial 2025'}
            </span>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm text-[#bec8d2] uppercase block">Seña de Reserva</span>
            <span className="font-spec-data text-spec-data text-[#dae2fd] font-bold">
              $2.000.000 COP
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#003824]/40 border border-[#00b17b] rounded-xl text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-3xl">check_circle</span>
            <span className="font-label-lg text-label-lg font-bold text-[#dae2fd]">¡Reserva Registrada con Éxito!</span>
            <span className="font-body-sm text-body-sm text-[#bec8d2]">
              Un asesor de ventas de Apex Moto se contactará contigo por WhatsApp en breve con tu orden de asignación.
            </span>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="font-label-sm text-label-sm text-[#dae2fd] uppercase tracking-wider block mb-1">
                Nombre Completo y Documento de Identidad *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Alejandro Valdés - DNI/ID"
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-body-md px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-sm text-label-sm text-[#dae2fd] uppercase tracking-wider block mb-1">
                  Número Documento
                </label>
                <input
                  type="text"
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  placeholder="ID / Cédula"
                  className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-body-md px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-[#dae2fd] uppercase tracking-wider block mb-1">
                  Teléfono Móvil (WhatsApp) *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-body-md px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-[#dae2fd] uppercase tracking-wider block mb-1">
                Correo Electrónico *
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-[#060e20] text-[#dae2fd] font-body-md text-body-md px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-[#dae2fd] font-label-md text-label-md hover:bg-[#222a3d] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#0ea5e9] hover:bg-[#0053db] text-[#003751] hover:text-[#cdd7ff] font-label-lg text-label-lg px-6 py-2.5 rounded-lg font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">verified</span>
                Confirmar Reserva Prioritaria
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
