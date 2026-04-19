import { useMemo, useState } from 'react'

const initialCheckout = {
  name: '',
  phone: '',
  email: '',
  address: '',
  postcode: '',
  paymentMethod: 'card',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

function formatCurrency(value) {
  return `GBP ${value.toFixed(2)}`
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

function validateCheckout(form, cartItems) {
  const errors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[+()\-\s\d]{8,20}$/

  if (cartItems.length === 0) errors.cart = 'Cart is empty.'
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!phonePattern.test(form.phone.trim())) errors.phone = 'Valid phone is required.'
  if (!emailPattern.test(form.email.trim())) errors.email = 'Valid email is required.'
  if (!form.address.trim()) errors.address = 'Address is required.'
  if (!form.postcode.trim()) errors.postcode = 'Postcode is required.'

  if (form.paymentMethod === 'card') {
    if (form.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = 'Use 16-digit card number.'
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errors.cardExpiry = 'Use MM/YY format.'
    if (!/^\d{3,4}$/.test(form.cardCvc)) errors.cardCvc = 'Use 3 or 4 digit CVC.'
  }

  return errors
}

export function CartDrawer({
  open,
  cartItems,
  onClose,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onClearCart,
}) {
  const [checkoutForm, setCheckoutForm] = useState(initialCheckout)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [orderRef, setOrderRef] = useState('')

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )
  const service = subtotal > 0 ? 3.5 : 0
  const total = subtotal + service

  const inputClass =
    'w-full rounded-xl border border-cream-200 bg-cream-100 px-3 py-2 text-sm text-espresso-900 placeholder:text-espresso-900/45 focus:border-gold-500 focus:ring-gold-500/20'

  const handleChange = (event) => {
    const { name, value } = event.target
    let next = value
    if (name === 'cardNumber') next = formatCardNumber(value)
    if (name === 'cardExpiry') next = formatCardExpiry(value)
    if (name === 'cardCvc') next = value.replace(/\D/g, '').slice(0, 4)
    setCheckoutForm((prev) => ({ ...prev, [name]: next }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status === 'success') setStatus('idle')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateCheckout(checkoutForm, cartItems)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('processing')
    window.setTimeout(() => {
      const ref = `ZB-${Math.floor(100000 + Math.random() * 900000)}`
      setStatus('success')
      setOrderRef(ref)
      setCheckoutForm((prev) => ({ ...initialCheckout, phone: prev.phone, email: prev.email, name: prev.name }))
      onClearCart()
    }, 900)
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-espresso-950/65 transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-full max-w-md border-l border-cream-200 bg-cream-50 shadow-card transition-transform duration-300 sm:max-w-lg ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
            <div>
              <h3 className="font-heading text-3xl font-semibold text-espresso-950">Your Cart</h3>
              <p className="text-xs text-espresso-900/60">Review your selected desserts</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 bg-cream-100 text-xl text-espresso-900"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {errors.cart ? <p className="text-xs text-red-500">{errors.cart}</p> : null}
            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-cream-200 bg-cream-100 p-4 text-sm text-espresso-900/65">
                Your cart is empty. Add desserts from the featured section.
              </div>
            ) : (
              cartItems.map((item) => (
                <article key={item.id} className="rounded-2xl border border-cream-200 bg-cream-100 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-espresso-950">{item.name}</p>
                      <p className="text-xs text-espresso-900/60">{formatCurrency(item.price)} each</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-cream-200 bg-cream-50 text-espresso-900"
                      >
                        -
                      </button>
                      <span className="min-w-7 text-center text-sm font-semibold text-espresso-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-cream-200 bg-cream-50 text-espresso-900"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-espresso-950">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </article>
              ))
            )}

            <div className="rounded-2xl border border-cream-200 bg-cream-100 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-espresso-900/70">Checkout</h4>
              <form className="mt-3 space-y-3" onSubmit={handleSubmit} noValidate>
                <input
                  name="name"
                  value={checkoutForm.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Full name"
                />
                {errors.name ? <p className="text-xs text-red-500">{errors.name}</p> : null}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="phone"
                    value={checkoutForm.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Phone"
                  />
                  <input
                    name="email"
                    value={checkoutForm.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Email"
                  />
                </div>
                {errors.phone ? <p className="text-xs text-red-500">{errors.phone}</p> : null}
                {errors.email ? <p className="text-xs text-red-500">{errors.email}</p> : null}
                <input
                  name="address"
                  value={checkoutForm.address}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Address"
                />
                {errors.address ? <p className="text-xs text-red-500">{errors.address}</p> : null}
                <input
                  name="postcode"
                  value={checkoutForm.postcode}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Postcode"
                />
                {errors.postcode ? <p className="text-xs text-red-500">{errors.postcode}</p> : null}

                <div className="grid grid-cols-3 gap-2">
                  {['card', 'bank-transfer', 'cash-on-collection'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setCheckoutForm((prev) => ({
                          ...prev,
                          paymentMethod: method,
                        }))
                      }
                      className={`rounded-lg border px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                        checkoutForm.paymentMethod === method
                          ? 'border-gold-500 bg-gold-500/10 text-gold-600'
                          : 'border-cream-200 bg-cream-50 text-espresso-900/70'
                      }`}
                    >
                      {method === 'bank-transfer' ? 'Bank' : method === 'cash-on-collection' ? 'Cash' : 'Card'}
                    </button>
                  ))}
                </div>

                {checkoutForm.paymentMethod === 'card' ? (
                  <>
                    <input
                      name="cardNumber"
                      value={checkoutForm.cardNumber}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Card number"
                    />
                    {errors.cardNumber ? <p className="text-xs text-red-500">{errors.cardNumber}</p> : null}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        name="cardExpiry"
                        value={checkoutForm.cardExpiry}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="MM/YY"
                      />
                      <input
                        name="cardCvc"
                        value={checkoutForm.cardCvc}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="CVC"
                      />
                    </div>
                    {errors.cardExpiry ? <p className="text-xs text-red-500">{errors.cardExpiry}</p> : null}
                    {errors.cardCvc ? <p className="text-xs text-red-500">{errors.cardCvc}</p> : null}
                  </>
                ) : (
                  <p className="rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-xs text-espresso-900/65">
                    Demo mode: payment marked pending and confirmed at pickup.
                  </p>
                )}

                <button type="submit" className="gold-btn w-full">
                  {status === 'processing' ? 'Processing...' : 'Review & Place Order'}
                </button>

                {status === 'success' ? (
                  <p className="rounded-xl border border-emerald-300/60 bg-emerald-100 px-3 py-2 text-xs text-emerald-700">
                    Order placed successfully. Reference: {orderRef}
                  </p>
                ) : null}
              </form>
            </div>
          </div>

          <div className="border-t border-cream-200 px-5 py-4">
            <div className="space-y-1 text-sm text-espresso-900/75">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Service Fee</span>
                <span>{formatCurrency(service)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-espresso-950">
                <span>Total</span>
                <span className="text-gold-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
