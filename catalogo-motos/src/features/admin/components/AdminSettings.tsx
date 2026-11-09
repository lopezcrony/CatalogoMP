import React, { useState } from 'react';
import { formatCop } from '../../../lib/formatters';
import { Icon } from '../../../components/Icon';

interface AdminSettingsProps {
  onToast: (title: string, message: string) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onToast }) => {
  const [dealershipName, setDealershipName] = useState('Apex Motor Group S.L. - Pabellón Trackside');
  const [runtFee, setRuntFee] = useState(850000);
  const [soatFee, setSoatFee] = useState(1000000);
  const [roadTax, setRoadTax] = useState(650000);
  const [pdiInspectionIncluded, setPdiInspectionIncluded] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onToast('Configuración Guardada', 'Tarifas arancelarias y datos de concesionario sincronizados.');
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-16 font-sans">
      <div className="bg-surface-container-low border border-surface-container-high p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
            Parámetros del Sistema
          </span>
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Ajustes de Concesionario &amp; Aranceles
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Gestione las alícuotas impositivas, tarifas de matrícula &apos;Listo para Rodar&apos; y distribución autorizada.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dealership Info */}
        <div className="bg-surface-container border border-surface-container-high p-6 rounded-xl space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <Icon name="store" size={20} className="text-primary" />
            Información del Showroom
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
              Razón Social del Concesionario
            </label>
            <input
              type="text"
              value={dealershipName}
              onChange={(e) => setDealershipName(e.target.value)}
              className="w-full bg-surface-container-lowest text-on-surface px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={pdiInspectionIncluded}
                onChange={(e) => setPdiInspectionIncluded(e.target.checked)}
                className="w-4 h-4 rounded bg-surface-container-lowest text-primary accent-primary"
              />
              <span className="text-sm text-on-surface">
                Incluir inspección de 72 puntos PDI sin cargo adicional (Cortesía Apex)
              </span>
            </label>
          </div>
        </div>

        {/* Paperwork Tariffs */}
        <div className="bg-surface-container border border-surface-container-high p-6 rounded-xl space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <Icon name="receipt" size={20} className="text-primary" />
            Tarifas de Matrícula &amp; Tránsito (COP)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                Matrícula &amp; RUNT
              </label>
              <input
                type="number"
                value={runtFee}
                onChange={(e) => setRuntFee(Number(e.target.value))}
                className="w-full bg-surface-container-lowest text-on-surface font-spec-data text-spec-data px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                Póliza SOAT Anual
              </label>
              <input
                type="number"
                value={soatFee}
                onChange={(e) => setSoatFee(Number(e.target.value))}
                className="w-full bg-surface-container-lowest text-on-surface font-spec-data text-spec-data px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                Impuesto Rodamiento
              </label>
              <input
                type="number"
                value={roadTax}
                onChange={(e) => setRoadTax(Number(e.target.value))}
                className="w-full bg-surface-container-lowest text-on-surface font-spec-data text-spec-data px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="p-4 bg-surface-container-lowest rounded-lg border border-surface-container-high text-xs text-on-surface-variant">
            <p>
              Cálculo acumulado actual &apos;Listo para Rodar&apos;:{' '}
              <strong className="text-primary font-mono text-sm">
                {formatCop(runtFee + soatFee + roadTax)}
              </strong>{' '}
              sobre el precio base del catálogo.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary text-on-primary-container hover:text-on-primary font-label-lg text-label-lg px-6 py-2.5 rounded-lg font-bold transition-all shadow-md cursor-pointer"
            >
              Guardar Parámetros
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
