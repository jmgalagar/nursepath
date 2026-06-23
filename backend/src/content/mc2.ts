import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** MC 2 — Biochemistry: the chemistry of life, metabolism, and nutrition. */
export const mc2 = course({
  code: "MC 2",
  title: "Biochemistry",
  category: "MC",
  tagline: "The molecular chemistry behind nutrition, metabolism, and drug action.",
  icon: "⚗️",
  hours: 60,
  outcomes: [
    "Describe the structure and function of carbohydrates, lipids, and proteins",
    "Explain cellular respiration and ATP production",
    "Relate biochemistry to nutrition and metabolism",
    "Understand enzyme function and pH balance",
  ],
  units: [
    unit(
      "Biomolecules",
      "The four macromolecules that build life.",
      "🧪",
      14,
      [
        pathway(
          "Carbs, Lipids, Proteins & Nucleic Acids",
          "The building blocks and what they do.",
          "🧱",
          [
            vid("The Macromolecules of Life", "Overview of the four biomolecules.", { minutes: 8, transcript: "Carbohydrates fuel and structure cells; lipids store energy and form membranes; proteins do the work (enzymes, structure, transport); nucleic acids store and express genetic information." }),
            read("Structure & Function of Biomolecules", "Each macromolecule's role.", [
              "**Carbohydrates:** monosaccharides (glucose) → energy; polysaccharides (glycogen) → storage.",
              "",
              "**Lipids:** triglycerides store energy; phospholipids form membranes; cholesterol is a precursor for steroids and bile.",
              "",
              "**Proteins:** amino-acid chains that fold into enzymes, hormones, transporters, and structural elements.",
              "",
              "**Nucleic acids:** DNA stores genetic code; RNA (mRNA, tRNA, rRNA) expresses it.",
              "",
              "All are built by **dehydration synthesis** and broken by **hydrolysis**.",
            ].join("\n"), { minutes: 11, source: "OpenStax Biology", skills: ["biochemistry"], takeaways: ["Carbs = energy; lipids = membranes/storage; proteins = function; nucleic acids = info.", "Enzymes are proteins that catalyze reactions.", "Dehydration builds, hydrolysis breaks."] }),
            prac("Classify Common Foods", "Sort foods by dominant macromolecule.", ["Bread/rice → carbohydrate", "Butter/oil → lipid", "Egg/meat → protein", "DNA/RNA → nucleic acid (cells)"], { minutes: 8, skills: ["biochemistry"] }),
            quiz("Quiz: Biomolecules", "4 questions.", [
              q("Which biomolecule is the primary fuel for the brain?", ["Lipids", "Carbohydrates (glucose)", "Proteins", "Nucleic acids"], 1, "Glucose is the brain's main fuel."),
              q("Enzymes are a type of:", ["Carbohydrate", "Lipid", "Protein", "Mineral"], 2, "Nearly all enzymes are proteins."),
              q("The cell membrane is made largely of:", ["Triglycerides", "Phospholipids", "Cellulose", "Starch"], 1, "Phospholipids form the bilayer of membranes."),
              q("Building polymers by removing water is called:", ["Hydrolysis", "Dehydration synthesis", "Oxidation", "Reduction"], 1, "Dehydration synthesis joins monomers by removing water."),
            ], { minutes: 6, skills: ["biochemistry"] }),
          ],
        ),
      ],
    ),
    unit(
      "Metabolism & Cellular Respiration",
      "How cells extract energy from food.",
      "🔋",
      14,
      [
        pathway(
          "ATP & Cellular Respiration",
          "Glycolysis, Krebs cycle, electron transport.",
          "⚡",
          [
            vid("Cellular Respiration", "From glucose to ATP.", { minutes: 10, transcript: "Cellular respiration converts glucose + O₂ into ATP, CO₂, and water. Stages: glycolysis (cytoplasm), pyruvate oxidation and Krebs cycle (mitochondria), and the electron transport chain (inner mitochondrial membrane) — the biggest ATP producer." }),
            read("The Three Stages of Respiration", "Where ATP comes from.", [
              "**1. Glycolysis:** glucose (6C) → 2 pyruvate (3C) in the cytoplasm; net 2 ATP.",
              "",
              "**2. Krebs cycle (citric acid cycle):** in the mitochondrial matrix; produces NADH/FADH₂ and CO₂.",
              "",
              "**3. Electron transport chain (ETC):** inner mitochondrial membrane; NADH/FADH₂ donate electrons, O₂ is the final acceptor, ~32-34 ATP made via oxidative phosphorylation.",
              "",
              "Total ~ 36-38 ATP per glucose under aerobic conditions.",
            ].join("\n"), { minutes: 12, source: "OpenStax Biology", skills: ["biochemistry"], takeaways: ["Glycolysis (cytoplasm) → Krebs (matrix) → ETC (membrane).", "O₂ is the final electron acceptor.", "~36-38 ATP per glucose aerobically."] }),
            prac("Trace Glucose to ATP", "Order the stages.", ["Glycolysis in cytoplasm", "Pyruvate enters mitochondria", "Krebs cycle in matrix", "Electron transport chain", "ATP synthesis (~36-38)"], { minutes: 8, skills: ["biochemistry"] }),
            quiz("Quiz: Cellular Respiration", "4 questions.", [
              q("The final electron acceptor in the ETC is:", ["Carbon dioxide", "Oxygen", "Nitrogen", "Water"], 1, "O₂ accepts electrons to form water."),
              q("Glycolysis occurs in the:", ["Mitochondrial matrix", "Cytoplasm", "Nucleus", "Ribosome"], 1, "Glycolysis is cytoplasmic."),
              q("The biggest ATP producer is the:", ["Glycolysis", "Krebs cycle", "Electron transport chain", "Fermentation"], 2, "The ETC produces the most ATP."),
              q("Approximate ATP yield per glucose (aerobic):", ["2 ATP", "4 ATP", "~36-38 ATP", "100 ATP"], 2, "About 36-38 ATP per glucose aerobically."),
            ], { minutes: 6, skills: ["biochemistry"] }),
          ],
        ),
      ],
    ),
    unit(
      "Enzymes, pH & Clinical Biochemistry",
      "How enzymes and acid-base balance apply to nursing.",
      "⚖️",
      12,
      [
        pathway(
          "Enzymes & Acid-Base Balance",
          "From enzyme kinetics to arterial blood gases.",
          "🧫",
          [
            vid("Enzymes and pH in the Body", "Why pH matters clinically.", { minutes: 8, transcript: "Enzymes work in narrow pH ranges; blood pH is tightly held at 7.35-7.45 by buffers (bicarbonate), lungs (CO₂), and kidneys (bicarbonate/H⁺)." }),
            read("Acid-Base Balance", "How the body defends blood pH.", [
              "Normal **arterial pH: 7.35-7.45**.",
              "",
              "**Buffers** (bicarbonate/carbonic acid) act in seconds.",
              "",
              "**Lungs** adjust CO₂ (a volatile acid) in minutes — slow/shallow breathing retains CO₂ (acidosis).",
              "",
              "**Kidneys** adjust bicarbonate and H⁺ excretion over hours-days.",
              "",
              "**Acidosis** (pH < 7.35): respiratory (high CO₂) or metabolic (low bicarbonate).",
              "**Alkalosis** (pH > 7.45): respiratory (low CO₂) or metabolic (high bicarbonate).",
            ].join("\n"), { minutes: 11, source: "OpenStax Anatomy & Physiology", skills: ["biochemistry", "fluid-electrolytes"], takeaways: ["Blood pH 7.35-7.45.", "Buffers (seconds) < lungs (minutes) < kidneys (hours).", "CO₂ retention → acidosis; CO₂ loss → alkalosis."] }),
            simDecision("Interpret a Blood Gas", "Apply acid-base thinking.", "start", {
              start: { scenario: "ABG: pH 7.30, high CO₂. What's the disturbance?", choices: [{ label: "Respiratory acidosis", next: "correct", feedback: "Low pH + high CO₂ = respiratory acidosis (CO₂ retention)." }, { label: "Metabolic alkalosis", next: "wrong", feedback: "Alkalosis would be high pH; metabolic would show low bicarbonate." }] },
              correct: { scenario: "Correct. Likely causes: hypoventilation, COPD, opiate overdose.", success: true, debrief: "Respiratory acidosis = pH ↓ + CO₂ ↑. The lungs are retaining acid (CO₂)." },
              wrong: { scenario: "Reconsider: low pH means acidosis; high CO₂ points to a respiratory cause.", debrief: "Read pH first (acid/alkali), then CO₂ and bicarbonate to find the cause.", choices: [{ label: "Try again", next: "start" }] },
            }, { minutes: 6, skills: ["biochemistry", "fluid-electrolytes"] }),
            quiz("Quiz: Acid-Base", "4 questions.", [
              q("Normal arterial blood pH is:", ["7.00-7.10", "7.35-7.45", "7.60-7.70", "6.80-7.00"], 1, "7.35-7.45 is normal."),
              q("The fastest acid-base regulator is the:", ["Kidney", "Lung", "Bicarbonate buffer", "Liver"], 2, "Buffers act in seconds; lungs minutes; kidneys hours."),
              q("Respiratory acidosis shows:", ["High pH, low CO₂", "Low pH, high CO₂", "Low pH, low bicarbonate", "High pH, high bicarbonate"], 1, "Low pH + high CO₂ = respiratory acidosis."),
              q("Enzymes are affected by:", ["pH only", "Temperature only", "pH and temperature", "Neither"], 2, "Enzymes need specific pH and temperature ranges."),
            ], { minutes: 6, skills: ["biochemistry"] }),
          ],
        ),
      ],
    ),
  ],
});
