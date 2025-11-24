
import HomePage from '@/app/home/page'
import Image from "next/image";
import Login from '@/app/login/page';
import AppContextProvider from '@/context/AppContext';

export default function Home() {
  return (
    <AppContextProvider>
    <HomePage />
    </AppContextProvider>
  );
}
