import { useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { BestsellerStrip } from './components/BestsellerStrip'
import { CartDrawer } from './components/CartDrawer'
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
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

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
    setCartOpen(true)
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
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <HeroSection onCartOpen={() => setCartOpen(true)} />
        <BestsellerStrip />
        <CategoriesSection
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <FeaturedSection
          items={featuredItems}
          activeCategory={activeCategory}
          onAddToCart={addToCart}
        />
        <AboutSection />
        <WhyChooseSection trustPoints={trustPoints} />
        <TestimonialsSection testimonials={testimonials} />
        <OrderSection onCartOpen={() => setCartOpen(true)} />
        <FAQSection faqItems={faqItems} />
      </main>
      <Footer />
      <FloatingWhatsApp onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        onRemoveFromCart={removeFromCart}
        onUpdateCartQuantity={updateCartQuantity}
        onClearCart={clearCart}
      />
    </div>
  )
}

export default App
