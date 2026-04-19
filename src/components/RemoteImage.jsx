import { useState } from 'react'

export function RemoteImage({ src, alt, className = '', fallbackText = 'Freshly Baked', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-espresso-900 to-espresso-800 text-center text-sm font-semibold text-cream-50 ${className}`}
      >
        {fallbackText}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
