import React, { useState } from 'react';
import { Icon } from '../../../components/Icon';

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
    <div className="relative w-full min-h-screen bg-surface flex items-center justify-center p-4 md:p-10 overflow-hidden font-sans">
      {/* Ambient Telemetry & Geometric Underlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="carbon-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 40 M 0 0 L 40 40"
                fill="none"
                stroke="var(--color-outline-variant)"
                strokeWidth="0.75"
              />
              <circle cx="20" cy="20" r="1" fill="var(--color-primary)" opacity="0.6" />
            </pattern>
            <radialGradient id="electric-cone" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
              <stop offset="60%" stopColor="var(--color-surface)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#carbon-grid)" />
          <rect width="100%" height="100%" fill="url(#electric-cone)" />
        </svg>
      </div>

      {/* Radiant Glow Backdrop Elements */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Login Console Container */}
      <div className="relative w-full max-w-[560px] z-10 flex flex-col gap-6">
        {/* Back to Showroom pill */}
        <div className="flex justify-start">
          <button
            onClick={onBackToShowroom}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm text-label-sm uppercase tracking-wider py-1 transition-colors cursor-pointer"
          >
            <Icon name="arrow_back" size={16} />
            Volver a la Tienda Pública
          </button>
        </div>

        {/* Brand & Hub Header */}
        <div className="flex flex-col items-center text-center">
          {/* Logo Apex Moto Custom Vector Mark */}
          <div className="flex items-center gap-3 mb-2 group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-surface-container-high rounded-lg shadow-xl shadow-black/10 border border-outline-variant">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 50L30 14L40 34L48 22L56 50H42L36 38L28 50H12Z" fill="currentColor"></path>
                <path d="M30 14L40 34H24L30 14Z" fill="var(--color-primary)" opacity="0.85"></path>
                <path d="M40 34L48 22L56 50H46L40 34Z" fill="var(--color-primary-fixed-dim)"></path>
              </svg>
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg -z-10 group-hover:bg-primary/40 transition-all"></div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline-md text-headline-md tracking-wider text-on-surface uppercase flex items-center gap-1.5">
                Apex <span className="text-primary">Moto</span>
              </span>
            </div>
          </div>
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Portal de Control de Gestión y Concesionario
          </p>
        </div>

        {/* Main Shielded Terminal Card */}
        <div className="bg-surface-container-low/95 border border-outline-variant backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/10 flex flex-col gap-6">
          {/* Security Telemetry Banner */}
          <div className="bg-surface-container-high/80 border border-outline/50 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
              </span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wide">
                Acceso Exclusivo • Nivel Admin
              </span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest/60 px-2 py-0.5 rounded border border-surface-container-high">
              <Icon name="lock" size={14} className="text-primary" />
              <span className="font-body-sm text-body-sm text-primary font-semibold">SSL 256-BIT</span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-error-container/40 border border-error/40 rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          {/* Authentication Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Corporate ID Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="admin-id">
                Usuario / Correo de Administrador
              </label>
              <div className="relative flex items-center">
                <Icon name="badge" size={20} className="absolute left-3.5 text-outline pointer-events-none" />
                <input
                  id="admin-id"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gerencia@apexmotogroup.com"
                  className="w-full h-11 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg pl-11 pr-4 border border-outline-variant focus:outline-none focus:border-primary text-ellipsis placeholder:text-outline/60 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold" htmlFor="master-pass">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => alert('Para soporte con credenciales, contacte a TI Apex Moto en soporte@apex-moto.com')}
                  className="font-label-sm text-label-sm text-primary hover:underline transition-colors"
                >
                  Olvidé mi contraseña
                </button>
              </div>
              <div className="relative flex items-center">
                <Icon name="lock" size={20} className="absolute left-3.5 text-outline pointer-events-none" />
                <input
                  id="master-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg pl-11 pr-11 border border-outline-variant focus:outline-none focus:border-primary tracking-wider transition-colors"
                />
                <button
                  type="button"
                  aria-label="Alternar visibilidad"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-outline hover:text-primary transition-colors flex items-center justify-center p-1"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'eye'} size={20} />
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
                  className="w-4 h-4 rounded bg-surface-container-lowest border-outline-variant text-primary focus:ring-0 cursor-pointer accent-primary"
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Recordar sesión en este equipo
                </span>
              </label>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 bg-primary hover:bg-primary text-on-primary-container hover:text-on-primary font-label-lg text-label-lg font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Icon name="refresh" size={20} className="animate-spin" />
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <Icon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
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
              className="font-body-sm text-body-sm text-primary hover:underline transition-colors inline-flex items-center gap-1.5"
            >
              <Icon name="contact_support" size={16} />
              Cargar credenciales de Gerencia de Ventas (Demo)
            </button>
          </div>
        </div>

        {/* Compliance & Audit Micro-Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between px-2 text-outline font-body-sm text-body-sm gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
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
