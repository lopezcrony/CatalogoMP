import React, { useState } from 'react';
import { CustomerInquiry, Motorcycle } from '../../../types';

interface TestRideModalProps {
  bike: Motorcycle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inquiry: Omit<CustomerInquiry, 'id' | 'date' | 'status'>) => void;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({
  bike,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [city, setCity] = useState('Sede Central - Pabellón Trackside');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !bike) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bikeId: bike.id,
      bikeName: `${bike.brand} ${bike.name} ${bike.year}`,
      clientName: name,
      documentId: 'Verificar en Box',
      phone,
      email,
      type: 'testride',
      preferredTime: `${date} a las ${time}`,
      city,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
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
          <div className="w-12 h-12 rounded-xl bg-[#00b17b]/20 text-[#4edea3] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">sports_motorsports</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-[#4edea3] uppercase tracking-wider block font-bold">
              Experiencia en Pista
            </span>
            <h4 className="font-headline-sm text-headline-sm text-[#dae2fd]">
              Test Ride: {bike.brand} {bike.name}
            </h4>
          </div>
        </div>

        <div className="bg-[#131b2e] border border-[#222a3d] p-3.5 rounded-xl mb-4 font-body-sm text-body-sm space-y-1">
          <p className="text-[#dae2fd] font-bold">Requisitos de Conducción en Pista:</p>
          <ul className="text-[#bec8d2] text-xs space-y-0.5 list-disc pl-4">
            <li>Licencia A2 vigente con más de 2 años de experiencia.</li>
            <li>Indumentaria homologada obligatoria (casco integral, chaqueta con protecciones y guantes).</li>
          </ul>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#003824]/40 border border-[#00b17b] rounded-xl text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-3xl">check_circle</span>
            <span className="font-label-lg text-label-lg font-bold text-[#dae2fd]">¡Turno de Test Ride Agendado!</span>
            <span className="font-body-sm text-body-sm text-[#bec8d2]">
              Te enviaremos el ticket de confirmación y el mapa del circuito por WhatsApp.
            </span>
          </div>
        ) : (
          <form className="space-y-3 font-body-sm text-body-sm" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#dae2fd] font-semibold mb-1">Nombre Completo y Apellidos *</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Mariana Ospina"
                className="w-full bg-[#060e20] text-[#dae2fd] px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#dae2fd] font-semibold mb-1">WhatsApp de Contacto *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full bg-[#060e20] text-[#dae2fd] px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-[#dae2fd] font-semibold mb-1">Correo Electrónico *</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full bg-[#060e20] text-[#dae2fd] px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#dae2fd] font-semibold mb-1">Fecha Deseada *</label>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#060e20] text-[#dae2fd] px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-[#dae2fd] font-semibold mb-1">Horario de Prueba</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#060e20] text-[#dae2fd] px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
                >
                  <option>10:00 AM</option>
                  <option>11:30 AM</option>
                  <option>02:30 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#dae2fd] font-semibold mb-1">Showroom / Circuito</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#060e20] text-[#dae2fd] px-3.5 py-2.5 rounded-lg border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9]"
              >
                <option value="Sede Central - Pabellón Trackside">Sede Central - Pabellón Trackside</option>
                <option value="Circuito Jarama Norte">Circuito Jarama Norte</option>
                <option value="Apex Speed Hub Catalunya">Apex Speed Hub Catalunya</option>
              </select>
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
                className="bg-[#0053db] hover:bg-[#0ea5e9] text-[#cdd7ff] hover:text-[#003751] font-label-lg text-label-lg px-6 py-2.5 rounded-lg font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Confirmar Horario de Prueba
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
