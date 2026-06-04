/* GreeceClean — Partners / Sponsors page · full trilingual copy (EL · EN · DE)
   Register: formal B2B (DE "Sie", EL πληθυντικός ευγενείας). Drop-in copy
   provided by the team; section framing (problem/solution/claims/offer) authored
   to match. Read by Partners.jsx and PartnerForm.jsx via window.PARTNERS_I18N. */

const PARTNERS_I18N = {
  /* ===================================================================== EL */
  EL: {
    nav: { home: 'Αρχική', map: 'Χάρτης', partners: 'Συνεργάτες', report: 'Αναφορά' },

    hero: {
      eyebrow: 'Συνεργασίες & χορηγίες',
      pre: 'Μια ', hi: 'καθαρότερη Ελλάδα', post: ', που την κάνουν ορατή οι πολίτες της.',
      sub: 'Φτιάξαμε το εργαλείο με το οποίο ο καθένας αναφέρει την παράνομη απόρριψη σε 60 δευτερόλεπτα — και που δείχνει αν γίνεται κάτι. Βοηθήστε μας να το φέρουμε σε κάθε περιοχή.',
      ctaPrimary: 'Γίνετε συνεργάτης', ctaSecondary: 'Δείτε πώς λειτουργεί',
      heroImg: 'εικόνα ακτής / φύσης',
    },

    problem: {
      eyebrow: 'Το ζήτημα',
      heading: 'Το πρόβλημα δεν είναι ο νόμος.',
      lead: 'Η παράνομη απόρριψη είναι ήδη παράνομη. Αυτό που λείπει είναι μια κοινή, ορατή εικόνα του πού συμβαίνει — και του αν αντιμετωπίζεται.',
      stats: [
        { value: '5,5 εκατ. €', sub: '+ 12.500 €/ημέρα', desc: 'Πρόστιμο της ΕΕ για μία μόνο παράνομη χωματερή (Ζάκυνθος, 2024).' },
        { value: '17%', sub: 'έναντι 49% στην ΕΕ', desc: 'Ποσοστό ανακύκλωσης στην Ελλάδα έναντι του μέσου όρου της ΕΕ.' },
        { value: '80.000 €', sub: 'την ημέρα', desc: 'Όσο κόστιζαν στην Ελλάδα οι παράνομες χωματερές σε πρόστιμα της ΕΕ.' },
      ],
      kicker: 'Δεν λείπει ο νόμος — λείπει το να το βλέπει κάποιος.',
      sources: 'Πηγές: Ευρωπαϊκή Επιτροπή / ΔΕΕ (απόφαση Ζακύνθου 2024)· Ευρωπαϊκός Οργανισμός Περιβάλλοντος (EEA), ποσοστά ανακύκλωσης 2022.',
    },

    solution: {
      eyebrow: 'Η λύση',
      heading: 'Πώς λειτουργεί',
      sub: 'Τρία βήματα, κάτω από 60 δευτερόλεπτα, χωρίς λογαριασμό.',
      steps: [
        { icon: '📷', title: 'Αναφέρετε', desc: 'Τραβήξτε φωτογραφία· η τοποθεσία εντοπίζεται αυτόματα. Κάτω από 60 δευτερόλεπτα, χωρίς λογαριασμό.' },
        { icon: '📍', title: 'Προωθούμε', desc: 'Η αναφορά φτάνει στον αρμόδιο δήμο, στο επίσημο email του.' },
        { icon: '🗺️', title: 'Ορατό & παρακολουθήσιμο', desc: 'Κάθε αναφορά εμφανίζεται στον δημόσιο χάρτη — με κατάσταση και χρόνο. Η αδράνεια δεν κρύβεται.' },
      ],
      features: ['Ανώνυμα', 'Χωρίς λογαριασμό', 'Συμβατό με GDPR', 'Τρίγλωσσο', 'Πολίτες & τουρίστες'],
    },

    mv: {
      eyebrow: 'Αποστολή & όραμα',
      missionLabel: 'Η αποστολή μας',
      mission: 'Να δώσουμε σε κάθε άνθρωπο στην Ελλάδα τον πιο απλό τρόπο να αναφέρει ένα περιβαλλοντικό πρόβλημα — και να κάνουμε ορατό αν αυτό λύνεται.',
      visionLabel: 'Το όραμά μας',
      vision: 'Μια Ελλάδα όπου η αδιαφορία δεν μπορεί να κρυφτεί — όπου οι δήμοι δρουν επειδή η αδράνεια δεν μένει πια αόρατη, και ο καθαρός δημόσιος χώρος είναι ο κανόνας, όχι η εξαίρεση.',
    },

    claims: {
      eyebrow: 'Γιατί αξίζει στήριξη',
      heading: 'Γιατί αξίζει να στηρίξετε το GreeceClean',
      sub: 'Έξι λόγοι, σύντομοι και συγκεκριμένοι — το βασικό επιχείρημα για στήριξη.',
      items: [
        { title: 'Ένα πραγματικό πρόβλημα, με κυρώσεις από την ΕΕ.', desc: 'Δεν είναι θεωρητικό: η Ελλάδα πληρώνει εκατομμύρια σε πρόστιμα της ΕΕ για τα απόβλητα. Το πρόβλημα είναι μετρήσιμο και επείγον.' },
        { title: 'Καλύπτουμε το κομμάτι που λείπει.', desc: 'Οι δήμοι συχνά δεν ξέρουν πού βρίσκονται τα σκουπίδια. Εμείς συνδέουμε την αναφορά με την ορατή δράση — το κομμάτι που έλειπε.' },
        { title: 'Λίγοι πόροι, μεγάλη επίδραση.', desc: 'Ψηφιακή υποδομή που κλιμακώνεται πανελλαδικά χωρίς ανάλογο κόστος. Κάθε ευρώ στήριξης πολλαπλασιάζεται.' },
        { title: 'Ανεξάρτητο, διαφανές, συμβατό με GDPR.', desc: 'Ανοιχτά αποτελέσματα, σαφής χρήση πόρων, ανώνυμες αναφορές, συμμόρφωση με τον GDPR. Καμία εξάρτηση από ένα μόνο συμφέρον.' },
        { title: 'Δεδομένα με δημόσια αξία.', desc: 'Συγκεντρωτικά, ανωνυμοποιημένα δεδομένα για τα απόβλητα — χρήσιμα για πολιτική, έρευνα και στόχους ανακύκλωσης/EPR.' },
        { title: 'Η σωστή στιγμή.', desc: 'Πίεση από την ΕΕ, στόχοι ανακύκλωσης και τουριστική σεζόν συγκλίνουν τώρα. Η στήριξη σήμερα έχει τον μεγαλύτερο αντίκτυπο.' },
      ],
      partnersLabel: 'Οι συνεργάτες μας',
      partnersNote: 'Εδώ θα εμφανίζονται οι συνεργάτες μας. Δεν εμφανίζουμε λογότυπα που δεν είναι αληθινά.',
    },

    why: {
      eyebrow: 'Γιατί να συνεργαστείτε',
      heading: 'Διαφορετική αξία για κάθε εταίρο',
      sub: 'Η ίδια διαφανής υποδομή από κάτω — προσαρμοσμένη στους δικούς σας στόχους.',
      cta: 'Μιλήστε μαζί μας',
      regionLink: 'Δείτε ένα παράδειγμα τοπικού επιπέδου →',
      cards: [
        { icon: '🏛️', title: 'Ιδρύματα & χρηματοδότες', bullets: [
          'Μετρήσιμος περιβαλλοντικός και κοινωνικός αντίκτυπος που μπορείτε να τεκμηριώσετε: αναφορές, λυμένες υποθέσεις, ποσοστό επίλυσης.',
          'Πλήρης διαφάνεια: ανοιχτά δεδομένα, σαφής χρήση των πόρων, ανεξάρτητη λειτουργία.',
          'Λιτό, κλιμακούμενο μοντέλο που μετατρέπει μια μικρή επιχορήγηση σε πανελλαδική κάλυψη.',
        ] },
        { icon: '🏢', title: 'Επιχειρήσεις, ΕΚΕ & EPR', bullets: [
          'Ορατή, τεκμηριωμένη με δεδομένα περιβαλλοντική δράση — όχι μια μεμονωμένη καμπάνια.',
          'Άμεση συμβολή σε στόχους μηδενικών αποβλήτων και Διευρυμένης Ευθύνης Παραγωγού (EPR), με αντίκτυπο που τεκμηριώνεται.',
          'Παρουσία της μάρκας σας σε τοπικό επίπεδο, πάνω σε ένα εργαλείο που οι άνθρωποι όντως χρησιμοποιούν.',
        ] },
        { icon: '⛵', title: 'Τουρισμός', bullets: [
          'Δείξτε στους επισκέπτες έναν προορισμό που σέβεται το περιβάλλον του.',
          'Κάντε τους τουρίστες μέρος της λύσης, με απλή επιτόπια αναφορά μέσω QR.',
          'Ένα τοπικό επίπεδο που συνδέει τη μάρκα σας με μια ορατά καθαρότερη περιοχή.',
        ] },
        { icon: '🏙️', title: 'Δήμοι & δημόσιοι φορείς', bullets: [
          'Δωρεάν υποδομή αναφορών που φέρνει τα προβλήματα κατευθείαν στο σωστό γραφείο.',
          'Ταχύτερη επίλυση και σαφές ιστορικό όσων έχουν αντιμετωπιστεί.',
          'Καλύτερη θέση στη δημόσια κατάταξη — απόδειξη ότι αναλαμβάνετε δράση.',
        ] },
        { icon: '🤝', title: 'ΜΚΟ & συνεργάτες', bullets: [
          'Ένα έτοιμο τεχνολογικό και δεδομενικό επίπεδο για τις δικές σας καμπάνιες.',
          'Κοινά, ανωνυμοποιημένα δεδομένα που στηρίζουν με στοιχεία τη δράση σας.',
          'Κοινά έργα και αιτήσεις χρηματοδότησης που μαζί γίνονται πιο ισχυρά.',
        ] },
      ],
    },

    offer: {
      eyebrow: 'Τι προσφέρουμε',
      heading: 'Τι προσφέρουμε στους συνεργάτες',
      sub: 'Συγκεκριμένα, ειλικρινή πράγματα — όχι αόριστες υποσχέσεις.',
      items: [
        { icon: '🏷️', title: 'Co-branding', desc: 'Διακριτική προβολή λογότυπου & co-branding, με σεβασμό στον πολίτη.' },
        { icon: '📍', title: 'Τοπικό επίπεδο', desc: 'Επίπεδο χορηγίας για τη δική σας περιοχή.' },
        { icon: '📊', title: 'Αναφορές αντίκτυπου', desc: 'Συγκεντρωτικές, ανωνυμοποιημένες αναφορές αντίκτυπου & δεδομένων.' },
        { icon: '📣', title: 'Κοινές καμπάνιες', desc: 'Κοινές καμπάνιες και επικοινωνία/δημοσιότητα.' },
        { icon: '🌱', title: 'Στοιχεία βιωσιμότητας', desc: 'Έτοιμα στοιχεία για την έκθεση βιωσιμότητάς σας.' },
      ],
      transHeading: 'Ανεξαρτησία & διαφάνεια',
      transSub: 'Η εμπιστοσύνη είναι το νόμισμά μας. Γι’ αυτό το λέμε ρητά:',
      transPoints: [
        'Σαφής, ελέγξιμη χρήση των πόρων.',
        'Οι χορηγοί δεν έχουν καμία επιρροή στο περιεχόμενο ή στις αναφορές.',
        'Προστασία δεδομένων: τα δεδομένα δεν χρησιμοποιούνται ποτέ ενάντια στον σκοπό τους.',
      ],
    },

    contact: {
      eyebrow: 'Επικοινωνία',
      heading: 'Ας μιλήσουμε.',
      sub: 'Πείτε μας ποιοι είστε και πώς θα θέλατε να βοηθήσετε — θα σας απαντήσουμε μέσα σε λίγες ημέρες.',
      trust: 'Διαφάνεια στη χρηματοδότηση. Καμία επιρροή χορηγών στο περιεχόμενο. Τα δεδομένα σας προστατεύονται.',
      altIntro: 'Προτιμάτε email;',
      altLinkedin: 'LinkedIn',
      f: {
        name: 'Όνομα', namePh: 'Το όνομά σας',
        org: 'Οργανισμός', orgPh: 'Το όνομα του οργανισμού',
        role: 'Ρόλος / θέση', rolePh: 'π.χ. Υπεύθυνος βιωσιμότητας', optional: 'προαιρετικό',
        email: 'Email', emailPh: 'you@organisation.gr',
        interest: 'Είδος ενδιαφέροντος', interestPh: 'Επιλέξτε…',
        interestOptions: ['Ίδρυμα / Χρηματοδότηση', 'Επιχείρηση / ΕΚΕ', 'Τουρισμός', 'Δήμος / Δημόσιο', 'ΜΚΟ / Συνεργάτης', 'Άλλο'],
        region: 'Περιοχή ενδιαφέροντος', regionPh: 'π.χ. Κυκλάδες, Θεσσαλονίκη',
        message: 'Μήνυμα', messagePh: 'Πώς θα θέλατε να συνεργαστούμε;',
        consent: 'Συμφωνώ να επεξεργαστείτε τα στοιχεία μου για να επικοινωνήσετε μαζί μου.',
        consentLink: 'Πολιτική Απορρήτου',
        submit: 'Αποστολή', submitting: 'Αποστολή…',
        errRequired: 'Υποχρεωτικό πεδίο', errEmail: 'Μη έγκυρο email', errConsent: 'Απαιτείται η συγκατάθεσή σας',
      },
      success: {
        title: 'Ευχαριστούμε — θα επικοινωνήσουμε.',
        body: 'Λάβαμε το μήνυμά σας. Θα σας απαντήσουμε μέσα σε λίγες ημέρες.',
        backMap: 'Επιστροφή στον χάρτη', explore: 'Ανακαλύψτε το έργο',
      },
      error: {
        title: 'Κάτι πήγε στραβά.',
        body: 'Δεν μπορέσαμε να στείλουμε το μήνυμά σας. Δοκιμάστε ξανά ή γράψτε μας απευθείας.',
        retry: 'Δοκιμάστε ξανά',
      },
    },

    demo: { label: 'Προεπισκόπηση κατάστασης', normal: 'Κανονική', success: 'Επιτυχία', error: 'Σφάλμα' },

    banner: { title: 'Θέλετε να στηρίξετε μια καθαρότερη Ελλάδα;', sub: 'Οργανισμοί, δήμοι και επιχειρήσεις μπορούν να γίνουν συνεργάτες.', cta: 'Γίνετε συνεργάτης' },
    footerLink: 'Συνεργάτες & Χορηγοί',
    reportCta: 'Είστε οργανισμός ή δήμος; Γίνετε συνεργάτης →',
    impactCta: { title: 'Αυτός ο πίνακας γίνεται εφικτός χάρη στους συνεργάτες μας.', sub: 'Θέλετε να καλυφθεί και η δική σας περιοχή; Ας το κάνουμε μαζί.', cta: 'Γίνετε συνεργάτης →' },
    region: {
      eyebrow: 'GreeceClean · Τοπικό επίπεδο',
      placeName: 'Νάξος',
      title: 'Στη Νάξο, την κρατάμε καθαρή — μαζί.',
      sub: 'Είδατε κάτι εκτός θέσης; Αναφέρετέ το σε 60 δευτερόλεπτα — χωρίς εφαρμογή, χωρίς λογαριασμό.',
      qrLabel: 'Σαρώστε για αναφορά',
      qrSub: 'QR προορισμού',
      reportCta: 'Αναφέρετε τώρα',
      mapCta: 'Δείτε τον χάρτη της περιοχής',
      sponsorLabel: 'Με την υποστήριξη',
      sponsorPlaceholder: 'λογότυπο χορηγού',
      stats: [{ label: 'Αναφορές στην περιοχή' }, { label: 'Καθαρίστηκαν' }, { label: 'Μέσος χρόνος' }],
      partnerNote: 'Είστε ξενοδοχείο ή τουριστικός φορέας; Φτιάξτε το δικό σας τοπικό επίπεδο.',
      partnerCta: 'Γίνετε συνεργάτης →',
      demoNote: 'Ενδεικτικό παρώδειγμα τοπικού επιπέδου με χορηγό.',
    },
  },

  /* ===================================================================== EN */
  EN: {
    nav: { home: 'Home', map: 'Map', partners: 'Partners', report: 'Report' },

    hero: {
      eyebrow: 'Partnerships & sponsorship',
      pre: 'A ', hi: 'cleaner Greece', post: ', made visible by its citizens.',
      sub: 'We built the tool that lets anyone report illegal dumping in 60 seconds — and that shows whether anything gets done. Help us bring it to every region.',
      ctaPrimary: 'Become a partner', ctaSecondary: 'See how it works',
      heroImg: 'coastal / nature image',
    },

    problem: {
      eyebrow: 'The issue',
      heading: 'The problem isn’t the law.',
      lead: 'Illegal dumping is already illegal. What’s missing is a shared, visible picture of where it happens — and whether it’s being dealt with.',
      stats: [
        { value: '€5.5M', sub: '+ €12,500/day', desc: 'EU fine for a single illegal landfill (Zakynthos, 2024).' },
        { value: '17%', sub: 'vs. 49% EU', desc: 'Greece’s recycling rate vs. the EU average.' },
        { value: '€80,000', sub: 'per day', desc: 'What illegal landfills have cost Greece in EU fines.' },
      ],
      kicker: 'The law isn’t missing — what’s missing is that anyone sees it.',
      sources: 'Sources: European Commission / CJEU (Zakynthos ruling 2024); European Environment Agency (EEA), recycling rates 2022.',
    },

    solution: {
      eyebrow: 'The solution',
      heading: 'How it works',
      sub: 'Three steps, under 60 seconds, no account needed.',
      steps: [
        { icon: '📷', title: 'Report', desc: 'Snap a photo; the location is detected automatically. Under 60 seconds, no account.' },
        { icon: '📍', title: 'We forward', desc: 'The report reaches the responsible municipality at its official inbox.' },
        { icon: '🗺️', title: 'Visible & tracked', desc: 'Every report appears on the public map — with status and timing. Inaction stays visible.' },
      ],
      features: ['Anonymous', 'No login', 'GDPR-compliant', 'Trilingual', 'Citizens & tourists'],
    },

    mv: {
      eyebrow: 'Mission & vision',
      missionLabel: 'Our mission',
      mission: 'To give everyone in Greece the simplest possible way to report an environmental problem — and to make it visible whether it gets fixed.',
      visionLabel: 'Our vision',
      vision: 'A Greece where neglect can’t hide — where municipalities act because inaction is no longer invisible, and clean public space is the norm, not the exception.',
    },

    claims: {
      eyebrow: 'Why it’s worth supporting',
      heading: 'Why GreeceClean is worth supporting',
      sub: 'Six reasons, short and concrete — the core case for backing us.',
      items: [
        { title: 'A real problem, sanctioned by the EU.', desc: 'Not theoretical: Greece pays millions in EU fines over waste. The problem is measurable and urgent.' },
        { title: 'We close the missing gap.', desc: 'Municipalities often don’t know where the waste is. We connect the report to visible action — the missing piece.' },
        { title: 'Few resources, big impact.', desc: 'Digital infrastructure that scales nationwide without proportional cost. Every euro of support is multiplied.' },
        { title: 'Independent, transparent, GDPR-compliant.', desc: 'Open results, clear use of funds, anonymous reporting, GDPR-compliant. No dependence on any single interest.' },
        { title: 'Data with public value.', desc: 'Aggregated, anonymised waste data — useful for policy, research, and recycling/EPR goals.' },
        { title: 'The right moment.', desc: 'EU pressure, recycling targets and the tourist season converge now. Support today has the greatest impact.' },
      ],
      partnersLabel: 'Our partners',
      partnersNote: 'This is where our partners will appear. We don’t show logos that aren’t real.',
    },

    why: {
      eyebrow: 'Why partner with us',
      heading: 'Different value for every partner',
      sub: 'The same transparent infrastructure underneath — shaped around your goals.',
      cta: 'Talk to us',
      regionLink: 'See an example regional layer →',
      cards: [
        { icon: '🏛️', title: 'Foundations & funders', bullets: [
          'Measurable environmental and civic impact you can report on: reports filed, cases resolved, resolution rate.',
          'Full transparency: open data, clear use of funds, independent operation.',
          'A lean, scalable model that turns a small grant into nationwide reach.',
        ] },
        { icon: '🏢', title: 'Companies, CSR & EPR', bullets: [
          'Visible, data-backed environmental action — not a one-off campaign.',
          'A direct contribution to zero-waste and Extended Producer Responsibility (EPR) goals, with impact you can document.',
          'Regional brand presence on a tool people genuinely use.',
        ] },
        { icon: '⛵', title: 'Tourism', bullets: [
          'Show guests a destination that takes its environment seriously.',
          'Turn visitors into part of the solution with simple on-the-spot reporting via QR.',
          'A regional layer that links your brand to a visibly cleaner area.',
        ] },
        { icon: '🏙️', title: 'Municipalities & public bodies', bullets: [
          'Free reporting infrastructure that brings problems straight to the right desk.',
          'Faster resolution and a clear record of what’s been handled.',
          'A stronger standing in the public leaderboard — proof that you act.',
        ] },
        { icon: '🤝', title: 'NGOs & partners', bullets: [
          'A ready-made technology and data layer for your own campaigns.',
          'Shared, anonymised data to back your advocacy with evidence.',
          'Joint projects and grant applications that are stronger together.',
        ] },
      ],
    },

    offer: {
      eyebrow: 'What we offer',
      heading: 'What we offer partners',
      sub: 'Concrete, honest things — not vague promises.',
      items: [
        { icon: '🏷️', title: 'Co-branding', desc: 'Discreet logo placement & co-branding, respectful of the citizen.' },
        { icon: '📍', title: 'Regional layer', desc: 'A sponsoring layer for your own area.' },
        { icon: '📊', title: 'Impact reports', desc: 'Aggregated, anonymised impact & data reports.' },
        { icon: '📣', title: 'Joint campaigns', desc: 'Joint campaigns and PR.' },
        { icon: '🌱', title: 'Sustainability building blocks', desc: 'Building blocks for your sustainability reporting.' },
      ],
      transHeading: 'Independence & transparency',
      transSub: 'Trust is our currency. So we say it plainly:',
      transPoints: [
        'A clear, auditable use of funds.',
        'Sponsors have no influence over content or reports.',
        'Data protection: data is never used against its purpose.',
      ],
    },

    contact: {
      eyebrow: 'Get in touch',
      heading: 'Let’s talk.',
      sub: 'Tell us who you are and how you’d like to help — we’ll get back to you within a few days.',
      trust: 'Transparent funding. No sponsor control over content. Your data is protected.',
      altIntro: 'Prefer email?',
      altLinkedin: 'LinkedIn',
      f: {
        name: 'Name', namePh: 'Your name',
        org: 'Organisation', orgPh: 'Organisation name',
        role: 'Role / position', rolePh: 'e.g. Head of Sustainability', optional: 'optional',
        email: 'Email', emailPh: 'you@organisation.gr',
        interest: 'Type of interest', interestPh: 'Select…',
        interestOptions: ['Foundation / funding', 'Company / CSR', 'Tourism', 'Municipality / public', 'NGO / partner', 'Other'],
        region: 'Region of interest', regionPh: 'e.g. Cyclades, Thessaloniki',
        message: 'Message', messagePh: 'How would you like to work together?',
        consent: 'I agree that my details may be processed to contact me.',
        consentLink: 'Privacy Policy',
        submit: 'Send message', submitting: 'Sending…',
        errRequired: 'Required', errEmail: 'Invalid email', errConsent: 'Consent is required',
      },
      success: {
        title: 'Thank you — we’ll be in touch.',
        body: 'We’ve received your message. We’ll get back to you within a few days.',
        backMap: 'Back to the map', explore: 'Explore the project',
      },
      error: {
        title: 'Something went wrong.',
        body: 'We couldn’t send your message. Please try again or email us directly.',
        retry: 'Try again',
      },
    },

    demo: { label: 'Preview state', normal: 'Normal', success: 'Success', error: 'Error' },

    banner: { title: 'Want to support a cleaner Greece?', sub: 'Organisations, municipalities and companies can become partners.', cta: 'Become a partner' },
    footerLink: 'Partners & Sponsors',
    reportCta: 'Are you an organisation or municipality? Partner with us →',
    impactCta: { title: 'This dashboard is made possible by our partners.', sub: 'Want your region covered too? Let’s make it happen together.', cta: 'Become a partner →' },
    region: {
      eyebrow: 'GreeceClean · Regional layer',
      placeName: 'Naxos',
      title: 'On Naxos, we keep it clean — together.',
      sub: 'Spotted something out of place? Report it in 60 seconds — no app, no account.',
      qrLabel: 'Scan to report',
      qrSub: 'destination QR',
      reportCta: 'Report now',
      mapCta: 'See the regional map',
      sponsorLabel: 'Supported by',
      sponsorPlaceholder: 'sponsor logo',
      stats: [{ label: 'Reports in this area' }, { label: 'Cleared' }, { label: 'Avg. response' }],
      partnerNote: 'Are you a hotel or tourism body? Set up your own regional layer.',
      partnerCta: 'Become a partner →',
      demoNote: 'Illustrative example of a sponsored regional layer.',
    },
  },

  /* ===================================================================== DE */
  DE: {
    nav: { home: 'Start', map: 'Karte', partners: 'Partner', report: 'Melden' },

    hero: {
      eyebrow: 'Partnerschaften & Sponsoring',
      pre: 'Ein ', hi: 'saubereres Griechenland', post: ' – sichtbar gemacht von seinen Bürgern.',
      sub: 'Wir haben das Werkzeug gebaut, mit dem jeder in 60 Sekunden illegalen Müll melden kann – und das zeigt, ob etwas passiert. Helfen Sie uns, es in jede Region zu bringen.',
      ctaPrimary: 'Partner werden', ctaSecondary: 'So funktioniert es',
      heroImg: 'Küsten- / Naturbild',
    },

    problem: {
      eyebrow: 'Das Problem',
      heading: 'Das Problem ist nicht das Gesetz.',
      lead: 'Illegale Müllentsorgung ist längst verboten. Was fehlt, ist ein gemeinsames, sichtbares Bild davon, wo sie passiert — und ob etwas dagegen getan wird.',
      stats: [
        { value: '5,5 Mio. €', sub: '+ 12.500 €/Tag', desc: 'EU-Strafe für eine einzige illegale Deponie (Zakynthos, 2024).' },
        { value: '17%', sub: 'ggü. 49% EU', desc: 'Recyclingquote Griechenlands gegenüber dem EU-Durchschnitt.' },
        { value: '80.000 €', sub: 'pro Tag', desc: 'So viel kosteten illegale Deponien Griechenland an EU-Strafen.' },
      ],
      kicker: 'Nicht das Gesetz fehlt – es fehlt, dass es jemand sieht.',
      sources: 'Quellen: Europäische Kommission / EuGH (Zakynthos-Urteil 2024); Europäische Umweltagentur (EEA), Recyclingquoten 2022.',
    },

    solution: {
      eyebrow: 'Die Lösung',
      heading: 'So funktioniert es',
      sub: 'Drei Schritte, unter 60 Sekunden, ohne Konto.',
      steps: [
        { icon: '📷', title: 'Melden', desc: 'Foto machen – der Standort wird automatisch erkannt. Unter 60 Sekunden, ohne Konto.' },
        { icon: '📍', title: 'Wir leiten weiter', desc: 'Die Meldung erreicht die zuständige Gemeinde an ihrer offiziellen Adresse.' },
        { icon: '🗺️', title: 'Sichtbar & nachverfolgbar', desc: 'Jede Meldung erscheint auf der öffentlichen Karte – mit Status und Zeit. Untätigkeit bleibt sichtbar.' },
      ],
      features: ['Anonym', 'Ohne Konto', 'DSGVO-konform', 'Dreisprachig', 'Bürger & Touristen'],
    },

    mv: {
      eyebrow: 'Mission & Vision',
      missionLabel: 'Unsere Mission',
      mission: 'Jedem Menschen in Griechenland den einfachsten Weg zu geben, ein Umweltproblem zu melden – und sichtbar zu machen, ob es behoben wird.',
      visionLabel: 'Unsere Vision',
      vision: 'Ein Griechenland, in dem Vernachlässigung sich nicht verstecken kann – in dem Gemeinden handeln, weil Untätigkeit nicht länger unsichtbar bleibt, und sauberer öffentlicher Raum die Regel ist, nicht die Ausnahme.',
    },

    claims: {
      eyebrow: 'Warum unterstützenswert',
      heading: 'Warum GreeceClean unterstützenswert ist',
      sub: 'Sechs Gründe, kurz und konkret — das Kernargument für eine Unterstützung.',
      items: [
        { title: 'Ein echtes, EU-sanktioniertes Problem.', desc: 'Nicht theoretisch: Griechenland zahlt Millionen an EU-Strafen wegen Abfall. Das Problem ist messbar und dringend.' },
        { title: 'Wir schließen die fehlende Lücke.', desc: 'Gemeinden wissen oft nicht, wo der Müll liegt. Wir verbinden die Meldung mit sichtbarer Handlung – das fehlende Stück.' },
        { title: 'Wenig Mittel, große Wirkung.', desc: 'Digitale Infrastruktur, die landesweit skaliert – ohne proportionale Kosten. Jeder Euro Unterstützung wird vervielfacht.' },
        { title: 'Unabhängig, transparent, datenschutzkonform.', desc: 'Offene Ergebnisse, klare Mittelverwendung, anonyme Meldungen, DSGVO-konform. Keine Abhängigkeit von einem einzelnen Interesse.' },
        { title: 'Daten mit öffentlichem Wert.', desc: 'Aggregierte, anonymisierte Müll-Daten – nützlich für Politik, Forschung und Recycling-/EPR-Ziele.' },
        { title: 'Der richtige Moment.', desc: 'EU-Druck, Recyclingziele und Tourismussaison fallen jetzt zusammen. Unterstützung heute hat die größte Wirkung.' },
      ],
      partnersLabel: 'Unsere Partner',
      partnersNote: 'Hier werden unsere Partner erscheinen. Wir zeigen keine Logos, die nicht echt sind.',
    },

    why: {
      eyebrow: 'Warum Partner werden',
      heading: 'Unterschiedlicher Nutzen für jeden Partner',
      sub: 'Dieselbe transparente Infrastruktur darunter — zugeschnitten auf Ihre Ziele.',
      cta: 'Sprechen Sie mit uns',
      regionLink: 'Beispiel eines regionalen Layers ansehen →',
      cards: [
        { icon: '🏛️', title: 'Stiftungen & Förderer', bullets: [
          'Messbare ökologische und gesellschaftliche Wirkung, über die Sie berichten können: Meldungen, gelöste Fälle, Lösungsquote.',
          'Volle Transparenz: offene Daten, klare Mittelverwendung, unabhängiger Betrieb.',
          'Ein schlankes, skalierbares Modell, das aus einer kleinen Förderung landesweite Reichweite macht.',
        ] },
        { icon: '🏢', title: 'Unternehmen, CSR & EPR', bullets: [
          'Sichtbares, datenbelegtes Umwelt-Engagement – keine einmalige Kampagne.',
          'Ein direkter Beitrag zu Zero-Waste- und EPR-Zielen (Erweiterte Herstellerverantwortung), mit dokumentierbarer Wirkung.',
          'Regionale Markenpräsenz auf einem Werkzeug, das Menschen wirklich nutzen.',
        ] },
        { icon: '⛵', title: 'Tourismus', bullets: [
          'Zeigen Sie Gästen eine Destination, die ihre Umwelt ernst nimmt.',
          'Machen Sie Besucher zum Teil der Lösung – mit einfacher Meldung vor Ort per QR.',
          'Ein regionaler Layer, der Ihre Marke mit einer sichtbar saubereren Region verbindet.',
        ] },
        { icon: '🏙️', title: 'Gemeinden & öffentliche Stellen', bullets: [
          'Kostenlose Melde-Infrastruktur, die Probleme direkt an die richtige Stelle bringt.',
          'Schnellere Bearbeitung und ein klarer Nachweis des Erledigten.',
          'Eine bessere Position im öffentlichen Ranking – Beleg dafür, dass Sie handeln.',
        ] },
        { icon: '🤝', title: 'NGOs & Partner', bullets: [
          'Eine fertige Technologie- und Datenebene für Ihre eigenen Kampagnen.',
          'Geteilte, anonymisierte Daten, die Ihre Arbeit mit Belegen untermauern.',
          'Gemeinsame Projekte und Förderanträge, die zusammen stärker sind.',
        ] },
      ],
    },

    offer: {
      eyebrow: 'Was wir bieten',
      heading: 'Was wir Partnern bieten',
      sub: 'Konkrete, ehrliche Dinge — keine vagen Versprechen.',
      items: [
        { icon: '🏷️', title: 'Co-Branding', desc: 'Dezente Logo-Platzierung & Co-Branding, mit Respekt vor dem Bürger.' },
        { icon: '📍', title: 'Regionaler Layer', desc: 'Ein Sponsoring-Layer für Ihre Region.' },
        { icon: '📊', title: 'Wirkungsreports', desc: 'Aggregierte, anonymisierte Wirkungs- & Datenreports.' },
        { icon: '📣', title: 'Gemeinsame Kampagnen', desc: 'Gemeinsame Kampagnen und PR.' },
        { icon: '🌱', title: 'Nachhaltigkeits-Bausteine', desc: 'Bausteine für Ihr Nachhaltigkeits-Reporting.' },
      ],
      transHeading: 'Unabhängigkeit & Transparenz',
      transSub: 'Vertrauen ist unsere Währung. Deshalb sagen wir es klar:',
      transPoints: [
        'Klare, prüfbare Mittelverwendung.',
        'Sponsoren haben keinerlei Einfluss auf Inhalte oder Meldungen.',
        'Datenschutz: Daten werden niemals gegen ihren Zweck verwendet.',
      ],
    },

    contact: {
      eyebrow: 'Kontakt',
      heading: 'Sprechen wir.',
      sub: 'Sagen Sie uns, wer Sie sind und wie Sie helfen möchten – wir melden uns innerhalb weniger Tage.',
      trust: 'Transparente Finanzierung. Kein Einfluss von Sponsoren auf Inhalte. Ihre Daten sind geschützt.',
      altIntro: 'Lieber per E-Mail?',
      altLinkedin: 'LinkedIn',
      f: {
        name: 'Name', namePh: 'Ihr Name',
        org: 'Organisation', orgPh: 'Name der Organisation',
        role: 'Rolle / Funktion', rolePh: 'z. B. Nachhaltigkeitsbeauftragte/r', optional: 'optional',
        email: 'E-Mail', emailPh: 'sie@organisation.gr',
        interest: 'Art des Interesses', interestPh: 'Auswählen…',
        interestOptions: ['Stiftung / Förderung', 'Unternehmen / CSR', 'Tourismus', 'Gemeinde / öffentlich', 'NGO / Partner', 'Sonstiges'],
        region: 'Region / Ort von Interesse', regionPh: 'z. B. Kykladen, Thessaloniki',
        message: 'Nachricht', messagePh: 'Wie möchten Sie zusammenarbeiten?',
        consent: 'Ich stimme zu, dass meine Angaben zur Kontaktaufnahme verarbeitet werden.',
        consentLink: 'Datenschutz',
        submit: 'Absenden', submitting: 'Wird gesendet…',
        errRequired: 'Pflichtfeld', errEmail: 'Ungültige E-Mail', errConsent: 'Einwilligung erforderlich',
      },
      success: {
        title: 'Danke — wir melden uns.',
        body: 'Wir haben Ihre Nachricht erhalten. Wir melden uns innerhalb weniger Tage.',
        backMap: 'Zurück zur Karte', explore: 'Projekt entdecken',
      },
      error: {
        title: 'Etwas ist schiefgelaufen.',
        body: 'Wir konnten Ihre Nachricht nicht senden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
        retry: 'Erneut versuchen',
      },
    },

    demo: { label: 'Status-Vorschau', normal: 'Normal', success: 'Erfolg', error: 'Fehler' },

    banner: { title: 'Möchten Sie ein saubereres Griechenland unterstützen?', sub: 'Organisationen, Gemeinden und Unternehmen können Partner werden.', cta: 'Partner werden' },
    footerLink: 'Partner & Sponsoren',
    reportCta: 'Sie sind eine Organisation oder Gemeinde? Partner werden →',
    impactCta: { title: 'Dieses Dashboard wird durch unsere Partner möglich.', sub: 'Soll auch Ihre Region abgedeckt werden? Lassen Sie es uns gemeinsam angehen.', cta: 'Partner werden →' },
    region: {
      eyebrow: 'GreeceClean · Regionaler Layer',
      placeName: 'Naxos',
      title: 'Auf Naxos halten wir es sauber — gemeinsam.',
      sub: 'Etwas entdeckt, das nicht hierhin gehört? Melden Sie es in 60 Sekunden — ohne App, ohne Konto.',
      qrLabel: 'Zum Melden scannen',
      qrSub: 'Destinations-QR',
      reportCta: 'Jetzt melden',
      mapCta: 'Regionale Karte ansehen',
      sponsorLabel: 'Unterstützt von',
      sponsorPlaceholder: 'Sponsor-Logo',
      stats: [{ label: 'Meldungen in der Region' }, { label: 'Beseitigt' }, { label: 'Ø Reaktionszeit' }],
      partnerNote: 'Sie sind ein Hotel oder Tourismusverband? Richten Sie Ihren eigenen regionalen Layer ein.',
      partnerCta: 'Partner werden →',
      demoNote: 'Beispielhafte Darstellung eines gesponserten regionalen Layers.',
    },
  },
};

const PARTNERS_EMAIL = 'partners@greececlean.gr';

Object.assign(window, { PARTNERS_I18N, PARTNERS_EMAIL });
