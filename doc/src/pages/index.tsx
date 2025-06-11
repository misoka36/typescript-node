import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.title}>{siteConfig.title}</h1>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function NavigationCards() {
  const cards = [
    {
      title: 'ドキュメント',
      description: 'アーキテクチャと開発ガイドライン',
      link: '/docs/intro',
    },
    {
      title: 'API リファレンス',
      description: 'APIエンドポイントの詳細仕様',
      link: '/api/intro',
    },
    {
      title: 'ガイド',
      description: 'セットアップとチュートリアル',
      link: '/guides/intro',
    },
  ];

  return (
    <section className={styles.navigation}>
      <div className="container">
        <div className={styles.cards}>
          {cards.map((card, idx) => (
            <Link key={idx} to={card.link} className={styles.card}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="TypeScript Node - Clean Architecture with DDD">
      <HomepageHeader />
      <main>
        <NavigationCards />
      </main>
    </Layout>
  );
}
