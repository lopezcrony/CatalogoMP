import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";

export const metadata: Metadata = {
  title: "Apex Moto - Portal Concesionario & Catálogo",
  description:
    "Plataforma integral de gestión de concesionario, homologación técnica y vitrina digital de motocicletas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
