import { useState } from 'react'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import Hero from '../../components/home/Hero/Hero'
import HowItWorks from '../../components/home/HowItWorks/HowItWorks'
import HeroOptions from '../../components/home/HeroOptions/HeroOptions'
import Features from '../../components/home/Features/Features'
import Pricing from '../../components/home/Pricing/Pricing'
import TrustBand from '../../components/home/TrustBand/TrustBand'
import AuthModal, { type AuthTab } from '../../components/AuthModal/AuthModal'

function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<AuthTab>('login')

  function openAuth(tab: AuthTab) {
    setAuthTab(tab)
    setAuthOpen(true)
  }

  return (
    <>
      <Header onOpenAuth={openAuth} />
      <Hero onOpenAuth={openAuth} />
      <HowItWorks />
      <HeroOptions />
      <Features />
      <Pricing onOpenAuth={openAuth} />
      <TrustBand />
      <Footer />
      <AuthModal
        open={authOpen}
        tab={authTab}
        onTabChange={setAuthTab}
        onClose={() => setAuthOpen(false)}
      />
    </>
  )
}

export default HomePage
