'use client'

import AppContextProvider from '@/context/AppContext';
import TransactionsPage from './transaction/page';

export default function Home() {
  return (
    <AppContextProvider>
    <TransactionsPage />
    </AppContextProvider>

  );
}
