import Head from 'next/head';
import { FeatureSection } from '../src/components/FeatureSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Atomity — Challenge</title>
        <meta name="description" content="Frontend challenge feature" />
      </Head>
      <main>
        <FeatureSection />
      </main>
    </>
  );
}
