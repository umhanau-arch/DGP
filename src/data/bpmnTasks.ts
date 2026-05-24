import type {
  BpmnCaseTask,
  BpmnFlowTask,
  BpmnOrderTask,
  BpmnSymbolTask,
} from "../types";

export const bpmnSymbolTasks: BpmnSymbolTask[] = [
  {
    id: "sym-1",
    prompt: "Was ist ein dünner Kreis (einfach umrandet) in BPMN?",
    options: ["Start-Event", "Zwischenereignis", "End-Event", "Task"],
    correctIndex: 0,
    explain: "Ein dünner Kreis steht für ein Start-Event.",
  },
  {
    id: "sym-2",
    prompt: "Welches Symbol bedeutet 'genau ein Pfad wird gewählt'?",
    options: ["AND-Gateway", "XOR-Gateway", "OR-Gateway", "Subprozess"],
    correctIndex: 1,
    explain: "Raute mit X = XOR (exklusive Entscheidung, genau ein Pfad).",
  },
  {
    id: "sym-3",
    prompt: "Welches Symbol erlaubt parallele Pfade?",
    options: ["XOR", "AND", "Pool", "Lane"],
    correctIndex: 1,
    explain: "Raute mit + = AND (alle Pfade laufen parallel).",
  },
  {
    id: "sym-4",
    prompt: "Was ist ein Pool?",
    options: [
      "Eine Aktivität",
      "Ein eigenständiger Prozessbeteiligter",
      "Eine Rolle innerhalb eines Beteiligten",
      "Ein Gateway",
    ],
    correctIndex: 1,
    explain:
      "Pool = unabhängiger Beteiligter (z. B. Kunde / Unternehmen). Lanes sind Rollen darin.",
  },
  {
    id: "sym-5",
    prompt: "Was zeigt ein dicker Kreis?",
    options: ["Start", "Zwischenereignis", "Ende", "Datenobjekt"],
    correctIndex: 2,
    explain: "Dicker Kreis = End-Event.",
  },
  {
    id: "sym-6",
    prompt: "Was kennzeichnet ein Nachrichtenereignis?",
    options: ["Briefumschlag im Kreis", "Plus im Rechteck", "Pfeil mit Punkt", "Raute mit X"],
    correctIndex: 0,
    explain: "Briefumschlag im Kreis steht für ein Nachrichtenereignis.",
  },
  {
    id: "sym-7",
    prompt: "Wie heißt ein abgerundetes Rechteck mit Verb + Objekt?",
    options: ["Pool", "Task", "Gateway", "Datenobjekt"],
    correctIndex: 1,
    explain: "Task = Aktivität, oft mit 'Verb + Substantiv' beschriftet.",
  },
];

export const bpmnFlowTasks: BpmnFlowTask[] = [
  {
    id: "flow-1",
    prompt: "Kunde sendet Bestellung an Unternehmen.",
    expected: "message",
    explain:
      "Zwischen verschiedenen Pools wird Kommunikation per Nachrichtenfluss modelliert.",
  },
  {
    id: "flow-2",
    prompt: "Vertrieb prüft Bestellung -> Buchhaltung erstellt Rechnung (innerhalb Unternehmens-Pool).",
    expected: "sequence",
    explain: "Innerhalb eines Pools verbindet ein Sequenzfluss zwei Tasks.",
  },
  {
    id: "flow-3",
    prompt: "Lager teilt Status an Kunden mit (verschiedene Pools).",
    expected: "message",
    explain:
      "Pool Lager gehört zum Unternehmen, Pool Kunde ist extern -> Nachrichtenfluss.",
  },
  {
    id: "flow-4",
    prompt: "Im Unternehmens-Pool: Reklamation prüfen -> Anspruch prüfen.",
    expected: "sequence",
    explain: "Tasks in einem Pool werden über Sequenzflüsse verbunden.",
  },
  {
    id: "flow-5",
    prompt: "Unternehmen sendet Status-Mail an Kunden.",
    expected: "message",
    explain: "Pool zu Pool -> Nachrichtenfluss.",
  },
];

export const bpmnOrderTasks: BpmnOrderTask[] = [
  {
    id: "order-1",
    description:
      "Reklamation: Bringe die Schritte des Unternehmens in die richtige Reihenfolge.",
    steps: [
      "Reklamation empfangen",
      "Vollständigkeit prüfen",
      "Bei unvollständig: Nachforderung senden",
      "Anspruch prüfen",
      "Entscheidung Ersatz oder Ablehnung",
      "Antwort an Kunden senden",
    ],
    explain:
      "Erst Eingang, dann Prüfen, ggf. Schleife, dann Entscheidung, dann Antwort. Klassisches Aufgabe-7-Muster.",
  },
  {
    id: "order-2",
    description: "Bestellung im Online-Shop: Reihenfolge im Unternehmen.",
    steps: [
      "Bestellung empfangen",
      "Bonität prüfen",
      "Lagerbestand prüfen",
      "Bei vorhanden: Verpacken",
      "Versenden",
      "Rechnung erstellen",
    ],
    explain:
      "Empfangen -> Bonität -> Lager -> Verpacken/Versenden -> Rechnung.",
  },
];

export const bpmnCaseTasks: BpmnCaseTask[] = [
  {
    id: "case-1",
    title: "Reklamation",
    scenario:
      "Kunde sendet Reklamation. Unternehmen prüft Vollständigkeit. Bei fehlenden Angaben fordert es nach. Bei vollständig prüft es Anspruch. Bei berechtigt sendet es Ersatz, sonst Ablehnung.",
    pools: ["Kunde", "Unternehmen (Lanes: Service, Buchhaltung)"],
    solution: [
      "Pool Kunde: Send-Task 'Reklamation senden' -> Nachrichtenfluss zu Unternehmen.",
      "Pool Unternehmen: Start-Nachrichtenereignis -> Task 'Vollständigkeit prüfen' -> XOR.",
      "Bei unvollständig: Nachrichtenfluss 'Nachforderung' an Kunde -> Empfangen -> zurück zu Prüfung (Schleife).",
      "Bei vollständig: Task 'Anspruch prüfen' -> XOR Ersatz/Ablehnung.",
      "Bei Ersatz: Send-Task 'Ersatz senden' -> Nachrichtenfluss an Kunde.",
      "Bei Ablehnung: Send-Task 'Ablehnung senden' -> Nachrichtenfluss an Kunde.",
      "Beide Pfade enden mit End-Event.",
    ],
    trap: "Sequenzfluss zwischen Pools ist falsch. Schleife für Nachforderung wird oft vergessen.",
    exam: "Aufgabe 7 - Standardmuster.",
  },
  {
    id: "case-2",
    title: "Stornierung",
    scenario:
      "Kunde fordert Stornierung. Unternehmen prüft Versandstatus. Wenn noch nicht versendet -> Stornierung möglich + Rückzahlung. Sonst Hinweis 'Ware bereits unterwegs - Rücksendeverfahren'.",
    pools: ["Kunde", "Unternehmen"],
    solution: [
      "Kunde sendet Stornoanfrage per Nachricht.",
      "Unternehmen prüft Versandstatus (Task).",
      "XOR: noch nicht versendet?",
      "Ja: Storno bestätigen + Rückzahlung anstoßen -> Nachricht an Kunden.",
      "Nein: Hinweis 'Rücksendeverfahren' senden.",
      "Ende.",
    ],
    trap: "Pfade enden ohne XOR-Join - das ist okay, wenn beide Pfade getrennt enden, aber Symmetrie achten.",
    exam: "Aufgabe 7 - typische Variante.",
  },
];
