'use client'

import { useState } from 'react'
import ShareSheet from './ShareSheet'

type Strings = {
  cleanLabel: string    // "✅ Φαίνεται καθαρό"
  cleanThanks: string   // "Ευχαριστούμε!"
  shareBtn: string      // "📣 Κοινοποίησε"
  shareSheetTitle: string
  copy: string
  copied: string
}

type Props = {
  url: string
  shareText: string
  strings: Strings
}

export default function TrackingActions({ url, shareText, strings: s }: Props) {
  const [cleaned,   setCleaned]   = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <div className="flex gap-3">
        {/* Clean confirmation — citizen signals it looks resolved */}
        <button
          onClick={() => setCleaned(true)}
          className="flex-1 rounded-2xl py-3 px-4 text-sm font-bold transition-colors duration-150"
          style={{
            background:  cleaned ? '#DCFCE7' : '#fff',
            border:      `1.5px solid ${cleaned ? '#39B24A' : '#E5E7EB'}`,
            color:       cleaned ? '#15803D' : '#374151',
          }}
        >
          {cleaned ? `✓ ${s.cleanThanks}` : s.cleanLabel}
        </button>

        {/* Share — opens the bottom sheet */}
        <button
          onClick={() => setSheetOpen(true)}
          className="flex-1 btn-action rounded-2xl py-3 text-sm"
        >
          {s.shareBtn}
        </button>
      </div>

      <ShareSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        url={url}
        shareText={shareText}
        strings={{
          sheetTitle: s.shareSheetTitle,
          copy:       s.copy,
          copied:     s.copied,
        }}
      />
    </>
  )
}
