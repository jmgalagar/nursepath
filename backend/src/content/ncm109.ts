import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 109 — Care of Mother, Child at Risk or with Problems. */
export const ncm109 = course({
  code: "NCM 109",
  title: "Care of Mother, Child at Risk or with Problems",
  category: "NCM",
  tagline: "High-risk obstetric and pediatric nursing care.",
  icon: "🚨",
  hours: 72,
  outcomes: [
    "Recognize high-risk pregnancy complications (preeclampsia, hemorrhage)",
    "Provide emergency obstetric and newborn care",
    "Care for the at-risk newborn (preterm, jaundice, sepsis)",
    "Manage common pediatric emergencies (dehydration, respiratory distress)",
  ],
  units: [
    unit(
      "High-Risk Pregnancy",
      "Preeclampsia, hemorrhage, and gestational diabetes.",
      "⚠️",
      16,
      [
        pathway(
          "Preeclampsia & Eclampsia",
          "Recognize and respond to hypertensive disorders of pregnancy.",
          "🩸",
          [
            vid("Preeclampsia: Recognition", "A leading cause of maternal death.", { minutes: 10, transcript: "Preeclampsia = new hypertension (≥140/90) after 20 weeks with proteinuria or end-organ dysfunction. Eclampsia adds seizures. Magnesium sulfate prevents and treats eclamptic seizures." }),
            read("Preeclampsia Signs & Magnesium", "What to watch and what to give.", [
              "**Preeclampsia:** BP ≥140/90 after 20 weeks + proteinuria or signs (headache, vision change, epigastric pain, edema).",
              "",
              "**HELLP:** Hemolysis, Elevated Liver enzymes, Low Platelets — a severe variant.",
              "",
              "**Eclampsia:** seizure in a preeclamptic patient — emergency.",
              "",
              "**Magnesium sulfate** prevents/treats seizures; monitor for toxicity:",
              "- Therapeutic: 4-7 mEq/L.",
              "- **Toxicity signs:** loss of patellar reflexes (first), respiratory depression, cardiac arrest.",
              "- **Antidote:** calcium gluconate. Always check reflexes, RR (≥12), and urine output before each dose.",
            ].join("\n"), { minutes: 12, source: "ACOG; WHO magnesium sulfate for eclampsia", skills: ["maternal-child", "pharmacology"], takeaways: ["Preeclampsia: BP≥140/90 + proteinuria after 20wk.", "Magnesium toxicity → first sign: absent reflexes; antidote: calcium gluconate.", "Check reflexes/RR/urine before each Mg dose."] }),
            prac("Monitor a Patient on Magnesium", "Safety checks before each dose.", ["Check deep tendon (patellar) reflexes present", "RR ≥ 12/min", "Urine output ≥ 25-30 mL/hr", "Have calcium gluconate at bedside", "Report absent reflexes immediately"], { minutes: 12, skills: ["maternal-child", "pharmacology"] }),
            simDecision("Magnesium Toxicity", "Act on the warning sign.", "start", {
              start: { scenario: "A preeclamptic patient on magnesium sulfate has absent patellar reflexes and RR 10. What's the priority?", choices: [{ label: "Hold magnesium, give calcium gluconate, support breathing", next: "correct", feedback: "Absent reflexes + RR < 12 = toxicity — antidote is calcium gluconate." }, { label: "Give more magnesium", next: "wrong", feedback: "That worsens toxicity." }] },
              correct: { scenario: "Correct — this is magnesium toxicity.", success: true, debrief: "Loss of reflexes precedes respiratory depression. Hold the drug, give calcium gluconate, support respirations." },
              wrong: { scenario: "Toxicity, not underdosing — antidote needed.", debrief: "Calcium gluconate reverses magnesium toxicity.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["maternal-child", "pharmacology"] }),
            quiz("Quiz: Preeclampsia", "5 questions.", [
              q("Preeclampsia is hypertension with proteinuria onset after:", ["10 weeks", "20 weeks", "30 weeks", "Birth"], 1, "After 20 weeks."),
              q("The first sign of magnesium toxicity is:", ["Respiratory arrest", "Loss of deep tendon reflexes", "Cardiac arrest", "Seizure"], 1, "Reflexes disappear first."),
              q("The antidote to magnesium toxicity is:", ["Naloxone", "Calcium gluconate", "Flumazenil", "Atropine"], 1, "Calcium gluconate."),
              q("HELLP syndrome includes:", ["High platelets", "Low platelets + hemolysis + high liver enzymes", "Low BP", "High glucose"], 1, "Hemolysis, Elevated Liver enzymes, Low Platelets."),
              q("Eclampsia is defined by:", ["Headache alone", "Seizures in preeclampsia", "High glucose", "Edema only"], 1, "Seizures mark eclampsia."),
            ], { minutes: 8, skills: ["maternal-child", "pharmacology"] }),
          ],
        ),
      ],
    ),
    unit(
      "At-Risk Newborn",
      "Preterm, jaundice, and neonatal sepsis.",
      "👶",
      14,
      [
        pathway(
          "Newborn Problems",
          "Jaundice, prematurity, and sepsis.",
          "💡",
          [
            vid("Newborn Jaundice & Sepsis", "Common neonatal risks.", { minutes: 9, transcript: "Neonatal jaundice (hyperbilirubinemia) often needs phototherapy; severe cases risk kernicterus. Preterm infants need thermoregulation, feeding support, and infection vigilance. Neonatal sepsis presents subtly — temperature instability, poor feeding, lethargy." }),
            read("Jaundice, Preterm & Sepsis", "Recognition and care.", [
              "**Jaundice:** yellow skin/sclera from high bilirubin; phototherapy lowers levels; watch for bilirubin encephalopathy (kernicterus).",
              "",
              "**Preterm care:** warm (incubator), nutrition (gavage/IV), infection prevention, monitor glucose/breathing.",
              "",
              "**Neonatal sepsis signs:** temperature instability (fever OR hypothermia), poor feeding, lethargy, respiratory distress, jaundice — sepsis is an emergency; start antibiotics promptly.",
            ].join("\n"), { minutes: 11, source: "AAP hyperbilirubinemia guideline; WHO newborn care", skills: ["maternal-child", "pediatric"], takeaways: ["Phototherapy treats jaundice; kernicterus is the danger.", "Preterm: warm, feed, prevent infection.", "Neonatal sepsis is subtle — temperature instability, poor feeding."] }),
            prac("Set Up Phototherapy", "Steps for jaundice care.", ["Place newborn under phototherapy lights", "Maximize skin exposure (diaper only)", "Protect eyes with shields", "Monitor temperature and hydration", "Track bilirubin levels"], { minutes: 10, skills: ["maternal-child", "pediatric"] }),
            quiz("Quiz: At-Risk Newborn", "4 questions.", [
              q("Phototherapy treats neonatal:", ["Sepsis", "Jaundice (hyperbilirubinemia)", "Hypoglycemia", "Anemia"], 1, "Phototherapy lowers bilirubin."),
              q("Untreated severe jaundice risks:", ["Pneumonia", "Kernicterus (brain damage)", "Fractures", "Deafness only"], 1, "Kernicterus is bilirubin neurotoxicity."),
              q("Neonatal sepsis may present as:", ["Always high fever", "Temperature instability and poor feeding", "Hyperactivity", "Normal vitals"], 1, "Often subtle and temperature-unstable."),
              q("A preterm infant's priority needs include:", ["Cold stress", "Warmth, nutrition, infection prevention", "Exercise", "Surgery"], 1, "Thermoregulation, feeding, and infection control."),
            ], { minutes: 6, skills: ["maternal-child", "pediatric"] }),
          ],
        ),
      ],
    ),
  ],
});
