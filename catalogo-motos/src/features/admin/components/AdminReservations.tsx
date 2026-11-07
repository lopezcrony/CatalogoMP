import React, { useState } from 'react';
import { CustomerInquiry } from '../../../types';

interface AdminReservationsProps {
  inquiries: CustomerInquiry[];
  onUpdateStatus: (id: string, status: CustomerInquiry['status']) => void;
  onToast: (title: string, message: string) => void;
}

export const AdminReservations: React.FC<AdminReservationsProps> = ({
  inquiries,
  onUpdateStatus,
  onToast,
}) => {
  const [filterType, setFilterType] = useState<string>('todos');

  const filtered = inquiries.filter((inq) => {
    if (filterType === 'todos') return true;
    return inq.type === filterType;
  });

  return (
    <div className="flex flex-col w-full gap-6 pb-16 font-sans">
      <div className="bg-[#131b2e] border border-[#222a3d] p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#4edea3]">
              Canal de Conversión Online
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-[#dae2fd]">
            Solicitudes de Reserva &amp; Test Rides
          </h1>
          <p className="font-body-md text-body-md text-[#bec8d2]">
            Gestión en tiempo real de abonos prioritarios, turnos de pista y solicitudes de cotización.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 bg-[#060e20] p-1.5 rounded-xl border border-[#2d3449]">
          {['todos', 'reserva', 'testride', 'alerta'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm uppercase font-bold transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-[#0ea5e9] text-[#003751]'
                  : 'text-[#bec8d2] hover:text-[#dae2fd]'
              }`}
            >
              {type === 'todos'
                ? 'Todos'
                : type === 'reserva'
                ? 'Reservas Web'
                : type === 'testride'
                ? 'Test Rides'
                : 'Alertas'}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="overflow-x-auto rounded-xl bg-[#171f33] border border-[#222a3d] shadow-sm">
        <table className="w-full text-left font-body-md text-body-md">
          <thead className="bg-[#2d3449] text-[#bec8d2] font-label-sm text-label-sm uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Ref ID</th>
              <th className="py-3 px-4">Motocicleta</th>
              <th className="py-3 px-4">Cliente / Contacto</th>
              <th className="py-3 px-4">Tipo &amp; Fecha</th>
              <th className="py-3 px-4">Monto / Horario</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d3449]/30">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#88929b]">
                  No hay solicitudes registradas con este filtro.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#222a3d]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#89ceff]">{item.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#dae2fd]">{item.bikeName}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#dae2fd]">{item.clientName}</span>
                      <span className="text-xs text-[#bec8d2]">{item.phone}</span>
                      <span className="text-xs text-[#88929b]">{item.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        item.type === 'reserva'
                          ? 'bg-[#002a78] text-[#dbe1ff]'
                          : item.type === 'testride'
                          ? 'bg-[#003824] text-[#4edea3]'
                          : 'bg-[#2d3449] text-[#bec8d2]'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="block text-xs text-[#88929b] mt-0.5">{item.date}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-[#dae2fd]">
                    {item.depositAmount || item.preferredTime || item.city}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => {
                        onUpdateStatus(item.id, e.target.value as CustomerInquiry['status']);
                        onToast('Estado Actualizado', `Solicitud ${item.id} cambiada a ${e.target.value}.`);
                      }}
                      className="bg-[#060e20] text-xs font-bold uppercase px-2.5 py-1.5 rounded-lg border border-[#2d3449] focus:outline-none cursor-pointer"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Validada">Validada</option>
                      <option value="Agendada">Agendada</option>
                      <option value="Entregada">Entregada</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() =>
                        window.open(`https://wa.me/?text=Hola%20${encodeURIComponent(item.clientName)},%20te%20escribimos%20de%20Apex%20Moto%20respecto%20a%20tu%20solicitud%20para%20${encodeURIComponent(item.bikeName)}`)
                      }
                      className="p-1.5 bg-[#131b2e] hover:bg-[#0ea5e9] hover:text-[#003751] rounded-lg transition-colors border border-[#222a3d] text-[#89ceff]"
                      title="Contactar vía WhatsApp"
                    >
                      <span className="material-symbols-outlined text-base">chat</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
