import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 106 — Pharmacology (FLAGSHIP): drug mechanisms, classes, and nursing implications. */
export const ncm106 = course({
  code: "NCM 106",
  title: "Pharmacology",
  category: "NCM",
  tagline: "How drugs work, how to give them safely, and what to watch for.",
  icon: "💊",
  hours: 72,
  outcomes: [
    "Explain pharmacokinetics (ADME) and pharmacodynamics",
    "Apply major drug classes and their mechanisms",
    "Calculate drug dosages accurately",
    "Identify common adverse effects and nursing implications",
  ],
  units: [
    unit(
      "Pharmacokinetics & Pharmacodynamics",
      "What the body does to a drug, and the drug to the body.",
      "⚖️",
      12,
      [
        pathway(
          "ADME & Drug Receptors",
          "Absorption, distribution, metabolism, excretion.",
          "🔄",
          [
            vid("Pharmacokinetics: ADME", "The journey of a drug through the body.", { minutes: 10, transcript: "Pharmacokinetics (PK) = what the body does to the drug: Absorption, Distribution, Metabolism (liver), Excretion (kidney). Pharmacodynamics (PD) = what the drug does to the body — receptor binding, effect." }),
            read("ADME Explained", "Each phase and its clinical relevance.", [
              "**Absorption:** how the drug enters the blood; route-dependent (IV = 100%, oral varies). Food, pH, and gut motility affect it.",
              "**Distribution:** movement to tissues; depends on blood flow, protein binding (albumin), and lipid solubility (crosses BBB).",
              "**Metabolism:** mostly hepatic; cytochrome P450 enzymes transform drugs — the basis of many drug interactions.",
              "**Excretion:** mostly renal; impaired kidneys → drug accumulation → toxicity.",
              "",
              "**Half-life** determines dosing frequency; **steady state** is reached in ~4-5 half-lives.",
            ].join("\n"), { minutes: 12, source: "Katzung Basic & Clinical Pharmacology", skills: ["pharmacology"], takeaways: ["ADME: Absorption, Distribution, Metabolism, Excretion.", "Liver metabolizes; kidneys excrete — dose-adjust in failure.", "Steady state ≈ 4-5 half-lives."] }),
            prac("Trace a Drug Through ADME", "Apply to an oral medication.", ["Absorption: gut into blood", "Distribution: via blood to site", "Metabolism: liver (CYP450)", "Excretion: kidneys", "Note: renal impairment → dose adjust"], { minutes: 10, skills: ["pharmacology"] }),
            quiz("Quiz: ADME", "4 questions.", [
              q("Most drug metabolism occurs in the:", ["Kidney", "Liver", "Lung", "Heart"], 1, "Hepatic CYP450 enzymes do most metabolism."),
              q("Renal impairment increases risk of:", ["Subtherapeutic levels", "Drug toxicity", "Faster metabolism", "No change"], 1, "Reduced excretion → accumulation → toxicity."),
              q("Steady state is reached in about:", ["1 half-life", "4-5 half-lives", "10 half-lives", "Instantly"], 1, "About 4-5 half-lives."),
              q("Which route has 100% bioavailability?", ["Oral", "Intramuscular", "Intravenous", "Subcutaneous"], 2, "IV enters the circulation directly."),
            ], { minutes: 6, skills: ["pharmacology"] }),
          ],
        ),
      ],
    ),
    unit(
      "Dosage Calculation",
      "Math that prevents harm.",
      "🧮",
      14,
      [
        pathway(
          "Drug Calculations & Conversions",
          "Dose, weight-based, and IV drip calculations.",
          "➗",
          [
            vid("Safe Dosage Calculations", "Formulas and pitfalls.", { minutes: 9, transcript: "Core formula: Dose wanted ÷ dose on hand × quantity = amount to give. For weight-based pediatric dosing, always confirm mg/kg against safe ranges. For IV: drops/min = (volume × drop factor) ÷ time." }),
            read("Calculation Formulas", "The essentials memorized.", [
              "**Basic:** Desired ÷ Have × Quantity = Give",
              "",
              "**Weight-based:** mg/kg × weight (kg) = dose",
              "",
              "**IV flow rate (mL/hr):** total volume ÷ hours",
              "",
              "**IV drip rate (gtt/min):** (volume × drop factor) ÷ time (min)",
              "",
              "**Conversions:** 1 g = 1000 mg; 1 mg = 1000 mcg; 1 L = 1000 mL; 1 kg = 2.2 lb",
              "",
              "Always double-check high-alert drugs (insulin, heparin, opioids, chemo) with a second nurse.",
            ].join("\n"), { minutes: 12, source: "ISMP high-alert medications", skills: ["pharmacology", "medication-administration"], takeaways: ["Desired ÷ Have × Quantity.", "Weight-based dosing: mg/kg.", "Double-check high-alert drugs."] }),
            prac("Solve Dosage Problems", "Work through calculations.", ["500 mg ordered, 250 mg/tablet → 2 tabs", "Convert 0.5 g to mg → 500 mg", "Weight-based: 5 mg/kg × 20 kg → 100 mg", "IV: 1000 mL over 8 hr → 125 mL/hr"], { minutes: 15, skills: ["pharmacology", "medication-administration"] }),
            simDecision("Spot the Safe Dose", "Verify before giving.", "start", {
              start: { scenario: "Order: amoxicillin 500 mg PO. Stock: 250 mg/5 mL suspension. How much do you give?", choices: [{ label: "10 mL (two 250-mg doses)", next: "correct", feedback: "500 ÷ 250 × 5 mL = 10 mL." }, { label: "5 mL", next: "wrong", feedback: "That's only 250 mg." }] },
              correct: { scenario: "Correct: 10 mL delivers the ordered 500 mg.", success: true, debrief: "Desired ÷ Have × Quantity = 500 ÷ 250 × 5 = 10 mL. Always recheck high-risk drugs." },
              wrong: { scenario: "Recompute: 500 ÷ 250 × 5 mL.", debrief: "5 mL holds 250 mg; you need two of those = 10 mL.", choices: [{ label: "Recalculate", next: "start" }] },
            }, { minutes: 5, skills: ["pharmacology", "medication-administration"] }),
            quiz("Quiz: Dosage Calculation", "5 questions.", [
              q("0.25 g equals how many mg?", ["25 mg", "250 mg", "2.5 mg", "2500 mg"], 1, "0.25 g × 1000 = 250 mg."),
              q("Order 1000 mL over 8 hours. Flow rate?", ["100 mL/hr", "125 mL/hr", "150 mL/hr", "200 mL/hr"], 1, "1000 ÷ 8 = 125 mL/hr."),
              q("Which is a high-alert drug requiring double-check?", ["Acetaminophen", "Insulin", "Multivitamin", "Normal saline"], 1, "Insulin is high-alert."),
              q("1 kg equals approximately how many pounds?", ["1 lb", "2.2 lb", "10 lb", "0.5 lb"], 1, "1 kg ≈ 2.2 lb."),
              q("Pediatric dosing is usually based on:", ["Height", "Weight (mg/kg)", "Eye color", "Temperature"], 1, "mg/kg dosing."),
            ], { minutes: 8, skills: ["pharmacology", "medication-administration"] }),
          ],
        ),
      ],
    ),
    unit(
      "Major Drug Classes",
      "Antibiotics, cardiovascular, analgesics, and more.",
      "💊",
      18,
      [
        pathway(
          "Antibiotics & Cardiovascular Drugs",
          "Mechanisms and nursing implications.",
          "💉",
          [
            vid("Major Drug Classes Overview", "How common drug families work.", { minutes: 11, transcript: "Antibiotics kill or inhibit bacteria (penicillins, cephalosporins, macrolides, fluoroquinolones) — beware resistance and superinfections. Cardiovascular drugs include beta-blockers, ACE inhibitors, ARBs, calcium channel blockers, and diuretics — each with distinct monitoring." }),
            read("Key Classes & Nursing Implications", "What to monitor.", [
              "**Penicillins/Cephalosporins:** check allergy before each dose; watch for rash, anaphylaxis, GI upset, superinfection (C. diff).",
              "",
              "**Beta-blockers (-olol):** lower HR/BP; monitor HR (hold if < 60), BP; don't stop abruptly (rebound).",
              "",
              "**ACE inhibitors (-pril):** vasodilation; watch for dry cough, hyperkalemia, angioedema; check BP, K⁺, renal function.",
              "",
              "**Diuretics (furosemide):** fluid loss; monitor BP, electrolytes (K⁺!), output; watch for dehydration/ototoxicity.",
              "",
              "**Opioids:** analgesia; monitor respiratory depression, sedation, constipation, dependence; have naloxone ready.",
            ].join("\n"), { minutes: 13, source: "Katzung; drug monographs", skills: ["pharmacology", "cardiovascular", "medication-administration"], takeaways: ["Beta-blockers → check HR; ACEi → cough/K⁺; diuretics → K⁺; opioids → respirations.", "Always verify antibiotic allergies."] }),
            prac("Set Up Monitoring", "Plan nursing care for the drug.", ["Beta-blocker: check apical HR, hold if < 60", "ACE inhibitor: check BP, K⁺, renal function", "Furosemide: monitor I&O, K⁺, weight", "Opioid: check RR and sedation, constipation precautions"], { minutes: 12, skills: ["pharmacology"] }),
            simDecision("Adverse Effect Alert", "Recognize trouble.", "start", {
              start: { scenario: "A patient on a new ACE inhibitor develops a persistent dry cough and lip swelling. What's the priority?", choices: [{ label: "Hold the drug and report possible angioedema", next: "correct", feedback: "Yes — angioedema is a life-threatening ACEi reaction; hold and notify." }, { label: "Give a cough suppressant and continue", next: "wrong", feedback: "Lip swelling suggests angioedema — don't ignore." }] },
              correct: { scenario: "Correct — angioedema is a medical emergency.", success: true, debrief: "ACEi can cause dry cough (common) and angioedema (rare, dangerous). Hold the drug, report, monitor airway." },
              wrong: { scenario: "Angioedema can compromise the airway — act now.", debrief: "Lip/tongue/throat swelling on an ACEi = angioedema until proven otherwise.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["pharmacology", "medication-administration"] }),
            quiz("Quiz: Drug Classes", "5 questions.", [
              q("Before giving a penicillin, always check:", ["Blood sugar", "Allergy history", "Temperature", "Weight only"], 1, "Penicillin allergy can cause anaphylaxis."),
              q("A beta-blocker should be held if heart rate is below:", ["100", "60", "40", "80"], 1, "Bradycardia is a hold parameter."),
              q("A common side effect of ACE inhibitors is:", ["Hypokalemia", "Dry cough", "Bradycardia only", "Hyperglycemia"], 1, "Dry cough from bradykinin buildup."),
              q("Furosemide requires monitoring of:", ["Only glucose", "Potassium (K⁺)", "Only sodium", "Calcium"], 1, "Loop diuretics waste potassium."),
              q("Opioid overdose risk includes:", ["Diarrhea", "Respiratory depression", "Hypertension", "Tachycardia"], 1, "Respiratory depression is the key risk — naloxone reverses it."),
            ], { minutes: 8, skills: ["pharmacology"] }),
          ],
        ),
      ],
    ),
  ],
});
