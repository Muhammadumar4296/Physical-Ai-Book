// import React from 'react';
// import Layout from '@theme/Layout';
// import Link from '@docusaurus/Link';

// export default function Home() {
//   return (
//     <Layout title="Physical AI & Humanoid Robotics">
//       {/* HERO SECTION - FULL SCREEN */}
//       <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Image */}
//         <div 
//           className="absolute inset-0 -z-10"
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1676299081408-7c2bc8df5c03?w=1920&q=85&fit=crop')",
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <div className="absolute inset-0 bg-black/70 -z-10" />

//         {/* Hero Content */}
//         <div className="text-center px-6 max-w-6xl mx-auto z-10">
//           <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
//             Physical AI &<br className="hidden md:block" />Humanoid Robotics
//           </h1>
//           <p className="text-2xl md:text-4xl text-cyan-300 mb-12 font-light">
//             Master the Future of Embodied Intelligence
//           </p>
//           <Link
//             to="/docs/intro"
//             className="inline-block bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xl md:text-2xl px-12 py-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl"
//           >
//             Start Learning Physical AI →
//           </Link>
//         </div>

//         {/* Glow Effects */}
//         <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-32 right-32 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
//       </div>

//       {/* Optional: Features section neeche add kar sakta hai baad mein */}
//     </Layout>
//   );
// }



// without hero SEction se pehlye ka code.
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import { Hero } from '@site/src/components/Hero';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}



// import React from 'react';
// import Layout from '@theme/Layout';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import ChatbotHero from '@site/src/components/ChatbotHero';
// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={styles.heroBanner}>
//       <div className={styles.container}>
//         <h1 className={styles.heroTitle}>
//           🤖 Physical AI & Humanoid Robotics
//         </h1>
//         <p className={styles.heroTagline}>
//           The Complete Guide to Building Intelligent Physical Systems
//         </p>
//         <div className={styles.buttons}>
//           <Link
//             className={styles.button}
//             to="/docs/intro">
//             Start Reading →
//           </Link>
//           <Link
//             className={styles.buttonSecondary}
//             to="https://github.com">
//             View on GitHub ⭐
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// function FeaturesSection() {
//   const features = [
//     {
//       title: '🔧 Mechanical Design',
//       description: 'Learn how humanoid robots are built - from actuators to joints, hands to locomotion systems.',
//       link: '/docs/chapter2-mechanical-design'
//     },
//     {
//       title: '👁️ Sensing & Perception',
//       description: 'Explore vision systems, lidar, tactile sensors, and how robots understand their environment.',
//       link: '/docs/chapter3-sensing-perception'
//     },
//     {
//       title: '🚶 Locomotion & Control',
//       description: 'Master bipedal walking, balance control, and manipulation strategies for humanoid robots.',
//       link: '/docs/chapter4-locomotion-control'
//     },
//     {
//       title: '🧠 AI & Machine Learning',
//       description: 'Discover how robots learn through imitation, reinforcement learning, and foundation models.',
//       link: '/docs/chapter5-learning-future'
//     },
//   ];

//   return (
//     <section className={styles.features}>
//       <div className={styles.container}>
//         <h2 className={styles.sectionTitle}>What You'll Learn</h2>
//         <div className={styles.featureGrid}>
//           {features.map((feature, idx) => (
//             <Link to={feature.link} key={idx} className={styles.featureCard}>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//               <span className={styles.readMore}>Read More →</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function StatsSection() {
//   return (
//     <section className={styles.stats}>
//       <div className={styles.container}>
//         <div className={styles.statsGrid}>
//           <div className={styles.statCard}>
//             <div className={styles.statNumber}>7</div>
//             <div className={styles.statLabel}>Comprehensive Chapters</div>
//           </div>
//           <div className={styles.statCard}>
//             <div className={styles.statNumber}>50+</div>
//             <div className={styles.statLabel}>Technical Concepts</div>
//           </div>
//           <div className={styles.statCard}>
//             <div className={styles.statNumber}>15+</div>
//             <div className={styles.statLabel}>Interactive Diagrams</div>
//           </div>
//           <div className={styles.statCard}>
//             <div className={styles.statNumber}>∞</div>
//             <div className={styles.statLabel}>AI-Powered Q&A</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function Home() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`${siteConfig.title}`}
//       description="Complete guide to Physical AI and Humanoid Robotics">
//       <HomepageHeader />
//       <main>
//         <ChatbotHero />
//         <FeaturesSection />
//         <StatsSection />
//       </main>
//     </Layout>
//   );
// }