'use client'

import { useState, useRef, useEffect } from 'react'

// ─── Farben & Design-Tokens ──────────────────────────────────────────────────
const TEAL = '#6fa8a5'

// ─── Benutzer ────────────────────────────────────────────────────────────────
const USERS = [
  { benutzername: 'martinsvoboda',    passwort: 'supermartin1!', anzeigename: 'Martin Svoboda' },
  { benutzername: 'tillschellenberger', passwort: 'supertill1!',  anzeigename: 'Till Schellenberger' },
  { benutzername: 'stephaniekönen',   passwort: 'supersteffi1!', anzeigename: 'Stephanie Könen' },
  { benutzername: 'admin',            passwort: 'superadmin',    anzeigename: 'Admin' },
]

// ─── Vorlagen mit 3 Varianten ────────────────────────────────────────────────
const vorlagen = [
  {
    titel: '🔧 Räderwechsel',
    varianten: [
      'Der Saisonwechsel kommt — seid ihr bereit? Wir tauschen eure Räder schnell und zuverlässig. Jetzt Termin sichern!',
      'Winterreifen raus, Sommerreifen rein! 🔄 Wir kümmern uns — schnell, günstig, zuverlässig.',
      'Reifenwechsel-Saison ist eröffnet! Sichert euch jetzt euren Termin bei Sinsig & Lang in Bingen.',
    ],
    hashtags: '#Räderwechsel #Reifenwechsel #SinsigLang #Bingen #Autohaus #Mercedes #Werkstatt'
  },
  {
    titel: '📐 Achsvermessung',
    varianten: [
      'Schlechtes Fahrverhalten oder ungleichmäßiger Reifenverschleiß? Eine Achsvermessung schafft Klarheit — und spart langfristig Kosten.',
      'Zieht euer Auto beim Fahren nach einer Seite? Das kann ein Hinweis auf Achsprobleme sein. Wir checken das!',
      'Regelmäßige Achsvermessung spart Geld und schützt die Reifen. Kommt einfach vorbei!',
    ],
    hashtags: '#Achsvermessung #Fahrwerk #SinsigLang #Bingen #MercedesService #Werkstatt'
  },
  {
    titel: '❄️ Klimaservice',
    varianten: [
      'Bevor der Sommer richtig losgeht: Klimaanlage warten lassen! Frische Luft, optimale Kühlung — wir machen das für euch.',
      'Damit ihr auch im Sommer cool bleibt: Klimaservice bei Sinsig & Lang. Jetzt Termin buchen! ❄️',
      'Die Klimaanlage läuft nicht optimal? Wir reinigen, befüllen und warten — schnell und günstig.',
    ],
    hashtags: '#Klimaservice #Klimaanlage #SinsigLang #Bingen #Autohaus #Sommer'
  },
  {
    titel: '🔍 HU/AU Erinnerung',
    varianten: [
      'Wann war deine letzte Hauptuntersuchung? Kein Stress — wir koordinieren alles mit zertifizierten Prüfpartnern für euch.',
      'HU fällig? Kein Problem! Wir kümmern uns um alles — von der Vorbereitung bis zur Plakette.',
      'Bald HU/AU? Lieber frühzeitig kümmern als auf den letzten Drücker. Wir helfen euch!',
    ],
    hashtags: '#HUAU #Hauptuntersuchung #TÜV #SinsigLang #Bingen #Autohaus #Mercedes'
  },
  {
    titel: '🛢️ Ölwechsel',
    varianten: [
      'Frisches Öl, frische Energie. Ein regelmäßiger Ölwechsel verlängert die Lebensdauer eures Motors spürbar. Jetzt Termin buchen!',
      'Der Motor ist das Herz eures Autos — pflegt es! Mit einem Ölwechsel bei Sinsig & Lang.',
      'Wann war euer letzter Ölwechsel? Wir erledigen das schnell und zuverlässig. Einfach vorbeikommen!',
    ],
    hashtags: '#Ölwechsel #Motorpflege #SinsigLang #Bingen #MercedesService #Werkstatt'
  },
  {
    titel: '🛑 Bremsencheck',
    varianten: [
      'Sicherheit geht vor. Lasst eure Bremsen rechtzeitig prüfen — für euch und alle anderen auf der Straße.',
      'Quietschende Bremsen? Längerer Bremsweg? Nicht warten — kommt vorbei, wir checken das sofort!',
      'Bremsen sind keine Verhandlungssache. Unser Bremsencheck gibt euch Sicherheit auf jeder Fahrt.',
    ],
    hashtags: '#Bremsencheck #Sicherheit #SinsigLang #Bingen #Autohaus #Mercedes'
  },
  {
    titel: '🚗 Gebrauchtwagen',
    varianten: [
      'Auf der Suche nach einem zuverlässigen Gebrauchtwagen? Bei uns findet ihr geprüfte Fahrzeuge mit voller Transparenz. Schaut vorbei!',
      'Neues Auto gefällig? Unser Gebrauchtwagenbestand wird regelmäßig erneuert — schaut was gerade verfügbar ist!',
      'Gebrauchtwagen mit Geschichte — aber ohne Überraschungen. Alle Fahrzeuge geprüft und aufbereitet.',
    ],
    hashtags: '#Gebrauchtwagen #AutoKaufen #SinsigLang #Bingen #Mercedes #Autohaus'
  },
  {
    titel: '📅 Werkstatt-Termin',
    varianten: [
      'Kein langes Warten, kein Stress. Bucht euren Werkstatttermin jetzt bequem — wir sind für euch da.',
      'Ihr braucht einen Werkstatttermin? Einfach anrufen oder vorbeikommen — wir finden immer eine Lösung!',
      'Eure Zeit ist wertvoll. Deswegen sorgen wir für kurze Wartezeiten und schnelle Abwicklung.',
    ],
    hashtags: '#Werkstatt #Termin #SinsigLang #Bingen #MercedesService #Autohaus'
  },
  {
    titel: '🏎️ Oldtimer Service',
    varianten: [
      'Klassiker verdienen besondere Pflege. Unser Team kümmert sich mit Leidenschaft um eure Oldtimer.',
      'Euer Oldtimer in guten Händen: Wir lieben Klassiker genauso wie ihr! Vertraut uns eure Schätze an.',
      'Oldtimer-Service bei Sinsig & Lang: Mit Fachwissen, Leidenschaft und dem richtigen Gespür.',
    ],
    hashtags: '#Oldtimer #Klassiker #OldtimerService #SinsigLang #Bingen #Mercedes'
  }
]

// ─── Monatliche Schwerpunkte für Service-Post-Rotation ───────────────────────
const MONATSSCHWERPUNKT = [
  ['🔍 HU/AU Erinnerung', '🛢️ Ölwechsel'],           // Jan
  ['🛑 Bremsencheck',     '🔍 HU/AU Erinnerung'],     // Feb
  ['🔧 Räderwechsel',     '📐 Achsvermessung'],        // Mär
  ['🔧 Räderwechsel',     '❄️ Klimaservice'],          // Apr
  ['❄️ Klimaservice',     '🛑 Bremsencheck'],          // Mai
  ['🚗 Gebrauchtwagen',   '📅 Werkstatt-Termin'],      // Jun
  ['🚗 Gebrauchtwagen',   '🏎️ Oldtimer Service'],     // Jul
  ['📅 Werkstatt-Termin', '🏎️ Oldtimer Service'],     // Aug
  ['🛑 Bremsencheck',     '🔧 Räderwechsel'],          // Sep
  ['🔧 Räderwechsel',     '🛢️ Ölwechsel'],            // Okt
  ['🛢️ Ölwechsel',        '🔍 HU/AU Erinnerung'],     // Nov
  ['🛢️ Ölwechsel',        '📅 Werkstatt-Termin'],     // Dez
]

// ─── Feiertage (mit automatischer Datumsberechnung) ─────────────────────────
function berechneFeiertage(jahr) {
  // Osterformel nach Gauß
  const a = jahr % 19, b = Math.floor(jahr / 100), c = jahr % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const ii = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * ii - h - k) % 7
  const mn = Math.floor((a + 11 * h + 22 * l) / 451)
  const osterMonat = Math.floor((h + l - 7 * mn + 114) / 31)
  const osterTag = ((h + l - 7 * mn + 114) % 31) + 1
  const ostern = new Date(jahr, osterMonat - 1, osterTag)

  const himmelfahrt = new Date(ostern.getTime() + 39 * 86400000)
  const pfingsten   = new Date(ostern.getTime() + 49 * 86400000)

  // Muttertag: 2. Sonntag im Mai
  const maiErster = new Date(jahr, 4, 1)
  const maiWt = maiErster.getDay() // 0 = Sonntag
  const ersterSo = maiWt === 0 ? 1 : 8 - maiWt
  const muttertag = new Date(jahr, 4, ersterSo + 7)

  const fmt = d => d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })

  return [
    { name: 'Neujahr', emoji: '🎆', datum: `1. Januar ${jahr}`,
      bg1: '#06060f', bg2: '#0e0e22', akzent: '#c9a84c',
      varianten: [
        'Ein frisches Jahr beginnt — wir wünschen euch einen guten Start ins neue Jahr! Das Team von Sinsig & Lang freut sich auf viele weitere gemeinsame Kilometer.',
        'Auf ein neues Jahr voller Vorfreude, schöner Momente und sicherer Fahrten! 🎆 Herzliche Grüße vom Team Sinsig & Lang in Bingen.',
        'Danke für euer Vertrauen im vergangenen Jahr — wir freuen uns auf alles, was kommt. Ein gutes neues Jahr wünscht euch das Team von Sinsig & Lang!',
      ],
      hashtags: '#Neujahr #HappyNewYear #SinsigLang #Bingen #Autohaus #Mercedes' },
    { name: 'Valentinstag', emoji: '❤️', datum: `14. Februar ${jahr}`,
      bg1: '#0f0508', bg2: '#1c0b12', akzent: '#c49a9a',
      varianten: [
        'Heute ist der Tag der Liebe — auch wir lieben, was wir tun! Ob Pflege, Wartung oder ein neues Fahrzeug: Wir sind für euch da.',
        'Das schönste Geschenk? Ein Auto, auf das man sich verlassen kann. ❤️ Wir wünschen euch einen wunderschönen Valentinstag!',
        'Happy Valentine\'s Day! Wir lieben unsere Arbeit — und wir lieben es, für euch da zu sein. Herzliche Grüße vom Team Sinsig & Lang.',
      ],
      hashtags: '#Valentinstag #ValentinesDay #SinsigLang #Bingen #Autohaus #Mercedes' },
    { name: 'Ostern', emoji: '🐣', datum: fmt(ostern),
      bg1: '#060e07', bg2: '#0c1a0d', akzent: '#d4c090',
      varianten: [
        'Frohe Ostern! Wir wünschen euch erholsame Feiertage voller Freude mit Familie und Freunden.',
        'Die Osterzeit ist da 🐣 — eine Zeit zum Durchatmen, Genießen und neue Energie tanken. Schöne Feiertage wünscht das Team Sinsig & Lang!',
        'Frohe Ostern von uns an euch! Genießt die freie Zeit — und kommt sicher ans Ziel. 🐣',
      ],
      hashtags: '#Ostern #FroheOstern #HappyEaster #SinsigLang #Bingen #Autohaus' },
    { name: 'Tag der Arbeit', emoji: '🔨', datum: `1. Mai ${jahr}`,
      bg1: '#0f0606', bg2: '#1c0c0c', akzent: '#c9a84c',
      varianten: [
        'Zum Tag der Arbeit ein aufrichtiges Dankeschön — an alle, die täglich ihr Bestes geben. Auch unser Team.',
        'Heute feiern wir alle, die mit Herzblut dabei sind. 💪 Danke an unser Team und an alle treuen Kunden! Frohen 1. Mai!',
        'Der 1. Mai gehört dem Einsatz — dem euren und dem unseren. Wir sind jeden Tag gerne für euch da. Frohes Maifest!',
      ],
      hashtags: '#TagDerArbeit #1Mai #SinsigLang #Bingen #Autohaus #Werkstatt' },
    { name: 'Muttertag', emoji: '💐', datum: fmt(muttertag),
      bg1: '#0f0608', bg2: '#1c0c10', akzent: '#d4a0b0',
      varianten: [
        'Alles Liebe zum Muttertag! Von uns: ein herzliches Dankeschön an alle Mütter — ihr seid wunderbar.',
        'Heute ist ihr Tag — und sie verdient das Beste! 💐 Alles Liebe zum Muttertag, vom Team Sinsig & Lang.',
        'Für alle, die immer da sind und nie genug Danke hören: Herzlichen Glückwunsch zum Muttertag! 💐',
      ],
      hashtags: '#Muttertag #MothersDay #SinsigLang #Bingen #Autohaus #MercedesBenz' },
    { name: 'Christi Himmelfahrt', emoji: '🕊️', datum: fmt(himmelfahrt),
      bg1: '#070710', bg2: '#0e0e1e', akzent: '#b0b8d0',
      varianten: [
        'Schöne Feiertage wünscht das Team von Sinsig & Lang. Genießt die freie Zeit und bleibt sicher auf den Straßen.',
        'Ein verlängertes Wochenende steht an 🕊️ — wir wünschen euch schöne Feiertage und gute Fahrt!',
        'Christi Himmelfahrt — Zeit für Familie, Natur und eine Auszeit. Schöne freie Tage wünscht das ganze Team von Sinsig & Lang!',
      ],
      hashtags: '#ChristiHimmelfahrt #Feiertag #SinsigLang #Bingen #Autohaus #Mercedes' },
    { name: 'Pfingsten', emoji: '🌿', datum: fmt(pfingsten),
      bg1: '#060f0d', bg2: '#0b1c18', akzent: '#8fc8c0',
      varianten: [
        'Frohe Pfingsten! Wir wünschen euch ein erholsames Wochenende. Kommt sicher an.',
        'Das Pfingstwochenende lädt ein zum Entschleunigen 🌿 — genießt die freie Zeit und erholt euch gut. Liebe Grüße vom Team Sinsig & Lang!',
        'Frohe Pfingsten! Egal wohin die Reise geht — wir sorgen dafür, dass euer Auto euch sicher hinbringt. 🌿',
      ],
      hashtags: '#Pfingsten #Pfingstferien #SinsigLang #Bingen #Autohaus #MercedesService' },
    { name: 'Tag der Einheit', emoji: '🇩🇪', datum: `3. Oktober ${jahr}`,
      bg1: '#080808', bg2: '#121212', akzent: '#c9a84c',
      varianten: [
        'Zum Tag der Deutschen Einheit: Wir feiern gemeinsam — als Team, als Region, als Land.',
        'Ein Land, eine Geschichte, viele Geschichten. 🇩🇪 Wir wünschen euch einen schönen Tag der Deutschen Einheit!',
        'Zusammen sind wir stark — damals wie heute. Herzliche Grüße zum 3. Oktober vom Team Sinsig & Lang! 🇩🇪',
      ],
      hashtags: '#TagDerEinheit #3Oktober #SinsigLang #Bingen #Autohaus #Deutschland' },
    { name: 'Halloween', emoji: '🎃', datum: `31. Oktober ${jahr}`,
      bg1: '#0a0602', bg2: '#170d04', akzent: '#c87840',
      varianten: [
        'Das Team von Sinsig & Lang wünscht euch eine gruselig gute Zeit zu Halloween. Fahrt vorsichtig.',
        'Buh! 🎃 Halloween ist da — gruselt euch, habt Spaß und kommt sicher nach Hause. Euer Team von Sinsig & Lang!',
        'Ob Hexe, Vampir oder Monster: Heute Nacht ist alles erlaubt. 🎃 Happy Halloween — und bitte vorsichtig fahren!',
      ],
      hashtags: '#Halloween #SinsigLang #Bingen #Autohaus #Oktober' },
    { name: 'Nikolaus', emoji: '🎅', datum: `6. Dezember ${jahr}`,
      bg1: '#0f0606', bg2: '#1c0a0a', akzent: '#c9a84c',
      varianten: [
        'Der Nikolaus war bei uns — kommt vorbei und schaut, was er für euch mitgebracht hat!',
        'Ho ho ho! 🎅 Habt ihr auch schon eure Stiefel rausgestellt? Einen schönen Nikolaustag wünscht das Team Sinsig & Lang!',
        'Der Nikolaus schaut vorbei — und wir sind auch für euch da! 🎅 Schöner Nikolaus vom Team Sinsig & Lang in Bingen.',
      ],
      hashtags: '#Nikolaus #SinsigLang #Bingen #Autohaus #Mercedes #Dezember' },
    { name: 'Weihnachten', emoji: '🎄', datum: `24. – 26. Dezember ${jahr}`,
      bg1: '#060e06', bg2: '#0b180b', akzent: '#c9a84c',
      varianten: [
        'Das gesamte Team von Sinsig & Lang wünscht euch wunderschöne Weihnachten voller Wärme, Freude und schöner Momente.',
        'In der Stille dieser besonderen Tage wünschen wir euch Geborgenheit, Freude und Zeit für die Menschen, die euch wichtig sind. 🎄 Frohe Weihnachten!',
        'Frohe Weihnachten! 🎄 Danke für euer Vertrauen in diesem Jahr — wir wünschen euch und euren Familien wunderschöne Festtage.',
      ],
      hashtags: '#FroheWeihnachten #MerryChristmas #SinsigLang #Bingen #Autohaus #Mercedes' },
    { name: 'Silvester', emoji: '🥂', datum: `31. Dezember ${jahr}`,
      bg1: '#06060f', bg2: '#0e0e22', akzent: '#c9a84c',
      varianten: [
        'Auf ein gutes neues Jahr! Danke für euer Vertrauen in diesem Jahr — wir freuen uns auf viele weitere gemeinsame Kilometer.',
        'Das Jahr neigt sich dem Ende — wir blicken dankbar zurück und gespannt nach vorne. 🥂 Einen guten Rutsch wünscht das Team Sinsig & Lang!',
        'Prost Neujahr! 🥂 Auf alles, was war, und alles, was noch kommt. Wir freuen uns auf ein weiteres gemeinsames Jahr mit euch!',
      ],
      hashtags: '#Silvester #Neujahr #SinsigLang #Bingen #Autohaus #Mercedes #Jahreswechsel' },
  ]
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = '', cy = y
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' '
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, cy); line = words[i] + ' '; cy += lineHeight
    } else { line = test }
  }
  ctx.fillText(line.trim(), x, cy)
  return cy
}

function drawMercedesStar(ctx, cx, cy, r, color) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color

  // Äußerer Ring – fein & filigran
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.lineWidth = r * 0.022
  ctx.stroke()

  // Drei filigrane Zacken – schmal zulaufend von Mitte zur Spitze
  const angles = [-Math.PI / 2, -Math.PI / 2 + (2 * Math.PI / 3), -Math.PI / 2 + (4 * Math.PI / 3)]
  for (const angle of angles) {
    const tipX = cx + Math.cos(angle) * r * 0.97
    const tipY = cy + Math.sin(angle) * r * 0.97
    const perp = angle + Math.PI / 2
    // Basis-Breite am Zentrum
    const wBase = r * 0.055
    // Schmale Basis näher an der Mitte (2/3 des Radius)
    const midDist = r * 0.22
    const m1x = cx + Math.cos(angle) * midDist + Math.cos(perp) * wBase
    const m1y = cy + Math.sin(angle) * midDist + Math.sin(perp) * wBase
    const m2x = cx + Math.cos(angle) * midDist - Math.cos(perp) * wBase
    const m2y = cy + Math.sin(angle) * midDist - Math.sin(perp) * wBase
    ctx.beginPath()
    ctx.moveTo(tipX, tipY)
    ctx.lineTo(m1x, m1y)
    ctx.lineTo(cx + Math.cos(perp) * r * 0.018, cy + Math.sin(perp) * r * 0.018)
    ctx.lineTo(cx - Math.cos(perp) * r * 0.018, cy - Math.sin(perp) * r * 0.018)
    ctx.lineTo(m2x, m2y)
    ctx.closePath()
    ctx.fill()
  }

  // Kleiner Mittelpunkt
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.04, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

async function zeichneCanvas(canvas, f, canvasFormat = 'Beitrag') {
  await document.fonts.ready

  const ctx = canvas.getContext('2d')
  const w = 1080
  const h = canvasFormat === 'Story' ? 1920 : 1080
  canvas.width = w
  canvas.height = h

  // Mercedes SVG laden & mit Akzentfarbe einfärben
  let mercedesImg = null
  try {
    const svgRaw = await fetch('/Mercedes-Benz_free_logo.svg').then(r => r.text())
    const colored = svgRaw.replace(/fill:#73797c/gi, 'fill:#ffffff')
    const blob = new Blob([colored], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    mercedesImg = new Image()
    mercedesImg.src = url
    await new Promise(res => { mercedesImg.onload = res; mercedesImg.onerror = res })
    URL.revokeObjectURL(url)
  } catch {}

  // Hintergrund
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, f.bg1)
  g.addColorStop(1, f.bg2)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // Rahmen
  ctx.strokeStyle = f.akzent + '60'
  ctx.lineWidth = 1
  ctx.strokeRect(48, 48, w - 96, h - 96)
  ctx.strokeStyle = f.akzent + '30'
  ctx.strokeRect(56, 56, w - 112, h - 112)

  // Ecken-Akzente
  const eck = 36, ep = 48
  ctx.strokeStyle = f.akzent; ctx.lineWidth = 2
  ;[
    [ep, ep, ep+eck, ep, ep, ep+eck],
    [w-ep, ep, w-ep-eck, ep, w-ep, ep+eck],
    [ep, h-ep, ep+eck, h-ep, ep, h-ep-eck],
    [w-ep, h-ep, w-ep-eck, h-ep, w-ep, h-ep-eck],
  ].forEach(([x1,y1,x2,y2,x3,y3]) => {
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x3,y3); ctx.stroke()
  })

  // Vertikaler Offset für Story (mehr Platz oben)
  const yOff = canvasFormat === 'Story' ? 420 : 0

  // Mercedes-Stern (echtes SVG oder Fallback)
  const starSize = 200
  if (mercedesImg && mercedesImg.naturalWidth > 0) {
    ctx.drawImage(mercedesImg, w / 2 - starSize / 2, 120 + yOff, starSize, starSize)
  } else {
    drawMercedesStar(ctx, w / 2, 220 + yOff, 90, f.akzent)
  }

  // Linie unter Stern
  ctx.strokeStyle = f.akzent + '50'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(w/2-60, 360+yOff); ctx.lineTo(w/2+60, 360+yOff); ctx.stroke()

  // Feiertagsname
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 88px Poppins'
  ctx.textAlign = 'center'
  ctx.fillText(f.name, w / 2, 460 + yOff)

  // Datum
  ctx.fillStyle = '#ffffff'
  ctx.font = '300 40px Poppins'
  ctx.fillText(f.datum, w / 2, 520 + yOff)

  // Trennlinie
  ctx.strokeStyle = f.akzent + '50'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(w/2-200, 562+yOff); ctx.lineTo(w/2+200, 562+yOff); ctx.stroke()

  // Caption
  ctx.fillStyle = '#ffffff'
  ctx.font = '300 38px Poppins'
  wrapText(ctx, f.caption, w / 2, 630 + yOff, w - 240, 58)

  // Untere Trennlinie
  const yBot = h - 210
  ctx.strokeStyle = f.akzent + '40'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(140, yBot); ctx.lineTo(w-140, yBot); ctx.stroke()

  // Logo
  try {
    const logo = new Image()
    logo.src = '/logo.png'
    await new Promise((res) => { logo.onload = res; logo.onerror = res })
    if (logo.naturalWidth > 0) {
      const logoH = 70
      const logoW = (logo.naturalWidth / logo.naturalHeight) * logoH
      ctx.drawImage(logo, w/2 - logoW/2, yBot + 20, logoW, logoH)
    }
  } catch {}

  // Subline
  ctx.fillStyle = '#ffffff'
  ctx.font = '300 26px Poppins'
  ctx.fillText('Autorisierte Mercedes-Benz Vertragswerkstatt', w / 2, h - 80)
}

// ─── Lokales ISO-Datum (kein UTC-Versatz) ────────────────────────────────────
function heuteISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

// ─── Optimale Post-Termine (Di. 12:00 & Do. 18:00) ──────────────────────────
function schlageDatenVor(geplantePosts = [], verlauf = []) {
  const vorschlaege = []
  const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+1)
  let sicherheit = 0
  while (vorschlaege.length < 4 && sicherheit < 180) {
    sicherheit++
    const wt = d.getDay()
    if (wt === 2 || wt === 4) {
      const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
      const datStr = d.toLocaleDateString('de-DE')
      const belegt = geplantePosts.some(e => e.geplantesDatum === iso) || verlauf.some(e => e.datum === datStr)
      if (!belegt) {
        const uhrzeit = wt === 2 ? '12:00' : '18:00'
        vorschlaege.push({
          datum: iso,
          uhrzeit,
          label: d.toLocaleDateString('de-DE', { weekday:'short', day:'numeric', month:'short' }) + ` · ${uhrzeit}`,
        })
      }
    }
    d.setDate(d.getDate()+1)
  }
  return vorschlaege
}

// ─── Fahrzeug ─────────────────────────────────────────────────────────────────
function generiereKfzCaption(d) {
  const km = d.km ? parseInt(d.km).toLocaleString('de-DE') + ' km' : null
  const preis = d.preis ? parseInt(d.preis).toLocaleString('de-DE') + ' €' : null
  const infos = [km, preis].filter(Boolean).join(' | ')
  return `🚗 ${d.marke}${d.modell ? ' ' + d.modell : ''}${d.baujahr ? ` (${d.baujahr})` : ''} — jetzt bei Sinsig & Lang!${infos ? '\n\n📍 ' + infos : ''}${d.extras ? '\n✨ ' + d.extras : ''}\n\nInteresse? Einfach anrufen oder vorbeikommen — wir freuen uns auf euch!`
}
function generiereKfzHashtags(d) {
  return `#${d.marke.replace(/[^a-zA-Z0-9]/g,'')} #${d.modell.replace(/[^a-zA-Z0-9]/g,'')} #Gebrauchtwagen #SinsigLang #Bingen #Autohaus #AutoKaufen`
}

// ─── Kalender ─────────────────────────────────────────────────────────────────
const MONATE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const WOCHENTAGE = ['Mo','Di','Mi','Do','Fr','Sa','So']
const festeFeiertage = [
  { m:1,t:1,label:'🎆 Neujahr' }, { m:2,t:14,label:'❤️ Valentinstag' },
  { m:5,t:1,label:'🔨 Tag d. Arbeit' }, { m:10,t:3,label:'🇩🇪 Tag d. Einheit' },
  { m:10,t:31,label:'🎃 Halloween' }, { m:12,t:6,label:'🎅 Nikolaus' },
  { m:12,t:24,label:'🎄 Weihnachten' }, { m:12,t:31,label:'🥂 Silvester' },
]
function beweglicheFeiertage(jahr) {
  const a=jahr%19,b=Math.floor(jahr/100),c=jahr%100
  const d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25)
  const g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30
  const ii=Math.floor(c/4),k=c%4,l=(32+2*e+2*ii-h-k)%7
  const mn=Math.floor((a+11*h+22*l)/451)
  const om=Math.floor((h+l-7*mn+114)/31), ot=((h+l-7*mn+114)%31)+1
  const ostern=new Date(jahr,om-1,ot)
  const himmelfahrt=new Date(ostern.getTime()+39*86400000)
  const pfingsten=new Date(ostern.getTime()+49*86400000)
  const maiWt=new Date(jahr,4,1).getDay()
  const ersterSo=maiWt===0?1:8-maiWt
  const muttertag=new Date(jahr,4,ersterSo+7)
  return [
    { m:ostern.getMonth()+1,     t:ostern.getDate(),     label:'🐣 Ostern' },
    { m:muttertag.getMonth()+1,  t:muttertag.getDate(),  label:'💐 Muttertag' },
    { m:himmelfahrt.getMonth()+1,t:himmelfahrt.getDate(),label:'🕊️ Himmelfahrt' },
    { m:pfingsten.getMonth()+1,  t:pfingsten.getDate(),  label:'🌿 Pfingsten' },
  ]
}
function getMonatsTipp(m) {
  if (m===3||m===4) return '🔧 Frühjahrs-Räderwechsel empfehlen'
  if (m===5||m===6) return '❄️ Klimaservice vor dem Sommer'
  if (m===7||m===8) return '🚗 Gebrauchtwagen / Werkstatt-Termin'
  if (m===9)        return '🛑 Bremsencheck vor dem Herbst'
  if (m===10||m===11) return '🔧 Herbst-Räderwechsel empfehlen'
  if (m===12)       return '🛢️ Wintercheck & Ölwechsel'
  if (m===1||m===2) return '🔍 HU/AU Erinnerung posten'
  return null
}

// ─── Wiederverwendbare UI-Bausteine ──────────────────────────────────────────
function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border p-6 ${className}`}
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
      {children}
    </div>
  )
}

function Label({ children }) {
  return <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#666' }}>{children}</p>
}

function PillBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2 rounded-full text-sm transition-all duration-200"
      style={{
        background: active ? TEAL : 'rgba(255,255,255,0.05)',
        color: active ? '#fff' : '#999',
        border: `1px solid ${active ? TEAL : 'rgba(255,255,255,0.08)'}`,
      }}>
      {children}
    </button>
  )
}

function ActionBtn({ onClick, children, variant = 'ghost' }) {
  const styles = {
    primary: { background: TEAL, color: '#fff', border: `1px solid ${TEAL}` },
    white:   { background: '#fff', color: '#111', border: '1px solid #fff' },
    ghost:   { background: 'transparent', color: '#aaa', border: '1px solid rgba(255,255,255,0.12)' },
    success: { background: '#16a34a', color: '#fff', border: '1px solid #16a34a' },
  }
  return (
    <button onClick={onClick}
      className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
      style={styles[variant]}>
      {children}
    </button>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────
export default function AdminPage() {
  // Login
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginFehler, setLoginFehler] = useState(false)
  const [loginPassVisible, setLoginPassVisible] = useState(false)

  const [aktiveTab, setAktiveTab] = useState('home')

  // Service
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [aktiveVorlage, setAktiveVorlage] = useState(null)
  const [aktiveVariante, setAktiveVariante] = useState(null)
  const [format, setFormat] = useState('Beitrag')
  const [overlayText, setOverlayText] = useState('')

  // Feiertage
  const [aktiverFeiertag, setAktiverFeiertag] = useState(null)
  const [aktiveFeiertagVariante, setAktiveFeiertagVariante] = useState(0)
  const [kopiert, setKopiert] = useState(false)
  const [feiertagCaption, setFeiertagCaption] = useState('')
  const [feiertagHashtags, setFeiertagHashtags] = useState('')
  const [feiertagFormat, setFeiertagFormat] = useState('Beitrag')
  const canvasRef = useRef(null)

  // Fahrzeug
  const [kfz, setKfz] = useState({ marke: 'Mercedes-Benz', modell: '', baujahr: '', km: '', preis: '', extras: '' })
  const [kfzFehler, setKfzFehler] = useState([])
  const [kfzCaption, setKfzCaption] = useState('')
  const [kfzHashtags, setKfzHashtags] = useState('')
  const [kfzGeneriert, setKfzGeneriert] = useState(false)
  const [kfzKopiert, setKfzKopiert] = useState(false)
  const [kfzImages, setKfzImages] = useState([])
  const [kfzImgIndex, setKfzImgIndex] = useState(0)

  // Verlauf
  const [verlauf, setVerlauf] = useState([])
  const [gespeichert, setGespeichert] = useState(false)
  const [postConfirm, setPostConfirm] = useState(null) // { onConfirm: fn } oder null

  // Planung
  const [geplantePosts, setGeplantePosts] = useState([])
  const [planenDatum, setPlanenDatum] = useState('')
  const [showPlanenPanel, setShowPlanenPanel] = useState(false)
  const [geplantGespeichert, setGeplantGespeichert] = useState(false)
  const [geplantUhrzeit, setGeplantUhrzeit] = useState('12:00')
  const [verlaufFilter, setVerlaufFilter] = useState('alle') // 'alle' | 'gepostet' | 'geplant'

  // Insights Accordion
  const [insightsOffen, setInsightsOffen] = useState(new Set(['was']))
  const toggleInsight = (key) => setInsightsOffen(prev => {
    const next = new Set(prev)
    next.has(key) ? next.delete(key) : next.add(key)
    return next
  })

  // Kalender
  const heute = new Date()
  const [kalMonat, setKalMonat] = useState(heute.getMonth())
  const [kalJahr, setKalJahr]   = useState(heute.getFullYear())

  // Feiertage mit korrekten Daten für das gewählte Jahr
  const feiertage = berechneFeiertage(kalJahr)
  // Alle Kalenderfeiertage (fest + beweglich) für das gewählte Jahr
  const alleKalFeiertage = [...festeFeiertage, ...beweglicheFeiertage(kalJahr)]

  useEffect(() => {
    try { const v = localStorage.getItem('sinsig_verlauf'); if (v) setVerlauf(JSON.parse(v)) } catch {}
    try { const g = localStorage.getItem('sinsig_geplant'); if (g) setGeplantePosts(JSON.parse(g)) } catch {}
    try {
      const session = localStorage.getItem('sinsig_session')
      if (session) { setLoggedIn(true); setCurrentUser(session) }
    } catch {}
  }, [])

  useEffect(() => {
    setAktiverFeiertag(null)
  }, [kalJahr])

  function speichern(typ, titel, cap, hash, fmt) {
    const e = { id: Date.now(), datum: new Date().toLocaleDateString('de-DE'), typ, titel, caption: cap, hashtags: hash, format: fmt || '1:1', notiz: '', ersteller: currentUser || '' }
    const neu = [e, ...verlauf]
    setVerlauf(neu); localStorage.setItem('sinsig_verlauf', JSON.stringify(neu))
    setGespeichert(true); setTimeout(() => setGespeichert(false), 2500)
  }

  function planen(typ, titel, cap, hash, fmt) {
    if (!planenDatum) return
    const e = { id: Date.now(), geplantesDatum: planenDatum, geplantUhrzeit, erstelltAm: new Date().toLocaleDateString('de-DE'), typ, titel, caption: cap, hashtags: hash, format: fmt || 'Beitrag', ersteller: currentUser || '' }
    const neu = [e, ...geplantePosts]
    setGeplantePosts(neu); localStorage.setItem('sinsig_geplant', JSON.stringify(neu))
    setPlanenDatum(''); setShowPlanenPanel(false)
    setGeplantGespeichert(true); setTimeout(() => setGeplantGespeichert(false), 2500)
  }

  function geplantLoeschen(id) {
    const neu = geplantePosts.filter(e => e.id !== id)
    setGeplantePosts(neu); localStorage.setItem('sinsig_geplant', JSON.stringify(neu))
  }

  function notizAktualisieren(id, notiz) {
    const neu = verlauf.map(e => e.id === id ? { ...e, notiz } : e)
    setVerlauf(neu); localStorage.setItem('sinsig_verlauf', JSON.stringify(neu))
  }

  function loeschen(id) {
    const neu = verlauf.filter(e => e.id !== id)
    setVerlauf(neu); localStorage.setItem('sinsig_verlauf', JSON.stringify(neu))
  }

  function vorlageWaehlen(v, i) {
    setAktiveVorlage(i); setAktiveVariante(0); setCaption(v.varianten[0]); setHashtags(v.hashtags)
  }

  function feiertageWaehlen(f, i) {
    setAktiverFeiertag(i)
    setAktiveFeiertagVariante(0)
    setKopiert(false)
    setFeiertagCaption(f.varianten[0])
    setFeiertagHashtags(f.hashtags)
    const fMitCaption = { ...f, caption: f.varianten[0] }
    setTimeout(async () => { if (canvasRef.current) await zeichneCanvas(canvasRef.current, fMitCaption, feiertagFormat) }, 50)
  }

  async function canvasAktualisieren() {
    if (!canvasRef.current || aktiverFeiertag === null) return
    const f = { ...feiertage[aktiverFeiertag], caption: feiertagCaption }
    await zeichneCanvas(canvasRef.current, f, feiertagFormat)
  }

  function herunterladen() {
    if (!canvasRef.current || aktiverFeiertag === null) return
    const link = document.createElement('a')
    link.download = `${feiertage[aktiverFeiertag].name}_SinsigLang.png`
    link.href = canvasRef.current.toDataURL('image/png'); link.click()
  }

  function kfzGenerieren() {
    const hashtags = kfz.modell ? generiereKfzHashtags(kfz) : '#Gebrauchtwagen #SinsigLang #Bingen #Autohaus #AutoKaufen'
    setKfzCaption(generiereKfzCaption(kfz)); setKfzHashtags(hashtags); setKfzGeneriert(true)
  }

  function kalenderTage() {
    let start = new Date(kalJahr, kalMonat, 1).getDay() - 1
    if (start < 0) start = 6
    const anzahl = new Date(kalJahr, kalMonat + 1, 0).getDate()
    const tage = []
    for (let i = 0; i < start; i++) tage.push(null)
    for (let i = 1; i <= anzahl; i++) tage.push(i)
    return tage
  }

  // ── Smarte Empfehlung (reagiert auf verlauf + geplantePosts) ────────────────
  const empfehlung = (() => {
    const heute = new Date(); heute.setHours(0,0,0,0)
    const monat = heute.getMonth()
    const jahr  = heute.getFullYear()

    // Feiertage berechnen
    function termineJahr(j) {
      const a=j%19,b=Math.floor(j/100),c=j%100,d=Math.floor(b/4),e=b%4
      const f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30
      const ii=Math.floor(c/4),k=c%4,l=(32+2*e+2*ii-h-k)%7,mn=Math.floor((a+11*h+22*l)/451)
      const om=Math.floor((h+l-7*mn+114)/31),ot=((h+l-7*mn+114)%31)+1
      const ostern=new Date(j,om-1,ot)
      const mwt=new Date(j,4,1).getDay(),mso=mwt===0?1:8-mwt
      return [
        {date:new Date(j,0,1),   name:'🎆 Neujahr'},
        {date:new Date(j,1,14),  name:'❤️ Valentinstag'},
        {date:ostern,            name:'🐣 Ostern'},
        {date:new Date(j,4,1),   name:'🔨 Tag der Arbeit'},
        {date:new Date(j,4,mso+7),name:'💐 Muttertag'},
        {date:new Date(ostern.getTime()+39*86400000),name:'🕊️ Christi Himmelfahrt'},
        {date:new Date(ostern.getTime()+49*86400000),name:'🌿 Pfingsten'},
        {date:new Date(j,9,3),   name:'🇩🇪 Tag der Einheit'},
        {date:new Date(j,9,31),  name:'🎃 Halloween'},
        {date:new Date(j,11,6),  name:'🎅 Nikolaus'},
        {date:new Date(j,11,24), name:'🎄 Weihnachten'},
        {date:new Date(j,11,31), name:'🥂 Silvester'},
      ]
    }
    const in30 = new Date(heute.getTime() + 30*86400000)
    const offeneHolidays = [...termineJahr(jahr),...termineJahr(jahr+1)]
      .filter(h => {
        if (h.date < heute || h.date > in30) return false
        const iso = `${h.date.getFullYear()}-${String(h.date.getMonth()+1).padStart(2,'0')}-${String(h.date.getDate()).padStart(2,'0')}`
        const datStr = h.date.toLocaleDateString('de-DE')
        return !verlauf.some(e => e.datum === datStr) && !geplantePosts.some(e => e.geplantesDatum === iso)
      })
      .sort((a,b) => a.date - b.date)

    if (offeneHolidays.length > 0) {
      const first = offeneHolidays[0]
      const diff = Math.round((first.date - heute) / 86400000)
      if (diff === 0) return { text: `Heute: ${first.name} — jetzt posten!`, typ: 'dringend' }
      if (diff <= 7)  return { text: `${first.name} in ${diff} Tag${diff>1?'en':''} — dringend!`, typ: 'dringend' }
      return { text: `In ${diff} Tagen: ${first.name} — jetzt planen`, typ: 'holiday' }
    }

    // Fahrzeug-Erinnerung: Beide 14-Tage-Fenster müssen abgedeckt sein
    // Fahrzeug-Check: irgendein Post in den nächsten 28 Tagen?
    const hatKfzInNaechsten28Tagen = () => {
      for (let i = 0; i <= 28; i++) {
        const d = new Date(heute); d.setDate(heute.getDate() + i)
        const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
        const datStr = d.toLocaleDateString('de-DE')
        if (verlauf.some(e => e.datum === datStr && e.typ === 'fahrzeug')) return true
        if (geplantePosts.some(e => e.geplantesDatum === iso && e.typ === 'fahrzeug')) return true
      }
      return false
    }
    if (!hatKfzInNaechsten28Tagen()) {
      return { text: 'Kein Fahrzeug-Post in den nächsten 4 Wochen geplant — jetzt erstellen', typ: 'fahrzeug' }
    }

    // Service-Post Rotation
    const schwerpunkte = MONATSSCHWERPUNKT[monat]

    // Gepostete diesen Monat (Wiederholung im gleichen Monat vermeiden)
    const diesenMonatGepostet = verlauf
      .filter(e => {
        if (e.typ !== 'service') return false
        const p = e.datum.split('.')
        return parseInt(p[1])-1 === monat && parseInt(p[2]) === jahr
      })
      .map(e => e.titel)

    // Alle zukünftig geplanten Service-Posts (egal in welchem Monat)
    const alleGeplant = geplantePosts
      .filter(e => e.typ === 'service')
      .map(e => e.titel)

    const bereitsImMonat = [...new Set([...diesenMonatGepostet, ...alleGeplant])]

    for (const s of schwerpunkte) {
      if (!bereitsImMonat.includes(s)) return { text: `Nächster Post: ${s}`, typ: 'service', vorlage: s }
    }

    // Rotation: wann wurde welche Vorlage zuletzt gepostet?
    const letzteNutzung = {}
    for (const e of verlauf) {
      if (e.typ === 'service' && e.titel !== 'Eigener Post') {
        const p = e.datum.split('.')
        const t = new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0])).getTime()
        if (!letzteNutzung[e.titel] || t > letzteNutzung[e.titel]) letzteNutzung[e.titel] = t
      }
    }
    const kandidaten = [...vorlagen]
      .filter(v => !bereitsImMonat.includes(v.titel))
      .sort((a,b) => (letzteNutzung[a.titel]||0) - (letzteNutzung[b.titel]||0))

    if (kandidaten.length === 0) {
      return { text: 'Alle Service-Posts für die nächsten 30 Tage geplant ✓', typ: 'done' }
    }
    return { text: `Nächster Post: ${kandidaten[0].titel}`, typ: 'service', vorlage: kandidaten[0].titel }
  })()

  const monatsTipp = getMonatsTipp(kalMonat + 1)
  const tage = kalenderTage()
  const formatAspect = { 'Beitrag': 'aspect-square', 'Story': 'aspect-[9/16]' }


  const navItems = [
    { id: 'service',   icon: '✦', label: 'Service Posts' },
    { id: 'feiertage', icon: '✦', label: 'Feiertage' },
    { id: 'fahrzeug',  icon: '✦', label: 'Fahrzeug' },
    { id: 'kalender',  icon: '✦', label: 'Redaktionsplan' },
    { id: 'verlauf',   icon: '✦', label: `Verlauf${verlauf.length > 0 ? ` · ${verlauf.length}` : ''}` },
    { id: 'insights',  icon: '✦', label: 'Insights' },
  ]

  const pageTitle = {
    home:      'Dashboard',
    service:   'Service Posts',
    feiertage: 'Feiertage & Anlässe',
    fahrzeug:  'Fahrzeug-Post',
    kalender:  'Redaktionsplan',
    verlauf:   'Verlauf',
    insights:  'Insights & Logik',
  }

  // ─── Login-Screen ──────────────────────────────────────────────────────────
  if (!loggedIn) {
    const handleLogin = (e) => {
      e.preventDefault()
      const user = USERS.find(
        u => u.benutzername.toLowerCase() === loginUser.toLowerCase().trim() && u.passwort === loginPass
      )
      if (user) {
        setLoggedIn(true)
        setCurrentUser(user.anzeigename)
        setLoginFehler(false)
        try { localStorage.setItem('sinsig_session', user.anzeigename) } catch {}
      } else {
        setLoginFehler(true)
      }
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0c0c0c' }}>
        <div className="w-full max-w-sm px-8 py-10 rounded-2xl flex flex-col gap-6"
          style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <img src="/logo.png" alt="Sinsig & Lang" className="h-8 w-auto object-contain opacity-60" />
            <p className="text-xs" style={{ color: '#444' }}>Social Media Tool · Interner Bereich</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ color: '#555' }}>Benutzername</label>
              <input
                type="text"
                autoComplete="username"
                value={loginUser}
                onChange={e => { setLoginUser(e.target.value); setLoginFehler(false) }}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: '#1e1e1e', border: `1px solid ${loginFehler ? '#ef4444' : 'rgba(255,255,255,0.08)'}`, color: '#e8e8e8' }}
                placeholder="benutzername"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ color: '#555' }}>Passwort</label>
              <div className="relative">
                <input
                  type={loginPassVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={loginPass}
                  onChange={e => { setLoginPass(e.target.value); setLoginFehler(false) }}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none pr-10"
                  style={{ background: '#1e1e1e', border: `1px solid ${loginFehler ? '#ef4444' : 'rgba(255,255,255,0.08)'}`, color: '#e8e8e8' }}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setLoginPassVisible(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:opacity-70"
                  style={{ color: '#555', lineHeight: 0 }}>
                  {loginPassVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginFehler && (
              <p className="text-xs text-center" style={{ color: '#ef4444' }}>
                Benutzername oder Passwort falsch
              </p>
            )}

            <button type="submit" className="w-full rounded-xl py-3 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: TEAL, color: '#0c0c0c' }}>
              Anmelden
            </button>
          </form>

          <p className="text-center text-xs" style={{ color: '#2a2a2a' }}>v0.3 · Sinsig & Lang GmbH & Co. KG</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#0c0c0c', color: '#e8e8e8' }}>

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className="w-56 flex-shrink-0 flex flex-col py-8 px-5"
        style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: '#0f0f0f' }}>

        {/* Logo → Home */}
        <button onClick={() => setAktiveTab('home')}
          className="mb-10 px-1 flex flex-col items-center gap-0.5 transition-opacity hover:opacity-70"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/logo.png" alt="Sinsig & Lang" className="h-10 w-auto object-contain" />
          <p className="text-xs" style={{ color: aktiveTab === 'home' ? TEAL : '#444' }}>Social Media Tool</p>
        </button>

        {/* Smarte Empfehlung */}
        {empfehlung && (() => {
          const styles = {
            dringend: { bg: '#ef444412', border: '#ef444430', color: '#ef4444', label: '⚠️ Dringend',       tab: 'service' },
            holiday:  { bg: '#f59e0b12', border: '#f59e0b30', color: '#f59e0b', label: '📅 Feiertag',       tab: 'feiertage' },
            service:  { bg: `${TEAL}12`,  border: `${TEAL}30`,  color: TEAL,    label: '📌 Nächster Post',  tab: 'service' },
            fahrzeug: { bg: `${TEAL}12`,  border: `${TEAL}30`,  color: TEAL,    label: '🚗 Fahrzeug-Post',  tab: 'fahrzeug' },
            done:     { bg: '#22c55e12', border: '#22c55e30', color: '#22c55e', label: '✓ Alles geplant',   tab: null },
          }
          const s = styles[empfehlung.typ] || styles.service
          return (
            <div className="mb-3 rounded-xl p-3 text-xs leading-relaxed flex flex-col gap-2"
              style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
              <p className="font-medium" style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              <span>{empfehlung.text}</span>
              {s.tab && (
                <button onClick={() => setAktiveTab(s.tab)}
                  className="self-start text-xs px-2.5 py-1 rounded-lg hover:opacity-80 transition-opacity"
                  style={{ background: s.border, color: s.color }}>
                  {empfehlung.typ === 'fahrzeug' ? 'Fahrzeug erstellen →' : empfehlung.typ === 'holiday' ? 'Feiertag erstellen →' : 'Service Post erstellen →'}
                </button>
              )}
            </div>
          )
        })()}

        {/* Offene Termine-Warnung (nächste 30 Tage) — versteckt wenn alles geplant */}
        {empfehlung?.typ !== 'done' && (() => {
          const t0 = new Date(); t0.setHours(0,0,0,0)
          const t30 = new Date(t0.getTime() + 30 * 86400000)
          const offen = []
          const d = new Date(t0)
          while (d <= t30) {
            const wt = d.getDay()
            if (wt === 2 || wt === 4) {
              const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
              const datStr = d.toLocaleDateString('de-DE')
              const belegt = verlauf.some(e => e.datum === datStr) || geplantePosts.some(e => e.geplantesDatum === iso)
              if (!belegt) offen.push(d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' }))
            }
            d.setDate(d.getDate() + 1)
          }
          if (offen.length === 0) {
            // Aktuellen Stand zählen
            const t0z = new Date(); t0z.setHours(0,0,0,0)
            const t30z = new Date(t0z.getTime() + 30 * 86400000)
            let gesamtSlots = 0, gepostetSlots = 0, geplantSlots = 0
            const dz = new Date(t0z)
            while (dz <= t30z) {
              const wt = dz.getDay()
              if (wt === 2 || wt === 4) {
                const iso = `${dz.getFullYear()}-${String(dz.getMonth()+1).padStart(2,'0')}-${String(dz.getDate()).padStart(2,'0')}`
                const datStr = dz.toLocaleDateString('de-DE')
                gesamtSlots++
                if (verlauf.some(e => e.datum === datStr)) gepostetSlots++
                else if (geplantePosts.some(e => e.geplantesDatum === iso)) geplantSlots++
              }
              dz.setDate(dz.getDate() + 1)
            }
            return (
              <div className="mb-6 rounded-xl p-3 text-xs leading-relaxed"
                style={{ background: '#22c55e12', border: '1px solid #22c55e30', color: '#22c55e' }}>
                <p className="font-medium mb-1" style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ Nächste 30 Tage</p>
                Alle {gesamtSlots} Slots gedeckt
                <div className="mt-1.5 flex flex-col gap-0.5" style={{ color: '#16a34a' }}>
                  {gepostetSlots > 0 && <span>· {gepostetSlots} gepostet</span>}
                  {geplantSlots > 0  && <span>· {geplantSlots} geplant</span>}
                </div>
              </div>
            )
          }
          return (
            <div className="mb-6 rounded-xl p-3 text-xs leading-relaxed"
              style={{ background: '#f59e0b12', border: '1px solid #f59e0b30', color: '#f59e0b' }}>
              <p className="font-medium mb-1" style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚠️ Nächste 30 Tage</p>
              {offen.length} offene Slot{offen.length !== 1 ? 's' : ''} ohne Post:
              <div className="mt-1.5 flex flex-col gap-0.5">
                {offen.map((label, i) => <span key={i} style={{ color: '#a37a20' }}>· {label}</span>)}
              </div>
            </div>
          )
        })()}

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setAktiveTab(item.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200"
              style={{
                background: aktiveTab === item.id ? `${TEAL}18` : 'transparent',
                color: aktiveTab === item.id ? TEAL : '#666',
                borderLeft: aktiveTab === item.id ? `2px solid ${TEAL}` : '2px solid transparent',
              }}>
              <span style={{ fontSize: '8px', opacity: 0.7 }}>✦</span>
              {item.label}
            </button>
          ))}
        </nav>

      </aside>

      {/* ── Hauptbereich ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">

        {/* Top-Bar */}
        <header className="flex items-center justify-between px-10 py-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#444' }}>Instagram Tool</p>
            <h1 className="text-2xl font-light">{pageTitle[aktiveTab]}</h1>
          </div>
          <div className="flex items-center gap-4">
            {aktiveTab === 'service' && (
              <ActionBtn onClick={() => { setCaption(''); setHashtags(''); setPreview(null); setAktiveVorlage(null); setAktiveVariante(null); setOverlayText('') }}>
                Zurücksetzen
              </ActionBtn>
            )}
            <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-right">
                <p className="text-xs" style={{ color: '#444' }}>Angemeldet als</p>
                <p className="text-sm" style={{ color: '#888' }}>{currentUser}</p>
              </div>
              <button onClick={() => {
                setLoggedIn(false); setCurrentUser(null); setLoginUser(''); setLoginPass('')
                try { localStorage.removeItem('sinsig_session') } catch {}
              }} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
                style={{ color: '#444', border: '1px solid rgba(255,255,255,0.06)' }}>
                ↩ Abmelden
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-10 py-8">

          {/* ══ HOME / DASHBOARD ═════════════════════════════════════════════ */}
          {aktiveTab === 'home' && (() => {
            // Monatsübersicht berechnen
            const todayM = new Date(); todayM.setHours(0,0,0,0)
            const monatH = todayM.getMonth(), jahrH = todayM.getFullYear()
            const daysInMonth = new Date(jahrH, monatH + 1, 0).getDate()
            const diDoSlots = []
            for (let t = 1; t <= daysInMonth; t++) {
              const wt = new Date(jahrH, monatH, t).getDay()
              if (wt === 2 || wt === 4) {
                const iso = `${jahrH}-${String(monatH+1).padStart(2,'0')}-${String(t).padStart(2,'0')}`
                const datStr = new Date(jahrH, monatH, t).toLocaleDateString('de-DE')
                const gepostet = verlauf.some(e => e.datum === datStr)
                const geplant = geplantePosts.some(e => e.geplantesDatum === iso)
                const verpasst = !gepostet && !geplant && new Date(jahrH, monatH, t) < todayM
                diDoSlots.push({ gepostet, geplant, verpasst })
              }
            }
            const anzGepostet = diDoSlots.filter(s => s.gepostet).length
            const anzGeplant  = diDoSlots.filter(s => s.geplant).length
            const anzVerpasst = diDoSlots.filter(s => s.verpasst).length
            const anzOffen    = diDoSlots.filter(s => !s.gepostet && !s.geplant && !s.verpasst).length

            // Offene Slots 30 Tage
            const in30 = new Date(todayM.getTime() + 30*86400000)
            const offeneSlots = []
            const d30 = new Date(todayM); d30.setDate(d30.getDate()+1)
            while (d30 <= in30) {
              const wt = d30.getDay()
              if (wt === 2 || wt === 4) {
                const iso = `${d30.getFullYear()}-${String(d30.getMonth()+1).padStart(2,'0')}-${String(d30.getDate()).padStart(2,'0')}`
                const datStr = d30.toLocaleDateString('de-DE')
                const belegt = verlauf.some(e => e.datum === datStr) || geplantePosts.some(e => e.geplantesDatum === iso)
                if (!belegt) offeneSlots.push(d30.toLocaleDateString('de-DE', { weekday:'short', day:'numeric', month:'short' }) + (d30.getDay()===2?' · 12:00':' · 18:00'))
              }
              d30.setDate(d30.getDate()+1)
            }

            const letzteVerlauf = verlauf.slice(0, 3)
            const MONATE_H = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

            const stunde = new Date().getHours()
            const gruss = stunde < 12 ? 'Guten Morgen' : stunde < 18 ? 'Guten Tag' : 'Guten Abend'

            return (
              <div className="flex flex-col gap-6">

                {/* Begrüßung */}
                <p className="text-xl font-light" style={{ color: '#555' }}>{gruss}, <span style={{ color: '#aaa' }}>{currentUser}</span></p>

                {/* Monats-Stats */}
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#444' }}>{MONATE_H[monatH]} {jahrH} · Übersicht</p>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { zahl: anzGepostet, label: 'Gepostet',  farbe: '#22c55e' },
                      { zahl: anzGeplant,  label: 'Geplant',   farbe: '#f59e0b' },
                      { zahl: anzOffen,    label: 'Offen',     farbe: '#aaa', bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.18)' },
                      { zahl: anzVerpasst, label: 'Verpasst',  farbe: '#ef4444' },
                    ].map((s, i) => (
                      <div key={i} className="rounded-2xl p-5 text-center"
                        style={{ background: s.bg || s.farbe + '10', border: `1px solid ${s.border || s.farbe + '25'}` }}>
                        <p className="text-3xl font-light mb-1" style={{ color: s.farbe }}>{s.zahl}</p>
                        <p className="text-xs uppercase tracking-widest" style={{ color: s.farbe }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Linke Spalte */}
                  <div className="flex flex-col gap-5">

                    {/* Aktuelle Empfehlung — nicht für Fahrzeug (Sidebar reicht) */}
                    {empfehlung && empfehlung.typ !== 'fahrzeug' && (() => {
                      const styles = {
                        dringend: { bg:'#ef444412', border:'#ef444430', color:'#ef4444', label:'⚠️ Dringend',      tab:'service' },
                        holiday:  { bg:'#f59e0b12', border:'#f59e0b30', color:'#f59e0b', label:'📅 Feiertag',      tab:'feiertage' },
                        service:  { bg:`${TEAL}12`,  border:`${TEAL}30`,  color:TEAL,    label:'📌 Nächster Post', tab:'service' },
                        done:     { bg:'#22c55e12', border:'#22c55e30', color:'#22c55e', label:'✓ Alles geplant',  tab: null },
                      }
                      const s = styles[empfehlung.typ] || styles.service
                      return (
                        <div className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#666' }}>{s.label}</p>
                          <p className="text-base font-medium" style={{ color: s.color }}>{empfehlung.text}</p>
                          {s.tab && (
                            <button onClick={() => setAktiveTab(s.tab)}
                              className="mt-3 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                              style={{ background: s.color + '20', color: s.color }}>
                              {empfehlung.typ === 'holiday' ? 'Feiertag erstellen →' : 'Service Post erstellen →'}
                            </button>
                          )}
                        </div>
                      )
                    })()}

                  </div>

                  {/* Rechte Spalte */}
                  <div className="flex flex-col gap-5">

                    {/* Letzte Posts */}
                    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#444' }}>Letzte Posts</p>
                      {letzteVerlauf.length === 0
                        ? <p className="text-sm" style={{ color: '#333' }}>Noch keine Posts vorhanden.</p>
                        : <div className="flex flex-col gap-4">
                            {letzteVerlauf.map(e => (
                              <div key={e.id} className="flex flex-col gap-2 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                                    style={{
                                      background: e.typ==='feiertag' ? '#f59e0b20' : e.typ==='fahrzeug' ? `${TEAL}20` : 'rgba(255,255,255,0.06)',
                                      color:      e.typ==='feiertag' ? '#f59e0b'   : e.typ==='fahrzeug' ? TEAL         : '#666',
                                    }}>{e.typ}</span>
                                  <span className="text-sm flex-1 truncate" style={{ color: '#aaa' }}>{e.titel}</span>
                                  <span className="text-xs flex-shrink-0" style={{ color: '#333' }}>{e.datum}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  {[
                                    { icon: '❤️', label: 'Likes' },
                                    { icon: '👁️', label: 'Aufrufe' },
                                    { icon: '💬', label: 'Nachrichten' },
                                    { icon: '🔖', label: 'Gespeichert' },
                                  ].map(s => (
                                    <div key={s.label} className="flex items-center gap-1.5">
                                      <span style={{ fontSize: '11px', opacity: 0.3 }}>{s.icon}</span>
                                      <span className="text-xs" style={{ color: '#2a2a2a' }}>—</span>
                                    </div>
                                  ))}
                                  <span className="text-xs ml-auto" style={{ color: '#222' }}>via API</span>
                                </div>
                              </div>
                            ))}
                            <button onClick={() => setAktiveTab('verlauf')}
                              className="text-xs text-left transition-all hover:opacity-80"
                              style={{ color: '#444' }}>Gesamten Verlauf anzeigen →</button>
                          </div>
                      }
                    </div>

                  </div>
                </div>
              </div>
            )
          })()}

          {/* ══ SERVICE POSTS ════════════════════════════════════════════════ */}
          {aktiveTab === 'service' && (
            <div className="flex flex-col gap-7">

              {/* Aktive Warnung als Banner */}
              {empfehlung && ['dringend','holiday','fahrzeug'].includes(empfehlung.typ) && (() => {
                const bannerStyles = {
                  dringend: { bg: '#ef444412', border: '#ef444430', color: '#ef4444', icon: '⚠️' },
                  holiday:  { bg: '#f59e0b12', border: '#f59e0b30', color: '#f59e0b', icon: '📅' },
                  fahrzeug: { bg: `${TEAL}12`,  border: `${TEAL}30`,  color: TEAL,      icon: '🚗' },
                }
                const bs = bannerStyles[empfehlung.typ]
                return (
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: bs.bg, border: `1px solid ${bs.border}`, color: bs.color }}>
                    <span>{bs.icon}</span>
                    <span className="flex-1">{empfehlung.text}</span>
                    {empfehlung.typ === 'fahrzeug' && (
                      <button onClick={() => setAktiveTab('fahrzeug')}
                        className="text-xs px-3 py-1 rounded-lg flex-shrink-0 hover:opacity-80"
                        style={{ background: `${TEAL}25`, color: TEAL }}>
                        Jetzt erstellen →
                      </button>
                    )}
                  </div>
                )
              })()}

              {/* Vorlagen */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>1</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Vorlage auswählen</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vorlagen.map((v, i) => (
                    <PillBtn key={i} active={aktiveVorlage === i} onClick={() => vorlageWaehlen(v, i)}>
                      {v.titel}
                    </PillBtn>
                  ))}
                </div>
              </Card>

              {/* Varianten */}
              {aktiveVorlage !== null && (
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>2</span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Text-Variante</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {vorlagen[aktiveVorlage].varianten.map((text, i) => (
                      <button key={i} onClick={() => { setAktiveVariante(i); setCaption(text) }}
                        className="text-left text-sm px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          background: aktiveVariante === i ? `${TEAL}15` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${aktiveVariante === i ? TEAL + '50' : 'rgba(255,255,255,0.06)'}`,
                          color: aktiveVariante === i ? '#e8e8e8' : '#777',
                        }}>
                        <span className="mr-2" style={{ color: '#444' }}>#{i + 1}</span>{text}
                      </button>
                    ))}

                    {/* Eigener Text */}
                    <button onClick={() => { setAktiveVariante(99); setCaption('') }}
                      className="text-left text-sm px-4 py-3 rounded-xl transition-all duration-200"
                      style={{
                        background: aktiveVariante === 99 ? `${TEAL}15` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${aktiveVariante === 99 ? TEAL + '50' : 'rgba(255,255,255,0.06)'}`,
                        color: aktiveVariante === 99 ? '#e8e8e8' : '#777',
                      }}>
                      <span className="mr-2" style={{ color: '#444' }}>#4</span>
                      ✏️ Eigenen Text schreiben
                    </button>

                    {aktiveVariante === 99 && (
                      <textarea
                        autoFocus
                        placeholder="Schreib deinen eigenen Text…"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${TEAL}40`,
                          color: '#e8e8e8',
                          height: '120px',
                        }}
                      />
                    )}
                  </div>
                </Card>
              )}

              {/* Editor + Vorschau */}
              {/* Hashtags + Overlay */}
          {aktiveVorlage !== null && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>3</span>
                <div className="flex items-center gap-3 flex-1 rounded-xl px-5 py-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-sm whitespace-nowrap flex-shrink-0" style={{ color: '#444' }}>#</span>
                  <input
                    type="text"
                    placeholder="Hashtags"
                    value={hashtags}
                    onChange={e => setHashtags(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: TEAL }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>4</span>
                <div className="flex items-center gap-3 flex-1 rounded-xl px-5 py-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-sm whitespace-nowrap flex-shrink-0" style={{ color: '#444' }}>Overlay</span>
                  <input
                    type="text"
                    placeholder='z.B. "ab 79€"'
                    value={overlayText}
                    onChange={e => setOverlayText(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: '#e8e8e8' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>5</span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Editor</span>
                  </div>
                  <div className="flex flex-col gap-4">

                    {/* Format */}
                    <div className="flex gap-2">
                      {['Beitrag', 'Story'].map(f => (
                        <button key={f} onClick={() => setFormat(f)}
                          className="px-4 py-1.5 rounded-lg text-xs transition-all"
                          style={{
                            background: format === f ? TEAL : 'rgba(255,255,255,0.05)',
                            color: format === f ? '#fff' : '#666',
                            border: `1px solid ${format === f ? TEAL : 'rgba(255,255,255,0.08)'}`,
                          }}>
                          {f}
                        </button>
                      ))}
                    </div>

                    {/* Bild Upload */}
                    <div
                      className="rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden"
                      style={{ minHeight: '160px', border: `1.5px dashed rgba(255,255,255,0.1)`, background: 'rgba(255,255,255,0.02)' }}
                      onClick={() => document.getElementById('fileInput').click()}>
                      <input id="fileInput" type="file" accept="image/*" className="hidden"
                        onChange={e => { const f = e.target.files[0]; if (f) setPreview(URL.createObjectURL(f)) }} />
                      {preview
                        ? <img src={preview} className="w-full h-48 object-cover" alt="Vorschau" />
                        : <p className="text-sm" style={{ color: '#444' }}>Bild auswählen</p>}
                    </div>

                    {/* Caption */}
                    <textarea placeholder="Caption…" value={caption}
                      onChange={e => setCaption(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none h-28"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#e8e8e8' }} />

                  </div>
                </Card>

                {/* Vorschau */}
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>6</span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Vorschau · {format}</span>
                  </div>

                  <div className="flex items-center justify-center" style={{ height: '462px' }}>

                  {/* ── Beitrag ── */}
                  {format === 'Beitrag' && (
                    <div className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                      style={{ width: '260px', height: '462px' }}>
                      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 flex-shrink-0" />
                        <span className="font-semibold text-sm">sinsig_lang</span>
                      </div>
                      <div className="relative overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-100"
                        style={{ height: '260px' }}>
                        {preview ? (
                          <>
                            <img src={preview} className="w-full h-full object-cover" alt="Post" />
                            {overlayText && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3">
                                <p className="text-white text-center font-semibold text-sm">{overlayText}</p>
                              </div>
                            )}
                          </>
                        ) : <p className="text-gray-300 text-sm">Kein Bild</p>}
                      </div>
                      <div className="px-4 py-3 overflow-hidden flex-1">
                        <p className="text-sm leading-relaxed line-clamp-3">
                          <span className="font-semibold">sinsig_lang </span>
                          <span className="text-gray-700">{caption}</span>
                        </p>
                        <p className="text-sm mt-1 line-clamp-2" style={{ color: '#3b82f6' }}>{hashtags}</p>
                      </div>
                    </div>
                  )}

                  {/* ── Story ── */}
                  {format === 'Story' && (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
                      style={{ width: '260px', height: '462px' }}>

                      {/* Hintergrundbild */}
                      {preview
                        ? <img src={preview} className="absolute inset-0 w-full h-full object-cover" alt="Story" />
                        : <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white/30 text-xs">Kein Bild</p>
                          </div>
                      }

                      {/* Overlay-Text */}
                      {overlayText && (
                        <div className="absolute bottom-16 left-0 right-0 px-4">
                          <p className="text-white text-center font-bold text-sm drop-shadow-lg">{overlayText}</p>
                        </div>
                      )}

                      {/* Story-Header oben */}
                      <div className="absolute top-0 left-0 right-0 px-3 pt-3">
                        {/* Fortschrittsbalken */}
                        <div className="flex gap-1 mb-2">
                          <div className="h-0.5 flex-1 rounded-full bg-white opacity-90" />
                        </div>
                        {/* Profil */}
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 flex-shrink-0
                            ring-2 ring-white/80" />
                          <span className="text-white text-xs font-semibold drop-shadow">sinsig_lang</span>
                          <span className="text-white/60 text-xs">· Jetzt</span>
                        </div>
                      </div>

                      {/* Caption unten als Story-Text */}
                      {caption && (
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-4"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                          <p className="text-white text-xs leading-relaxed line-clamp-3">{caption}</p>
                        </div>
                      )}
                    </div>
                  )}

                  </div>
                </Card>
              </div>

              {/* Beitrag posten */}
              <div className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium mb-1">Beitrag posten</p>
                    <p className="text-xs" style={{ color: '#444' }}>Instagram Graph API wird später eingebunden. Gespeicherte Posts erscheinen im Verlauf.</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setShowPlanenPanel(s => !s); setPlanenDatum('') }}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                      style={{ background: showPlanenPanel ? '#f59e0b20' : 'rgba(255,255,255,0.05)', color: showPlanenPanel ? '#f59e0b' : '#aaa', border: `1px solid ${showPlanenPanel ? '#f59e0b50' : 'rgba(255,255,255,0.12)'}` }}>
                      📅 Planen
                    </button>
                    <button onClick={() => setPostConfirm({ onConfirm: () => speichern('service', aktiveVorlage !== null ? vorlagen[aktiveVorlage].titel : 'Eigener Post', caption, hashtags, format) })}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                      style={{ background: TEAL, color: '#fff', border: `1px solid ${TEAL}` }}>
                      {gespeichert ? '✅ Gepostet' : 'Jetzt posten'}
                    </button>
                  </div>
                </div>
                {showPlanenPanel && (
                  <div className="flex flex-col gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex flex-wrap gap-2">
                      {schlageDatenVor(geplantePosts, verlauf).map((v, i) => (
                        <button key={i}
                          onClick={() => { setPlanenDatum(v.datum); setGeplantUhrzeit(v.uhrzeit) }}
                          className="px-3 py-1.5 rounded-xl text-xs transition-all"
                          style={{
                            background: planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b30' : 'rgba(255,255,255,0.05)',
                            color: planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b' : '#666',
                            border: `1px solid ${planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b50' : 'rgba(255,255,255,0.08)'}`,
                          }}>
                          {v.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="date" value={planenDatum} min={heuteISO()}
                        onChange={e => setPlanenDatum(e.target.value)}
                        className="rounded-xl px-4 py-2.5 text-sm outline-none flex-1"
                        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8' }} />
                      <input type="time" value={geplantUhrzeit}
                        onChange={e => setGeplantUhrzeit(e.target.value)}
                        className="rounded-xl px-3 py-2.5 text-sm outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8', width: '110px' }} />
                      <button onClick={() => planen('service', aktiveVorlage !== null ? vorlagen[aktiveVorlage].titel : 'Eigener Post', caption, hashtags, format)}
                        disabled={!planenDatum}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                        style={{ background: planenDatum ? '#f59e0b' : 'rgba(255,255,255,0.05)', color: planenDatum ? '#000' : '#555', border: 'none' }}>
                        {geplantGespeichert ? '✅ Gespeichert' : '✓ Termin speichern'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ FEIERTAGE ════════════════════════════════════════════════════ */}
          {aktiveTab === 'feiertage' && (
            <div className="flex flex-col gap-7">

              {/* Aktive Warnung als Banner */}
              {empfehlung && ['dringend','holiday','fahrzeug'].includes(empfehlung.typ) && (() => {
                const bannerStyles = {
                  dringend: { bg: '#ef444412', border: '#ef444430', color: '#ef4444', icon: '⚠️' },
                  holiday:  { bg: '#f59e0b12', border: '#f59e0b30', color: '#f59e0b', icon: '📅' },
                  fahrzeug: { bg: `${TEAL}12`,  border: `${TEAL}30`,  color: TEAL,      icon: '🚗' },
                }
                const bs = bannerStyles[empfehlung.typ]
                return (
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: bs.bg, border: `1px solid ${bs.border}`, color: bs.color }}>
                    <span>{bs.icon}</span>
                    <span className="flex-1">{empfehlung.text}</span>
                    {empfehlung.typ === 'fahrzeug' && (
                      <button onClick={() => setAktiveTab('fahrzeug')}
                        className="text-xs px-3 py-1 rounded-lg flex-shrink-0 hover:opacity-80"
                        style={{ background: `${TEAL}25`, color: TEAL }}>
                        Jetzt erstellen →
                      </button>
                    )}
                  </div>
                )
              })()}

              {/* ① Feiertag auswählen */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>1</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Feiertag auswählen</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feiertage.map((f, i) => (
                    <PillBtn key={i} active={aktiverFeiertag === i} onClick={() => feiertageWaehlen(f, i)}>
                      {f.emoji} {f.name}
                    </PillBtn>
                  ))}
                </div>
              </Card>

              {aktiverFeiertag !== null && (
                <>
                  {/* ② Text anpassen */}
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>2</span>
                      <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Text-Variante</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {feiertage[aktiverFeiertag].varianten.map((text, i) => (
                        <button key={i}
                          onClick={async () => {
                            setAktiveFeiertagVariante(i)
                            setFeiertagCaption(text)
                            if (canvasRef.current && aktiverFeiertag !== null) {
                              const f = { ...feiertage[aktiverFeiertag], caption: text }
                              await zeichneCanvas(canvasRef.current, f, feiertagFormat)
                            }
                          }}
                          className="text-left text-sm px-4 py-3 rounded-xl transition-all duration-200"
                          style={{
                            background: aktiveFeiertagVariante === i ? `${TEAL}15` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${aktiveFeiertagVariante === i ? TEAL + '50' : 'rgba(255,255,255,0.06)'}`,
                            color: aktiveFeiertagVariante === i ? '#e8e8e8' : '#777',
                          }}>
                          <span className="mr-2" style={{ color: '#444' }}>#{i + 1}</span>{text}
                        </button>
                      ))}
                      <button
                        onClick={() => { setAktiveFeiertagVariante(99); setFeiertagCaption('') }}
                        className="text-left text-sm px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          background: aktiveFeiertagVariante === 99 ? `${TEAL}15` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${aktiveFeiertagVariante === 99 ? TEAL + '50' : 'rgba(255,255,255,0.06)'}`,
                          color: aktiveFeiertagVariante === 99 ? '#e8e8e8' : '#777',
                        }}>
                        <span className="mr-2" style={{ color: '#444' }}>#4</span>✏️ Eigenen Text schreiben
                      </button>
                    </div>
                    {aktiveFeiertagVariante === 99 && (
                      <textarea
                        autoFocus
                        placeholder="Schreib deinen eigenen Text…"
                        value={feiertagCaption}
                        onChange={e => setFeiertagCaption(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none mb-4"
                        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8', height: '110px' }}
                      />
                    )}
                    <div className="flex items-center gap-3 rounded-xl px-5 py-3"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="text-sm whitespace-nowrap flex-shrink-0" style={{ color: '#444' }}>#</span>
                      <input
                        type="text"
                        value={feiertagHashtags}
                        onChange={e => setFeiertagHashtags(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: TEAL }}
                      />
                    </div>
                  </Card>

                  {/* ③ Vorschau mit Format-Auswahl */}
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>3</span>
                        <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Vorschau</span>
                      </div>
                      <div className="flex gap-2">
                        {['Beitrag', 'Story'].map(fmt => (
                          <button key={fmt}
                            onClick={async () => {
                              setFeiertagFormat(fmt)
                              if (canvasRef.current && aktiverFeiertag !== null) {
                                const f = { ...feiertage[aktiverFeiertag], caption: feiertagCaption }
                                await zeichneCanvas(canvasRef.current, f, fmt)
                              }
                            }}
                            className="px-4 py-1.5 rounded-lg text-xs transition-all"
                            style={{
                              background: feiertagFormat === fmt ? TEAL : 'rgba(255,255,255,0.05)',
                              color: feiertagFormat === fmt ? '#fff' : '#666',
                              border: `1px solid ${feiertagFormat === fmt ? TEAL : 'rgba(255,255,255,0.08)'}`,
                            }}>
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <canvas ref={canvasRef}
                        style={{
                          width: '100%',
                          maxWidth: feiertagFormat === 'Story' ? '191px' : '340px',
                          borderRadius: '12px',
                          display: 'block'
                        }} />
                    </div>
                    <div className="mt-4">
                      <ActionBtn variant="white" onClick={herunterladen}>⬇️ Herunterladen</ActionBtn>
                    </div>
                  </Card>

                  {/* Jetzt posten */}
                  <div className="rounded-2xl p-5 flex flex-col gap-4"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p className="text-sm font-medium mb-1">Beitrag posten</p>
                        <p className="text-xs" style={{ color: '#444' }}>Instagram Graph API wird später eingebunden. Gespeicherte Posts erscheinen im Verlauf.</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setShowPlanenPanel(s => !s); setPlanenDatum('') }}
                          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                          style={{ background: showPlanenPanel ? '#f59e0b20' : 'rgba(255,255,255,0.05)', color: showPlanenPanel ? '#f59e0b' : '#aaa', border: `1px solid ${showPlanenPanel ? '#f59e0b50' : 'rgba(255,255,255,0.12)'}` }}>
                          📅 Planen
                        </button>
                        <button onClick={() => setPostConfirm({ onConfirm: () => speichern('feiertag', feiertage[aktiverFeiertag].name, feiertagCaption, feiertagHashtags, feiertagFormat) })}
                          className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                          style={{ background: TEAL, color: '#fff', border: `1px solid ${TEAL}` }}>
                          {gespeichert ? '✅ Gepostet' : 'Jetzt posten'}
                        </button>
                      </div>
                    </div>
                    {showPlanenPanel && (
                      <div className="flex flex-col gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex flex-wrap gap-2">
                          {schlageDatenVor(geplantePosts, verlauf).map((v, i) => (
                            <button key={i}
                              onClick={() => { setPlanenDatum(v.datum); setGeplantUhrzeit(v.uhrzeit) }}
                              className="px-3 py-1.5 rounded-xl text-xs transition-all"
                              style={{
                                background: planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b30' : 'rgba(255,255,255,0.05)',
                                color: planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b' : '#666',
                                border: `1px solid ${planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b50' : 'rgba(255,255,255,0.08)'}`,
                              }}>
                              {v.label}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="date" value={planenDatum} min={heuteISO()}
                            onChange={e => setPlanenDatum(e.target.value)}
                            className="rounded-xl px-4 py-2.5 text-sm outline-none flex-1"
                            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8' }} />
                          <input type="time" value={geplantUhrzeit}
                            onChange={e => setGeplantUhrzeit(e.target.value)}
                            className="rounded-xl px-3 py-2.5 text-sm outline-none"
                            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8', width: '110px' }} />
                          <button onClick={() => planen('feiertag', feiertage[aktiverFeiertag].name, feiertagCaption, feiertagHashtags, feiertagFormat)}
                            disabled={!planenDatum}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                            style={{ background: planenDatum ? '#f59e0b' : 'rgba(255,255,255,0.05)', color: planenDatum ? '#000' : '#555', border: 'none' }}>
                            {geplantGespeichert ? '✅ Gespeichert' : '✓ Termin speichern'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ FAHRZEUG ═════════════════════════════════════════════════════ */}
          {aktiveTab === 'fahrzeug' && (
            <div className="flex flex-col gap-7">

              {/* Aktive Warnung als Banner */}
              {empfehlung && ['dringend','holiday','fahrzeug'].includes(empfehlung.typ) && (() => {
                const bannerStyles = {
                  dringend: { bg: '#ef444412', border: '#ef444430', color: '#ef4444', icon: '⚠️' },
                  holiday:  { bg: '#f59e0b12', border: '#f59e0b30', color: '#f59e0b', icon: '📅' },
                  fahrzeug: { bg: `${TEAL}12`,  border: `${TEAL}30`,  color: TEAL,      icon: '🚗' },
                }
                const bs = bannerStyles[empfehlung.typ]
                return (
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: bs.bg, border: `1px solid ${bs.border}`, color: bs.color }}>
                    <span>{bs.icon}</span>
                    <span className="flex-1">{empfehlung.text}</span>
                  </div>
                )
              })()}

              {/* ① Fahrzeugdaten */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>1</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Fahrzeugdaten</span>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs mb-1.5" style={{ color: '#555' }}>Marke</p>
                    <input type="text" placeholder='z.B. Mercedes-Benz' value={kfz.marke}
                      onChange={e => setKfz({ ...kfz, marke: e.target.value })}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#e8e8e8' }} />
                  </div>
                  <div>
                    <p className="text-xs mb-1.5" style={{ color: kfzFehler.includes('modell') ? '#ef4444' : '#555' }}>Modell{kfzFehler.includes('modell') && <span className="ml-2">— Pflichtfeld</span>}</p>
                    <input type="text" placeholder='z.B. "C 220 d"' value={kfz.modell}
                      onChange={e => { setKfz({ ...kfz, modell: e.target.value }); setKfzFehler(f => f.filter(x => x !== 'modell')) }}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${kfzFehler.includes('modell') ? '#ef444460' : 'rgba(255,255,255,0.08)'}`, color: '#e8e8e8' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[['baujahr','Baujahr','z.B. 2020'],['km','km-Stand','z.B. 45000'],['preis','Preis (€)','z.B. 18900']].map(([key,label,ph]) => (
                      <div key={key}>
                        <p className="text-xs mb-1.5" style={{ color: kfzFehler.includes(key) ? '#ef4444' : '#555' }}>{label}{kfzFehler.includes(key) && <span className="ml-2">— Pflichtfeld</span>}</p>
                        <input type="number" placeholder={ph} value={kfz[key]}
                          onChange={e => { setKfz({ ...kfz, [key]: e.target.value }); setKfzFehler(f => f.filter(x => x !== key)) }}
                          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                          style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${kfzFehler.includes(key) ? '#ef444460' : 'rgba(255,255,255,0.08)'}`, color: '#e8e8e8' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs mb-1.5" style={{ color: '#555' }}>Besonderheiten (optional)</p>
                    <input type="text" placeholder='z.B. "Panoramadach, Sitzheizung"' value={kfz.extras}
                      onChange={e => setKfz({ ...kfz, extras: e.target.value })}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#e8e8e8' }} />
                  </div>
                  <ActionBtn variant="primary" onClick={kfzGenerieren}>✨ Caption generieren</ActionBtn>
                </div>
              </Card>

              {kfzGeneriert && (
                <>
                  {/* ② Text anpassen */}
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>2</span>
                      <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Text anpassen</span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-xs mb-2" style={{ color: '#555' }}>Caption</p>
                        <textarea
                          value={kfzCaption}
                          onChange={e => setKfzCaption(e.target.value)}
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                          style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8', height: '140px' }}
                        />
                      </div>
                      <div className="flex items-center gap-3 rounded-xl px-5 py-3"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <span className="text-sm whitespace-nowrap flex-shrink-0" style={{ color: '#444' }}>#</span>
                        <input
                          type="text"
                          value={kfzHashtags}
                          onChange={e => setKfzHashtags(e.target.value)}
                          className="flex-1 bg-transparent outline-none text-sm"
                          style={{ color: TEAL }}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* ③ Bilder hochladen */}
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>3</span>
                        <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Fahrzeugbilder hochladen</span>
                      </div>
                      {kfzImages.length > 0 && (
                        <span className="text-xs" style={{ color: '#555' }}>{kfzImages.length} Bild{kfzImages.length !== 1 ? 'er' : ''}</span>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {kfzImages.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-3">
                        {kfzImages.map((url, i) => (
                          <div key={i} className="relative group">
                            <img src={url} className="w-20 h-20 object-cover rounded-xl" alt={`Bild ${i+1}`}
                              onClick={() => setKfzImgIndex(i)}
                              style={{ outline: kfzImgIndex === i ? `2px solid ${TEAL}` : 'none', cursor: 'pointer' }} />
                            <button
                              onClick={() => {
                                const next = kfzImages.filter((_, idx) => idx !== i)
                                setKfzImages(next)
                                setKfzImgIndex(Math.min(kfzImgIndex, Math.max(0, next.length - 1)))
                              }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ background: '#333', color: '#fff', border: '1px solid #555' }}>
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload-Bereich */}
                    <div
                      className="rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200"
                      style={{ minHeight: '80px', border: '1.5px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                      onClick={() => document.getElementById('kfzFileInput').click()}>
                      <input id="kfzFileInput" type="file" accept="image/*" multiple className="hidden"
                        onChange={e => {
                          const files = Array.from(e.target.files)
                          const urls = files.map(f => URL.createObjectURL(f))
                          setKfzImages(prev => [...prev, ...urls])
                          setKfzImgIndex(0)
                          e.target.value = ''
                        }} />
                      <p className="text-sm" style={{ color: '#444' }}>
                        {kfzImages.length > 0 ? '+ Weitere Bilder hinzufügen' : 'Bilder auswählen (mehrere möglich)'}
                      </p>
                    </div>
                  </Card>

                  {/* ④ Vorschau */}
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: TEAL, color: '#fff' }}>4</span>
                      <span className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>Vorschau · Beitrag</span>
                    </div>
                    <div className="flex items-center justify-center" style={{ height: '462px' }}>
                      <div className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                        style={{ width: '260px', height: '462px' }}>
                        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 flex-shrink-0" />
                          <span className="font-semibold text-sm">sinsig_lang</span>
                          {kfzImages.length > 1 && (
                            <span className="ml-auto text-xs" style={{ color: '#999' }}>{kfzImgIndex + 1}/{kfzImages.length}</span>
                          )}
                        </div>
                        <div className="relative overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-100"
                          style={{ height: '260px' }}>
                          {kfzImages.length > 0 ? (
                            <>
                              <img src={kfzImages[kfzImgIndex]} className="w-full h-full object-cover" alt="Post" />
                              {/* Pfeile */}
                              {kfzImgIndex > 0 && (
                                <button onClick={() => setKfzImgIndex(i => i - 1)}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold"
                                  style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}>‹</button>
                              )}
                              {kfzImgIndex < kfzImages.length - 1 && (
                                <button onClick={() => setKfzImgIndex(i => i + 1)}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-base font-bold"
                                  style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}>›</button>
                              )}
                              {/* Punkte */}
                              {kfzImages.length > 1 && (
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                  {kfzImages.map((_, i) => (
                                    <button key={i} onClick={() => setKfzImgIndex(i)}
                                      className="w-1.5 h-1.5 rounded-full transition-all"
                                      style={{ background: i === kfzImgIndex ? '#3b82f6' : 'rgba(255,255,255,0.6)' }} />
                                  ))}
                                </div>
                              )}
                            </>
                          ) : <p className="text-gray-300 text-sm">Kein Bild</p>}
                        </div>
                        <div className="px-4 py-3 overflow-hidden flex-1">
                          <p className="text-sm leading-relaxed line-clamp-3">
                            <span className="font-semibold">sinsig_lang </span>
                            <span className="text-gray-700">{kfzCaption}</span>
                          </p>
                          <p className="text-sm mt-1 line-clamp-2" style={{ color: '#3b82f6' }}>{kfzHashtags}</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Jetzt posten */}
                  <div className="rounded-2xl p-5 flex flex-col gap-4"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p className="text-sm font-medium mb-1">Beitrag posten</p>
                        <p className="text-xs" style={{ color: '#444' }}>Fahrzeugposts werden immer als Beitrag veröffentlicht. Instagram Graph API wird später eingebunden.</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setShowPlanenPanel(s => !s); setPlanenDatum('') }}
                          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                          style={{ background: showPlanenPanel ? '#f59e0b20' : 'rgba(255,255,255,0.05)', color: showPlanenPanel ? '#f59e0b' : '#aaa', border: `1px solid ${showPlanenPanel ? '#f59e0b50' : 'rgba(255,255,255,0.12)'}` }}>
                          📅 Planen
                        </button>
                        <button onClick={() => {
                          const fehler = ['modell','baujahr','km','preis'].filter(k => !kfz[k])
                          if (fehler.length > 0) { setKfzFehler(fehler); return }
                          setPostConfirm({ onConfirm: () => speichern('fahrzeug', [kfz.marke, kfz.modell].filter(Boolean).join(' '), kfzCaption, kfzHashtags, 'Beitrag') })
                        }}
                          className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                          style={{ background: TEAL, color: '#fff', border: `1px solid ${TEAL}` }}>
                          {gespeichert ? '✅ Gepostet' : 'Jetzt posten'}
                        </button>
                      </div>
                    </div>
                    {showPlanenPanel && (
                      <div className="flex flex-col gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex flex-wrap gap-2">
                          {schlageDatenVor(geplantePosts, verlauf).map((v, i) => (
                            <button key={i}
                              onClick={() => { setPlanenDatum(v.datum); setGeplantUhrzeit(v.uhrzeit) }}
                              className="px-3 py-1.5 rounded-xl text-xs transition-all"
                              style={{
                                background: planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b30' : 'rgba(255,255,255,0.05)',
                                color: planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b' : '#666',
                                border: `1px solid ${planenDatum === v.datum && geplantUhrzeit === v.uhrzeit ? '#f59e0b50' : 'rgba(255,255,255,0.08)'}`,
                              }}>
                              {v.label}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <input type="date" value={planenDatum} min={heuteISO()}
                            onChange={e => setPlanenDatum(e.target.value)}
                            className="rounded-xl px-4 py-2.5 text-sm outline-none flex-1"
                            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8' }} />
                          <input type="time" value={geplantUhrzeit}
                            onChange={e => setGeplantUhrzeit(e.target.value)}
                            className="rounded-xl px-3 py-2.5 text-sm outline-none"
                            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL}40`, color: '#e8e8e8', width: '110px' }} />
                          <button onClick={() => {
                            const fehler = ['modell','baujahr','km','preis'].filter(k => !kfz[k])
                            if (fehler.length > 0) { setKfzFehler(fehler); return }
                            planen('fahrzeug', [kfz.marke, kfz.modell].filter(Boolean).join(' '), kfzCaption, kfzHashtags, 'Beitrag')
                          }}
                            disabled={!planenDatum}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                            style={{ background: planenDatum ? '#f59e0b' : 'rgba(255,255,255,0.05)', color: planenDatum ? '#000' : '#555', border: 'none' }}>
                            {geplantGespeichert ? '✅ Gespeichert' : '✓ Termin speichern'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ KALENDER ═════════════════════════════════════════════════════ */}
          {aktiveTab === 'kalender' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <button onClick={() => { const d = new Date(kalJahr, kalMonat-1); setKalMonat(d.getMonth()); setKalJahr(d.getFullYear()) }}
                  className="text-sm transition-colors hover:opacity-80 px-4 py-2 rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#666' }}>← Zurück</button>
                <h2 className="text-xl font-light flex-1 text-center">{MONATE[kalMonat]} {kalJahr}</h2>
                <button onClick={() => { const d = new Date(kalJahr, kalMonat+1); setKalMonat(d.getMonth()); setKalJahr(d.getFullYear()) }}
                  className="text-sm transition-colors hover:opacity-80 px-4 py-2 rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#666' }}>Weiter →</button>
              </div>

              {/* Aktive Warnung als Banner */}
              {empfehlung && ['dringend','holiday','fahrzeug'].includes(empfehlung.typ) && (() => {
                const bannerStyles = {
                  dringend: { bg: '#ef444412', border: '#ef444430', color: '#ef4444', icon: '⚠️' },
                  holiday:  { bg: '#f59e0b12', border: '#f59e0b30', color: '#f59e0b', icon: '📅' },
                  fahrzeug: { bg: `${TEAL}12`,  border: `${TEAL}30`,  color: TEAL,      icon: '🚗' },
                }
                const bs = bannerStyles[empfehlung.typ]
                return (
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: bs.bg, border: `1px solid ${bs.border}`, color: bs.color }}>
                    <span>{bs.icon}</span>
                    <span className="flex-1">{empfehlung.text}</span>
                    {empfehlung.typ === 'fahrzeug' && (
                      <button onClick={() => setAktiveTab('fahrzeug')}
                        className="text-xs px-3 py-1 rounded-lg flex-shrink-0 hover:opacity-80"
                        style={{ background: `${TEAL}25`, color: TEAL }}>
                        Jetzt erstellen →
                      </button>
                    )}
                  </div>
                )
              })()}

              {monatsTipp && (
                <p className="text-sm" style={{ color: TEAL }}>💡 {monatsTipp}</p>
              )}

              {/* ── Monatsplan TO-DO ───────────────────────────────────────── */}
              {(() => {
                const todayMidnight = new Date(); todayMidnight.setHours(0,0,0,0)
                const daysInMonth = new Date(kalJahr, kalMonat + 1, 0).getDate()
                const diDo = []
                for (let t = 1; t <= daysInMonth; t++) {
                  const wt = new Date(kalJahr, kalMonat, t).getDay()
                  if (wt === 2 || wt === 4) {
                    const iso = `${kalJahr}-${String(kalMonat+1).padStart(2,'0')}-${String(t).padStart(2,'0')}`
                    const datStr = new Date(kalJahr, kalMonat, t).toLocaleDateString('de-DE')
                    const uhrzeit = wt === 2 ? '12:00' : '18:00'
                    const tagLabel = new Date(kalJahr, kalMonat, t).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
                    const gepostetEntry = verlauf.find(e => e.datum === datStr)
                    const geplantEntry = geplantePosts.find(e => e.geplantesDatum === iso)
                    const gepostet = !!gepostetEntry
                    const geplant = !!geplantEntry
                    const verpasst = !gepostet && !geplant && new Date(kalJahr, kalMonat, t) < todayMidnight
                    const istFeiertag = alleKalFeiertage.some(f => f.m === kalMonat + 1 && f.t === t)
                    diDo.push({ t, iso, tagLabel, uhrzeit, gepostet, geplant, verpasst, titel: geplantEntry?.titel || gepostetEntry?.titel || null, ersteller: geplantEntry?.ersteller || gepostetEntry?.ersteller || null, istFeiertag })
                  }
                }
                const feiertageImMonat = alleKalFeiertage.filter(f => f.m === kalMonat + 1)
                const feiertagStatus = feiertageImMonat.map(f => {
                  const iso = `${kalJahr}-${String(f.m).padStart(2,'0')}-${String(f.t).padStart(2,'0')}`
                  const datStr = new Date(kalJahr, f.m - 1, f.t).toLocaleDateString('de-DE')
                  const gepostet = verlauf.some(e => e.datum === datStr)
                  const geplant = geplantePosts.some(e => e.geplantesDatum === iso)
                  const verpasst = !gepostet && !geplant && new Date(kalJahr, f.m - 1, f.t) < todayMidnight
                  return { ...f, iso, gepostet, geplant, verpasst }
                })
                const erledigt = diDo.filter(s => s.gepostet || s.geplant).length + feiertagStatus.filter(f => f.gepostet || f.geplant).length
                const verpasstCount = diDo.filter(s => s.verpasst).length + feiertagStatus.filter(f => f.verpasst).length
                const gesamt = diDo.length + feiertagStatus.length
                const offen = gesamt - erledigt - verpasstCount
                const pct = gesamt > 0 ? Math.round((erledigt / gesamt) * 100) : 100
                return (
                  <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <p className="text-xs uppercase tracking-widest" style={{ color: '#666' }}>📋 Monatsplan · {MONATE[kalMonat]} {kalJahr}</p>
                        {verpasstCount > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#ef444420', color: '#ef4444' }}>
                            {verpasstCount} verpasst
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ width: '80px', background: 'rgba(255,255,255,0.08)' }}>
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, background: pct === 100 ? '#22c55e' : verpasstCount > 0 ? '#ef4444' : TEAL }} />
                        </div>
                        <span className="text-xs" style={{ color: pct === 100 ? '#22c55e' : verpasstCount > 0 ? '#ef4444' : '#666' }}>{erledigt}/{gesamt}</span>
                      </div>
                    </div>

                    {/* Reguläre Di/Do-Slots */}
                    <div className="flex flex-col gap-1">
                      {diDo.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 py-1.5 px-1 rounded-lg">
                          <span className="flex-shrink-0 text-sm" style={{ width: '20px' }}>
                            {s.gepostet ? '✅' : s.geplant ? '📅' : s.verpasst ? '❌' : '⬜'}
                          </span>
                          <span className="text-sm" style={{
                            color: s.gepostet ? '#444' : s.geplant ? '#888' : s.verpasst ? '#ef4444' : '#e8e8e8',
                            textDecoration: s.gepostet || s.verpasst ? 'line-through' : 'none',
                            minWidth: '160px',
                          }}>
                            {s.tagLabel} · {s.uhrzeit}
                          </span>
                          {s.titel && (
                            <span className="text-xs flex-1 truncate" style={{ color: s.gepostet ? '#333' : '#555' }}>
                              {s.titel}
                            </span>
                          )}
                          {!s.titel && <span className="flex-1" />}
                          {s.istFeiertag && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#ef444418', color: '#ef4444' }} title="Dieser Tag ist ein Feiertag">⚠️ Feiertag</span>}
                          {s.ersteller && <span className="text-xs flex-shrink-0" style={{ color: '#3a3a3a' }}>👤 {s.ersteller}</span>}
                          {s.gepostet  && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${TEAL}20`, color: TEAL }}>gepostet</span>}
                          {s.geplant   && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#f59e0b20', color: '#f59e0b' }}>geplant</span>}
                          {s.verpasst  && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#ef444420', color: '#ef4444' }}>verpasst</span>}
                          {!s.gepostet && !s.geplant && !s.verpasst && <span className="text-xs flex-shrink-0" style={{ color: '#3a3a3a' }}>offen</span>}
                        </div>
                      ))}

                      {/* Feiertage im Monat */}
                      {feiertagStatus.length > 0 && (
                        <>
                          <div className="my-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
                          {feiertagStatus.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 py-1.5 px-1 rounded-lg">
                              <span className="flex-shrink-0 text-sm" style={{ width: '20px' }}>
                                {f.gepostet ? '✅' : f.geplant ? '📅' : f.verpasst ? '❌' : '⚠️'}
                              </span>
                              <span className="text-sm flex-1" style={{
                                color: f.gepostet ? '#444' : f.geplant ? '#888' : f.verpasst ? '#ef4444' : '#f59e0b',
                                textDecoration: f.gepostet || f.verpasst ? 'line-through' : 'none',
                              }}>
                                {f.label}
                              </span>
                              {f.gepostet  && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${TEAL}20`, color: TEAL }}>gepostet</span>}
                              {f.geplant   && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#f59e0b20', color: '#f59e0b' }}>geplant</span>}
                              {f.verpasst  && <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#ef444420', color: '#ef4444' }}>verpasst</span>}
                              {!f.gepostet && !f.geplant && !f.verpasst && <span className="text-xs flex-shrink-0" style={{ color: '#f59e0b' }}>Post fehlt noch</span>}
                            </div>
                          ))}
                        </>
                      )}

                      {offen === 0 && verpasstCount === 0 && (
                        <p className="text-sm text-center pt-2" style={{ color: '#22c55e' }}>✓ Alle Posts für {MONATE[kalMonat]} geplant!</p>
                      )}
                    </div>
                  </div>
                )
              })()}

              <div className="grid grid-cols-7 gap-1 mb-1">
                {WOCHENTAGE.map(w => <p key={w} className="text-center text-xs py-2" style={{ color: '#333' }}>{w}</p>)}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {kalenderTage().map((tag, i) => {
                  if (!tag) return <div key={i} />
                  const istHeute = tag === heute.getDate() && kalMonat === heute.getMonth() && kalJahr === heute.getFullYear()
                  const feierts = alleKalFeiertage.filter(f => f.m === kalMonat+1 && f.t === tag)
                  const datumStr = new Date(kalJahr, kalMonat, tag).toLocaleDateString('de-DE')
                  const isoStr = `${kalJahr}-${String(kalMonat+1).padStart(2,'0')}-${String(tag).padStart(2,'0')}`
                  const eintraege = verlauf.filter(e => e.datum === datumStr)
                  const geplant = geplantePosts.filter(e => e.geplantesDatum === isoStr)
                  return (
                    <div key={i} className="min-h-16 p-2 rounded-xl transition-all"
                      style={{
                        background: istHeute ? `${TEAL}15` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${istHeute ? TEAL + '40' : 'rgba(255,255,255,0.05)'}`,
                      }}>
                      <span className="text-xs font-medium" style={{ color: istHeute ? TEAL : '#444' }}>{tag}</span>
                      {feierts.map((f, fi) => <p key={fi} className="text-xs mt-1 leading-tight" style={{ color: '#f59e0b' }}>{f.label}</p>)}
                      {eintraege.map((e, ei) => <p key={ei} className="text-xs mt-1 leading-tight truncate" style={{ color: TEAL }}>· {e.titel}</p>)}
                      {geplant.map((e, ei) => <p key={ei} className="text-xs mt-1 leading-tight truncate" style={{ color: '#fb923c' }}>📅 {e.titel}{e.geplantUhrzeit ? ` · ${e.geplantUhrzeit}` : ''}</p>)}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ══ VERLAUF ══════════════════════════════════════════════════════ */}
          {aktiveTab === 'verlauf' && (
            <div className="flex flex-col gap-6">
              {/* Filter */}
              <div className="flex gap-2">
                {[['alle','Alle'], ['gepostet','Gepostet'], ['geplant','📅 Geplant']].map(([val, label]) => (
                  <button key={val} onClick={() => setVerlaufFilter(val)}
                    className="px-4 py-2 rounded-xl text-sm transition-all"
                    style={{
                      background: verlaufFilter === val ? TEAL : 'rgba(255,255,255,0.04)',
                      color: verlaufFilter === val ? '#fff' : '#666',
                      border: `1px solid ${verlaufFilter === val ? TEAL : 'rgba(255,255,255,0.08)'}`,
                    }}>{label}</button>
                ))}
                <span className="ml-auto text-xs self-center" style={{ color: '#444' }}>
                  {verlauf.length} gepostet · {geplantePosts.length} geplant
                </span>
              </div>

              {/* Geplante Posts */}
              {(verlaufFilter === 'alle' || verlaufFilter === 'geplant') && geplantePosts.length > 0 && (
                <div className="flex flex-col gap-3">
                  {verlaufFilter === 'alle' && <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>Geplant</p>}
                  {geplantePosts.map(e => (
                    <Card key={e.id}>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                            📅 {new Date(e.geplantesDatum + 'T12:00').toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}{e.geplantUhrzeit ? ` · ${e.geplantUhrzeit} Uhr` : ''}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#666' }}>{e.typ}</span>
                          <span className="text-sm font-medium">{e.titel}</span>
                          <span className="text-xs" style={{ color: '#333' }}>{e.format}</span>
                          {e.ersteller && <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: '#555' }}>👤 {e.ersteller}</span>}
                        </div>
                        <button onClick={() => geplantLoeschen(e.id)} className="text-xs hover:opacity-80 flex-shrink-0" style={{ color: '#444' }}>Löschen</button>
                      </div>
                      <p className="text-sm line-clamp-2" style={{ color: '#666' }}>{e.caption}</p>
                    </Card>
                  ))}
                </div>
              )}

              {/* Gepostete Posts */}
              {(verlaufFilter === 'alle' || verlaufFilter === 'gepostet') && verlauf.length > 0 && (
                <div className="flex flex-col gap-3">
                  {verlaufFilter === 'alle' && geplantePosts.length > 0 && <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>Gepostet</p>}
                  {verlauf.map(e => (
                    <Card key={e.id}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs" style={{ color: '#444' }}>{e.datum}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              background: e.typ === 'feiertag' ? '#f59e0b20' : e.typ === 'fahrzeug' ? `${TEAL}20` : 'rgba(255,255,255,0.05)',
                              color: e.typ === 'feiertag' ? '#f59e0b' : e.typ === 'fahrzeug' ? TEAL : '#666',
                            }}>
                            {e.typ}
                          </span>
                          <span className="text-sm font-medium">{e.titel}</span>
                          <span className="text-xs" style={{ color: '#333' }}>{e.format}</span>
                          {e.ersteller && <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: '#555' }}>👤 {e.ersteller}</span>}
                        </div>
                        <button onClick={() => loeschen(e.id)} className="text-xs hover:opacity-80 flex-shrink-0" style={{ color: '#444' }}>Löschen</button>
                      </div>
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: '#666' }}>{e.caption}</p>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: '#2a2a2a', fontSize: '11px' }}>⏳</span>
                        <p className="text-xs" style={{ color: '#2a2a2a' }}>Performance-Daten werden später automatisch über die Instagram Graph API gezogen</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Leer-State */}
              {verlauf.length === 0 && geplantePosts.length === 0 && (
                <div className="flex items-center justify-center h-48" style={{ color: '#333' }}>Noch keine Posts vorhanden.</div>
              )}
              {verlaufFilter === 'geplant' && geplantePosts.length === 0 && (
                <div className="flex items-center justify-center h-48" style={{ color: '#333' }}>Keine geplanten Posts.</div>
              )}
              {verlaufFilter === 'gepostet' && verlauf.length === 0 && (
                <div className="flex items-center justify-center h-48" style={{ color: '#333' }}>Noch keine Posts gepostet.</div>
              )}

            </div>
          )}

          {/* ══ INSIGHTS ═════════════════════════════════════════════════════ */}
          {aktiveTab === 'insights' && (
            <div className="flex flex-col gap-3">

              {/* Über dieses Tool */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('was')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>📖 Was ist dieses Tool?</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('was') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('was') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-3 text-sm" style={{ color: '#555' }}>
                  <p>Dieses Tool haben wir intern mit Hilfe von KI entwickelt, damit der Alltag rund um Social Media ein bisschen einfacher wird. Was vorher viel Kopfarbeit gekostet hat — was posten wir diese Woche, welcher Feiertag kommt, wann war zuletzt ein Fahrzeug dran — übernimmt das Tool jetzt für euch.</p>
                  <p>Kein Agentur-Produkt, kein fertiges SaaS — sondern etwas, das <span style={{ color: '#e8e8e8' }}>genau für uns gebaut wurde</span>. Für Sinsig & Lang, unsere Abläufe und unsere Art zu arbeiten. Und es wächst mit: Was heute noch fehlt, kommt im nächsten Update.</p>
                  <p style={{ color: '#444' }}>Bei Fragen oder Anregungen einfach bei <span style={{ color: '#888' }}>Till Schellenberger</span> melden — viel Spaß und frohes Schaffen! 🙌</p>
                  <div className="grid grid-cols-3 gap-4 mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {[
                      { zahl: '9', label: 'Service-Vorlagen', sub: 'mit je 3 Text-Varianten' },
                      { zahl: '12', label: 'Feiertage', sub: 'mit automatischem Canvas' },
                      { zahl: '2×', label: 'Posts / Woche', sub: 'Di. + Do. als Richtwert' },
                    ].map((s, i) => (
                      <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p className="text-2xl font-light mb-1" style={{ color: TEAL }}>{s.zahl}</p>
                        <p className="text-xs font-medium" style={{ color: '#888' }}>{s.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#333' }}>{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div></div></div>)}
              </div>

              {/* Workflow */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('workflow')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>🔄 Workflow — wie benutze ich das Tool?</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('workflow') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('workflow') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-3">
                  {[
                    { n:'1', titel:'Sidebar prüfen', desc:'Die linke Sidebar zeigt immer den dringendsten offenen Punkt — Feiertag, Fahrzeug-Erinnerung oder nächster Service-Post. Das ist der tägliche Einstieg.' },
                    { n:'2', titel:'Post-Typ wählen', desc:'Je nach Empfehlung: Service Posts für Werkstattthemen, Feiertage für Canvas-Grafiken, Fahrzeug für Gebrauchtwagen-Angebote.' },
                    { n:'3', titel:'Vorlage & Text auswählen', desc:'Vorlage anklicken, eine der 3 Textvarianten wählen oder eigenen Text schreiben. Hashtags sind vorausgefüllt und können angepasst werden.' },
                    { n:'4', titel:'Planen oder direkt posten', desc:'„Jetzt posten" speichert den Beitrag im Verlauf. „📅 Planen" setzt einen Termin — das Tool schlägt optimale Di./Do.-Zeiten vor. Geplante Posts erscheinen im Redaktionsplan.' },
                    { n:'5', titel:'Verlauf & Redaktionsplan',  desc:'Im Verlauf sind alle geposteten und geplanten Beiträge einsehbar. Der Redaktionsplan zeigt den Monatskalender mit Status pro Slot (gepostet / geplant / offen / verpasst).' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: `${TEAL}20`, color: TEAL }}>{s.n}</span>
                      <div>
                        <p className="text-sm font-medium mb-0.5" style={{ color: '#ccc' }}>{s.titel}</p>
                        <p className="text-sm" style={{ color: '#444' }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div></div></div>)}
              </div>

              {/* Post-Typen */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('posttypen')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>📝 Die 3 Post-Typen</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('posttypen') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('posttypen') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-4">
                  {[
                    {
                      titel: '✦ Service Posts',
                      farbe: TEAL,
                      desc: 'Werkstattthemen wie Räderwechsel, Ölwechsel, Bremsencheck etc. 9 Vorlagen mit je 3 Textvarianten. Kein Bild nötig — eigenes Foto hochladen oder ohne Bild posten. Das Tool wählt die Vorlage saisonal und per Rotation.',
                      details: ['9 Vorlagen · 27 Textvarianten', 'Bild optional (eigenes Foto)', 'Format: Beitrag oder Story'],
                    },
                    {
                      titel: '✦ Feiertage & Anlässe',
                      farbe: '#f59e0b',
                      desc: 'Festtags-Posts mit automatisch generiertem Canvas im Mercedes-Design. Das Bild wird direkt im Browser gerendert (1080×1080 oder 1080×1920) und kann als PNG heruntergeladen werden.',
                      details: ['12 Feiertage mit auto. Datumsberechnung', 'Canvas-Generator mit Mercedes-Stern', 'Download als PNG · Beitrag oder Story'],
                    },
                    {
                      titel: '✦ Fahrzeug-Post',
                      farbe: '#fb923c',
                      desc: 'Gebrauchtwagen-Angebote mit automatisch generierter Caption aus Marke, Modell, Baujahr, km-Stand und Preis. Mehrere Bilder hochladbar mit Vorschau-Karussell.',
                      details: ['Caption-Generator aus Fahrzeugdaten', 'Mehrere Bilder als Karussell', 'Erinnerung alle 4 Wochen ohne Fahrzeug-Post'],
                    },
                  ].map((t, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.farbe}20` }}>
                      <p className="text-sm font-medium mb-2" style={{ color: t.farbe }}>{t.titel}</p>
                      <p className="text-sm mb-3" style={{ color: '#444' }}>{t.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.details.map((d, j) => (
                          <span key={j} className="text-xs px-2 py-1 rounded-lg" style={{ background: `${t.farbe}10`, color: t.farbe + 'aa' }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div></div></div>)}
              </div>

              {/* Posting-Rhythmus */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('rhythmus')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>📆 Posting-Rhythmus</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('rhythmus') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('rhythmus') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-3 text-sm" style={{ color: '#555' }}>
                  <p>Das Tool plant <span style={{ color: '#e8e8e8' }}>2 Posts pro Woche</span> — immer <span style={{ color: '#e8e8e8' }}>Dienstag um 12:00</span> und <span style={{ color: '#e8e8e8' }}>Donnerstag um 18:00</span>. Diese Zeiten erzielen laut Instagram-Statistiken die höchste organische Reichweite für Business-Accounts.</p>
                  <p>Bei <span style={{ color: '#f59e0b' }}>8–9 Posts im Monat</span> kann jede der 9 Vorlagen mindestens einmal pro Monat erscheinen — kein Follower sieht denselben Inhalt zweimal hintereinander.</p>
                  <div className="flex gap-6 mt-1 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="text-center">
                      <p className="text-2xl font-light" style={{ color: TEAL }}>2×</p>
                      <p className="text-xs mt-1" style={{ color: '#444' }}>Posts / Woche</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-light" style={{ color: TEAL }}>Di. 12:00</p>
                      <p className="text-xs mt-1" style={{ color: '#444' }}>Höchste Mittagsreichweite</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-light" style={{ color: TEAL }}>Do. 18:00</p>
                      <p className="text-xs mt-1" style={{ color: '#444' }}>Höchste Abendreichweite</p>
                    </div>
                  </div>
                </div></div></div>)}
              </div>

              {/* Fahrzeug-Erinnerung */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('fahrzeug')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>🚗 Fahrzeug-Post Erinnerung</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('fahrzeug') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('fahrzeug') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-3 text-sm" style={{ color: '#555' }}>
                  <p>Gebrauchtwagen-Posts sind wichtig für die Reichweite — konkrete Angebote sprechen potenzielle Käufer direkt an und erzeugen messbar mehr Interaktion als reine Service-Posts.</p>
                  <p>Die Erinnerung ist in die <span style={{ color: '#e8e8e8' }}>„Nächster Post"-Empfehlung</span> integriert — sie erscheint als eigene Prioritätsstufe im Empfehlungsfeld, sobald in den nächsten 4 Wochen kein Fahrzeug-Post geplant oder gepostet ist.</p>
                  <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                      <span style={{ color: TEAL }}>⏱️</span>
                      <span><span style={{ color: '#e8e8e8' }}>Fenster: 28 Tage</span> — das Tool prüft ob in den nächsten 4 Wochen ein Fahrzeug-Post geplant oder gepostet ist. Fehlt er → Erinnerung.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ color: TEAL }}>🔄</span>
                      <span><span style={{ color: '#e8e8e8' }}>Vorwärts-schauend:</span> Verlauf + Redaktionsplan werden auf Fahrzeug-Posts in den nächsten 28 Tagen geprüft. Ist einer dabei → keine Erinnerung.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ color: TEAL }}>📅</span>
                      <span>Beispiel: Fahrzeug für morgen geplant → keine Erinnerung. Fahrzeug zuletzt vor 3 Wochen, nichts Neues geplant → Erinnerung erscheint. Tipp: <span style={{ color: '#e8e8e8' }}>immer mindestens 1 Fahrzeug in den nächsten 4 Wochen einplanen.</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ color: TEAL }}>📍</span>
                      <span>Priorität: nach Feiertags-Warnungen, <span style={{ color: '#e8e8e8' }}>vor Service-Post-Rotation</span> — Fahrzeuge haben direkte Kaufabsicht.</span>
                    </div>
                  </div>
                  <p style={{ color: '#3a3a3a' }}>Empfehlung: <span style={{ color: '#555' }}>1 Fahrzeug-Post alle 2–4 Wochen</span> als fester Bestandteil des Redaktionsplans.</p>
                </div></div></div>)}
              </div>

              {/* Empfehlungs-Logik */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('logik')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>🧠 Empfehlungs-Logik (Sidebar)</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('logik') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('logik') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <p className="text-sm mb-4" style={{ color: '#444' }}>Die Sidebar zeigt immer den dringendsten offenen Punkt. Die Priorität läuft von oben nach unten — sobald eine Stufe erfüllt ist, rückt die nächste nach.</p>
                <div className="flex flex-col gap-4">
                  {[
                    { prio: '1', farbe: '#ef4444', label: 'Feiertag in ≤ 7 Tagen — nicht geplant', desc: 'Sofortige rote Warnung. Weihnachten, Ostern & Co. brauchen Vorlaufzeit für Canvas-Erstellung und Abstimmung.' },
                    { prio: '2', farbe: '#f59e0b', label: 'Feiertag in ≤ 30 Tagen — nicht geplant', desc: 'Amber-Hinweis zum frühzeitigen Planen. Das Feiertags-Bild muss erstellt, geprüft und terminiert werden.' },
                    { prio: '3', farbe: TEAL,      label: 'Fahrzeug-Post: keiner in den nächsten 4 Wochen', desc: 'Vorwärts-schauend: Das Tool prüft ob in den nächsten 28 Tagen ein Fahrzeug-Post geplant oder gepostet ist. Fehlt er, erscheint die Erinnerung. Ist einer geplant — egal für welchen Tag in diesem Fenster — bleibt die Erinnerung still.' },
                    { prio: '4', farbe: '#8ab4b2', label: 'Monatlicher Schwerpunkt noch offen', desc: 'Saisonal passende Vorlage (z.B. Räderwechsel im März/Oktober). Wird vorgeschlagen bis sie für diesen Monat gepostet oder geplant ist.' },
                    { prio: '5', farbe: '#666',    label: 'Rotations-Vorschlag', desc: 'Die Vorlage die am längsten nicht gepostet wurde rückt nach. Keine Wiederholungen im gleichen Monat — maximale Abwechslung für Follower.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: item.farbe + '20', color: item.farbe }}>
                        {item.prio}
                      </span>
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: item.farbe }}>{item.label}</p>
                        <p className="text-sm" style={{ color: '#444' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div></div></div>)}
              </div>

              {/* Saisonale Schwerpunkte */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('saison')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>📋 Saisonale Schwerpunkte</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('saison') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('saison') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <p className="text-sm mb-4" style={{ color: '#444' }}>Pro Monat gibt es 2 priorisierte Vorlagen die als erstes vorgeschlagen werden. Der Rest der Slots wird durch Rotation aller 9 Vorlagen aufgefüllt.</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                  {[
                    ['Januar',    '🔍 HU/AU Erinnerung',  '🛢️ Ölwechsel'],
                    ['Februar',   '🛑 Bremsencheck',       '🔍 HU/AU Erinnerung'],
                    ['März',      '🔧 Räderwechsel',       '📐 Achsvermessung'],
                    ['April',     '🔧 Räderwechsel',       '❄️ Klimaservice'],
                    ['Mai',       '❄️ Klimaservice',       '🛑 Bremsencheck'],
                    ['Juni',      '🚗 Gebrauchtwagen',     '📅 Werkstatt-Termin'],
                    ['Juli',      '🚗 Gebrauchtwagen',     '🏎️ Oldtimer Service'],
                    ['August',    '📅 Werkstatt-Termin',   '🏎️ Oldtimer Service'],
                    ['September', '🛑 Bremsencheck',       '🔧 Räderwechsel'],
                    ['Oktober',   '🔧 Räderwechsel',       '🛢️ Ölwechsel'],
                    ['November',  '🛢️ Ölwechsel',          '🔍 HU/AU Erinnerung'],
                    ['Dezember',  '🛢️ Ölwechsel',          '📅 Werkstatt-Termin'],
                  ].map(([monat, s1, s2]) => {
                    const aktuellerMonat = new Date().toLocaleString('de-DE', { month: 'long' })
                    const istAktuell = monat === aktuellerMonat
                    return (
                      <div key={monat} className="flex items-center gap-3 py-2.5"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span className="text-sm w-24 flex-shrink-0 font-medium"
                          style={{ color: istAktuell ? TEAL : '#555' }}>
                          {istAktuell ? '▶ ' : ''}{monat}
                        </span>
                        <span className="text-sm" style={{ color: istAktuell ? '#aaa' : '#3a3a3a' }}>{s1} · {s2}</span>
                      </div>
                    )
                  })}
                </div></div></div>)}
              </div>

              {/* Datenspeicherung */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('daten')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>💾 Datenspeicherung & Roadmap</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('daten') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('daten') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-3 text-sm" style={{ color: '#555' }}>
                  <p>Alle Posts werden derzeit im <span style={{ color: '#e8e8e8' }}>localStorage des Browsers</span> gespeichert — kein Server, keine Datenbank. Die Daten bleiben erhalten bis der Browser-Cache geleert wird und sind <span style={{ color: '#ef4444' }}>nur auf dem jeweiligen Gerät verfügbar</span>.</p>
                  <div className="flex gap-6 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div><span style={{ color: TEAL }}>sinsig_verlauf</span><p className="text-xs mt-0.5" style={{ color: '#333' }}>gepostete Beiträge</p></div>
                    <div><span style={{ color: '#f59e0b' }}>sinsig_geplant</span><p className="text-xs mt-0.5" style={{ color: '#333' }}>geplante Termine</p></div>
                  </div>

                  {/* Nächster Schritt: Supabase */}
                  <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: `${TEAL}08`, border: `1px solid ${TEAL}20` }}>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: TEAL }}>💡 Nächster sinnvoller Schritt</p>
                    <p><span style={{ color: '#e8e8e8' }}>Supabase</span> — kostenlose Postgres-Datenbank mit einfacher REST-API. Damit werden Verlauf und Redaktionsplan geräteübergreifend synchronisiert.</p>
                    <div className="flex flex-col gap-1.5 mt-1 text-xs" style={{ color: '#444' }}>
                      <span>→ Mehrere Mitarbeiter können gleichzeitig planen</span>
                      <span>→ Daten gehen nicht verloren wenn Cache geleert wird</span>
                      <span>→ Kein eigener Server nötig — Supabase übernimmt das</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {[
                      { status: '✅', label: 'Feiertags-Canvas mit Mercedes-Logo' },
                      { status: '✅', label: 'Posting-Empfehlung mit saisonaler Rotation' },
                      { status: '✅', label: 'Monatsplan mit Verpasst-Erkennung' },
                      { status: '✅', label: 'Post-Planung mit Terminvorschlägen' },
                      { status: '✅', label: 'Fahrzeug-Erinnerung in Empfehlungslogik integriert' },
                      { status: '✅', label: 'Fahrzeug-Warnung in allen Erstellungs-Tabs' },
                      { status: '✅', label: 'Feiertags-Warnung im Redaktionsplan' },
                      { status: '✅', label: 'Ersteller in Verlauf & Redaktionsplan' },
                      { status: '✅', label: 'Alle Insights-Panels einklappbar' },
                      { status: '⏳', label: 'Supabase — Cloud-Speicherung & Multi-Device' },
                      { status: '⏳', label: 'Instagram Graph API — automatisches Posten' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span>{item.status}</span>
                        <span style={{ color: item.status === '✅' ? '#555' : '#333' }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div></div></div>)}
              </div>

              {/* Changelog */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => toggleInsight('changelog')} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm font-medium" style={{ color: '#aaa' }}>🗂 Update-Verlauf</p>
                  <span className="text-xs transition-transform" style={{ color: '#444', transform: insightsOffen.has('changelog') ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>
                {insightsOffen.has('changelog') && (<div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}><div className="pt-4">
                <div className="flex flex-col gap-4">
                  {[
                    {
                      version: 'v0.3',
                      datum: 'Mai 2026',
                      neu: [
                        'Fahrzeug-Warnung jetzt auch in Service Posts, Feiertage & Fahrzeug-Tab sichtbar',
                        'Alle Insights-Panels korrekt einklappbar (JSX-Fix für Turbopack)',
                        'Insights-Text überarbeitet — familiärer & mit Kontakthinweis',
                        'Warnbanner im Redaktionsplan bei Feiertags-Konflikten',
                        'Ersteller wird in Verlauf & Redaktionsplan angezeigt',
                        'Gepostet-Kachel grün, Offen-Kachel deutlich sichtbarer',
                        'Passwort-Toggle: elegantes SVG-Auge statt Emoji',
                        'Fahrzeug-Erinnerungstexte verständlicher formuliert',
                        'Insights-Roadmap auf aktuellen Stand gebracht',
                        'Zeitbasierte Begrüßung im Dashboard (Morgen/Tag/Abend)',
                        'Sidebar: Direkt-Buttons für alle Empfehlungstypen',
                        'Dashboard bereinigt — 30-Tage-Panel entfernt',
                        'Bestätigungs-Dialog vor "Jetzt posten" in allen Tabs',
                        'Fahrzeug-Reminder-Logik vereinfacht: ein 28-Tage-Fenster statt zwei',
                        'Fahrzeug-Formular: Pflichtfeld-Validierung für Modell, Baujahr, km & Preis',
                        'Schnellzugriff-Panel aus Dashboard entfernt',
                        'Begrüßung im Dashboard größer & ohne Emoji',
                      ]
                    },
                    {
                      version: 'v0.2',
                      datum: 'Mai 2026',
                      neu: [
                        'Login-Screen mit Benutzerverwaltung (3 Accounts)',
                        'Session wird gespeichert — kein Re-Login nötig',
                        'Abmelden-Button in der Sidebar',
                        'Deployment auf Cloudflare Pages (sinsig-social-tool.pages.dev)',
                        'Fahrzeug-Erinnerung schaut jetzt 4 Wochen voraus (statt 2)',
                        'Feiertags-Warnung im Redaktionsplan bei Slot-Konflikten',
                        'Ersteller wird im Redaktionsplan angezeigt',
                        'Benutzeranzeige oben rechts im Header',
                        'Admin-Account hinzugefügt',
                      ]
                    },
                    {
                      version: 'v0.1',
                      datum: 'Mai 2026',
                      neu: [
                        'Erstes Release',
                        'Service-Posts mit 9 Vorlagen und je 3 Textvarianten',
                        'Feiertags-Canvas mit Mercedes-Logo und automatischen Texten',
                        'Fahrzeug-Post Generator',
                        'Redaktionsplan mit Verpasst-Erkennung',
                        'Post-Planung mit Terminvorschlägen',
                        'Posting-Empfehlung mit saisonaler Rotation und Fahrzeug-Erinnerung',
                        'Monatsplan mit Titel-Anzeige',
                        'Insights & Hilfe-Bereich',
                      ]
                    },
                  ].map((entry, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ background: `${TEAL}20`, color: TEAL }}>{entry.version}</span>
                        <span className="text-xs" style={{ color: '#444' }}>{entry.datum}</span>
                      </div>
                      <div className="flex flex-col gap-1 pl-2">
                        {entry.neu.map((item, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs" style={{ color: '#555' }}>
                            <span style={{ color: '#333', marginTop: '1px' }}>·</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      {i < 2 && <div className="mt-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }} />}
                    </div>
                  ))}
                </div>
                </div></div>)}
              </div>

            </div>
          )}

        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="px-10 py-5 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Sinsig & Lang" className="h-5 w-auto object-contain opacity-30" />
            <span className="text-xs" style={{ color: '#2a2a2a' }}>Sinsig & Lang GmbH & Co. KG · Autorisierte Mercedes-Benz Vertragswerkstatt · Bingen am Rhein</span>
          </div>
          <span className="text-xs" style={{ color: '#222' }}>Erstellt von Till Schellenberger · Internes Tool · v0.3</span>
        </footer>

      </main>

      {/* ── Bestätigungs-Modal "Jetzt posten" ───────────────────────────────── */}
      {postConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-2xl p-7 flex flex-col gap-5 w-80"
            style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <p className="text-base font-medium mb-1" style={{ color: '#e8e8e8' }}>Wirklich jetzt posten?</p>
              <p className="text-sm" style={{ color: '#555' }}>Der Beitrag wird als gepostet markiert und im Verlauf gespeichert.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPostConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#888', border: '1px solid rgba(255,255,255,0.1)' }}>
                Abbrechen
              </button>
              <button onClick={() => { postConfirm.onConfirm(); setPostConfirm(null) }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ background: TEAL, color: '#fff' }}>
                Ja, posten
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
