export type Locale = 'el' | 'en' | 'de'

export const LOCALES: Locale[] = ['el', 'en', 'de']
export const DEFAULT_LOCALE: Locale = 'el'

export type Dictionary = {
  nav: { home: string; map: string; report: string }

  landing: {
    heroTitle: string
    heroHighlight: string
    heroDesc: string
    ctaPrimary: string
    ctaSecondary: string
    whatToReport: string
    reportTypes: Array<{ icon: string; label: string }>
    howItWorksTitle: string
    howSteps: Array<{ step: string; title: string; desc: string }>
    statsReports: string
    statsCleaned: string
    statsMunicipalities: string
    impactTitle: string
    impactSubtitle: string
    championsTitle: string
    championsSubtitle: string
    needsWorkTitle: string
    needsWorkSubtitle: string
    unresolvedLabel: string
    footerTagline: string
  }

  tracking: {
    pageTitle: string
    notFoundTitle: string
    notFoundDesc: string
    labelCategory: string
    labelMunicipality: string
    labelSubmitted: string
    labelDescription: string
    rejectedMsg: string
    progressTitle: string
    steps: string[]
    shareTitle: string
    whatsappTemplate: string
    categories: Record<string, string>
  }

  copy: { copy: string; copied: string }

  form: {
    pageTitle: string
    pageSubtitle: string
    photoTitle: string
    photoDesc: string
    photoButton: string
    photoLibrary: string
    photoHint: string
    photoRemove: string
    photoCameraError: string
    locationTitle: string
    locationDesc: string
    locationFound: string
    locationRetry: string
    locationLoading: string
    locationButton: string
    locationError: string
    locationExifScanning: string
    locationExifNotFound: string
    locationExifOutsideGreece: string
    locationShowMap: string
    locationConfirmTitle: string
    locationSearchPlaceholder: string
    locationAdjustHint: string
    photosMultiDesc: string
    submitTitle: string
    submitSkip: string
    categoryTitle: string
    categoryDesc: string
    descLabel: string
    descOptional: string
    descPlaceholder: string
    reporterEmailLabel: string
    reporterEmailOptional: string
    reporterEmailPlaceholder: string
    reporterEmailHint: string
    navNext: string
    navBack: string
    submit: string
    submitting: string
    successTitle: string
    successDesc: string
    successLinkLabel: string
    successMapLink: string
    successAnother: string
    submitErrors: {
      missingFields: string
      invalidCoordinates: string
      outsideGreece: string
      imageTooLarge: string
      invalidReporterEmail: string
      invalidCategory: string
      rateLimited: string
      imageProcessing: string
      storage: string
      database: string
      generic: string
    }
    categories: Array<{ id: string; label: string; icon: string }>
    /** Display labels for all known category IDs (including legacy). */
    categoryLabels: Record<string, string>
  }

  map: {
    unknownMunicipality: string
    viewReport: string
    statuses: { pending: string; in_review: string; forwarded: string; resolved: string; rejected: string }
  }

  elapsed: {
    reportedAgo: string        // "Reported {n} ago"
    notifiedAgo: string        // "Municipality notified {n} ago"
    notifiedLabel: string      // "Municipality notified" — visual label below the big number
    notNotified: string        // "Not yet forwarded to municipality"
    daysUnit: string           // "days" / "Tage" / "ημέρες" — shown beside the big number
    tierFresh: string
    tierWaiting: string
    tierOverdue: string
    tierIgnored: string
    ariaReported: string       // full sentence for aria-label
    ariaNotified: string
  }
}
