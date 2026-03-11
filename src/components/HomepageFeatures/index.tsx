import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  icon: ReactNode;
  accent: string;
  tag: string;
  title: string;
  description: string;
  to: string;
};

const features: FeatureItem[] = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    accent: '#3ddc84',
    tag: 'guides',
    title: 'Guías Técnicas',
    description: 'Documentación paso a paso de conceptos, herramientas y tecnologías. Desde configuración inicial hasta casos de uso avanzados.',
    to: '/docs/intro',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    accent: '#25c2a0',
    tag: 'architecture',
    title: 'Patrones & Arquitectura',
    description: 'Decisiones de diseño, ADRs y patrones de software. Principios SOLID, clean architecture y estrategias de escalabilidad.',
    to: '/docs/intro',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    accent: '#ff9f43',
    tag: 'reference',
    title: 'Referencias Rápidas',
    description: 'Snippets, cheatsheets y referencias de APIs. Todo lo que necesitas al alcance de un vistazo para el día a día.',
    to: '/docs/intro',
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>Contenido</span>
          <h2 className={styles.sectionTitle}>Qué encontrarás aquí</h2>
          <p className={styles.sectionDesc}>
            Conocimiento organizado para construir mejor software.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className={styles.card}
              style={{'--card-accent': f.accent} as React.CSSProperties}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrapper}>{f.icon}</div>
                <span className={styles.cardTag}>{f.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
              <div className={styles.cardCta}>
                Explorar
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
