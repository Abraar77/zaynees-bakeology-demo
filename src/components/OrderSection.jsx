import { useMemo, useState } from 'react'
import { SectionHeading } from './SectionHeading'

const pickupSlots = ['10:00 - 11:00', '12:00 - 13:00', '15:00 - 16:00', '18:00 - 19:00']

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  pickupDate: '',
  pickupSlot: '',
  addressLine1: '',
  addressLine2: '',
  city: 'London',
  postcode: '',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  notes: '',
  agreePolicy: false,
}

function formatLocalDate(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatCardExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function getValidationErrors(form, cartItems, minPickupDate) {
  const errors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[+()\-\s\d]{8,20}$/
  const postCodePattern = /^[A-Za-z0-9 ]{4,10}$/

  if (cartItems.length === 0) errors.cart = 'Add at least one item to continue.'
  if (!form.fullName.trim()) errors.fullName = 'Please enter full name.'
  if (!emailPattern.test(form.email.trim())) errors.email = 'Please enter a valid email.'
  if (!phonePattern.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number.'

  if (!form.pickupDate) {
    errors.pickupDate = 'Select a collection date.'
  } else if (form.pickupDate < minPickupDate) {
    errors.pickupDate = `Date must be on or after ${minPickupDate}.`
  }

  if (!form.pickupSlot) errors.pickupSlot = 'Select a collection slot.'
  if (!form.addressLine1.trim()) errors.addressLine1 = 'Billing address is required.'
  if (!form.city.trim()) errors.city = 'City is required.'
  if (!postCodePattern.test(form.postcode.trim())) errors.postcode = 'Enter a valid postcode.'
  if (!form.paymentMethod) errors.paymentMethod = 'Select a payment method.'

  if (form.paymentMethod === 'card') {
    if (!form.cardName.trim()) errors.cardName = 'Name on card is required.'
    if (form.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = 'Use a 16-digit card number.'
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errors.cardExpiry = 'Use MM/YY.'
    if (!/^\d{3,4}$/.test(form.cardCvc)) errors.cardCvc = 'Use 3 or 4 digits.'
  }

  if (!form.agreePolicy) errors.agreePolicy = 'Please accept demo checkout terms.'

  return errors
}

function currency(value) {
  return `GBP ${value.toFixed(2)}`
}

function QuantityButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-cream-200/25 bg-cream-50/5 text-sm text-cream-50 transition hover:bg-cream-50/15"
    >
      {children}
    </button>
  )
}

export function OrderSection({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onClearCart,
  featuredItems,
}) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [orderMeta, setOrderMeta] = useState(null)

  const minPickupDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return formatLocalDate(date)
  }, [])

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )
  const serviceFee = subtotal > 0 ? 3.5 : 0
  const total = subtotal + serviceFee

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target

    let nextValue = type === 'checkbox' ? checked : value
    if (name === 'cardNumber') nextValue = formatCardNumber(value)
    if (name === 'cardExpiry') nextValue = formatCardExpiry(value)
    if (name === 'cardCvc') nextValue = value.replace(/\D/g, '').slice(0, 4)

    setForm((prev) => ({ ...prev, [name]: nextValue }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status === 'success') setStatus('idle')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = getValidationErrors(form, cartItems, minPickupDate)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('processing')
    window.setTimeout(() => {
      const orderNumber = `ZB-${Math.floor(100000 + Math.random() * 900000)}`
      setStatus('success')
      setOrderMeta({
        orderNumber,
        paymentLabel: form.paymentMethod === 'card' ? 'Card approved' : 'Pay on collection',
      })
      setForm((prev) => ({
        ...initialForm,
        fullName: prev.fullName,
        email: prev.email,
        phone: prev.phone,
      }))
      onClearCart()
    }, 900)
  }

  const inputClass =
    'w-full rounded-xl border border-cream-200/25 bg-cream-50/10 px-4 py-3 text-cream-50 placeholder:text-cream-100/45 focus:border-gold-500 focus:ring-gold-500/25'

  return (
    <section id="order" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-gold-500/25 bg-gradient-to-br from-espresso-900/95 to-espresso-950 p-6 shadow-card sm:p-8 md:p-10">
          <SectionHeading
            eyebrow="Real Demo Checkout"
            title="Order, Address, and Payment Flow"
            description="Interactive demo checkout with cart controls, address capture, payment method handling, and frontend validation."
          />

          <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="rounded-2xl border border-cream-200/15 bg-cream-50/5 p-4">
                <h3 className="font-heading text-2xl text-cream-50">Customer Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-sm">
                    <span className="mb-1 block text-cream-50">Full Name</span>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                    {errors.fullName ? <p className="mt-1 text-xs text-red-300">{errors.fullName}</p> : null}
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block text-cream-50">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                    {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block text-cream-50">Phone</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+44..."
                    />
                    {errors.phone ? <p className="mt-1 text-xs text-red-300">{errors.phone}</p> : null}
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block text-cream-50">Collection Date</span>
                    <input
                      name="pickupDate"
                      type="date"
                      min={minPickupDate}
                      value={form.pickupDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.pickupDate ? <p className="mt-1 text-xs text-red-300">{errors.pickupDate}</p> : null}
                  </label>
                </div>
                <label className="mt-4 block text-sm">
                  <span className="mb-1 block text-cream-50">Collection Time Slot</span>
                  <select name="pickupSlot" value={form.pickupSlot} onChange={handleChange} className={inputClass}>
                    <option value="">Select a slot</option>
                    {pickupSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.pickupSlot ? <p className="mt-1 text-xs text-red-300">{errors.pickupSlot}</p> : null}
                </label>
              </div>

              <div className="rounded-2xl border border-cream-200/15 bg-cream-50/5 p-4">
                <h3 className="font-heading text-2xl text-cream-50">Billing Address (Demo)</h3>
                <p className="mt-1 text-xs text-cream-100/70">
                  Collection remains from East London, E17. Address is captured for invoice and record.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-sm md:col-span-2">
                    <span className="mb-1 block text-cream-50">Address Line 1</span>
                    <input
                      name="addressLine1"
                      value={form.addressLine1}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Flat/House and street"
                    />
                    {errors.addressLine1 ? <p className="mt-1 text-xs text-red-300">{errors.addressLine1}</p> : null}
                  </label>
                  <label className="text-sm md:col-span-2">
                    <span className="mb-1 block text-cream-50">Address Line 2 (Optional)</span>
                    <input
                      name="addressLine2"
                      value={form.addressLine2}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Area or landmark"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block text-cream-50">City</span>
                    <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
                    {errors.city ? <p className="mt-1 text-xs text-red-300">{errors.city}</p> : null}
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block text-cream-50">Postcode</span>
                    <input
                      name="postcode"
                      value={form.postcode}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="E17 4AA"
                    />
                    {errors.postcode ? <p className="mt-1 text-xs text-red-300">{errors.postcode}</p> : null}
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-cream-200/15 bg-cream-50/5 p-4">
                <h3 className="font-heading text-2xl text-cream-50">Payment</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['card', 'bank-transfer', 'cash-on-collection'].map((method) => (
                    <label
                      key={method}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                        form.paymentMethod === method
                          ? 'border-gold-500 bg-gold-500/20 text-gold-400'
                          : 'border-cream-200/25 bg-cream-50/5 text-cream-100/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={form.paymentMethod === method}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {method.replaceAll('-', ' ')}
                    </label>
                  ))}
                </div>
                {errors.paymentMethod ? <p className="mt-1 text-xs text-red-300">{errors.paymentMethod}</p> : null}

                {form.paymentMethod === 'card' ? (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="text-sm md:col-span-2">
                      <span className="mb-1 block text-cream-50">Name on Card</span>
                      <input
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Card holder name"
                      />
                      {errors.cardName ? <p className="mt-1 text-xs text-red-300">{errors.cardName}</p> : null}
                    </label>
                    <label className="text-sm md:col-span-2">
                      <span className="mb-1 block text-cream-50">Card Number</span>
                      <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="4242 4242 4242 4242"
                      />
                      {errors.cardNumber ? <p className="mt-1 text-xs text-red-300">{errors.cardNumber}</p> : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1 block text-cream-50">Expiry</span>
                      <input
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="MM/YY"
                      />
                      {errors.cardExpiry ? <p className="mt-1 text-xs text-red-300">{errors.cardExpiry}</p> : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1 block text-cream-50">CVC</span>
                      <input
                        name="cardCvc"
                        value={form.cardCvc}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="123"
                      />
                      {errors.cardCvc ? <p className="mt-1 text-xs text-red-300">{errors.cardCvc}</p> : null}
                    </label>
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border border-cream-200/15 bg-cream-50/5 px-4 py-3 text-sm text-cream-100/80">
                    Demo mode: payment will be marked as pending and confirmed on collection.
                  </p>
                )}

                <label className="mt-4 flex items-start gap-2 text-xs text-cream-100/80">
                  <input
                    type="checkbox"
                    name="agreePolicy"
                    checked={form.agreePolicy}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-cream-200/25 bg-cream-50/10 text-gold-500"
                  />
                  I confirm this is a demo checkout request and agree to collection terms.
                </label>
                {errors.agreePolicy ? <p className="mt-1 text-xs text-red-300">{errors.agreePolicy}</p> : null}
              </div>

              <label className="block text-sm">
                <span className="mb-1 block text-cream-50">Order Notes</span>
                <textarea
                  name="notes"
                  rows="4"
                  value={form.notes}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Theme, colors, flavor preferences, allergens, and special message."
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="gold-btn min-w-44">
                  {status === 'processing' ? 'Processing...' : 'Place Demo Order'}
                </button>
                <a
                  href="https://wa.me/440000000000?text=Hi%20Zaynees%20Bakeology%2C%20I%20have%20a%20checkout%20question."
                  className="ghost-btn"
                >
                  Ask on WhatsApp
                </a>
              </div>

              {status === 'success' && orderMeta ? (
                <div className="rounded-2xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  Order placed successfully. Ref: <strong>{orderMeta.orderNumber}</strong>. Payment status:{' '}
                  <strong>{orderMeta.paymentLabel}</strong>.
                </div>
              ) : null}
            </form>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl border border-gold-500/30 bg-espresso-900/85 p-4">
                <h3 className="font-heading text-2xl text-cream-50">Order Summary</h3>
                {errors.cart ? <p className="mt-1 text-xs text-red-300">{errors.cart}</p> : null}

                {cartItems.length === 0 ? (
                  <div className="mt-4 rounded-xl border border-cream-200/15 bg-cream-50/5 p-3 text-sm text-cream-100/75">
                    Your cart is empty. Add a featured item to continue checkout.
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {cartItems.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-xl border border-cream-200/15 bg-cream-50/5 p-3 text-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-cream-50">{item.name}</p>
                            <p className="text-xs text-cream-100/70">{currency(item.price)} each</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-xs uppercase tracking-[0.1em] text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2">
                            <QuantityButton
                              onClick={() => onUpdateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </QuantityButton>
                            <span className="min-w-8 text-center text-xs text-cream-50">{item.quantity}</span>
                            <QuantityButton onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}>
                              +
                            </QuantityButton>
                          </div>
                          <p className="font-semibold text-gold-400">{currency(item.price * item.quantity)}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                <div className="mt-5 space-y-2 border-t border-cream-200/15 pt-4 text-sm">
                  <div className="flex items-center justify-between text-cream-100/85">
                    <span>Subtotal</span>
                    <span>{currency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-cream-100/85">
                    <span>Service Fee</span>
                    <span>{currency(serviceFee)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-cream-200/15 pt-2 font-semibold text-cream-50">
                    <span>Total</span>
                    <span className="text-gold-400">{currency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-cream-200/15 bg-cream-50/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gold-400">Quick Add</p>
                <div className="mt-3 grid gap-2">
                  {featuredItems.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="flex items-center justify-between rounded-lg border border-cream-200/15 bg-cream-50/5 px-3 py-2 text-left text-xs text-cream-100/85 transition hover:border-gold-500/35"
                    >
                      <span>{item.name}</span>
                      <span className="text-gold-400">{currency(item.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
