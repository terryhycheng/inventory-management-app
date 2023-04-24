import '@/styles/globals.css';
import MainLayout from '@/components/layouts/MainLayout';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <main className="flex-1 bg-[#EFF3EB] p-10">
        <div className="mx-auto max-w-[1500px]">
          <Component {...pageProps} />
        </div>
      </main>
    </MainLayout>
  );
}
