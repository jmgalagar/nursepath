import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 116 — Care of Clients with Problems in Nutrition, Gastrointestinal, Endocrine, Acute and Chronic. */
export const ncm116 = course({
  code: "NCM 116",
  title: "Care of Clients with Problems in Nutrition, Gastrointestinal, Endocrine, Acute and Chronic",
  category: "NCM",
  tagline: "Diabetes, GI disorders, and the nursing of chronic disease.",
  icon: "🩸",
  hours: 72,
  outcomes: [
    "Manage diabetes mellitus and its complications",
    "Provide nursing care for GI disorders (PUD, liver disease)",
    "Apply nutritional support and enteral feeding principles",
    "Coordinate chronic disease self-management",
  ],
  units: [
    unit(
      "Endocrine: Diabetes Mellitus",
      "Type 1, type 2, and acute complications.",
      "💉",
      16,
      [
        pathway(
          "Diabetes & Its Emergencies",
          "Hypoglycemia and DKA.",
          "🍬",
          [
            vid("Diabetes Mellitus", "Types, control, and emergencies.", { minutes: 10, transcript: "Type 1 diabetes lacks insulin (autoimmune); type 2 has insulin resistance. Acute emergencies: hypoglycemia (low glucose — the rule of 15) and DKA (ketoacidosis, high glucose, ketones)." }),
            read("Diabetes Management & Emergencies", "Control and crisis care.", [
              "**Control:** glucose monitoring, diet, exercise, medications (insulin, oral agents); HbA1c reflects ~3-month control (target often <7%).",
              "",
              "**Hypoglycemia (glucose < 70 mg/dL):** shakiness, sweating, confusion, tachycardia. Treat with the **Rule of 15**: give 15 g fast carbs → recheck in 15 min → repeat if still low. Severe/unconscious: IV dextrose or IM glucagon.",
              "",
              "**Diabetic Ketoacidosis (DKA):** hyperglycemia, ketones, acidosis (low pH/bicarbonate); Kussmaul breathing, fruity breath; fluid + insulin + electrolyte correction.",
              "",
              "**Hyperosmolar hyperglycemic state (HHS):** very high glucose, severe dehydration, no significant ketones — mostly type 2.",
            ].join("\n"), { minutes: 12, source: "ADA Standards of Medical Care in Diabetes", skills: ["endocrine", "pharmacology"], takeaways: ["Hypoglycemia < 70 → Rule of 15.", "DKA: high glucose + ketones + acidosis; treat with fluids + insulin.", "HbA1c reflects ~3-month glucose control."] }),
            prac("Treat Hypoglycemia (Rule of 15)", "Steps for a low glucose.", ["Confirm glucose < 70 mg/dL (or symptoms)", "Give 15 g fast carbs (juice, glucose tablets)", "Wait 15 minutes", "Recheck glucose", "Repeat if still low; give a snack if next meal is far off"], { minutes: 10, skills: ["endocrine"] }),
            simDecision("The Sweating Diabetic", "Recognize and act.", "start", {
              start: { scenario: "A patient with diabetes is sweating, shaky, and confused; glucometer reads 48 mg/dL and they can swallow. What do you do?", choices: [{ label: "Apply the Rule of 15: give 15 g fast carbs, recheck in 15 min", next: "correct", feedback: "Correct — symptomatic low glucose; fast carbs, then recheck." }, { label: "Give insulin", next: "wrong", feedback: "That would worsen hypoglycemia." }] },
              correct: { scenario: "Correct. If unconscious or NPO, give IV dextrose or IM glucagon instead.", success: true, debrief: "Hypoglycemia: Rule of 15 when alert; IV dextrose/IM glucagon when not. Recheck; follow with a snack." },
              wrong: { scenario: "Low glucose needs carbohydrates, not insulin.", debrief: "Recognize the 4 Ts of low glucose: shaky, sweaty, confused, tachycardic.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["endocrine"] }),
            quiz("Quiz: Diabetes", "5 questions.", [
              q("Hypoglycemia is generally defined as glucose below:", ["200 mg/dL", "70 mg/dL", "40 mmHg", "100 mmol/L"], 1, "< 70 mg/dL."),
              q("The Rule of 15 gives:", ["15 g carbs then recheck in 15 min", "15 units insulin", "15 mL water", "15 minutes of rest"], 0, "15 g carbs, recheck at 15 min."),
              q("DKA shows:", ["Low glucose + no ketones", "High glucose + ketones + acidosis", "Normal glucose", "High calcium"], 1, "The triad of DKA."),
              q("HbA1c reflects glucose control over about:", ["1 day", "3 months", "1 year", "1 week"], 1, "~3 months of red blood cell lifespan."),
              q("An unconscious hypoglycemic patient needs:", ["Oral juice", "IV dextrose or IM glucagon", "Insulin", "Nothing"], 1, "Parenteral glucose/glucagon when NPO/unconscious."),
            ], { minutes: 8, skills: ["endocrine"] }),
          ],
        ),
      ],
    ),
    unit(
      "Gastrointestinal Disorders",
      "Peptic ulcer, liver disease, and nutrition support.",
      "🏥",
      16,
      [
        pathway(
          "GI & Hepatic Care",
          "Common digestive and liver conditions.",
          "🫃",
          [
            vid("GI Disorders", "PUD, liver disease, nutrition.", { minutes: 10, transcript: "Peptic ulcer disease involves stomach/duodenal mucosa breakdown — often H. pylori or NSAIDs. Liver disease (cirrhosis) leads to portal hypertension, ascites, and bleeding risk. Nutrition support includes enteral feeding when oral intake is inadequate." }),
            read("PUD, Cirrhosis & Nutrition", "Nursing priorities.", [
              "**Peptic ulcer disease (PUD):** epigastric pain, relieved (duodenal) or worsened (gastric) by food; treat H. pylori (antibiotics + PPI), stop NSAIDs, avoid irritants.",
              "",
              "**Cirrhosis complications:** ascites (sodium restriction, diuretics), esophageal varices (bleeding risk — no sharp/straining), hepatic encephalopathy (confusion from ammonia — lactulose lowers it), coagulopathy.",
              "",
              "**Nutrition support:** assess needs; enteral (tube) feeding preferred over parenteral when the gut works; aspiration precautions; monitor residuals.",
            ].join("\n"), { minutes: 12, source: "Clinical gastroenterology/hepatology references", skills: ["gastrointestinal", "nutrition"], takeaways: ["PUD: H. pylori + NSAIDs; treat with antibiotics + PPI.", "Cirrhosis: ascites, varices, encephalopathy (lactulose for ammonia).", "Enteral feeding preferred when the gut works."] }),
            prac("Care for a Cirrhosis Patient", "Reduce complications.", ["Monitor abdominal girth for ascites", "Restrict sodium as ordered", "Assess for bleeding (gums, stools)", "Give lactulose for encephalopathy", "Ensure safe food/protein per orders"], { minutes: 12, skills: ["gastrointestinal"] }),
            simDecision("Hepatic Encephalopathy", "Spot the cause of confusion.", "start", {
              start: { scenario: "A cirrhosis patient becomes confused; labs show high ammonia. What intervention is first-line?", choices: [{ label: "Give lactulose to lower ammonia", next: "correct", feedback: "Yes — lactulose traps ammonia in the gut; also find/fix triggers (infection, bleeding)." }, { label: "Give more dietary protein", next: "wrong", feedback: "Excess protein can worsen ammonia; lactulose is key." }] },
              correct: { scenario: "Correct. Find and treat triggers (infection, GI bleed, constipation) too.", success: true, debrief: "Hepatic encephalopathy: ammonia crosses the brain. Lactulose lowers it; antibiotics (rifaximin) may be added." },
              wrong: { scenario: "Lower ammonia first with lactulose.", debrief: "Protein handling is nuanced; the acute tool is lactulose.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["gastrointestinal"] }),
            quiz("Quiz: GI & Nutrition", "5 questions.", [
              q("A common cause of peptic ulcer disease is:", ["H. pylori infection", "Vitamin C", "Exercise", "Fiber"], 0, "H. pylori + NSAIDs."),
              q("Lactulose is given in cirrhosis to:", ["Raise blood sugar", "Lower ammonia in hepatic encephalopathy", "Stop bleeding", "Cure hepatitis"], 1, "It traps ammonia in the gut."),
              q("Esophageal varices are dangerous because of:", ["Pain only", "Life-threatening bleeding", "Infection", "Diarrhea"], 1, "Varices can rupture and bleed massively."),
              q("Enteral feeding is preferred when:", ["The gut works", "The gut doesn't work", "Always parenteral", "Never"], 0, "Use the gut if it functions."),
              q("Ascites is managed with:", ["High-sodium diet", "Sodium restriction and diuretics", "More fluids", "Insulin"], 1, "Restrict sodium, drain/diurese."),
            ], { minutes: 8, skills: ["gastrointestinal", "nutrition"] }),
          ],
        ),
      ],
    ),
  ],
});
