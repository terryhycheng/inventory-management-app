import '@/styles/globals.css';
import MainLayout from '@/components/layouts/MainLayout';
import type { AppProps } from 'next/app';
import { ModalProvider } from '@/contexts/ModalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <MainLayout>
        <main className="flex-1 bg-[#EFF3EB] p-10">
          <div className="mx-auto max-w-[1500px]">
            <Component {...pageProps} />
          </div>
        </main>
      </MainLayout>
    </ModalProvider>
  );
}
