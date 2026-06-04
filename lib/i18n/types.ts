export type Locale = 'el' | 'en' | 'de'

export const LOCALES: Locale[] = ['el', 'en', 'de']
export const DEFAULT_LOCALE: Locale = 'el'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as string[]).includes(value)
}

export type Dictionary = {
  a11y: {
    skipToContent: string
    languageSwitcher: string
  }

  meta: {
    home: { title: string; description: string }
    report: { title: string; description: string }
    map: { title: string; description: string }
    partners: { title: string; description: string }
    top: { title: string; description: string }
    region: { title: string; description: string }
  }

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
    topVotedTitle: string
    topVotedSubtitle: string
    topVotedSeeAll: string
    topFilterAll: string
    topFilterMine: string
    topEmpty: string
    topFootnote: string
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
    shareBtn: string
    shareSheetTitle: string
    cleanLabel: string
    cleanThanks: string
    resolvedTitle: string
    resolvedBy: string
    resolvedShare: string
    resolvedShareTitle: string
    whatsappTemplate: string
    categories: Record<string, string>
    voteTitle: string
    voteImportant: string
    voteImportantSub: string
    voteStillThere: string
    voteStillThereSub: string
    votePeopleCare: string
    nearbyTitle: string
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
    navNext: string
    navBack: string
    submit: string
    submitting: string
    successTitle: string
    successDesc: string
    successLinkLabel: string
    successShareTitle: string
    successShareBtn: string
    successShareText: string
    successTrackBtn: string
    successTrackDesc: string
    successMapLink: string
    successMapDesc: string
    successAnother: string
    submitErrors: {
      missingFields: string
      invalidCoordinates: string
      outsideGreece: string
      imageTooLarge: string
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
    loading: string
    loadInteractive: string
    loadHint: string
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

  partners: {
    footerLink: string
    heroEyebrow: string
    heroPre: string
    heroHi: string
    heroPost: string
    heroSub: string
    problemEyebrow: string
    problemHeading: string
    problemLead: string
    problemStats: Array<{ value: string; sub: string; desc: string }>
    problemKicker: string
    problemSources: string
    solutionEyebrow: string
    solutionHeading: string
    solutionSub: string
    solutionSteps: Array<{ icon: string; title: string; desc: string }>
    solutionFeatures: string[]
    mvEyebrow: string
    mvMissionLabel: string
    mvMission: string
    mvVisionLabel: string
    mvVision: string
    claims: {
      eyebrow: string
      heading: string
      sub: string
      items: Array<{ title: string; desc: string }>
      partnersLabel: string
      partnersNote: string
    }
    whyEyebrow: string
    whyHeading: string
    whySub: string
    whyCta: string
    whyRegionLink: string
    whyCards: Array<{ icon: string; title: string; bullets: string[] }>
    offerEyebrow: string
    offerHeading: string
    offerSub: string
    offerItems: Array<{ icon: string; title: string; desc: string }>
    offerTransHeading: string
    offerTransSub: string
    offerTransPoints: string[]
    contactEyebrow: string
    contactHeading: string
    contactSub: string
    contactTrust: string
    contactAltIntro: string
    contactAltLinkedin: string
    formName: string
    formNamePh: string
    formOrg: string
    formOrgPh: string
    formRole: string
    formRolePh: string
    formOptional: string
    formEmail: string
    formEmailPh: string
    formInterest: string
    formInterestPh: string
    formInterestOptions: string[]
    formRegion: string
    formRegionPh: string
    formMessage: string
    formMessagePh: string
    formConsent: string
    formConsentLink: string
    formSubmit: string
    formSubmitting: string
    formErrRequired: string
    formErrEmail: string
    formErrConsent: string
    formSuccessTitle: string
    formSuccessBody: string
    formSuccessBackMap: string
    formSuccessExplore: string
    formErrorTitle: string
    formErrorBody: string
    formErrorRetry: string
    banner: { title: string; sub: string; cta: string }
    reportCta: string
    impactCta: { title: string; sub: string; cta: string }
    regionLayer: {
      heroEyebrow: string
      heroTitle: string
      heroSub: string
      reportCta: string
      partnerCta: string
      qrLabel: string
      qrTitle: string
      qrSub: string
      sponsorLabel: string
      sponsorNote: string
      stepsTitle: string
      steps: Array<{ title: string; desc: string }>
      partnerNudgeTitle: string
      partnerNudgeSub: string
      partnerNudgeCta: string
    }
  }
}
