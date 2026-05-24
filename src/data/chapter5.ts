import type { ChapterDefinition } from "../types";

export const chapter5: ChapterDefinition = {
  id: "kapitel-5",
  number: 5,
  title: "Wertschöpfung und Organisation",
  subtitle: "Porter, Integration, Make-or-Buy, Mass Customization",
  whyImportant:
    "Aufgabe 5 fragt fast immer Wertschöpfung und Integration. Ein klarer Rechenweg und das saubere Unterscheiden von vertikal/horizontal sichern dir die Punkte.",
  learningGoals: [
    "Wertschöpfung berechnen und interpretieren.",
    "Porter-Wertschöpfungskette und Primär-/Supportaktivitäten.",
    "Integrationsgrad und Fertigungstiefe berechnen.",
    "Vertikale (rückwärts/vorwärts) und horizontale Integration unterscheiden.",
    "Make-or-Buy und Sourcing-Strategien.",
    "Mass Customization beschreiben.",
  ],
  priority: "A",
  examReference: "Aufgabe 5",
  examTip:
    "Wertschöpfung = Leistung - Vorleistung. Integrationsgrad = Wertschöpfung / Gesamtleistung. Richtung NIEMALS aus Produktsicht angeben - immer aus Sicht des Unternehmens (rückwärts = Lieferant, vorwärts = Kunde).",
  commonMistakes: [
    "Vorleistung durch Leistung teilen statt Wertschöpfung / Gesamtleistung.",
    "Rückwärts/Vorwärts-Integration aus Sicht des Produkts statt des Unternehmens deuten.",
    "Primäraktivitäten und unterstützende Aktivitäten vermischen.",
    "Bruttomarge mit EBIT verwechseln.",
  ],
  trainers: [],
  groups: [
    {
      title: "1 · Wertschöpfung",
      color: "lime",
      blocks: [
        {
          id: "k5-wert",
          title: "Wertschöpfung = Leistung − Vorleistung",
          intro: "Der zentrale Begriff dieses Kapitels.",
          simple:
            "Wertschöpfung misst, wie viel Wert ein Unternehmen selbst erschafft. Es ist die Leistung minus die eingekauften Vorleistungen.",
          detail:
            "Leistung = Wert des Endproduktes (Umsatz). Vorleistung = eingekaufte Materialien und Dienstleistungen. Differenz fließt in Löhne, Steuern, Gewinn und Vermögensbildung.",
          example:
            "Brauerei: Leistung 80 EUR pro Fass, Vorleistung 40 EUR. Wertschöpfung = 40 EUR pro Fass.",
          mnemonic: "Wert = Leistung − Vorleistung.",
          exam: "Aufgabe 5: berechnen + interpretieren.",
          visual: "porter-chain",
          miniCheck: {
            prompt: "Leistung 800.000, Vorleistung 500.000. Wertschöpfung?",
            options: ["300.000", "500.000", "800.000", "1.300.000"],
            correctIndex: 0,
            explain: "800.000 - 500.000 = 300.000.",
          },
        },
        {
          id: "k5-porter",
          title: "Porter-Wertschöpfungskette",
          intro: "Primäraktivitäten und unterstützende Aktivitäten.",
          simple:
            "Porter zerlegt das Unternehmen in 5 Primäraktivitäten (direkt am Produkt) und 4 unterstützende Aktivitäten (intern unterstützend). Am Ende steht die Gewinnspanne.",
          detail:
            "Primäraktivitäten: Eingangslogistik, Operationen (Produktion), Ausgangslogistik, Marketing/Vertrieb, Service. Unterstützende Aktivitäten: Unternehmensinfrastruktur, Personalmanagement, Technologieentwicklung, Beschaffung.",
          table: [
            ["Typ", "Aktivität", "Beispiel"],
            ["Primär", "Eingangslogistik", "Wareneingang, Lager"],
            ["Primär", "Operationen", "Produktion, Montage"],
            ["Primär", "Ausgangslogistik", "Distribution, Versand"],
            ["Primär", "Marketing/Vertrieb", "Werbung, Verkauf"],
            ["Primär", "Service", "Wartung, Support"],
            ["Support", "Infrastruktur", "Geschäftsführung, Finanzen"],
            ["Support", "Personal", "HR, Schulung"],
            ["Support", "Technologie", "Forschung, Entwicklung"],
            ["Support", "Beschaffung", "Einkauf"],
          ],
          mnemonic: "Primär = direkt. Support = ermöglicht.",
          exam: "Theoriefrage und Zuordnung.",
          visual: "porter-chain",
        },
      ],
    },
    {
      title: "2 · Wirtschaftlichkeitskennzahlen",
      color: "emerald",
      blocks: [
        {
          id: "k5-margin",
          title: "Bruttomarge, EBITDA, EBIT, Nettogewinn, ROI",
          intro: "Stufen vom Umsatz zum Gewinn.",
          simple:
            "Bruttomarge = Umsatz - Herstellungskosten. EBITDA = -operative Kosten. EBIT = -Abschreibungen. Nettogewinn = -Zinsen -Steuern. ROI = Nettogewinn / investiertes Kapital.",
          detail:
            "Diese Kennzahlen zeigen, wie viel vom Umsatz nach den jeweiligen Stufen übrig bleibt. ROI ist die Rendite auf das eingesetzte Kapital.",
          table: [
            ["Kennzahl", "Formel", "Bedeutung"],
            ["Bruttomarge", "Umsatz − Herstellungskosten", "nach Produktion"],
            ["EBITDA", "Bruttomarge − op. Kosten ohne Abschr.", "rein operativ"],
            ["EBIT", "EBITDA − Abschreibungen", "Operatives Ergebnis"],
            ["Nettogewinn", "EBIT − Zinsen − Steuern", "echter Gewinn"],
            ["ROI", "Nettogewinn / inv. Kapital", "Kapitaleffizienz"],
          ],
          example:
            "Umsatz 100, Herstell 65, op. Kosten 10, Abschr. 5, Zinsen 3, Steuern 4, Kapital 70. Brutto 35, EBITDA 25, EBIT 20, Netto 13, ROI 18,6%.",
          mnemonic: "Brutto -> EBITDA -> EBIT -> Netto -> ROI.",
          exam: "Theoriefrage oder Rechenaufgabe.",
        },
      ],
    },
    {
      title: "3 · Integration",
      color: "rose",
      blocks: [
        {
          id: "k5-integrationsgrad",
          title: "Integrationsgrad und Fertigungstiefe",
          intro: "Zwei verwandte Kennzahlen.",
          simple:
            "Integrationsgrad = Wertschöpfung / Gesamtleistung (am Ende der Kette). Fertigungstiefe = Wertschöpfung / Leistung (eines produzierenden Unternehmens).",
          detail:
            "Integrationsgrad zeigt, wie viel der gesamten Wertschöpfungskette das Unternehmen selbst erbringt. Fertigungstiefe ist der Eigenleistungsanteil eines Produzenten.",
          example:
            "Brauerei: Wertschöpfung 400.000, Gesamtleistung der Kette 1.000.000 -> Integrationsgrad 40%.",
          mnemonic: "Grad: durch Gesamt. Tiefe: durch eigene Leistung.",
          exam: "Aufgabe 5 - Rechnung.",
        },
        {
          id: "k5-vertikal",
          title: "Vertikale Integration: rückwärts und vorwärts",
          intro: "Entlang der Lieferkette.",
          simple:
            "Rückwärtsintegration: Unternehmen übernimmt Lieferantenleistung. Vorwärtsintegration: Unternehmen übernimmt Vertriebs-/Kundenstufe.",
          detail:
            "Voraussetzung Vorwärts: bisher nicht direkt am Endkunden. Vorteile: Kostenvorteile, Qualität, Know-how, Geheimhaltung. Nachteile: Bürokratie, Koordination, Wettbewerber-Konflikte.",
          example:
            "Tesla baut Batterien selbst (rückwärts) und verkauft direkt an Kunden (vorwärts).",
          trap: "Aus Sicht des Produkts denken ist falsch. Immer aus Sicht des Unternehmens beantworten.",
          mnemonic: "Rückwärts = Lieferant. Vorwärts = Kunde.",
          exam: "Aufgabe 5 - Begründete Zuordnung.",
          visual: "integration-directions",
          miniCheck: {
            prompt: "Ein Hersteller startet einen eigenen Online-Shop und verkauft direkt an Endkunden. Welche Integration ist das?",
            options: ["Rückwärtsintegration", "Vorwärtsintegration", "Horizontale Integration", "Outsourcing"],
            correctIndex: 1,
            explain:
              "Hersteller geht in Richtung Kunde -> Vorwärtsintegration.",
          },
        },
        {
          id: "k5-horizontal",
          title: "Horizontale Integration",
          intro: "Auf gleicher Wertschöpfungsstufe.",
          simple:
            "Horizontale Integration: Zusammenschluss zweier Unternehmen auf derselben Stufe (z. B. zwei Hersteller fusionieren).",
          detail:
            "Gründe: Einkaufsmacht, Produktion (Massenproduktion, Fixkostendegression), Marktanteile, Vertriebskraft. Beispiel: Automobilkonzerne übernehmen Marken.",
          example: "Volkswagen-Konzern (VW, Audi, Skoda, Porsche).",
          mnemonic: "Horizontal = gleiche Stufe + gleiche Branche.",
          exam: "Aufgabe 5 - Theoriefrage.",
          visual: "integration-directions",
        },
      ],
    },
    {
      title: "4 · Make-or-Buy & Sourcing",
      color: "orange",
      blocks: [
        {
          id: "k5-makebuy",
          title: "Make-or-Buy",
          intro: "Selbst machen oder einkaufen?",
          simple:
            "Make-or-Buy ist die Entscheidung, ob eine Leistung intern erstellt oder extern bezogen wird.",
          detail:
            "Kriterien: Kosten, Qualität, Know-how, Abhängigkeit, Flexibilität, strategische Bedeutung. In der IT als Cloud-Stufen sichtbar: IaaS, PaaS, SaaS.",
          table: [
            ["Stufe", "Beispiel", "Eigenanteil"],
            ["IaaS", "Server in Cloud", "hoch"],
            ["PaaS", "Datenbank-Service", "mittel"],
            ["SaaS", "Microsoft 365", "niedrig"],
          ],
          mnemonic: "Make = strategisch. Buy = standardisiert.",
          exam: "Theorie + Diskussion.",
          visual: "make-or-buy",
        },
        {
          id: "k5-mass",
          title: "Mass Customization",
          intro: "Massenproduktion mit Individualisierung.",
          simple:
            "Mass Customization: kundenspezifische Produkte zu Kosten, die nahe an Massenproduktion liegen.",
          detail:
            "Voraussetzung: moderne IuK, Online-Konfigurator, flexible Produktion (One-Piece-Flow), flexible Logistik. Vorteile: Kundenbindung, weniger Lager, frühe Markteinblicke.",
          example: "DELL Computer auf Bestellung, Sneakers individuell konfiguriert.",
          mnemonic: "Massenpreis + Individualität.",
          exam: "Theoriefrage und Beispiele.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k5-q1",
      question: "Formel Wertschöpfung?",
      answer: "Wertschöpfung = Leistung - Vorleistung.",
    },
    {
      id: "k5-q2",
      question: "Formel Integrationsgrad?",
      answer: "Integrationsgrad = Wertschöpfung / Gesamtleistung.",
    },
    {
      id: "k5-q3",
      question: "Formel Fertigungstiefe?",
      answer: "Fertigungstiefe = Wertschöpfung / Leistung.",
    },
    {
      id: "k5-q4",
      question: "Nenne 5 Primäraktivitäten nach Porter.",
      answer:
        "Eingangslogistik, Operationen, Ausgangslogistik, Marketing/Vertrieb, Service.",
    },
    {
      id: "k5-q5",
      question: "Nenne 4 unterstützende Aktivitäten nach Porter.",
      answer:
        "Unternehmensinfrastruktur, Personalmanagement, Technologieentwicklung, Beschaffung.",
    },
    {
      id: "k5-q6",
      question: "Was ist Rückwärtsintegration?",
      answer:
        "Unternehmen übernimmt vorgelagerte Lieferantenleistung selbst (z. B. eigene Batteriefertigung).",
    },
    {
      id: "k5-q7",
      question: "Was ist Vorwärtsintegration?",
      answer:
        "Unternehmen übernimmt nachgelagerte Vertriebsstufen, geht näher an den Kunden (z. B. Direktvertrieb).",
    },
    {
      id: "k5-q8",
      question: "Was ist horizontale Integration?",
      answer:
        "Zusammenschluss von Unternehmen auf gleicher Wertschöpfungsstufe (z. B. Konkurrentenfusion).",
    },
    {
      id: "k5-q9",
      question: "Nenne 3 Vorteile vertikaler Integration.",
      answer:
        "Kostenvorteile (z. B. Transport), Know-how-Aufbau, Geheimhaltung von Innovationen.",
    },
    {
      id: "k5-q10",
      question: "Nenne 3 Nachteile vertikaler Integration.",
      answer:
        "Höhere Kontroll- und Koordinationskosten, Bürokratie, Konkurrenzkonflikte mit ehemaligen Partnern.",
    },
    {
      id: "k5-q11",
      question: "Was ist Mass Customization?",
      answer:
        "Massenproduktion mit kundenspezifischer Individualisierung zu nahe-Massenproduktionspreisen.",
    },
    {
      id: "k5-q12",
      question: "Welche Aktivitäten erzeugen direkten Kundennutzen nach Porter?",
      answer: "Primäraktivitäten.",
    },
  ],
  tasks: [
    {
      id: "k5-task-1",
      kind: "calc",
      prompt:
        "Leistung 800.000 EUR, Vorleistung 500.000 EUR. Berechne Wertschöpfung und Integrationsgrad (Gesamtleistung 800.000).",
      expected: "Wertschöpfung 300.000 EUR. Integrationsgrad = 300.000 / 800.000 = 37,5 %.",
      steps: [
        "Wertschöpfung = 800.000 − 500.000 = 300.000.",
        "Integrationsgrad = Wertschöpfung / Gesamtleistung = 300.000 / 800.000.",
        "Ergebnis: 0,375 = 37,5 %.",
      ],
      exam: "Klassiker Aufgabe 5.",
    },
    {
      id: "k5-task-2",
      kind: "case",
      prompt:
        "Tesla startet eigene Batteriezellfertigung und gleichzeitig einen Direktvertrieb über Tesla-Stores. Welche Integrationsformen liegen vor?",
      expected:
        "Batterien selbst herstellen = Rückwärtsintegration. Direktvertrieb = Vorwärtsintegration.",
      steps: [
        "Wertschöpfungskette skizzieren: Lieferant -> Tesla -> Kunde.",
        "Batterien sind Vorleistung -> rückwärts.",
        "Stores ersetzen Händler -> vorwärts.",
      ],
      trap: "Beide Bewegungen einfach nur 'vertikal' nennen ohne Richtung.",
    },
    {
      id: "k5-task-3",
      kind: "calc",
      prompt:
        "Umsatz 100 Mrd, Herstellkosten 65, op. Kosten ohne Abschr. 10, Abschr. 5, Zinsen 3, Steuern 4, Investiertes Kapital 70. Berechne Bruttomarge, EBITDA, EBIT, Nettogewinn, ROI.",
      expected:
        "Brutto 35; EBITDA 25; EBIT 20; Nettogewinn 13; ROI 13/70 = 18,6 %.",
      steps: [
        "Brutto = 100 - 65 = 35.",
        "EBITDA = 35 - 10 = 25.",
        "EBIT = 25 - 5 = 20.",
        "Netto = 20 - 3 - 4 = 13.",
        "ROI = 13 / 70 = 0,186 = 18,6 %.",
      ],
    },
  ],
};
