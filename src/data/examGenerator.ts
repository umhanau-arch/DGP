// Generator for randomized DGP exam papers that mirror the original
// WS 25/26 and SS 25 exams 1:1 in structure, type and difficulty.
// Reset randomizes only values, names, branches and wording.

import type {
  ExamBlock,
  ExamPayload,
  ExamSubTask,
  IntegrationPayload,
  PetriExamPayload,
  PetriNet,
  PkrPayload,
  PkrTeilprozess,
  ProcessModelTracePayload,
  ScenarioPayload,
} from "../types";
import {
  BPMN_SZENARIEN,
  BRANCHEN,
  CYCLE_SCENARIOS,
  DEFINITIONS,
  EVENTLOGS,
  FOOTPRINT_LOGS,
  INTEGRATION_SCENARIOS,
  PKR_FIRMEN,
  PKR_PRODUKTE,
  PKR_TEILPROZESSE,
  PROCESS_MODELS,
  REDESIGN_BRANCHEN,
} from "./examPools";

// ---------------- RNG ----------------

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(arr: T[], n: number, rng: () => number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

function rangeInt(min: number, max: number, rng: () => number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function fmt(n: number) {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}

// ---------------- A1 ----------------

function buildA1(rng: () => number): ExamBlock {
  const drei = pickN(DEFINITIONS, 3, rng);
  const begriffe = drei.map((d) => `• ${d.term}`).join("\n");
  const lösung = drei
    .map((d) => `• ${d.term}: ${d.answer}`)
    .join("\n");

  return {
    block: "A1",
    title: "Definitionen",
    points: 9,
    intro:
      "Erklären Sie mit eigenen Worten die folgenden Begriffe (3+3+3 Punkte):",
    payload: { kind: "none" },
    subTasks: drei.map((d, i) => ({
      label: `(${i + 1}) ${d.term}`,
      points: 3,
      prompt: `Erklären Sie den Begriff '${d.term}' mit eigenen Worten und einem Beispiel.`,
      expected: d.answer,
      grading: [
        "Definition fachlich korrekt",
        "In eigenen Worten formuliert",
        "Mit konkretem Beispiel illustriert",
      ],
    })),
    commonErrors: [
      "Nur Lehrbuchsatz wiedergeben statt eigene Worte",
      "Beispiel weggelassen",
      "Fachbegriffe nicht erläutert",
    ],
  } satisfies ExamBlock;
}

// ---------------- A2 ----------------

function buildA2(rng: () => number, variant: "A" | "B"): ExamBlock {
  if (variant === "A") {
    const sc = pick(CYCLE_SCENARIOS, rng);
    return {
      block: "A2",
      title: "Geschäftsprozessmanagementzyklus",
      points: 8,
      intro:
        "Im folgenden Text ist die Umsetzung eines Geschäftsprozessmanagementzyklus in einem Unternehmen beschrieben. Es wurden jedoch einzelne Phasen nicht berücksichtigt oder inkorrekt durchgeführt:\n\n„" +
        sc.text +
        "\"",
      payload: { kind: "none" },
      subTasks: [
        {
          label: "(a)",
          points: 4,
          prompt:
            "Benennen Sie mindestens zwei Phasen des GPM-Zyklus, die in diesem Beispiel fehlen oder fehlerhaft umgesetzt wurden. Beschreiben Sie im Detail, was hier fehlt.",
          expected: sc.fehlend.join("\n"),
          grading: [
            "Mind. 2 fehlende/fehlerhafte Phasen genannt",
            "Klare Detailbeschreibung pro Phase",
            "Bezug zum Text hergestellt",
          ],
        },
        {
          label: "(b)",
          points: 4,
          prompt:
            "Erläutern Sie für jede der von Ihnen identifizierten Phasen, wie diese im Beispiel korrekt zu realisieren gewesen wäre.",
          expected: sc.korrektur.join("\n"),
          grading: [
            "Pro Phase ein konkretes Korrektur-Vorgehen",
            "Methoden / Werkzeuge benannt",
            "Reihenfolge plausibel",
          ],
        },
      ],
      commonErrors: [
        "Nur Phasennamen ohne Begründung",
        "Analyse und Verbesserung verwechselt",
        "Überwachung als fehlend benannt, obwohl sinngemäß vorhanden",
      ],
    };
  }
  // Variante B (SS25)
  const branche = pick(REDESIGN_BRANCHEN, rng);
  const zwei = pickN(branche.kategorien, 2, rng);
  return {
    block: "A2",
    title: "Geschäftsprozessmanagementzyklus",
    points: 10,
    intro: "Wir betrachten den Geschäftsprozessmanagementzyklus.",
    payload: { kind: "none" },
    subTasks: [
      {
        label: "(a)",
        points: 4,
        prompt:
          "Ordnen Sie die Phasen Prozessüberwachung, Prozessanalyse, Prozesseinführung, Prozessverbesserung, Prozessidentifikation und Prozesserhebung dem GPM-Lebenszyklus in der korrekten Reihenfolge zu.",
        expected:
          "1. Prozessidentifikation – wichtige Prozesse erkennen + priorisieren\n2. Prozesserhebung – Ist-Prozess aufnehmen\n3. Prozessanalyse – Schwachstellen ermitteln\n4. Prozessverbesserung – Soll-Prozess entwerfen\n5. Prozesseinführung – Soll-Prozess umsetzen\n6. Prozessüberwachung – KPIs messen, zurück zur Identifikation",
        grading: [
          "Alle 6 Phasen genannt",
          "Korrekte Reihenfolge",
          "Kurze Erklärung je Phase",
        ],
      },
      {
        label: "(b)",
        points: 6,
        prompt: `Geben Sie zwei Kategorien von Redesign-Heuristiken als konkrete Maßnahmen zur Umgestaltung von Geschäftsprozessen an. Nennen und beschreiben Sie kurz für jede Kategorie ein Beispiel für Geschäftsprozesse im ${branche.branche}.`,
        expected: zwei
          .map((k) => `• ${k.name}: ${k.beispiel}`)
          .join("\n"),
        grading: [
          "Zwei verschiedene Kategorien benannt",
          "Pro Kategorie ein konkretes Beispiel",
          "Bezug zur Branche " + branche.branche,
        ],
      },
    ],
    commonErrors: [
      "Phasen vertauscht",
      "Beispiel ohne Branchenbezug",
      "Kategorien nur aufgezählt, nicht erklärt",
    ],
  };
}

// ---------------- A3 ----------------

function buildA3(rng: () => number, variant: "A" | "B"): ExamBlock {
  const branche = pick(BRANCHEN, rng);
  if (variant === "A") {
    const fünf = pickN(branche.prozesse, 5, rng);
    const payload: ScenarioPayload = {
      kind: "scenario",
      unternehmen: branche.unternehmen,
      branche: branche.branche,
      text: branche.text,
      prozesse: fünf.map((p) => ({
        name: p.name,
        expected: p.expected,
        begruendung: p.begruendung,
      })),
    };
    return {
      block: "A3",
      title: "Prozessarten",
      points: 10,
      intro:
        branche.text +
        "\n\nBitte ordnen Sie den folgenden Geschäftsprozessen jeweils eine der drei Prozessarten (Kernprozess, Managementprozess, unterstützender Prozess) zu und begründen Sie Ihre Zuordnung jeweils in 1–2 Sätzen.",
      payload,
      subTasks: fünf.map((p, i) => ({
        label: `${i + 1}. ${p.name}`,
        points: 2,
        prompt: `Welche Prozessart und warum?`,
        expected: `${labelKategorie(p.expected)} – ${p.begruendung}`,
        grading: [
          "Korrekte Kategorie",
          "1–2 Sätze Begründung mit Bezug zur Branche",
        ],
      })),
      commonErrors: [
        "Plattform pauschal als Support einordnen",
        "Begründung fehlt",
        "Marketing pauschal als Support – kontextabhängig",
      ],
    };
  }
  // Variante B
  const sechs = pickN(branche.prozesse, 6, rng);
  const payload: ScenarioPayload = {
    kind: "scenario",
    unternehmen: branche.unternehmen,
    branche: branche.branche,
    text: branche.text,
    prozesse: sechs.map((p) => ({
      name: p.name,
      expected: p.expected,
      begruendung: p.begruendung,
    })),
  };
  return {
    block: "A3",
    title: "Prozessarten",
    points: 9,
    intro: branche.text,
    payload,
    subTasks: [
      {
        label: "(1)",
        points: 3,
        prompt:
          "Erläutern Sie in 1–2 vollständigen Sätzen, was Kern-, Management- und unterstützende Prozesse sind. Beschreiben Sie dabei Zielsetzung und Merkmale dieser Prozessarten.",
        expected:
          "Kernprozess: erzeugt direkten Kundennutzen und ist Teil des Geschäftsmodells (z. B. Produktion, Vertrieb).\nManagementprozess: steuert das Unternehmen strategisch (z. B. Strategieentwicklung, Controlling).\nUnterstützender Prozess (Supportprozess): ermöglicht Kernprozesse intern, ohne direkten Kundennutzen (z. B. HR, IT).",
        grading: [
          "Zielsetzung pro Art beschrieben",
          "Mindestens 1 Merkmal pro Art",
          "Vollständige Sätze",
        ],
      },
      {
        label: "(2)",
        points: 6,
        prompt:
          "Ordnen Sie die folgenden Geschäftsprozesse des Unternehmens jeweils eindeutig einer der drei Kategorien zu.",
        expected: sechs
          .map(
            (p) =>
              `• ${p.name} → ${labelKategorie(p.expected)} (${p.begruendung})`,
          )
          .join("\n"),
        grading: [
          "Jeder Prozess korrekt zugeordnet",
          "Kurze Begründung",
        ],
      },
    ],
    commonErrors: [
      "Kategorien nicht differenziert",
      "Marketing pauschal als Support",
      "Plattform pauschal als Support, obwohl Kerngeschäftsmodell",
    ],
  };
}

function labelKategorie(k: "kern" | "support" | "management") {
  return k === "kern"
    ? "Kernprozess"
    : k === "management"
      ? "Managementprozess"
      : "unterstützender Prozess";
}

// ---------------- A4 PKR ----------------

function buildA4(rng: () => number): ExamBlock {
  const firma = pick(PKR_FIRMEN, rng);
  const [pA, pB] = pick(PKR_PRODUKTE, rng);
  const teilprozessTemplates = pickN(PKR_TEILPROZESSE, 4, rng);

  // Generate clean numbers per Teilprozess
  const teil: PkrTeilprozess[] = teilprozessTemplates.map((tp) => {
    const gesamtmenge = pick([300, 360, 400, 500, 575, 600, 800, 1000, 1200, 1650, 2000], rng);
    // variable Kosten = rate * menge with rate aus {30, 40, 50, 60, 80, 100, 120}
    const rate = pick([30, 40, 50, 60, 80, 100, 120, 150], rng);
    const variabel = rate * gesamtmenge;
    // Fixkosten als runder Anteil ~ 1/3 der gesamtkosten oder als ganze Zahl
    const fix = Math.round(variabel / 3 / 1000) * 1000;
    const gesamt = variabel + fix;
    return {
      name: tp.name,
      gesamt,
      fix,
      measureLabel: tp.measureLabel,
      gesamtmenge,
    };
  });

  // Produkte verbrauchen Maßgrößen
  const zuteilung = [pA, pB].map((name) => ({
    name,
    values: teil.map((tp) => {
      // ungefähr 40-60% der gesamtmenge auf je ein Produkt verteilt
      const share = 0.35 + rng() * 0.25;
      return Math.round((tp.gesamtmenge * share) / 10) * 10;
    }),
  }));

  // make sure values <= gesamtmenge per Teilprozess
  for (let i = 0; i < teil.length; i++) {
    const sum = zuteilung[0].values[i] + zuteilung[1].values[i];
    if (sum > teil[i].gesamtmenge) {
      const overflow = sum - teil[i].gesamtmenge;
      zuteilung[0].values[i] -= Math.ceil(overflow / 2);
      zuteilung[1].values[i] -= Math.floor(overflow / 2);
    }
  }

  const payload: PkrPayload = {
    kind: "pkr-table",
    unternehmen: firma,
    produkte: [pA, pB],
    teilprozesse: teil,
    zuteilung,
  };

  // Compute solutions
  const variableKostenSatz = teil.map((tp) => (tp.gesamt - tp.fix) / tp.gesamtmenge);
  const fixSatz = teil.map((tp) => tp.fix / tp.gesamtmenge);
  const gesamtSatz = teil.map((tp) => tp.gesamt / tp.gesamtmenge);

  function produktKosten(prodIdx: number) {
    return teil.reduce(
      (sum, _tp, i) =>
        sum + zuteilung[prodIdx].values[i] * gesamtSatz[i],
      0,
    );
  }
  const kostenA = produktKosten(0);
  const kostenB = produktKosten(1);
  const aufträgeA = zuteilung[0].values[0];
  const aufträgeB = zuteilung[1].values[0];
  const proAuftragA = kostenA / aufträgeA;

  // Texte für Aufgabenstellung
  const massEinsing = teilprozessTemplates[0].measureSingular;

  const intro =
    `Die ${firma} stellt zwei Produkte her: Produkt ${pA} und Produkt ${pB}. ` +
    `Um die Gemeinkosten besser zu analysieren, setzt das Unternehmen die Prozesskostenrechnung ein. ` +
    `Es wurden folgende vier Teilprozesse identifiziert.`;

  const subTasks: ExamSubTask[] = [
    {
      label: "1.",
      points: 2,
      prompt:
        "Geben Sie an, ob die angegebenen Teilprozesse leistungsmengeninduzierte oder leistungsmengenneutrale Prozesse sind.",
      expected:
        teil
          .map((tp) => `• ${tp.name}: leistungsmengeninduziert (lmi)`)
          .join("\n") +
        "\n\nBegründung: Alle vier Prozesse besitzen eine Maßgröße, die direkt mit der Leistung schwankt. Es liegen daher lmi-Prozesse vor.",
      grading: ["Alle vier korrekt eingeordnet", "Begründung erkennbar"],
    },
    {
      label: "2.",
      points: 4,
      prompt: "Berechnen Sie die variablen Prozesskostensätze der vier Prozesse.",
      expected: teil
        .map((tp, i) => {
          const variabel = tp.gesamt - tp.fix;
          return `• ${tp.name}: variable Kosten = ${fmt(tp.gesamt)} − ${fmt(tp.fix)} = ${fmt(variabel)} €.\n  Satz = ${fmt(variabel)} / ${fmt(tp.gesamtmenge)} = ${fmt(variableKostenSatz[i])} € / ${tp.measureLabel.toLowerCase().replace("anzahl ", "")}.`;
        })
        .join("\n"),
      grading: [
        "Variable Kosten pro Prozess gebildet (Gesamt − Fix)",
        "Satz = variable Kosten / Gesamtmenge der Maßgröße",
        "Einheiten korrekt mitgeführt",
      ],
    },
    {
      label: "3.",
      points: 8,
      prompt:
        "Berechnen Sie die gesamten Prozesskosten für beide Produkte unter der Annahme, dass die Fixkosten anteilig zur Maßgröße auf die Produkte verteilt werden.",
      expected:
        `Gesamtprozesskostensatz pro Maßgröße = (Gesamtkosten / Gesamtmenge):\n` +
        teil
          .map(
            (tp, i) =>
              `• ${tp.name}: ${fmt(tp.gesamt)} / ${fmt(tp.gesamtmenge)} = ${fmt(gesamtSatz[i])} €`,
          )
          .join("\n") +
        `\n\nProdukt ${pA}:\n` +
        teil
          .map(
            (tp, i) =>
              `• ${tp.name}: ${fmt(zuteilung[0].values[i])} × ${fmt(gesamtSatz[i])} = ${fmt(zuteilung[0].values[i] * gesamtSatz[i])} €`,
          )
          .join("\n") +
        `\nGesamt Produkt ${pA} = ${fmt(kostenA)} €` +
        `\n\nProdukt ${pB}:\n` +
        teil
          .map(
            (tp, i) =>
              `• ${tp.name}: ${fmt(zuteilung[1].values[i])} × ${fmt(gesamtSatz[i])} = ${fmt(zuteilung[1].values[i] * gesamtSatz[i])} €`,
          )
          .join("\n") +
        `\nGesamt Produkt ${pB} = ${fmt(kostenB)} €`,
      grading: [
        "Gesamtprozesskostensatz korrekt gebildet",
        "Pro Produkt alle 4 Prozesse summiert",
        "Zwischenwerte hingeschrieben",
      ],
    },
    {
      label: "4.",
      points: 2,
      prompt: `Berechnen Sie die insgesamten Prozesskosten pro ${massEinsing} für das Produkt ${pA}.`,
      expected: `Gesamtkosten Produkt ${pA} = ${fmt(kostenA)} €. Anzahl ${massEinsing.toLowerCase()} (Produkt ${pA}) = ${aufträgeA}.\nProzesskosten pro ${massEinsing} = ${fmt(kostenA)} / ${aufträgeA} = ${fmt(proAuftragA)} €.\n\n(Vergleichswert Produkt ${pB} = ${fmt(kostenB / aufträgeB)} € / ${massEinsing}.)`,
      grading: ["Korrekter Divisor (Anzahl Maßgröße bei Produkt A)", "Sauberes Ergebnis"],
    },
  ];

  return {
    block: "A4",
    title: "Prozesskostenrechnung",
    points: 16,
    intro,
    payload,
    subTasks,
    commonErrors: [
      "Gesamtkosten direkt durch Gesamtmenge teilen (Fixkosten nicht abgezogen)",
      "Maßgröße einer falschen Position zuweisen",
      "Produktmenge mit Gesamtmenge verwechseln",
      "Zwischenwerte nicht hinschreiben",
    ],
  };
}

// ---------------- A5 Integration ----------------

function buildA5(rng: () => number, variant: "A" | "B"): ExamBlock {
  const sc = pick(INTEGRATION_SCENARIOS, rng);
  const positionen = sc.positionen.map((p) => ({ ...p }));
  const intern = positionen.reduce((s, p) => s + (p.intern ?? 0), 0);
  const extern = positionen.reduce((s, p) => s + (p.extern ?? 0), 0);
  const integrationsgrad = intern / (intern + extern);

  // change scenario: position changeRowName komplett intern
  const changeIdx = positionen.findIndex((p) => p.name === sc.changeRowName);
  const before = positionen[changeIdx];
  const newIntern = (before.intern ?? 0) + sc.changeIntern;
  const externBefore = before.extern ?? 0;
  const newInternSum = intern + sc.changeIntern;
  const newExternSum = extern - externBefore;
  const newIntegrationsgrad = newInternSum / (newInternSum + newExternSum);

  const payload: IntegrationPayload = {
    kind: "integration-table",
    unternehmen: sc.unternehmen,
    branche: sc.branche,
    scenario: sc.intro + " " + sc.zukauf,
    zukauf: sc.zukauf,
    measure: sc.measure,
    rows: positionen,
    changeRowIndex: changeIdx,
    changeIntern: sc.changeIntern,
    changeExternBefore: externBefore,
  };

  const subTasks: ExamSubTask[] = [
    {
      label: "1.",
      points: 2,
      prompt:
        "Erläutern Sie den Unterschied zwischen horizontaler und vertikaler Integration anhand der obigen Situation. Bitte antworten Sie in ganzen Sätzen.",
      expected: `Vertikale Integration meint die Ausweitung entlang der Wertschöpfungskette: rückwärts (Lieferantenstufe übernehmen) oder vorwärts (Vertriebs-/Kundenstufe übernehmen). Im Beispiel der ${sc.unternehmen} wäre dies die Übernahme des Zulieferers für ${sc.rueckwaertsKomponente}.\nHorizontale Integration meint dagegen den Zusammenschluss auf derselben Wertschöpfungsstufe, z. B. die Übernahme eines Konkurrenten in einer anderen Region – im Beispiel ist das die Übernahme des kleineren Konkurrenten.`,
      grading: [
        "Beide Integrationsarten korrekt definiert",
        "Bezug zur Situation",
        "Vollständige Sätze",
      ],
    },
    {
      label: "2.",
      points: variant === "A" ? 3 : 2,
      prompt: `Ordnen Sie die folgenden Maßnahmen jeweils als vertikale (Rückwärts- oder Vorwärts-) oder horizontale Integration ein. Begründen Sie kurz.\n(a) ${sc.rueckwaerts}\n(b) ${sc.horizontal}`,
      expected: `(a) Rückwärtsintegration – ${sc.unternehmen} übernimmt eine vorgelagerte Stufe (Zulieferer für ${sc.rueckwaertsKomponente}).\n(b) Horizontale Integration – Zusammenschluss mit einem direkten Konkurrenten auf derselben Wertschöpfungsstufe.`,
      grading: [
        "Korrekte Einordnung beider Maßnahmen",
        "Begründung mit Stufenbezug",
      ],
    },
    {
      label: "3 (a)",
      points: 3,
      prompt: `Berechnen Sie den Integrationsgrad ${sc.measure}.`,
      expected:
        `Σ interne Leistungen = ${fmt(intern)} €; Σ fremdbezogene Leistungen = ${fmt(extern)} €.\n` +
        `Integrationsgrad = Σ intern / (Σ intern + Σ extern) = ${fmt(intern)} / ${fmt(intern + extern)} = ${(integrationsgrad * 100).toFixed(1)} %.`,
      grading: ["Σ intern und Σ extern korrekt", "Formel sauber angewendet"],
    },
    {
      label: "3 (b)",
      points: 3,
      prompt: `Die ${sc.unternehmen} plant, die ${sc.changeRowName} künftig komplett selbst zu fertigen. Dadurch steigen die internen Kosten um ${fmt(sc.changeIntern)} €, die externen entsprechend sinken auf 0 €. Berechnen Sie den neuen Integrationsgrad.`,
      expected:
        `Neue Σ intern = ${fmt(intern)} + ${fmt(sc.changeIntern)} = ${fmt(newInternSum)} €.\n` +
        `Neue Σ extern = ${fmt(extern)} − ${fmt(externBefore)} = ${fmt(newExternSum)} €.\n` +
        `Neuer Integrationsgrad = ${fmt(newInternSum)} / ${fmt(newInternSum + newExternSum)} = ${(newIntegrationsgrad * 100).toFixed(1)} %.`,
      grading: [
        "Beide Summen aktualisiert",
        "Neue Quote in Prozent",
        "Plausibilität: Quote steigt",
      ],
    },
    {
      label: "3 (c)",
      points: 2,
      prompt:
        "Benennen sowie erläutern Sie mindestens einen Vor- und einen Nachteil, den diese Entscheidung mit sich bringt. Die Antwort soll in vollständigen Sätzen erfolgen.",
      expected: `Vorteile: höherer Integrationsgrad bedeutet mehr Wertschöpfung im eigenen Unternehmen, bessere Kontrolle über Qualität und Termintreue, weniger Abhängigkeit vom Zulieferer für ${sc.changeRowName}. Auch Know-how bleibt im Haus.\nNachteile: höhere Fixkosten und Investitionen für Maschinen/Personal, geringere Flexibilität, Risiko der Auslastungsschwankungen, Bürokratie und Koordinationsaufwand steigen.`,
      grading: [
        "Mindestens je ein Vor- und Nachteil",
        "Vollständige Sätze",
      ],
    },
  ];

  return {
    block: "A5",
    title: "Wertschöpfung & Integration",
    points: variant === "A" ? 13 : 12,
    intro: sc.intro + "\n\n" + sc.zukauf + " Beide Unternehmen stellen ähnliche Produkte her, arbeiten aber mit unterschiedlichen Zulieferern.",
    payload,
    subTasks,
    commonErrors: [
      "Vorleistung / Leistung statt Wertschöpfung / Leistung",
      "Rückwärts/Vorwärts aus Sicht des Produkts statt des Unternehmens",
      "Quote nicht in Prozent angegeben",
    ],
  };
}

// ---------------- A6 Petri ----------------

import { petriNets } from "./petriNets";

function analyzePetriNet(net: PetriNet) {
  type Marking = Record<string, number>;
  const placeIds = net.places.map((p) => p.id);
  const initial: Marking = {};
  net.places.forEach((p) => (initial[p.id] = p.tokens));

  const enabled = (m: Marking, tid: string) => {
    const inputs = net.arcs.filter((a) => a.to === tid);
    return inputs.every((a) => (m[a.from] ?? 0) >= 1);
  };
  const fire = (m: Marking, tid: string) => {
    const next = { ...m };
    for (const a of net.arcs.filter((arc) => arc.to === tid)) next[a.from] -= 1;
    for (const a of net.arcs.filter((arc) => arc.from === tid)) {
      next[a.to] = (next[a.to] ?? 0) + 1;
    }
    return next;
  };
  const key = (m: Marking) => placeIds.map((p) => `${p}=${m[p] ?? 0}`).join(",");

  const seen = new Map<string, Marking>();
  seen.set(key(initial), initial);
  const queue = [initial];
  const fired = new Set<string>();
  let dead = false;
  let limit = 200;
  while (queue.length && limit-- > 0) {
    const m = queue.shift()!;
    let any = false;
    for (const t of net.transitions) {
      if (enabled(m, t.id)) {
        any = true;
        fired.add(t.id);
        const n = fire(m, t.id);
        const k = key(n);
        if (!seen.has(k)) {
          seen.set(k, n);
          queue.push(n);
        }
      }
    }
    if (!any) dead = true;
  }
  let kVal = 0;
  for (const m of seen.values()) {
    for (const p of placeIds) kVal = Math.max(kVal, m[p] ?? 0);
  }
  const enabledInitial = net.transitions
    .filter((t) => enabled(initial, t.id))
    .map((t) => t.id);

  // fire counts: für jede aktivierbare Transition wie oft kann sie ab Start
  // theoretisch feuern (durch BFS - Heuristik = Anzahl Markierungen wo
  // sie aktiviert ist; bei Schleifen "unbegrenzt" wenn kVal hoch wird)
  const fireCounts: Record<string, number> = {};
  net.transitions.forEach((t) => {
    let count = 0;
    for (const m of seen.values()) if (enabled(m, t.id)) count++;
    fireCounts[t.id] = count;
  });

  return {
    enabledInitial,
    fireCounts,
    reachableCount: seen.size,
    k: kVal,
    isSafe: kVal === 1,
    isDeadlockFree: !dead,
    isLive: fired.size === net.transitions.length,
  };
}

function buildA6(rng: () => number): ExamBlock {
  const net = pick(petriNets, rng);
  const a = analyzePetriNet(net);
  const payload: PetriExamPayload = {
    kind: "petri-net",
    net,
    enabledInitial: a.enabledInitial,
    fireCounts: a.fireCounts,
    reachableCount: a.reachableCount,
    k: a.k,
    isSafe: a.isSafe,
    isDeadlockFree: a.isDeadlockFree,
    isLive: a.isLive,
  };

  const subTasks: ExamSubTask[] = [
    {
      label: "1.",
      points: 2,
      prompt:
        "Welche Transitionen sind bei der dargestellten Markierung aktiviert und wie oft können diese ausgehend von der Startmarkierung feuern?",
      expected:
        `Initial aktiviert: ${a.enabledInitial.join(", ") || "keine"}.\n` +
        Object.entries(a.fireCounts)
          .map(
            ([t, c]) =>
              `• ${t}: in ${c} erreichbarer Markierung(en) aktiviert ${c > 1 ? "(kann mehrfach feuern)" : ""}`,
          )
          .join("\n"),
      grading: [
        "Aktivierungsregel angewendet (alle Inputs müssen Token haben)",
        "Pro Transition begründet, wie oft feuern möglich",
      ],
    },
    {
      label: "2.",
      points: 6,
      prompt:
        "Erstellen Sie den zum Petrinetz gehörenden Erreichbarkeitsgraphen.",
      expected: `Der Erreichbarkeitsgraph hat ${a.reachableCount} Markierungen. Knoten = Markierungsvektoren, Kanten = gefeuerte Transitionen. Skizze: vom Startvektor M₀ aus jede aktivierte Transition feuern, neue Markierungen als neue Knoten anlegen, bis keine neuen Markierungen mehr entstehen.`,
      grading: [
        "Initialmarkierung korrekt",
        "Alle erreichbaren Markierungen vorhanden",
        "Kanten mit Transitionen beschriftet",
      ],
    },
    {
      label: "3.",
      points: 2,
      prompt: "Ist das Petrinetz k-beschränkt? Wenn ja, geben Sie bitte k mit an.",
      expected: a.k > 0
        ? `Ja, das Netz ist ${a.k}-beschränkt: keine Stelle hat in einer erreichbaren Markierung mehr als ${a.k} Token.`
        : "Nein, das Netz ist nicht beschränkt.",
      grading: [
        "Maximales Token-Vorkommen über alle erreichbaren Markierungen geprüft",
        "k explizit benannt",
      ],
    },
    {
      label: "4.",
      points: 4,
      prompt:
        "Ist das Petrinetz sicher, deadlockfrei und lebendig? Begründen Sie jeweils Ihre Wahl.",
      expected:
        `• Sicher: ${a.isSafe ? "Ja, da kein Stelle mehr als 1 Token in einer erreichbaren Markierung enthält." : `Nein, in mindestens einer Markierung gibt es eine Stelle mit ${a.k} Token.`}\n` +
        `• Deadlockfrei: ${a.isDeadlockFree ? "Ja, in jeder erreichbaren Markierung ist mindestens eine Transition aktivierbar." : "Nein, es existiert eine erreichbare Markierung ohne aktive Transitionen."}\n` +
        `• Lebendig: ${a.isLive ? "Ja, jede Transition kann von jeder erreichbaren Markierung aus erneut aktiviert werden." : "Nein, mindestens eine Transition wird nie aktiviert (tot)."}`,
      grading: [
        "Drei Eigenschaften einzeln beurteilt",
        "Pro Eigenschaft eine Begründung",
        "Differenzierung zwischen deadlockfrei und lebendig",
      ],
    },
  ];

  return {
    block: "A6",
    title: "Petrinetz",
    points: 14,
    intro: `Wir betrachten folgendes Petrinetz mit angegebener Markierung (Netz: '${net.name}'). Stellen sind weiße Kreise, Transitionen schwarze Rechtecke, Token schwarze Punkte.`,
    payload,
    subTasks,
    commonErrors: [
      "Aktivierung mit nur einem Input prüfen statt mit allen",
      "Sicherheit nur an der Startmarkierung beurteilen",
      "Deadlockfreiheit mit Lebendigkeit verwechseln",
    ],
  };
}

// ---------------- A7 BPMN ----------------

function buildA7(rng: () => number): ExamBlock {
  const sc = pick(BPMN_SZENARIEN, rng);
  return {
    block: "A7",
    title: "BPMN-Modellierung",
    points: 12,
    intro:
      sc.intro +
      "\n\nProzessbeschreibung:\n" +
      sc.steps.map((s, i) => `${i + 1}. ${s}`).join("\n") +
      "\n\nModellieren Sie den oben beschriebenen Prozess nach BPMN 2.0.\nHinweise:\n" +
      sc.hinweise.map((h) => "• " + h).join("\n"),
    payload: { kind: "none" },
    subTasks: [
      {
        label: "(BPMN-Modell)",
        points: 12,
        prompt:
          "Modellieren Sie den oben beschriebenen Prozess End-to-End nach BPMN 2.0.",
        expected: sc.loesungSchritte.map((s) => "• " + s).join("\n"),
        grading: [
          "Pools getrennt für Kunde und Unternehmen",
          "Sequenzfluss innerhalb der Pools, Nachrichtenfluss zwischen Pools",
          "XOR-Gateways korrekt verwendet (split + join)",
          "Schleifen für Nachforderung modelliert",
          "End-Events vorhanden",
          "Aktivitäten klar mit Verb + Substantiv beschriftet",
        ],
      },
    ],
    commonErrors: [
      "Sequenzfluss zwischen Pools statt Nachrichtenfluss",
      "Schleife bei Nachforderung vergessen",
      "Pfade ohne End-Event",
      "Tasks wie Ereignisse benannt",
    ],
  };
}

// ---------------- A8 Process Mining ----------------

function buildA8(rng: () => number): ExamBlock {
  const log = pick(EVENTLOGS, rng);
  const model = pick(PROCESS_MODELS, rng);
  const fpLog = pick(FOOTPRINT_LOGS, rng);

  // Mask 5-7 cells in footprint matrix
  const cellsToFill: Array<{ a: string; b: string; correct: string }> = [];
  for (const a of fpLog.activities) {
    for (const b of fpLog.activities) {
      if (a !== b) cellsToFill.push({ a, b, correct: fpLog.matrix[a][b] });
    }
  }
  // pick 6 random gaps
  const gaps = pickN(cellsToFill, 6, rng);

  const traceList = Object.entries(log.expectedTraces);

  const payload: ProcessModelTracePayload = {
    kind: "process-model",
    description: model.description,
    activities: model.activities,
    completeTraces: model.completeTraces,
    traceCheck: model.traceCheck,
    completeTracesCount: model.completeTracesCount,
    footprintLog: fpLog.display,
    footprintActivities: fpLog.activities,
    footprintMatrix: fpLog.matrix,
  };

  const subTasks: ExamSubTask[] = [
    {
      label: "1.",
      points: 2,
      prompt:
        "Erläutern Sie kurz den Unterschied zwischen einem Petrinetz und einem Workflownetz im Kontext der Prozessmodellierung.",
      expected:
        "Ein Petrinetz ist ein allgemeines bipartites Modell aus Stellen, Transitionen und Token. Ein Workflownetz ist ein spezielles Petrinetz mit genau einer Quelle (Start), genau einer Senke (Ende) und der Eigenschaft, dass jede Transition und jede Stelle auf einem Pfad von Quelle zu Senke liegt. Workflownetze modellieren also Prozessinstanzen mit klarem Anfang und Ende.",
      grading: [
        "Allgemeine Petrinetz-Definition",
        "Workflownetz-Bedingungen genannt",
        "Bezug zur Prozessmodellierung",
      ],
    },
    {
      label: "2 (a)",
      points: 2,
      prompt: "Benennen Sie die Elemente, die ein Eventlog mindestens haben muss.",
      expected:
        "Pflichtfelder: Case ID, Activity (Aktivität), Timestamp (Zeitstempel). Optional: Resource, Lifecycle, Kosten u. a.",
      grading: ["Drei Pflichtfelder genannt"],
    },
    {
      label: "2 (b)",
      points: 1,
      prompt: "Geben Sie die Aktivitäten an, die in dem dargestellten Eventlog vorkommen.",
      expected:
        "Aktivitäten: " +
        Array.from(
          new Set(traceList.flatMap(([_, t]) => t)),
        ).join(", "),
      grading: ["Vollständige Liste"],
    },
    {
      label: "2 (c)",
      points: 2,
      prompt: "Geben Sie zwei traces aus dem Eventlog an.",
      expected: traceList
        .slice(0, 2)
        .map(([cid, tr]) => `• ${cid}: ⟨${tr.join(", ")}⟩`)
        .join("\n"),
      grading: [
        "Pro Trace nach Timestamp sortiert",
        "Trace-Schreibweise mit Klammern",
      ],
    },
    {
      label: "3 (a)",
      points: 3,
      prompt: `Welche der folgenden Traces sind im Prozessmodell möglich? (${model.description})`,
      expected: model.traceCheck
        .map((c) => `• ${c.trace} → ${c.possible ? "möglich" : "nicht möglich"}`)
        .join("\n"),
      grading: ["Pro Trace richtige Entscheidung"],
    },
    {
      label: "3 (b)",
      points: 2,
      prompt:
        "Wie viele komplette Traces gibt es für dieses Prozessmodell?",
      expected:
        model.completeTracesCount === "unendlich"
          ? "Unendlich viele, da das Modell eine Schleife enthält und Aktivitäten beliebig oft wiederholt werden können."
          : `Es gibt ${model.completeTracesCount} komplette Traces.`,
      grading: ["Antwort + kurze Begründung"],
    },
    {
      label: "4.",
      points: 6,
      prompt:
        `Gegeben sei folgender Eventlog: ${fpLog.display}.\nVervollständigen Sie den Footprint („Fußabdruck") von L für die folgenden Zellen:\n` +
        gaps.map((g) => `(${g.a}, ${g.b})`).join(", "),
      expected:
        gaps
          .map((g) => `• (${g.a}, ${g.b}) = ${g.correct}`)
          .join("\n") +
        "\n\nLegende: → Kausalität, ← inverse Kausalität, ∥ Parallelität, # keine direkte Beziehung.",
      grading: [
        "Jede Zelle korrekt aus den Traces abgeleitet",
        "Beide Richtungen geprüft",
      ],
    },
  ];

  return {
    block: "A8",
    title: "Process Mining",
    points: 18,
    intro:
      "Im Folgenden betrachten wir Konzepte des Process minings sowie Teile des α-Algorithmus.",
    payload: { kind: "eventlog" } as ExamPayload, // Eventlog payload separat unten
    subTasks,
    commonErrors: [
      "Reihenfolge im Eventlog mit Reihenfolge im Trace verwechseln",
      "Beim Footprint nur eine Richtung prüfen",
      "Schleifen-Modell als endlich behandeln",
    ],
  };
}

// ---------------- Top-level generator ----------------

export interface GeneratedExam {
  seed: number;
  generatedAt: number;
  variante: "A" | "B";
  totalPoints: number;
  blocks: ExamBlock[];
}

export function generateExam(seed: number = Date.now()): GeneratedExam {
  const rng = seededRng(seed);
  const variante: "A" | "B" = rng() < 0.5 ? "A" : "B";

  const blocks: ExamBlock[] = [
    buildA1(rng),
    buildA2(rng, variante),
    buildA3(rng, variante),
    buildA4(rng),
    buildA5(rng, variante),
    buildA6(rng),
    buildA7(rng),
    buildA8(rng),
  ];

  // build A8 payload (eventlog)
  const log = pick(EVENTLOGS, rng);
  blocks[7].payload = {
    kind: "eventlog",
    rows: log.events.map((e) => ({
      caseId: e.caseId,
      activity: e.activity,
      timestamp: e.timestamp,
    })),
    activities: Array.from(new Set(log.events.map((e) => e.activity))),
    expectedTraces: log.expectedTraces,
  };

  return {
    seed,
    generatedAt: Date.now(),
    variante,
    totalPoints: blocks.reduce((sum, b) => sum + b.points, 0),
    blocks,
  };
}

// ---------------- Export as text ----------------

export function exportExamAsText(
  exam: GeneratedExam,
  includeSolution: boolean,
): string {
  const lines: string[] = [];
  lines.push("DGP Klausur – generiert");
  lines.push(`Variante: ${exam.variante}   Seed: ${exam.seed}`);
  lines.push(`Datum: ${new Date(exam.generatedAt).toLocaleString("de-DE")}`);
  lines.push(`Gesamtpunkte: ${exam.totalPoints}`);
  lines.push("");
  lines.push("Punkte: " + exam.blocks.map((b) => `${b.block}=${b.points}`).join("  "));
  lines.push("");
  for (const block of exam.blocks) {
    lines.push("================================================");
    lines.push(`${block.block} – ${block.title} (${block.points} Punkte)`);
    lines.push("================================================");
    lines.push(block.intro);
    lines.push("");
    if (block.payload.kind === "pkr-table") {
      lines.push(renderPkrTable(block.payload));
      lines.push("");
    } else if (block.payload.kind === "integration-table") {
      lines.push(renderIntegrationTable(block.payload));
      lines.push("");
    } else if (block.payload.kind === "eventlog") {
      lines.push(renderEventLog(block.payload as any));
      lines.push("");
    } else if (block.payload.kind === "scenario") {
      lines.push("Prozesse:");
      for (const p of (block.payload as ScenarioPayload).prozesse) {
        lines.push(`• ${p.name}`);
      }
      lines.push("");
    }
    for (const sub of block.subTasks) {
      lines.push(`${sub.label} (${sub.points} P)  ${sub.prompt}`);
      lines.push("");
      lines.push("Deine Antwort:");
      lines.push("");
      lines.push("");
      if (includeSolution) {
        lines.push("--- Musterlösung ---");
        lines.push(sub.expected);
        lines.push("Bewertung: " + sub.grading.join("; "));
        lines.push("");
      }
    }
    if (includeSolution && block.commonErrors.length) {
      lines.push("Typische Fehler: " + block.commonErrors.join("; "));
      lines.push("");
    }
  }
  return lines.join("\n");
}

function renderPkrTable(p: PkrPayload): string {
  const out: string[] = [];
  out.push(`Unternehmen: ${p.unternehmen} – Produkte: ${p.produkte[0]}, ${p.produkte[1]}`);
  out.push("Teilprozesse:");
  out.push("Prozess | Gesamtkosten € | Fixkosten € | Maßgröße | Gesamtmenge");
  for (const t of p.teilprozesse) {
    out.push(
      `${t.name} | ${t.gesamt.toLocaleString("de-DE")} | ${t.fix.toLocaleString("de-DE")} | ${t.measureLabel} | ${t.gesamtmenge.toLocaleString("de-DE")}`,
    );
  }
  out.push("");
  out.push("Verbrauch je Produkt:");
  out.push(`Produkt | ${p.teilprozesse.map((t) => t.measureLabel).join(" | ")}`);
  for (const z of p.zuteilung) {
    out.push(`${z.name} | ${z.values.join(" | ")}`);
  }
  return out.join("\n");
}

function renderIntegrationTable(p: IntegrationPayload): string {
  const out: string[] = [];
  out.push(`Kostenstruktur ${p.measure}:`);
  out.push("Position | intern € | fremdbezogen €");
  for (const r of p.rows) {
    out.push(`${r.position} | ${r.intern ?? "-"} | ${r.extern ?? "-"}`);
  }
  return out.join("\n");
}

function renderEventLog(p: { rows: Array<{ caseId: string; activity: string; timestamp: string }> }): string {
  const out: string[] = ["Eventlog:", "Case | Activity | Timestamp"];
  for (const r of p.rows) out.push(`${r.caseId} | ${r.activity} | ${r.timestamp}`);
  return out.join("\n");
}
