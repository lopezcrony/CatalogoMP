import React from 'react';

interface WhatsAppButtonProps {
  bikeName?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ bikeName }) => {
  const message = bikeName
    ? `Hola Apex Moto, estoy interesado en recibir información técnica y disponibilidad sobre la ${bikeName}`
    : 'Hola Apex Moto, deseo consultar sobre el catálogo de motocicletas y disponibilidad en showroom';

  const href = `https://wa.me/573013872774?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <a
        aria-label="Contactar Asesor en Línea por WhatsApp"
        className="group flex items-center gap-3"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="hidden sm:flex items-center gap-2 bg-[#060e20]/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#222a3d] shadow-2xl transition-all group-hover:border-[#10b981]/50">
         
          <span className="font-label-sm text-label-sm text-[#dae2fd] font-bold uppercase tracking-wider">
            Asesor en línea
          </span>
        </div>
        <div className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(16,185,129,0.5)] transition-all hover:scale-110 active:scale-95">
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.45 744.966 1.204.665.592 1.226.776 1.401.863.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.144.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.423 21.498 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
          </svg>
        </div>
      </a>
    </div>
  );
};
