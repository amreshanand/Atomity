import Head from 'next/head';
import { FeatureSection } from '../src/components/FeatureSection';
import { Header } from '../src/components/Branding/Header';
import { HeroSection } from '../src/components/Branding/HeroSection';
import DashboardCanvas from '../src/components/Dashboard/DashboardCanvas';
import { Footer } from '../src/components/Branding/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Atomity — Sovereign Cloud Orchestration</title>
        <meta name="description" content="Atomity provides sovereign, compliance-first AI workload orchestration across AWS, Azure, GCP and on-premise." />
      </Head>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
        <Header />
        
        <main className="flex-grow">
          {/* Stunning hero banner with Atomity value props */}
          <HeroSection />
          
          {/* Main 3D dashboard visualization */}
          <section id="workloads" className="relative w-full z-10 border-y border-white/10 shadow-2xl">
            <DashboardCanvas />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
