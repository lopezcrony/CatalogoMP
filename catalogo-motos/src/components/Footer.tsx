import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#060e20] text-[#bec8d2] border-t border-[#171f33]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#171f33]">
          {/* Column 1: Brand & Guarantee */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Apex Moto Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VAlH_yQvgdRynQYMOqInryGz1B7iboJ9UDnaF6jjb3kzysZlZSAUsEpRv5vV5UgJgIkWorLe4y9V6zCAEZ24JmVVC9KYSHR8qVbEwo1BUW-4ElnXOYq_8REF_m2lG_wNGbrHMAdLboKJ0VJC6MwLSVPPFNRFw6W_VbBWfSVM_d4m3H5XsU8sQgadKFF4oZoB0x2FmRMLXKID0H6kvTa-aprTpuLsUR9FcK0Qk3-rNvg0LemyoWg9COkA"
              />
              <span className="font-headline-sm text-headline-sm text-[#dae2fd] tracking-tight uppercase">
                Apex Moto
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#bec8d2] leading-relaxed">
              Concesionario líder de motocicletas de alta gama y competición. Distribución certificada,
              telemetría técnica y respaldo de fábrica homologado.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="material-symbols-outlined text-[#4edea3] text-lg">verified_user</span>
              <span className="font-label-sm text-label-sm text-[#dae2fd] uppercase tracking-wider">
                Garantía Oficial 3 Años / Sin Límite Km
              </span>
            </div>
          </div>

          {/* Column 2: Allied Brands */}
          <div className="space-y-3">
            <span className="font-label-md text-label-md text-[#dae2fd] uppercase tracking-wider block">
              Marcas Aliadas Certificadas
            </span>
            <div className="grid grid-cols-2 gap-2 text-[#bec8d2] font-body-sm text-body-sm">
              <span className="bg-[#131b2e] px-3 py-1.5 rounded-lg hover:text-[#89ceff] transition-colors border border-[#222a3d]/50">
                Yamaha Racing
              </span>
              <span className="bg-[#131b2e] px-3 py-1.5 rounded-lg hover:text-[#89ceff] transition-colors border border-[#222a3d]/50">
                Honda Moto
              </span>
              <span className="bg-[#131b2e] px-3 py-1.5 rounded-lg hover:text-[#89ceff] transition-colors border border-[#222a3d]/50">
                Kawasaki Sport
              </span>
              <span className="bg-[#131b2e] px-3 py-1.5 rounded-lg hover:text-[#89ceff] transition-colors border border-[#222a3d]/50">
                BMW Motorrad
              </span>
              <span className="bg-[#131b2e] px-3 py-1.5 rounded-lg hover:text-[#89ceff] transition-colors border border-[#222a3d]/50">
                Ducati Corse
              </span>
              <span className="bg-[#131b2e] px-3 py-1.5 rounded-lg hover:text-[#89ceff] transition-colors border border-[#222a3d]/50">
                KTM Factory
              </span>
            </div>
          </div>

          {/* Column 3: Showroom Schedule */}
          <div className="space-y-3">
            <span className="font-label-md text-label-md text-[#dae2fd] uppercase tracking-wider block">
              Horario de Showroom
            </span>
            <ul className="space-y-2 font-body-sm text-body-sm">
              <li className="flex justify-between items-center bg-[#131b2e] px-3 py-2 rounded-lg border border-[#222a3d]/50">
                <span>Lunes - Viernes:</span>
                <span className="text-[#dae2fd] font-bold">09:00 - 20:00 hrs</span>
              </li>
              <li className="flex justify-between items-center bg-[#131b2e] px-3 py-2 rounded-lg border border-[#222a3d]/50">
                <span>Sábados (Test Ride):</span>
                <span className="text-[#dae2fd] font-bold">10:00 - 18:00 hrs</span>
              </li>
              <li className="flex justify-between items-center bg-[#131b2e] px-3 py-2 rounded-lg border border-[#222a3d]/50">
                <span>Domingos:</span>
                <span className="text-[#ffb4ab] font-bold">Cerrado</span>
              </li>
            </ul>
          </div>

          {/* Column 4: HQ & Workshop */}
          <div className="space-y-3">
            <span className="font-label-md text-label-md text-[#dae2fd] uppercase tracking-wider block">
              Sede Central &amp; Taller
            </span>
            <p className="font-body-sm text-body-sm text-[#bec8d2] leading-relaxed">
              Av. del Motor 1420, Distrito Tecnológico, Pabellón Apex Trackside.
            </p>
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#89ceff]">phone</span>
                <span className="font-body-sm text-body-sm text-[#dae2fd]">+34 900 848 200</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#89ceff]">mail</span>
                <span className="font-body-sm text-body-sm text-[#dae2fd]">ventas@apex-moto.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-[#bec8d2]">
          <p>© 2025 Apex Moto Dealership Network. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm">
            <a className="hover:text-[#89ceff] transition-colors" href="#terms">
              Términos de Servicio
            </a>
            <a className="hover:text-[#89ceff] transition-colors" href="#privacy">
              Política de Privacidad
            </a>
            <a className="hover:text-[#89ceff] transition-colors" href="#homologation">
              Homologación Técnica
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
