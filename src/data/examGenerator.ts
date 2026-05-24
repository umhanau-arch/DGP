import type { ExamSubTask } from "../types";

function rand<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickInt(min: number, max: number, rng: () => number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const definitionPool: Array<{ term: string; expected: string }> = [
  {
    term: "Geschäftsprozess",
    expected:
      "Wiederholbare Folge logisch zusammenhängender Aktivitäten, die Input in einen für interne oder externe Kunden wertvollen Output umwandelt. Beispiel: Order-to-Cash.",
  },
  {
    term: "Workflow",
    expected:
      "Ein Geschäftsprozess, der ganz oder teilweise durch ein Informationssystem gesteuert wird. Beispiel: Reisekostenfreigabe in SAP.",
  },
  {
    term: "Eventlog",
    expected:
      "Tabellenartige Sammlung von Events mit mindestens Case ID, Activity und Timestamp. Beispiel: ERP-Transaktionsprotokoll.",
  },
  {
    term: "ARIS",
    expected:
      "Architektur integrierter Informationssysteme nach Scheer mit Funktions-, Organisations-, Daten-, Leistungs- und Steuerungssicht.",
  },
  {
    term: "Effizienz",
    expected:
      "Mit minimalem Ressourceneinsatz arbeiten - die Dinge richtig tun.",
  },
  {
    term: "Effektivität",
    expected:
      "Die richtigen Ziele erreichen - die richtigen Dinge tun.",
  },
  {
    term: "Workflow-Engine",
    expected:
      "Software, die ausführbare Prozessmodelle (z. B. BPMN 2.0) interpretiert und Aufgaben verteilt.",
  },
  {
    term: "Prozesslandkarte",
    expected:
      "Übersichtliche Darstellung der wichtigsten Prozesse eines Unternehmens, gegliedert in Management-, Kern- und Supportprozesse.",
  },
  {
    term: "Mass Customization",
    expected:
      "Individualisierte Produkte zu Kosten, die nahe an der Massenproduktion liegen.",
  },
  {
    term: "Digital Twin",
    expected:
      "Virtuelles Abbild eines realen Produkts oder Prozesses, das mit Echtzeitdaten verbunden ist.",
  },
];

const cycleScenarios: Array<{ scenario: string; analysis: string }> = [
  {
    scenario:
      "Online-Shop hat lange Lieferzeiten. Geschäftsführung führt sofort eine neue Software ein. Nach 3 Monaten wird der Erfolg gemessen.",
    analysis:
      "Übersprungen wurden Erhebung (Ist-Modell), Analyse (Ursachen) und Verbesserung (Soll-Modell). Korrekte Reihenfolge: Identifikation -> Erhebung -> Analyse -> Verbesserung -> Einführung -> Überwachung.",
  },
  {
    scenario:
      "Bank hat hohe Fehlerquote im Kreditprozess. Sie setzen direkt einen externen Berater ein, der einen neuen Prozess vorschlägt - ohne den aktuellen aufzunehmen.",
    analysis:
      "Erhebung und Analyse fehlen. Ohne Ist-Aufnahme + Ursachenanalyse löst der Soll-Prozess die echten Schwachstellen nicht.",
  },
  {
    scenario:
      "Logistikfirma plant neue ERP-Module ein, ohne Prozesse zu identifizieren oder zu priorisieren.",
    analysis:
      "Die Phase der Prozessidentifikation fehlt. Es ist unklar, ob die richtigen Prozesse adressiert werden.",
  },
];

const prozessartCases: Array<{ description: string; solution: string }> = [
  {
    description:
      "Online-Shop für nachhaltige Mode. Ordne zu: (a) Bestellabwicklung, (b) Personalverwaltung, (c) strategische Sortimentsplanung.",
    solution:
      "(a) Kernprozess (direkter Kundennutzen). (b) Supportprozess (intern unterstützend). (c) Managementprozess (steuert das Sortiment strategisch).",
  },
  {
    description:
      "IT-Beratungsunternehmen. Ordne zu: (a) Beratungsprojekt-Durchführung, (b) interne Buchhaltung, (c) Geschäftsstrategie.",
    solution:
      "(a) Kernprozess. (b) Supportprozess. (c) Managementprozess.",
  },
  {
    description:
      "Tesla-Werk. Ordne zu: (a) Batteriefertigung, (b) Lohnbuchhaltung, (c) Investitionsplanung.",
    solution:
      "(a) Kernprozess (Produkt). (b) Supportprozess. (c) Managementprozess.",
  },
];

function buildPkrTask(rng: () => number): ExamSubTask {
  const fix = pickInt(20, 60, rng) * 1000;
  const variableShare = pickInt(60, 110, rng) * 1000;
  const total = fix + variableShare;
  const measureUnits = pickInt(6, 12, rng) * 1000;
  const productA = pickInt(3, 9, rng) * 100;
  const productB = pickInt(8, 18, rng) * 100;
  const rate = variableShare / measureUnits;
  return {
    block: "A4",
    title: "Prozesskostenrechnung",
    points: 16,
    prompt:
      `Gesamtkosten ${total.toLocaleString("de-DE")} EUR, Fixkosten ${fix.toLocaleString(
        "de-DE",
      )} EUR, Maßgröße ${measureUnits.toLocaleString("de-DE")} Bestellungen. ` +
      `Produkt A nutzt ${productA} Bestellungen, Produkt B nutzt ${productB} Bestellungen. ` +
      `Berechne variable Prozesskosten, variablen Prozesskostensatz und variable Prozesskosten von A und B.`,
    expected: `Variable Prozesskosten = ${variableShare.toLocaleString("de-DE")} EUR. ` +
      `Variabler Prozesskostensatz = ${rate.toFixed(2)} EUR / Bestellung. ` +
      `Produkt A: ${(rate * productA).toFixed(2)} EUR. Produkt B: ${(rate * productB).toFixed(2)} EUR.`,
    grading: [
      "Trennung Fixkosten / variable Kosten",
      "Korrekte Maßgröße",
      "Variabler Prozesskostensatz",
      "Produktbelastung A und B",
      "Nachvollziehbarer Rechenweg",
    ],
    commonErrors: [
      `Gesamtkosten / Maßgröße statt variable / Maßgröße`,
      "Produktmenge mit Gesamtmenge verwechseln",
      "Zwischenwerte nicht hinschreiben",
    ],
  };
}

function buildIntegrationTask(rng: () => number): ExamSubTask {
  const leistung = pickInt(600, 1200, rng) * 1000;
  const vorleistung = pickInt(300, leistung / 1000 - 100, rng) * 1000;
  const wert = leistung - vorleistung;
  const grad = (wert / leistung) * 100;
  return {
    block: "A5",
    title: "Wertschöpfung und Integration",
    points: 13,
    prompt:
      `Leistung ${leistung.toLocaleString("de-DE")} EUR, Vorleistung ${vorleistung.toLocaleString(
        "de-DE",
      )} EUR. Berechne Wertschöpfung und Integrationsgrad. Erkläre Rückwärtsintegration anhand eines Beispiels.`,
    expected:
      `Wertschöpfung = ${wert.toLocaleString("de-DE")} EUR. Integrationsgrad = ${grad.toFixed(
        1,
      )} %. Rückwärtsintegration: Unternehmen übernimmt Lieferantenleistung selbst (z. B. eigene Batteriefertigung).`,
    grading: [
      "Formel Wertschöpfung",
      "Rechnung korrekt",
      "Integrationsgrad in Prozent",
      "Erklärung Rückwärtsintegration mit Beispiel",
    ],
    commonErrors: [
      "Vorleistung / Leistung statt Wertschöpfung / Leistung",
      "Rückwärts/Vorwärts aus Sicht des Produkts deuten",
    ],
  };
}

function buildPetriTask(rng: () => number): ExamSubTask {
  const variant = pickInt(0, 2, rng);
  if (variant === 0) {
    return {
      block: "A6",
      title: "Petrinetze",
      points: 14,
      prompt:
        "Netz: p1=1 Token. t1: p1 → p2, p3. t2: p2 → p4. t3: p3 → p4. " +
        "Bestimme aktivierte Transitionen initial. Welche Markierungen sind nach t1 erreichbar? Ist das Netz sicher? Begründe.",
      expected:
        "Initial: nur t1 aktiviert. Nach t1: p2=1, p3=1; t2 und t3 aktiviert. Nach t2 und t3 (oder umgekehrt): p4=2 -> nicht sicher (1-beschränkt verletzt).",
      grading: [
        "Aktivierung initial",
        "Feuerregel angewendet",
        "Erreichbare Markierungen",
        "Sicherheit begründet",
      ],
      commonErrors: [
        "t2 oder t3 als initial aktiviert nennen",
        "Sicherheit nur an Startmarkierung beurteilen",
      ],
    };
  }
  if (variant === 1) {
    return {
      block: "A6",
      title: "Petrinetze",
      points: 14,
      prompt:
        "Netz: p1=1, p2=1. t1: p1+p2 → p3. t2: p2 → p4. " +
        "Welche Transitionen sind initial aktiviert? Gibt es einen Deadlock?",
      expected:
        "Beide Transitionen sind initial aktiviert. Wenn t2 zuerst feuert, fehlt t1 ein Input -> Deadlock möglich (p1=1, p4=1, alles andere leer, keine Transition aktivierbar).",
      grading: [
        "Aktivierung erkannt",
        "Konflikt benannt",
        "Deadlock-Markierung beschrieben",
      ],
      commonErrors: ["Konflikt übersehen", "Deadlock mit Lebendigkeit gleichsetzen"],
    };
  }
  return {
    block: "A6",
    title: "Petrinetze",
    points: 14,
    prompt:
      "Konstruiere den Erreichbarkeitsgraph für: M0=(1,0). t1: p1 → p2. t2: p2 → p1. " +
      "Welche Markierungen sind erreichbar?",
    expected:
      "M0=(1,0) und M1=(0,1). Übergänge: M0 -t1-> M1 -t2-> M0. Netz ist beschränkt, lebendig und deadlockfrei.",
    grading: ["Markierungen genannt", "Übergänge beschrieben", "Eigenschaften begründet"],
    commonErrors: ["Endlich = unbeschränkt verwechseln", "Lebendigkeit ohne Begründung"],
  };
}

function buildBpmnTask(rng: () => number): ExamSubTask {
  const cases = [
    {
      prompt:
        "Modelliere als BPMN: Kunde sendet Reklamation. Unternehmen prüft Vollständigkeit. Bei fehlenden Angaben fordert es nach. Bei vollständig prüft es Anspruch und entscheidet zwischen Ersatz oder Ablehnung. Antwort geht zurück an den Kunden.",
      expected:
        "Pool Kunde + Pool Unternehmen. Nachrichtenfluss Reklamation. Im Unternehmens-Pool: Start-Nachrichtenereignis -> Task Vollständigkeit prüfen -> XOR. Bei unvollständig Schleife (Nachricht Nachforderung -> Antwort -> erneute Prüfung). Bei vollständig: Anspruch prüfen -> XOR Ersatz/Ablehnung -> Send-Task -> End-Event. Sequenzfluss innerhalb, Nachrichtenfluss zwischen Pools.",
    },
    {
      prompt:
        "Modelliere als BPMN: Kunde fordert Stornierung. Unternehmen prüft Versandstatus. Falls noch nicht versendet, wird storniert + zurückerstattet. Sonst weist Unternehmen auf Rücksendeverfahren hin.",
      expected:
        "Pool Kunde + Pool Unternehmen. Nachricht 'Stornoanfrage'. Unternehmen: Start-Empfang -> Task 'Versandstatus prüfen' -> XOR. Pfad 'noch nicht versendet': 'Storno bestätigen', 'Rückzahlung anstoßen', Nachricht an Kunden. Pfad 'bereits versendet': 'Hinweis Rücksendeverfahren', Nachricht an Kunden. Beide enden in End-Events.",
    },
    {
      prompt:
        "Modelliere als BPMN: Bestellprozess im Online-Shop. Bonität wird geprüft. Bei negativ -> Ablehnung. Sonst Lager prüft Bestand. Vorhanden -> verpacken + versenden. Nicht vorhanden -> Fertigung produziert nach -> Versand verpackt + versendet.",
      expected:
        "Pool Kunde + Pool Unternehmen mit Lanes Vertrieb, Lager, Fertigung. Nachricht 'Bestellung'. Vertrieb prüft Bonität (XOR). Bei negativ: Send-Task Ablehnung. Sonst: Lager prüft Bestand (XOR). Vorhanden: verpacken+versenden. Nicht vorhanden: Fertigung produzieren, dann verpacken+versenden. Versand-Bestätigung als Nachrichtenfluss.",
    },
  ];
  const c = rand(cases, rng);
  return {
    block: "A7",
    title: "BPMN-Modellierung",
    points: 12,
    prompt: c.prompt,
    expected: c.expected,
    grading: [
      "Pools getrennt für Kunde und Unternehmen",
      "Nachrichtenflüsse zwischen Pools",
      "Korrekte XOR/AND-Gateways",
      "Schleifen / Endpunkte sauber gesetzt",
    ],
    commonErrors: [
      "Sequenzfluss zwischen Pools",
      "Schleife bei Nachforderung vergessen",
      "End-Events fehlen",
    ],
  };
}

function buildMiningTask(rng: () => number): ExamSubTask {
  const variant = pickInt(0, 2, rng);
  if (variant === 0) {
    return {
      block: "A8",
      title: "Process Mining",
      points: 18,
      prompt:
        "Eventlog (Auszug): C1: A 10:00, B 10:05, C 10:10, D 10:15. " +
        "C2: A 10:01, C 10:04, B 10:09, D 10:14. C3: A 10:02, B 10:06, C 10:11, D 10:16. " +
        "Bilde Traces, Varianten und gib die Beziehung B / C im Footprint an.",
      expected:
        "Traces: C1 <A,B,C,D>, C2 <A,C,B,D>, C3 <A,B,C,D>. Varianten: <A,B,C,D> 2x, <A,C,B,D> 1x. " +
        "Direkte Folgen B>C und C>B kommen vor -> B || C (Parallelität).",
      grading: [
        "Case ID gruppieren",
        "Nach Timestamp sortieren",
        "Varianten korrekt zählen",
        "Footprint-Beziehung mit Begründung",
      ],
      commonErrors: ["Reihenfolge vom Log übernehmen", "Nur eine Richtung prüfen"],
    };
  }
  if (variant === 1) {
    return {
      block: "A8",
      title: "Process Mining",
      points: 18,
      prompt:
        "Bestellprozess-Log: 'place order', 'send invoice', 'pay', 'cancel order', 'prepare delivery', 'make delivery', 'confirm payment'. " +
        "Welche Aktivität startet immer zuerst, welche kann zum vorzeitigen Ende führen? Welche Aktivitäten sind parallel?",
      expected:
        "'place order' startet immer zuerst (Quelle). 'cancel order' kann nach 'send invoice' zum vorzeitigen Ende führen. " +
        "'prepare delivery', 'make delivery' und 'confirm payment' können in unterschiedlicher Reihenfolge auftreten -> teilweise parallel.",
      grading: ["Startaktivität erkannt", "Cancel als Sonderpfad erkannt", "Parallelität benannt"],
      commonErrors: ["Cancel als Standardpfad behandeln", "Parallelität ignorieren"],
    };
  }
  return {
    block: "A8",
    title: "Process Mining",
    points: 18,
    prompt:
      "Erkläre den Unterschied zwischen Discovery, Conformance Checking und Performance Diagnostics in Process Mining mit jeweils einem Beispiel.",
    expected:
      "Discovery: aus Log Modell entdecken (z. B. Alpha-Algorithmus). Conformance Checking: Modell mit Log abgleichen, Abweichungen erkennen. Performance Diagnostics: Wartezeiten, Engpässe, Ressourcenauslastung analysieren.",
    grading: ["Drei Arten benannt", "Jede mit Beispiel", "Klare Abgrenzung"],
    commonErrors: ["Discovery und Conformance verwechseln"],
  };
}

export interface GeneratedExam {
  seed: number;
  generatedAt: number;
  totalPoints: number;
  blocks: ExamSubTask[];
}

export function generateExam(seed: number = Date.now()): GeneratedExam {
  const rng = seededRng(seed);
  const def1 = rand(definitionPool, rng);
  const def2 = rand(definitionPool.filter((d) => d.term !== def1.term), rng);
  const def3 = rand(
    definitionPool.filter((d) => d.term !== def1.term && d.term !== def2.term),
    rng,
  );
  const cycle = rand(cycleScenarios, rng);
  const arten = rand(prozessartCases, rng);

  const blocks: ExamSubTask[] = [
    {
      block: "A1",
      title: "Definitionen",
      points: 9,
      prompt: `Erkläre die Begriffe ${def1.term}, ${def2.term} und ${def3.term} mit eigenen Worten und einem Beispiel.`,
      expected: [def1.expected, def2.expected, def3.expected].join(" "),
      grading: [
        "Definition fachlich korrekt",
        "Eigene Worte (nicht Lehrbuch zitieren)",
        "Konkretes Beispiel je Begriff",
      ],
      commonErrors: ["Begriffe ohne Beispiel", "Workflow als reiner Geschäftsprozess erklärt"],
    },
    {
      block: "A2",
      title: "GPM-Lebenszyklus",
      points: 10,
      prompt: cycle.scenario + " Welche Phasen wurden übersprungen? Wie lautet die korrekte Reihenfolge?",
      expected: cycle.analysis,
      grading: [
        "Übersprungene Phasen",
        "Erläuterung pro Phase",
        "Bezug zum Fall",
      ],
      commonErrors: ["Analyse und Verbesserung mischen", "Überwachung als fehlend nennen"],
    },
    {
      block: "A3",
      title: "Prozessarten",
      points: 9,
      prompt: arten.description,
      expected: arten.solution,
      grading: ["Korrekte Kategorie", "Begründung mit Geschäftsmodell"],
      commonErrors: ["Plattform pauschal als Support einordnen"],
    },
    buildPkrTask(rng),
    buildIntegrationTask(rng),
    buildPetriTask(rng),
    buildBpmnTask(rng),
    buildMiningTask(rng),
  ];

  return {
    seed,
    generatedAt: Date.now(),
    totalPoints: blocks.reduce((sum, b) => sum + b.points, 0),
    blocks,
  };
}

export function exportExamAsText(exam: GeneratedExam, includeSolution: boolean): string {
  const lines: string[] = [];
  lines.push("DGP Klausur - generiert");
  lines.push(`Seed: ${exam.seed}`);
  lines.push(`Datum: ${new Date(exam.generatedAt).toLocaleString("de-DE")}`);
  lines.push(`Gesamtpunkte: ${exam.totalPoints}`);
  lines.push("");
  for (const block of exam.blocks) {
    lines.push(`=== ${block.block} - ${block.title} (${block.points} Punkte) ===`);
    lines.push(block.prompt);
    lines.push("");
    lines.push("Deine Antwort:");
    lines.push("");
    lines.push("");
    if (includeSolution) {
      lines.push("--- Musterlösung ---");
      lines.push(block.expected);
      lines.push("Bewertungspunkte: " + block.grading.join("; "));
      lines.push("Typische Fehler: " + block.commonErrors.join("; "));
    }
    lines.push("");
  }
  return lines.join("\n");
}
