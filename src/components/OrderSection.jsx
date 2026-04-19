import { useMemo, useState } from 'react'
import { categories } from '../data/siteData'
import { SectionHeading } from './SectionHeading'

const initialForm = {
  name: '',
  contact: '',
  itemType: '',
  quantity: 1,
  pickupDate: '',
  message: '',
}

function formatLocalDate(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function validateForm(form, minDate) {
  const errors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[+()\-\s\d]{8,20}$/

  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.contact.trim()) {
    errors.contact = 'Phone or email is required.'
  } else if (!emailPattern.test(form.contact.trim()) && !phonePattern.test(form.contact.trim())) {
    errors.contact = 'Enter a valid phone number or email.'
  }

  if (!form.itemType) errors.itemType = 'Please select an item type.'

  const qty = Number(form.quantity)
  if (!Number.isInteger(qty) || qty < 1) errors.quantity = 'Quantity must be at least 1.'

  if (!form.pickupDate) {
    errors.pickupDate = 'Please choose a collection date.'
  } else if (form.pickupDate < minDate) {
    errors.pickupDate = `Collection date should be on or after ${minDate}.`
  }

  if (!form.message.trim()) {
    errors.message = 'Please share your order details.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters.'
  }

  return errors
}

export function OrderSection({ selectedItem }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const minPickupDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return formatLocalDate(date)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      itemType: form.itemType || selectedItem,
    }

    const nextErrors = validateForm(payload, minPickupDate)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    const ref = `ZB-${Math.floor(1000 + Math.random() * 9000)}`
    setSubmitted(ref)
    setForm((prev) => ({
      ...initialForm,
      contact: prev.contact,
    }))
  }

  return (
    <section id="order" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-gold-500/25 bg-gradient-to-br from-espresso-900 to-espresso-950 p-6 shadow-card sm:p-8 md:p-10">
          <SectionHeading
            eyebrow="Order & Enquiry"
            title="Plan Your Dessert Order"
            description="Demo form with frontend validation and success state. No backend integration required."
          />

          <form className="mx-auto max-w-4xl space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-cream-50">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cream-200/25 bg-cream-50/10 px-4 py-3 text-cream-50 placeholder:text-cream-100/45 focus:border-gold-500 focus:ring-gold-500/25"
                  placeholder="Your full name"
                />
                {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-cream-50">Phone or Email</span>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cream-200/25 bg-cream-50/10 px-4 py-3 text-cream-50 placeholder:text-cream-100/45 focus:border-gold-500 focus:ring-gold-500/25"
                  placeholder="+44... or email@example.com"
                />
                {errors.contact ? <p className="mt-1 text-xs text-red-300">{errors.contact}</p> : null}
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm md:col-span-1">
                <span className="mb-1 block text-cream-50">Item Type</span>
                <select
                  name="itemType"
                  value={form.itemType || selectedItem}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cream-200/25 bg-espresso-900 px-4 py-3 text-cream-50 focus:border-gold-500 focus:ring-gold-500/25"
                >
                  <option value="">Select item</option>
                  {categories.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.itemType ? <p className="mt-1 text-xs text-red-300">{errors.itemType}</p> : null}
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-cream-50">Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cream-200/25 bg-cream-50/10 px-4 py-3 text-cream-50 focus:border-gold-500 focus:ring-gold-500/25"
                />
                {errors.quantity ? <p className="mt-1 text-xs text-red-300">{errors.quantity}</p> : null}
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-cream-50">Collection Date</span>
                <input
                  type="date"
                  name="pickupDate"
                  value={form.pickupDate}
                  min={minPickupDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cream-200/25 bg-cream-50/10 px-4 py-3 text-cream-50 focus:border-gold-500 focus:ring-gold-500/25"
                />
                {errors.pickupDate ? <p className="mt-1 text-xs text-red-300">{errors.pickupDate}</p> : null}
              </label>
            </div>

            <label className="text-sm">
              <span className="mb-1 block text-cream-50">Order Notes</span>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-2xl border border-cream-200/25 bg-cream-50/10 px-4 py-3 text-cream-50 placeholder:text-cream-100/45 focus:border-gold-500 focus:ring-gold-500/25"
                placeholder="Flavour, design details, theme colours, dietary notes, and preferred collection time."
              />
              {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message}</p> : null}
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="gold-btn">
                Submit Enquiry
              </button>
              <a href="https://wa.me/440000000000?text=Hi%20Zaynees%20Bakeology%2C%20I%20have%20an%20order%20enquiry." className="ghost-btn">
                WhatsApp Instead
              </a>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-300/35 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                Your enquiry was submitted successfully. Reference: <strong>{submitted}</strong>. We will usually
                respond within 24 hours.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
