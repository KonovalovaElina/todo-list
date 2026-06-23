import type { ReactNode } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mainContent">
        {children}
      </main>
      <Footer />
    </>
  );
}