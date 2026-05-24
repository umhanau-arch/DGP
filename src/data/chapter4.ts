import type { ChapterDefinition } from "../types";

export const chapter4: ChapterDefinition = {
  id: "kapitel-4",
  number: 4,
  title: "Petrinetze",
  subtitle: "Stellen, Transitionen, Markierungen, Eigenschaften, Workflownetze",
  whyImportant:
    "Petrinetze sind das formale Werkzeug für Prozesseigenschaften. Aufgabe 6 verlangt fast immer: Aktivierung prüfen, Markierung berechnen, Erreichbarkeitsgraph zeichnen und Eigenschaften begründen.",
  learningGoals: [
    "Stelle, Transition, Token, Markierung definieren und zeichnen.",
    "Aktivierung und Feuern korrekt anwenden.",
    "Erreichbarkeitsgraph aufbauen.",
    "k-Beschränktheit, Sicherheit, Deadlockfreiheit, Lebendigkeit prüfen.",
    "Workflownetze erkennen und Korrektheit (soundness) beurteilen.",
  ],
  priority: "A",
  examReference: "Aufgabe 6",
  examTip:
    "ALLE Input-Stellen müssen Token haben, damit eine Transition aktiviert ist. Eigenschaften IMMER über alle erreichbaren Markierungen prüfen, nicht nur über die Startmarkierung.",
  commonMistakes: [
    "Transition feuern, obwohl nur eine Input-Stelle Token hat.",
    "Sicherheit nur an der Startmarkierung beurteilen.",
    "Lebendigkeit mit Deadlockfreiheit verwechseln.",
    "Workflownetz ohne eindeutige Quelle/Senke akzeptieren.",
  ],
  trainers: ["petri"],
  groups: [
    {
      title: "1 · Grundbausteine",
      color: "violet",
      blocks: [
        {
          id: "k4-stellen-trans",
          title: "Stellen und Transitionen",
          intro: "Statisches Gerüst eines Petrinetzes.",
          simple:
            "Stellen sind Kreise und können Token enthalten. Transitionen sind Balken/Rechtecke und schalten den Zustand um.",
          detail:
            "Kanten verbinden Stellen mit Transitionen oder umgekehrt - nie Stelle mit Stelle oder Transition mit Transition. Ein Petrinetz ohne Token ist statisch; erst Token machen es dynamisch.",
          mnemonic: "Kreis hält. Balken schaltet. Pfeil verbindet.",
          exam: "Definition zeichnen oder lesen.",
          visual: "petri-static",
        },
        {
          id: "k4-token-mark",
          title: "Token und Markierung",
          intro: "Der Zustand eines Petrinetzes.",
          simple:
            "Ein Token ist ein Punkt in einer Stelle. Die Verteilung aller Token heißt Markierung.",
          detail:
            "Markierungen werden oft als Vektor angegeben: M = (1, 0, 1) bedeutet 1 Token in p1, 0 in p2, 1 in p3. Die Startverteilung heißt initiale Markierung.",
          example: "M0 = (1, 0, 0, 0). Nach t1: M1 = (0, 1, 1, 0).",
          mnemonic: "Token = Zustand. Markierung = Schnappschuss.",
          exam: "Markierungen explizit notieren.",
          visual: "petri-static",
        },
      ],
    },
    {
      title: "2 · Aktivierung und Feuern",
      color: "sky",
      blocks: [
        {
          id: "k4-feuern",
          title: "Wann feuert eine Transition?",
          intro: "Die wichtigste Regel.",
          simple:
            "Eine Transition ist aktiviert, wenn ALLE Input-Stellen ausreichend Token haben. Beim Feuern werden Input-Token entfernt und Output-Token erzeugt.",
          detail:
            "Feuern ist atomar: Verbrauch und Erzeugung passieren als ein Schritt. Sind mehrere Transitionen aktiviert, kann eine beliebige feuern (nicht-deterministisch). Stehen sie um dieselben Token im Konflikt, schließt das Feuern der einen die andere aus.",
          bullets: [
            "ALLE Eingangsstellen müssen Token haben",
            "Feuern verbraucht Inputs, erzeugt Outputs",
            "Atomar: ein Schritt, keine Zwischenzustände",
            "Bei Konflikt feuert genau eine Transition",
          ],
          example:
            "p1=1, p2=0. Transition t braucht p1 UND p2. -> Nicht aktiviert, da p2 leer ist.",
          trap: "Eine Transition mit zwei Inputs feuert NICHT, wenn nur eine Input-Stelle Token hat.",
          mnemonic: "Alle rein, alle raus. Sonst feuert nichts.",
          exam: "Klassiker in Aufgabe 6.",
          visual: "petri-static",
          miniCheck: {
            prompt: "p1 = 1 Token, p2 = 0 Token, p3 = 1 Token. Transition t hat Input-Stellen p1 und p2. Ist t aktiviert?",
            options: ["Ja", "Nein", "Nur unter Bedingung", "Nur wenn p3 leer ist"],
            correctIndex: 1,
            explain:
              "Beide Eingangsstellen müssen Token haben. p2 ist leer -> nicht aktiviert.",
          },
        },
      ],
    },
    {
      title: "3 · Erreichbarkeitsgraph",
      color: "lime",
      blocks: [
        {
          id: "k4-erreichbarkeit",
          title: "Markierungen und Übergänge",
          intro: "Vom Zustand zum Graph.",
          simple:
            "Der Erreichbarkeitsgraph hat als Knoten Markierungen und als Kanten gefeuerte Transitionen.",
          detail:
            "Ausgangspunkt ist die initiale Markierung. Von dort aus generiert man durch jede aktivierbare Transition Folgemarkierungen. Achtung: Bei Schleifen kann der Graph sehr groß werden ('Zustandsexplosion').",
          example:
            "M0=(1,0,0). t1 feuert: M1=(0,1,0). t2 feuert: M2=(0,0,1). t3 feuert: zurück zu M0.",
          mnemonic: "Knoten = Zustand. Kante = Transition.",
          exam: "Aufgabe 6: Graph zeichnen oder vervollständigen.",
        },
        {
          id: "k4-explosion",
          title: "Zustandsexplosion und Beschränktheit",
          intro: "Wann wird der Graph unendlich?",
          simple:
            "k-beschränkt heißt: keine Stelle hat in einer erreichbaren Markierung mehr als k Token. Sicher = 1-beschränkt.",
          detail:
            "Wenn Token unbegrenzt zunehmen können, ist das Netz nicht beschränkt - der Erreichbarkeitsgraph wird unendlich. Eigenschaftsprüfung verlangt also IMMER Betrachtung aller erreichbaren Markierungen.",
          table: [
            ["Begriff", "Bedeutung"],
            ["k-beschränkt", "max. k Token pro Stelle in jeder erreichbaren Markierung"],
            ["sicher", "1-beschränkt"],
            ["nicht beschränkt", "Token können unbegrenzt wachsen"],
          ],
          mnemonic: "k-beschränkt schaut auf den schlimmsten Zustand.",
          exam: "Eigenschaftsprüfung in Aufgabe 6.",
        },
      ],
    },
    {
      title: "4 · Eigenschaften",
      color: "rose",
      blocks: [
        {
          id: "k4-deadlock-leben",
          title: "Deadlockfreiheit und Lebendigkeit",
          intro: "Zwei oft verwechselte Begriffe.",
          simple:
            "Deadlockfrei: in jeder erreichbaren Markierung ist mindestens eine Transition aktivierbar. Lebendig: jede Transition kann irgendwann wieder aktiviert werden.",
          detail:
            "Lebendigkeit ist STÄRKER als Deadlockfreiheit. Ein Netz kann deadlockfrei sein, aber einzelne Transitionen können tot sein. In einem lebendigen Netz gibt es keine toten Transitionen.",
          table: [
            ["Eigenschaft", "Bedeutung"],
            ["deadlockfrei", "kein Stillstand erreichbar"],
            ["lebendig", "jede Transition immer wieder aktivierbar"],
            ["tot", "Transition feuert nie"],
          ],
          trap: "Lebendig != deadlockfrei. Lebendig ist die strengere Eigenschaft.",
          mnemonic: "Deadlockfrei = überlebt. Lebendig = jeder kommt wieder dran.",
          exam: "Aufgabe 6: beide Eigenschaften begründet beurteilen.",
        },
      ],
    },
    {
      title: "5 · Workflownetze",
      color: "cyan",
      blocks: [
        {
          id: "k4-workflownetz",
          title: "Was ist ein Workflownetz?",
          intro: "Spezielles Petrinetz für Prozesse.",
          simple:
            "Ein Workflownetz hat genau eine Startstelle (Quelle), eine Endstelle (Senke) und alle Knoten liegen auf einem Pfad zwischen Quelle und Senke.",
          detail:
            "Korrektheit (soundness) eines Workflownetzes verlangt: Sicherheit (1-beschränkt), ordentliche Komplettierung (am Ende ist nur die Senke markiert), Option zur Komplettierung (Senke immer erreichbar), keine toten Teile (jede Transition kann mal feuern).",
          bullets: [
            "Genau eine Quelle (Start)",
            "Genau eine Senke (Ende)",
            "Alle Knoten auf Pfad Start -> Ende",
            "Korrekt (sound), wenn alle vier Bedingungen erfüllt sind",
          ],
          mnemonic: "Quelle - Senke - Pfad - Korrektheit.",
          exam: "Aufgabe 6 oder 8 im Process-Mining-Kontext.",
        },
        {
          id: "k4-korrektheit",
          title: "Korrektheit prüfen",
          intro: "Vier Bedingungen.",
          simple:
            "Sicherheit + ordentliche Komplettierung + Option zur Komplettierung + keine toten Teile.",
          detail:
            "Verbinde gedanklich Senke mit Quelle (kurzschließen) -> ist das resultierende Netz lebendig und beschränkt, dann ist das Workflownetz korrekt.",
          mnemonic: "Sicher + sauberes Ende + immer erreichbar + alle leben.",
          exam: "Conformance-Bezug in Aufgabe 8.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k4-q1",
      question: "Was speichert eine Stelle in einem Petrinetz?",
      answer: "Token.",
    },
    {
      id: "k4-q2",
      question: "Wann ist eine Transition aktiviert?",
      answer:
        "Wenn alle Input-Stellen ausreichend Token enthalten.",
    },
    {
      id: "k4-q3",
      question: "Was passiert beim Feuern?",
      answer:
        "Token werden aus Input-Stellen entfernt und in Output-Stellen erzeugt - atomar in einem Schritt.",
    },
    {
      id: "k4-q4",
      question: "Was ist eine Markierung?",
      answer: "Die aktuelle Verteilung aller Token auf die Stellen.",
    },
    {
      id: "k4-q5",
      question: "Was ist ein Erreichbarkeitsgraph?",
      answer:
        "Ein Graph mit allen erreichbaren Markierungen als Knoten und gefeuerten Transitionen als Kanten.",
    },
    {
      id: "k4-q6",
      question: "Was bedeutet k-beschränkt?",
      answer:
        "In keiner erreichbaren Markierung gibt es eine Stelle mit mehr als k Token.",
    },
    {
      id: "k4-q7",
      question: "Was bedeutet sicher?",
      answer: "1-beschränkt: keine Stelle hat mehr als 1 Token.",
    },
    {
      id: "k4-q8",
      question: "Unterschied deadlockfrei vs. lebendig?",
      answer:
        "Deadlockfrei: irgendwo immer eine Transition möglich. Lebendig: jede Transition immer wieder möglich. Lebendig ist stärker.",
    },
    {
      id: "k4-q9",
      question: "Was ist ein Workflownetz?",
      answer:
        "Petrinetz mit eindeutiger Quelle, eindeutiger Senke; alle Knoten liegen auf einem Pfad zwischen ihnen.",
    },
    {
      id: "k4-q10",
      question: "Welche 4 Bedingungen erfüllen korrekte (sound) Workflownetze?",
      answer:
        "Sicherheit, ordentliche Komplettierung, Option zur Komplettierung, keine toten Teile.",
    },
    {
      id: "k4-q11",
      question: "Was ist ein Konflikt?",
      answer:
        "Zwei oder mehr Transitionen konkurrieren um dieselben Input-Token; nur eine kann feuern.",
    },
    {
      id: "k4-q12",
      question: "Warum ist die initiale Markierung allein nicht ausreichend für Eigenschaftsprüfung?",
      answer:
        "Weil Eigenschaften wie Sicherheit oder Deadlockfreiheit für ALLE erreichbaren Markierungen gelten müssen.",
    },
  ],
  tasks: [
    {
      id: "k4-task-1",
      kind: "petri",
      prompt:
        "p1 = 1 Token, p2 = 0, p3 = 0, p4 = 0. t1 nimmt aus p1, legt in p2 und p3. t2 nimmt aus p2, legt in p4. t3 nimmt aus p3, legt in p4. Welche Transitionen sind initial aktiviert?",
      expected: "Nur t1.",
      steps: [
        "t1: Input p1 hat Token -> aktiviert.",
        "t2: Input p2 leer -> nicht aktiviert.",
        "t3: Input p3 leer -> nicht aktiviert.",
      ],
      hint: "Prüfe für jede Transition, ob ALLE Input-Stellen Token haben.",
    },
    {
      id: "k4-task-2",
      kind: "petri",
      prompt:
        "Gleiches Netz wie zuvor. Wie viele Token liegen nach Feuern von t1, t2, t3 auf p4?",
      expected: "2 Token in p4.",
      steps: [
        "t1 feuert: p1=0, p2=1, p3=1, p4=0.",
        "t2 feuert: p2=0, p4=1.",
        "t3 feuert: p3=0, p4=2.",
        "Damit ist p4 nicht 1-beschränkt -> nicht sicher.",
      ],
      trap: "Wer Sicherheit nur auf Startmarkierung prüft, übersieht das.",
      exam: "Klassische Aufgabe 6.",
    },
    {
      id: "k4-task-3",
      kind: "petri",
      prompt:
        "Ist ein Netz mit folgenden Eigenschaften ein Workflownetz: 2 Startstellen, 1 Endstelle, alle Knoten erreichen Ende?",
      expected:
        "Nein. Ein Workflownetz benötigt genau eine Quelle und genau eine Senke.",
      steps: [
        "Quelle prüfen: 2 Stellen ohne Vorgänger -> Verstoß.",
        "Senke prüfen: 1 Endstelle -> ok.",
        "Pfad: ok.",
        "Verstoß gegen Quelle-Definition -> kein Workflownetz.",
      ],
    },
    {
      id: "k4-task-4",
      kind: "petri",
      prompt:
        "Konstruiere den Erreichbarkeitsgraph für: M0=(1,0). t1: p1->p2. t2: p2->p1.",
      expected: "Zwei Markierungen: M0=(1,0) und M1=(0,1) mit Übergängen t1 (M0->M1) und t2 (M1->M0).",
      steps: [
        "Start: M0=(1,0). t1 ist aktiviert (p1 hat Token).",
        "Nach t1: M1=(0,1). t2 ist aktiviert.",
        "Nach t2: zurück zu M0.",
        "Graph: M0 <-t1/t2-> M1.",
      ],
      exam: "Klassischer Erreichbarkeitsgraph.",
    },
  ],
};
