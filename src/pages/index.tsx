import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function CodeWindow() {
  return (
    <div className={styles.codeWindow} aria-hidden="true">
      <div className={styles.codeWindowHeader}>
        <div className={styles.trafficLights}>
          <span className={styles.tlRed} />
          <span className={styles.tlYellow} />
          <span className={styles.tlGreen} />
        </div>
        <span className={styles.codeFileName}>getting-started.ts</span>
      </div>
      <div className={styles.codeBody}>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>1</span>
          <span className={styles.cComment}>// Bienvenido a JasvDev Docs</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>2</span>
          <span className={styles.cKeyword}>import </span>
          <span className={styles.cDefault}>{'{ '}</span>
          <span className={styles.cVar}>docs</span>
          <span className={styles.cDefault}>{' } '}</span>
          <span className={styles.cKeyword}>from </span>
          <span className={styles.cString}>'@jasvdev/docs'</span>
        </div>
        <div className={styles.codeLine}><span className={styles.cLineNum}>3</span></div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>4</span>
          <span className={styles.cKeyword}>const </span>
          <span className={styles.cVar}>guide </span>
          <span className={styles.cDefault}>= </span>
          <span className={styles.cKeyword}>await </span>
          <span className={styles.cDefault}>docs.</span>
          <span className={styles.cFn}>getGuide</span>
          <span className={styles.cDefault}>{'({'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>5</span>
          <span className={styles.cProp}>{'  topic'}</span>
          <span className={styles.cDefault}>: </span>
          <span className={styles.cString}>'architecture-patterns'</span>
          <span className={styles.cDefault}>,</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>6</span>
          <span className={styles.cProp}>{'  version'}</span>
          <span className={styles.cDefault}>: </span>
          <span className={styles.cString}>'latest'</span>
          <span className={styles.cDefault}>,</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>7</span>
          <span className={styles.cDefault}>{'});'}</span>
        </div>
        <div className={styles.codeLine}><span className={styles.cLineNum}>8</span></div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>9</span>
          <span className={styles.cKeyword}>export async function </span>
          <span className={styles.cFn}>learn</span>
          <span className={styles.cDefault}>{'() {'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>10</span>
          <span className={styles.cKeyword}>{'  const '}</span>
          <span className={styles.cDefault}>{'{ '}</span>
          <span className={styles.cVar}>chapters</span>
          <span className={styles.cDefault}>{' } = guide;'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>11</span>
          <span className={styles.cKeyword}>{'  for '}</span>
          <span className={styles.cDefault}>{'(const '}</span>
          <span className={styles.cVar}>ch </span>
          <span className={styles.cKeyword}>of </span>
          <span className={styles.cDefault}>{'chapters) {'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>12</span>
          <span className={styles.cKeyword}>{'    await '}</span>
          <span className={styles.cDefault}>ch.</span>
          <span className={styles.cFn}>study</span>
          <span className={styles.cDefault}>{'();'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>13</span>
          <span className={styles.cDefault}>{'  }'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>14</span>
          <span className={styles.cKeyword}>{'  return '}</span>
          <span className={styles.cDefault}>{'{ '}</span>
          <span className={styles.cProp}>mastered</span>
          <span className={styles.cDefault}>{': '}</span>
          <span className={styles.cKeyword}>true </span>
          <span className={styles.cDefault}>{'};'}</span>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.cLineNum}>15</span>
          <span className={styles.cDefault}>{'}'}</span>
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { icon: '📘', label: 'Guías técnicas',       desc: 'paso a paso'       },
  { icon: '🏛️', label: 'Patrones & Arq.',       desc: 'ADRs & diseño'     },
  { icon: '✅', label: 'Best Practices',        desc: 'código limpio'     },
  { icon: '🚀', label: 'Actualizado',           desc: '2025'              },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Documentación técnica`}
      description="Documentación técnica, guías y referencias para proyectos de software modernos">

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />

        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <span className={styles.badgePulse} />
            Open Source · Personal Docs
          </div>

          <div className={styles.terminalPrompt}>
            <span className={styles.tpPath}>~/jasvdev</span>
            <span className={styles.tpArrow}> ❯ </span>
            <span className={styles.tpCmd}>docs --explore</span>
            <span className={styles.tpCursor}>▊</span>
          </div>

          <h1 className={styles.heroTitle}>
            JasvDev
            <span className={styles.titleAccent}>Docs</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Documentación técnica, guías y referencias<br />
            para proyectos de software modernos.
          </p>

          <div className={styles.heroCtas}>
            <Link className={styles.btnPrimary} to="/docs/docusaurus/intro">
              Explorar documentación
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link className={styles.btnGhost} href="https://github.com/jasvdev">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Ver en GitHub
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <CodeWindow />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className={styles.statsBar}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statIcon}>{s.icon}</span>
            <div>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statDesc}>{s.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <HomepageFeatures />

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaPrompt} aria-hidden="true">
            <span className={styles.tpPath}>~/jasvdev/docs</span>
            <span className={styles.tpArrow}> ❯ </span>
            <span className={styles.ctaPromptText}>explore --all</span>
          </div>
          <h2 className={styles.ctaTitle}>¿Listo para explorar?</h2>
          <p className={styles.ctaDesc}>
            Todo en un solo lugar. Guías, referencias y patrones<br />
            para construir software de calidad.
          </p>
          <Link className={styles.btnPrimaryLg} to="/docs/docusaurus/intro">
            Comenzar ahora
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
