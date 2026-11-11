import React from 'react';
import { Icon, IconName } from '../../../components/Icon';

export interface AdminResourceRow {
  id: string;
  title: string;
  subtitle: string;
  metadata: string[];
  status?: string;
}

interface AdminResourceViewProps {
  icon: IconName;
  eyebrow: string;
  title: string;
  description: string;
  rows: AdminResourceRow[];
}

export const AdminResourceView: React.FC<AdminResourceViewProps> = ({
  icon,
  eyebrow,
  title,
  description,
  rows,
}) => (
  <div className="flex flex-col gap-6 pb-16">
    <header className="rounded-2xl border border-surface-container-high bg-surface-container-low p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <Icon name={icon} size={24} />
        </div>
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{title}</h1>
          <p className="mt-1 max-w-3xl font-body-md text-body-md text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
    </header>

    <section className="rounded-2xl border border-surface-container-high bg-surface-container-low p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Registros actuales</h2>
        <span className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">
          {rows.length} registros
        </span>
      </div>
      <div className="grid gap-3">
        {rows.map((row) => (
          <article
            key={row.id}
            className="flex flex-col gap-3 rounded-xl border border-surface-container-high bg-surface-container p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <h3 className="font-label-lg text-label-lg text-on-surface">{row.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{row.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {row.metadata.map((item) => (
                <span key={item} className="rounded-lg bg-surface-container-lowest px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant">
                  {item}
                </span>
              ))}
              {row.status && (
                <span className="rounded-lg bg-tertiary-container px-2.5 py-1 font-label-sm text-label-sm text-on-tertiary-container">
                  {row.status}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
);
