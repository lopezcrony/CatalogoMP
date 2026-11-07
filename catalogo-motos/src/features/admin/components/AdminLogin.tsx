import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToShowroom: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToShowroom,
}) => {
  const [email, setEmail] = useState('gerencia.madrid@apexmotogroup.com');
  const [password, setPassword] = useState('ApexMoto2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 700);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b1326] flex items-center justify-center p-4 md:p-10 overflow-hidden font-sans">
      {/* Ambient Telemetry & Geometric Underlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="carbon-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 40 M 0 0 L 40 40"
                fill="none"
                stroke="#2d3449"
                strokeWidth="0.75"
              />
              <circle cx="20" cy="20" r="1" fill="#89ceff" opacity="0.6" />
            </pattern>
            <radialGradient id="electric-cone" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#0b1326" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#carbon-grid)" />
          <rect width="100%" height="100%" fill="url(#electric-cone)" />
        </svg>
      </div>

      {/* Radiant Glow Backdrop Elements */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#0ea5e9]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0053db]/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Login Console Container */}
      <div className="relative w-full max-w-[560px] z-10 flex flex-col gap-6">
        {/* Back to Showroom pill */}
        <div className="flex justify-start">
          <button
            onClick={onBackToShowroom}
            className="flex items-center gap-2 text-[#bec8d2] hover:text-[#89ceff] font-label-sm text-label-sm uppercase tracking-wider py-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Volver a la Tienda Pública
          </button>
        </div>

        {/* Brand & Hub Header */}
        <div className="flex flex-col items-center text-center">
          {/* Logo Apex Moto Custom Vector Mark */}
          <div className="flex items-center gap-3 mb-2 group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-[#222a3d] rounded-lg shadow-xl shadow-[#060e20]/80 border border-[#2d3449]">
              <svg className="w-8 h-8 text-[#89ceff]" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 50L30 14L40 34L48 22L56 50H42L36 38L28 50H12Z" fill="currentColor"></path>
                <path d="M30 14L40 34H24L30 14Z" fill="#0ea5e9" opacity="0.85"></path>
                <path d="M40 34L48 22L56 50H46L40 34Z" fill="#38bdf8"></path>
              </svg>
              <div className="absolute inset-0 bg-[#89ceff]/20 blur-md rounded-lg -z-10 group-hover:bg-[#89ceff]/40 transition-all"></div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline-md text-headline-md tracking-wider text-[#dae2fd] uppercase flex items-center gap-1.5">
                Apex <span className="text-[#89ceff]">Moto</span>
              </span>
            </div>
          </div>
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-[#89ceff]">
            Portal de Control de Gestión y Concesionario
          </p>
        </div>

        {/* Main Shielded Terminal Card */}
        <div className="bg-[#131b2e]/95 border border-[#2d3449] backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl shadow-[#060e20]/90 flex flex-col gap-6">
          {/* Security Telemetry Banner */}
          <div className="bg-[#222a3d]/80 border border-[#3e4850]/50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]"></span>
              </span>
              <span className="font-label-sm text-label-sm uppercase text-[#bec8d2] tracking-wide">
                Acceso Exclusivo • Nivel Admin
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#060e20]/60 px-2 py-0.5 rounded border border-[#222a3d]">
              <span className="material-symbols-outlined text-[#89ceff] text-[14px]">lock</span>
              <span className="font-body-sm text-body-sm text-[#89ceff] font-semibold">SSL 256-BIT</span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-[#690005]/40 border border-[#ffb4ab]/40 rounded-lg text-[#ffb4ab] text-sm">
              {error}
            </div>
          )}

          {/* Authentication Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Corporate ID Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-[#bec8d2] font-semibold" htmlFor="admin-id">
                Usuario / Correo de Administrador
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#88929b] text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  id="admin-id"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gerencia@apexmotogroup.com"
                  className="w-full h-11 bg-[#060e20] text-[#dae2fd] font-body-md text-body-md rounded-lg pl-11 pr-4 border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9] text-ellipsis placeholder:text-[#88929b]/60 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-[#bec8d2] font-semibold" htmlFor="master-pass">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => alert('Para soporte con credenciales, contacte a TI Apex Moto en soporte@apex-moto.com')}
                  className="font-label-sm text-label-sm text-[#89ceff] hover:underline transition-colors"
                >
                  Olvidé mi contraseña
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#88929b] text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  id="master-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 bg-[#060e20] text-[#dae2fd] font-body-md text-body-md rounded-lg pl-11 pr-11 border border-[#2d3449] focus:outline-none focus:border-[#0ea5e9] tracking-wider transition-colors"
                />
                <button
                  type="button"
                  aria-label="Alternar visibilidad"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#88929b] hover:text-[#89ceff] transition-colors flex items-center justify-center p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Device Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#060e20] border-[#2d3449] text-[#0ea5e9] focus:ring-0 cursor-pointer accent-[#0ea5e9]"
                />
                <span className="font-body-sm text-body-sm text-[#bec8d2]">
                  Recordar sesión en este equipo
                </span>
              </label>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 bg-[#0ea5e9] hover:bg-[#0053db] text-[#003751] hover:text-[#cdd7ff] font-label-lg text-label-lg font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0ea5e9]/20 group cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Help Link Area */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setEmail('gerencia.madrid@apexmotogroup.com');
                setPassword('ApexMoto2025!');
              }}
              className="font-body-sm text-body-sm text-[#89ceff] hover:underline transition-colors inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">contact_support</span>
              Cargar credenciales de Gerencia de Ventas (Demo)
            </button>
          </div>
        </div>

        {/* Compliance & Audit Micro-Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between px-2 text-[#88929b] font-body-sm text-body-sm gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            <span>Sistema Centralizado v4.8.2-PROD</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Auditoría SOC2 Tipo II</span>
            <span>•</span>
            <span>Apex Motor Group S.L.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
