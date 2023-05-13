import '@/styles/globals.scss';
import '@/styles/general.scss';
import '@/styles/fonts.scss';
import { AppProps } from 'next/app';
import { Layout } from '@/components/Layout/layout';
import { useEffect } from 'react';
import { VacancyService } from '@/Http/vacancies';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const { data } = await VacancyService.login();
        localStorage.setItem('access_token', data.access_token);
      } catch (e) {}
    };
    asyncFunc();
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
