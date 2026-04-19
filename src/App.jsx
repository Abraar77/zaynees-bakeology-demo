import { useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { BestsellerStrip } from './components/BestsellerStrip'
import { CategoriesSection } from './components/CategoriesSection'
import { FAQSection } from './components/FAQSection'
import { FeaturedSection } from './components/FeaturedSection'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { OrderSection } from './components/OrderSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { WhyChooseSection } from './components/WhyChooseSection'
import { categories, faqItems, featuredItems, testimonials, trustPoints } from './data/siteData'

function App() {
  const [selectedItem, setSelectedItem] = useState('')

  return (
    <div className="relative overflow-x-clip">
      <Navbar />
      <main>
        <HeroSection />
        <BestsellerStrip />
        <CategoriesSection categories={categories} />
        <FeaturedSection items={featuredItems} onEnquirySelect={setSelectedItem} />
        <AboutSection />
        <WhyChooseSection trustPoints={trustPoints} />
        <TestimonialsSection testimonials={testimonials} />
        <OrderSection selectedItem={selectedItem} />
        <FAQSection faqItems={faqItems} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
