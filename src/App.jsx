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
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id)
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((entry) => entry.id !== itemId))
  }

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prev) =>
      prev
        .map((entry) => (entry.id === itemId ? { ...entry, quantity } : entry))
        .filter((entry) => entry.quantity > 0),
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(212,161,68,0.22),transparent_62%)]" />
      <Navbar cartCount={cartCount} />
      <main>
        <HeroSection />
        <BestsellerStrip />
        <CategoriesSection categories={categories} />
        <FeaturedSection items={featuredItems} onAddToCart={addToCart} />
        <AboutSection />
        <WhyChooseSection trustPoints={trustPoints} />
        <TestimonialsSection testimonials={testimonials} />
        <OrderSection
          cartItems={cartItems}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onUpdateCartQuantity={updateCartQuantity}
          onClearCart={clearCart}
          featuredItems={featuredItems}
        />
        <FAQSection faqItems={faqItems} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
