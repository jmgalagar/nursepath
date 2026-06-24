import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 112 — Care of Clients with Problems in Oxygenation, Fluid & Electrolytes, Infectious Diseases (FLAGSHIP). */
export const ncm112 = course({
  code: "NCM 112",
  title: "Care of Clients with Problems in Oxygenation, Fluid & Electrolytes, Infectious Diseases",
  category: "NCM",
  tagline: "Managing breathing, circulation, fluids, and infection in acutely ill adults.",
  icon: "🫁",
  hours: 72,
  outcomes: [
    "Assess and manage oxygenation problems (hypoxia, COPD, asthma, pneumonia)",
    "Correct fluid and electrolyte imbalances",
    "Apply transmission-based precautions for infectious diseases",
    "Provide nursing care for TB, dengue, and other infectious conditions",
  ],
  units: [
    unit(
      "Oxygenation Problems",
      "Breathing and gas exchange.",
      "😮‍💨",
      18,
      [
        pathway(
          "Hypoxia, COPD, Asthma & Pneumonia",
          "Recognize and manage common respiratory problems.",
          "💨",
          [
            vid("Respiratory Problems", "Hypoxia, COPD, asthma, pneumonia.", { minutes: 11, transcript: "Hypoxia is inadequate tissue oxygen — signs include confusion, cyanosis, tachypnea, tachycardia. COPD patients rely on a hypoxic drive — give controlled O₂. Asthma is reversible bronchospasm; pneumonia is infection of lung tissue." }),
            read("Respiratory Conditions & Oxygen Therapy", "Key nursing points.", [
              "**Hypoxia signs:** restlessness, confusion, tachycardia, tachypnea, cyanosis (late), SpO₂ < 92%.",
              "",
              "**COPD:** chronic airflow limitation; give O₂ cautiously (2 L/min or controlled) — the hypoxic drive can be blunted by high-flow O₂, though never withhold needed oxygen from a deteriorating patient.",
              "",
              "**Asthma:** bronchospasm, wheeze, prolonged expiration; treat with bronchodilators (salbutamol) and inhaled steroids; status asthmaticus is an emergency.",
              "",
              "**Pneumonia:** fever, cough, purulent sputum, crackles, dullness; treat with antibiotics, O₂, hydration, positioning.",
              "",
              "**Oxygen delivery:** nasal cannula (low), simple mask, non-rebreather (high), and for COPD controlled O₂.",
            ].join("\n"), { minutes: 13, source: "Global Initiative for COPD (GOLD); GINA asthma guidelines", skills: ["respiratory", "oxygenation"], takeaways: ["Confusion/tachypnea/cyanosis = hypoxia.", "COPD: controlled O₂; monitor for CO₂ retention.", "Asthma = bronchodilators + steroids; pneumonia = antibiotics."] }),
            prac("Position and Oxygenate", "Care for a dyspneic patient.", ["Raise the head of the bed (high Fowler's)", "Apply prescribed O₂ device", "Encourage pursed-lip breathing (COPD)", "Monitor SpO₂ and work of breathing", "Suction if secretions block the airway"], { minutes: 12, skills: ["respiratory", "oxygenation"] }),
            simDecision("The COPD Patient", "Oxygen safety.", "start", {
              start: { scenario: "A COPD patient arrives cyanotic and confused, SpO₂ 82%. What's the safest action?", choices: [{ label: "Give controlled O₂ and monitor closely, titrating to target SpO₂ 88-92%", next: "correct", feedback: "Correct — COPD target is 88-92%; controlled O₂ avoids CO₂ retention but never withhold oxygen from the deteriorating." }, { label: "Withhold all oxygen to protect the drive", next: "wrong", feedback: "Hypoxia this severe is life-threatening — give oxygen." }] },
              correct: { scenario: "Correct. Controlled O₂ to 88-92% balances hypoxia and CO₂ retention risk.", success: true, debrief: "For COPD, aim SpO₂ 88-92% with controlled oxygen, watching the CO₂ and mental status." },
              wrong: { scenario: "Severe hypoxia can kill before CO₂ retention — give oxygen, controlled.", debrief: "Start oxygen and monitor; titrate to 88-92%.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["respiratory", "oxygenation"] }),
            quiz("Quiz: Oxygenation", "5 questions.", [
              q("An early sign of hypoxia is:", ["Cyanosis", "Restlessness/confusion", "Bradycardia", "Hypotension only"], 1, "Early CNS signs precede cyanosis."),
              q("Target SpO₂ for a COPD patient is typically:", ["94-100%", "88-92%", "80-85%", "100%"], 1, "Controlled to avoid CO₂ retention."),
              q("First-line drug for an acute asthma attack is:", ["Antibiotic", "Short-acting bronchodilator (salbutamol)", "Diuretic", "Beta-blocker"], 1, "Salbutamol relieves bronchospasm."),
              q("High Fowler's position helps by:", ["Lowering the heart", "Maximizing lung expansion", "Causing hypoxia", "Nothing"], 1, "Sitting up aids breathing."),
              q("Pneumonia classically presents with:", ["Wheeze only", "Fever, cough, purulent sputum, crackles", "Bradycardia", "Hypoglycemia"], 1, "Infective respiratory signs."),
            ], { minutes: 8, skills: ["respiratory"] }),
          ],
        ),
      ],
    ),
    unit(
      "Fluid & Electrolyte Balance",
      "Hydration and the key electrolytes.",
      "💧",
      16,
      [
        pathway(
          "Fluid, Sodium, Potassium",
          "Imbalances and corrections.",
          "⚗️",
          [
            vid("Fluid & Electrolyte Balance", "Volume and electrolyte problems.", { minutes: 10, transcript: "Fluid imbalances: dehydration (hypovolemia) vs overload (hypervolemia). Sodium affects fluid shifts and mental status; potassium affects the heart. IV fluids and lab monitoring are the tools." }),
            read("Common Imbalances", "Recognize and respond.", [
              "**Dehydration:** thirst, dry mucosa, poor skin turgor, tachycardia, low urine output, concentrated urine.",
              "**Fluid overload:** edema, crackles, raised JVP, weight gain, dyspnea.",
              "",
              "**Hyponatremia (low Na⁺):** confusion, seizures, nausea.",
              "**Hypernatremia (high Na⁺):** thirst, agitation, seizures.",
              "",
              "**Hypokalemia (low K⁺):** weakness, cramps, **U waves** on ECG, arrhythmias. Causes: diuretics, vomiting.",
              "**Hyperkalemia (high K⁺):** peaked T waves, arrhythmias — emergency. Causes: renal failure, ACE inhibitors.",
              "",
              "Never give IV potassium as a bolus; dilute and infuse slowly with cardiac monitoring.",
            ].join("\n"), { minutes: 12, source: "Clinical electrolyte references; ECG patterns", skills: ["fluid-electrolytes"], takeaways: ["Dehydration: dry mucosa, poor turgor, low UO.", "Low K⁺ → U waves; high K⁺ → peaked T waves.", "Never bolus IV potassium."] }),
            prac("Assess Fluid Status", "Check for imbalance.", ["Inspect mucous membranes and skin turgor", "Check for edema and jugular venous pressure", "Measure intake and output", "Review daily weights", "Note urine color/concentration"], { minutes: 12, skills: ["fluid-electrolytes"] }),
            simDecision("Hyperkalemia Emergency", "Act on the ECG.", "start", {
              start: { scenario: "A CKD patient's ECG shows peaked T waves; K⁺ is 7.1 mEq/L. Priority?", choices: [{ label: "Stabilize the heart with calcium gluconate, then shift K⁺ into cells", next: "correct", feedback: "Yes — calcium stabilizes the myocardium first, then insulin/glucose or salbutamol shifts K⁺." }, { label: "Give oral potassium", next: "wrong", feedback: "That worsens hyperkalemia." }] },
              correct: { scenario: "Correct — calcium first (membrane stabilization), then lower K⁺.", success: true, debrief: "Severe hyperkalemia with ECG changes: calcium gluconate → shift K⁺ (insulin/dextrose, salbutamol) → remove K⁺ (diuretics/dialysis)." },
              wrong: { scenario: "Peaked T waves + K⁺ 7.1 = dangerous hyperkalemia.", debrief: "Never add potassium; stabilize the heart and lower the level.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["fluid-electrolytes"] }),
            quiz("Quiz: Fluid & Electrolytes", "5 questions.", [
              q("A sign of dehydration is:", ["Edema", "Poor skin turgor and dry mucosa", "Weight gain", "Crackles"], 1, "Classic dehydration signs."),
              q("Hypokalemia on ECG shows:", ["Peaked T waves", "U waves", "Wide QRS", "Nothing"], 1, "U waves follow the T wave in low K⁺."),
              q("Peaked T waves suggest:", ["Hypokalemia", "Hyperkalemia", "Hyponatremia", "Hypocalcemia"], 1, "Peaked T = high K⁺."),
              q("IV potassium must be:", ["Given as a fast bolus", "Diluted and given slowly with cardiac monitoring", "Given IM", "Given orally only"], 1, "Rapid K⁺ causes fatal arrhythmias."),
              q("Hyponatremia can cause:", ["Constipation", "Confusion and seizures", "Hypertension only", "Weight loss"], 1, "Low sodium affects brain function."),
            ], { minutes: 8, skills: ["fluid-electrolytes"] }),
          ],
        ),
      ],
    ),
    unit(
      "Infectious Diseases",
      "TB, dengue, and transmission-based care.",
      "🦠",
      16,
      [
        pathway(
          "TB, Dengue & Precautions",
          "Care for communicable diseases.",
          "🌡️",
          [
            vid("Infectious Diseases", "TB, dengue, and isolation.", { minutes: 10, transcript: "Tuberculosis spreads by airborne droplet nuclei — use airborne precautions (N95, negative pressure). Dengue is mosquito-borne — supportive care, watch for plasma leakage and shock during the critical phase." }),
            read("TB & Dengue Nursing", "Recognition and precautions.", [
              "**Tuberculosis:** chronic cough >2 weeks, night sweats, weight loss, hemoptysis; confirm with sputum AFB/GeneXpert; **airborne precautions** (N95, negative-pressure room); Directly Observed Treatment (DOTS) ensures adherence.",
              "",
              "**Dengue:** high fever, headache, retro-orbital pain, muscle/joint pain, rash; **critical phase** (around day 3-7, during defervescence) risks plasma leakage → dengue shock. Monitor for warning signs: abdominal pain, persistent vomiting, bleeding, lethargy, rising hematocrit, falling platelets. Maintain perfusion with careful IV fluids.",
              "",
              "**Precautions match transmission:** contact (MRSA), droplet (influenza, pertussis — surgical mask within 1-2 m), airborne (TB, measles, chickenpox — N95 + negative pressure).",
            ].join("\n"), { minutes: 12, source: "WHO TB guidelines; WHO dengue management; CDC isolation precautions", skills: ["infection-control", "infectious-disease"], takeaways: ["TB = airborne (N95 + negative pressure); DOTS for adherence.", "Dengue: watch the critical phase for shock; warning signs = emergency.", "Match precautions to transmission route."] }),
            prac("Apply TB Precautions", "Protect patient and staff.", ["Place patient in negative-pressure room", "Wear an N95 respirator on entry", "Keep the door closed", "Educate on cough etiquette", "Coordinate DOTS medication"], { minutes: 10, skills: ["infection-control", "infectious-disease"] }),
            simDecision("Dengue Warning Signs", "Spot deterioration.", "start", {
              start: { scenario: "A child with dengue, fever now down on day 5, becomes restless with abdominal pain and persistent vomiting. What does this indicate?", choices: [{ label: "Possible dengue shock — emergency (critical phase)", next: "correct", feedback: "Yes — defervescence with these signs = plasma leakage/shock risk." }, { label: "Recovery — fever is gone", next: "wrong", feedback: "Worsening symptoms at defervescence is ominous, not reassuring." }] },
              correct: { scenario: "Correct — these are dengue warning signs; act now.", success: true, debrief: "Dengue critical phase is around defervescence (day 3-7). Watch: abdominal pain, persistent vomiting, bleeding, lethargy, rising Hct, falling platelets." },
              wrong: { scenario: "Fever dropping but patient worsening = danger.", debrief: "Monitor perfusion, hematocrit, platelets; manage fluids carefully.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["infectious-disease", "pediatric"] }),
            quiz("Quiz: Infectious Diseases", "5 questions.", [
              q("TB spreads by which route?", ["Contact", "Airborne", "Vector", "Food"], 1, "Airborne droplet nuclei."),
              q("The PPE for TB is a:", ["Surgical mask", "N95 respirator + negative pressure", "Gown only", "Nothing"], 1, "Airborne precautions."),
              q("Dengue is transmitted by:", ["Coughing", "Aedes mosquito", "Food", "Touch"], 1, "Aedes mosquitoes."),
              q("A dengue warning sign is:", ["Fever resolving normally", "Abdominal pain and persistent vomiting", "Improved appetite", "Stable hematocrit"], 1, "Warning signs signal plasma leakage."),
              q("DOTS refers to:", ["A diet plan", "Directly Observed Treatment for TB", "A vaccine", "An IV fluid"], 1, "Ensures TB treatment adherence."),
            ], { minutes: 8, skills: ["infectious-disease", "infection-control"] }),
          ],
        ),
      ],
    ),
  ],
});
