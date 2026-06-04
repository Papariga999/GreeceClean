'use client'

import { useState, useEffect } from 'react'

type Strings = {
  sheetTitle: string
  copy: string
  copied: string
}

type Props = {
  open: boolean
  onClose: () => void
  url: string
  shareText: string
  strings: Strings
}

function buildUrls(url: string, text: string) {
  const enc  = encodeURIComponent
  const full = `${text}\n${url}`
  return {
    whatsapp: `https://wa.me/?text=${enc(full)}`,
    viber:    `viber://forward?text=${enc(full)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    x:        `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
  }
}

export default function ShareSheet({ open, onClose, url, shareText, strings: s }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const links = buildUrls(url, shareText)

  const copy = async () => {
    try { await navigator.clipboard.writeText(url) } catch { /* ignore */ }
    setCopied(true)
    setTimeout(() => { setCopied(false); onClose() }, 1600)
  }

  type Item = { label: string; bg: string; content: React.ReactNode; href?: string; onClick?: () => void }
  const items: Item[] = [
    {
      label: 'WhatsApp', bg: '#25D366',
      content: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: links.whatsapp,
    },
    {
      label: 'Viber', bg: '#7360F2',
      content: <span className="text-white text-xl leading-none">📞</span>,
      href: links.viber,
    },
    {
      label: 'Facebook', bg: '#1877F2',
      content: <span className="text-white text-xl font-black" style={{ fontFamily: 'Georgia, serif' }}>f</span>,
      href: links.facebook,
    },
    {
      label: 'X', bg: '#000',
      content: <span className="text-white text-base font-bold">𝕏</span>,
      href: links.x,
    },
    {
      label: 'LinkedIn', bg: '#0A66C2',
      content: <span className="text-white text-sm font-extrabold">in</span>,
      href: links.linkedin,
    },
    {
      label: copied ? s.copied : s.copy,
      bg: copied ? '#6B7C3A' : '#6B7280',
      content: <span className="text-white text-xl leading-none">{copied ? '✓' : '🔗'}</span>,
      onClick: copy,
    },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-3xl px-5 pb-10 pt-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <p className="text-center text-base font-bold text-gray-900 mb-6">{s.sheetTitle}</p>
        <div className="grid grid-cols-3 gap-5 max-w-xs mx-auto">
          {items.map(item =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
                onClick={() => setTimeout(onClose, 400)}
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl" style={{ background: item.bg }}>
                  {item.content}
                </span>
                <span className="text-xs text-gray-500 font-medium text-center">{item.label}</span>
              </a>
            ) : (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex flex-col items-center gap-2"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl transition-colors duration-200" style={{ background: item.bg }}>
                  {item.content}
                </span>
                <span className="text-xs text-gray-500 font-medium text-center">{item.label}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
