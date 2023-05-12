import '@/styles/globals.scss';
import '@/styles/general.scss';
import '@/styles/fonts.scss';
import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
