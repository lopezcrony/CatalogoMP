<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Contexto del proyecto

## Propósito

`catalogo-motos` es un catálogo digital de motocicletas con una vitrina pública y un
portal administrativo. La interfaz proviene de Stitch y consume datos de Supabase;
las vistas muestran estados vacíos mientras no existan registros.

## Arquitectura actual

- **Framework:** Next.js App Router.
- **Entrada web:** `src/app/layout.tsx` define el layout, metadata y estilos globales;
  `src/app/page.tsx` monta la aplicación cliente.
- **Aplicación:** `src/App.tsx` concentra el estado de navegación, inventario,
  homologaciones y modales.
- **Componentes compartidos:** `src/components/` contiene `Navbar`, `Footer`,
  `WhatsAppButton`, `ShowroomCatalog` y `VehicleDetailPage`, que se reutilizan o
  coordinan la experiencia pública.
- **Feature catalog:** `src/features/catalog/` contiene constantes, búsqueda, filtros,
  estado de tarjetas y componentes visuales específicos de la vitrina pública.
  `ShowroomCatalog` conserva la composición de la página y usa piezas especializadas.
- **Feature admin:** `src/features/admin/components/` contiene el panel administrativo,
  su login, navegación, inventario, homologaciones y configuración.
- **Datos:** el inventario, marcas y características proceden de Supabase; no se
  mantienen registros mock ni datos de prueba en el frontend.
- **Tipos:** `src/types.ts` define `Motorcycle`, `MotorcycleCharacteristic`,
  `CharacteristicCategory` y `HomologationModel`. Los precios de `Motorcycle` son
  numéricos y únicamente están expresados en pesos colombianos (`priceRawCop` y
  `priceDocsCop`).
- **Formateo:** `src/lib/formatters.ts` centraliza la presentación de valores COP.
- **Estilos:** `src/index.css` contiene los tokens visuales de Stitch y las clases
  globales Tailwind.
- **Paleta:** las vistas deben consumir los tokens semánticos definidos en
  `src/index.css` (`surface`, `on-surface`, `primary`, `tertiary`, `error` y sus
  variantes); no agregar colores hexadecimales directamente en clases Tailwind.

## Flujo de vistas

`src/App.tsx` controla cuatro modos:

1. `showroom`: catálogo público (`ShowroomCatalog`).
2. `vdp`: detalle de una motocicleta (`VehicleDetailPage`).
3. `admin-login`: acceso simulado al panel (`AdminLogin`).
4. `admin`: consola con inventario, resumen, catálogo y revisiones anuales.

Los cambios de inventario y las aprobaciones de homologación solo viven en el estado
de React y se pierden al recargar la página.

## Convenciones para próximos cambios

- Mantener `src/app/page.tsx` como punto de entrada de Next y `src/App.tsx` como
  componente cliente principal mientras no se defina una separación por rutas.
- No agregar llamadas a Supabase directamente dentro de los componentes visuales.
  Cuando se autorice la integración, crear una capa de servicios/repositorios y
  reemplazar gradualmente los datos de `src/data/bikes.ts`.
- Conservar los tipos compartidos en `src/types.ts` y actualizar validaciones y
  componentes cuando cambie el modelo.
- Mantener COP como la única moneda del dominio; no agregar conversiones ni campos
  alternativos de moneda en componentes o datos locales.
- Mantener la lógica de búsqueda y filtros en `src/features/catalog/`; los componentes
  visuales del catálogo deben recibir datos y callbacks mediante props.
- Colocar nuevos elementos reutilizables de la vitrina en
  `src/features/catalog/components/` en lugar de aumentar `ShowroomCatalog.tsx`.
- Colocar componentes exclusivos del panel en `src/features/admin/`; no devolverlos a
  `src/components/`.
- La cilindrada se conserva como especificación técnica visible, pero no existe como
  filtro ni criterio de búsqueda del catálogo.
- El crédito se comunica únicamente mediante `CreditInfoModal`, un popup informativo
  sin formularios, captura de datos ni lógica comercial. La imagen definitiva se
  incorporará cuando la entregue el cliente.
- Las tarjetas públicas solo deben conservar el acceso a la ficha completa; no agregar
  botones de reserva, notificación, cotización o prueba de manejo.
- `MotorcycleCard` compone la tarjeta y sus acciones; `MotorcycleGallery` encapsula
  la galería; `CatalogStatusBadge` centraliza la presentación de estados; los hooks
  `useCatalogFilters` y `useMotorcycleCardState` contienen estado de interacción.
- Validar los cambios con `npm run lint` y `npm run build`.
- El panel administrativo es responsive: la barra lateral se muestra fija desde
  `md` y se abre como menú superpuesto en pantallas menores; el contenido debe
  conservar el espaciado responsive del shell definido en `src/App.tsx`.
- Las vistas que dependen de Supabase deben manejar explícitamente los estados de
  carga, error y vacío; no deben incluir fallbacks con datos locales.
- Las características técnicas se modelan como datos dinámicos mediante
  `MotorcycleCharacteristic` y `CharacteristicCategory`. El adaptador
  `getMotorcycleCharacteristics` solo devuelve características recibidas desde el
  adaptador remoto; no genera valores técnicos locales.
- `CatalogRepository` define la frontera de lectura para marcas, motos, variantes,
  imágenes y características; no debe importar Supabase dentro de componentes
  visuales.

## Estado conocido

La integración inicial con Next se completó: la página App Router monta la UI cliente,
los estilos de Stitch se cargan desde el layout y la metadata pertenece al catálogo.

## Integración Supabase

La infraestructura de Supabase vive en `src/lib/supabase/`:

- `client.ts` crea el cliente oficial usando `NEXT_PUBLIC_SUPABASE_URL` y
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `database.types.ts` contiene el contrato tipado de las tablas y enums definidos
  para el proyecto.
- `services/auth.service.ts` contiene autenticación y validación del rol admin.
- `services/public/` expone las lecturas del catálogo público.
- `services/admin/` expone CRUD de marcas, motos, colores, imágenes,
  características, ficha técnica y revisiones.
- `services/storage.service.ts` encapsula Supabase Storage; las imágenes se limitan
  a seis por moto desde `images.service.ts`.
- `errors.ts` centraliza la propagación explícita de errores de Supabase.

Las variables requeridas están documentadas en `.env.example`. No se deben incluir
valores reales en el repositorio. La aplicación no conserva mocks: los flujos muestran estados de carga, error y vacío
mientras la base de datos se completa.

Las características del catálogo no se eliminan físicamente cuando están en uso:
se desactivan mediante `desactivarCaracteristica`; las asociaciones de una ficha
técnica se gestionan desde `technical-sheet.service.ts`.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
