import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 105 — Nutrition and Diet Therapy. */
export const ncm105 = course({
  code: "NCM 105",
  title: "Nutrition and Diet Therapy",
  category: "NCM",
  tagline: "Nutritional science applied to health promotion and therapeutic diets.",
  icon: "🥗",
  hours: 54,
  outcomes: [
    "Describe macronutrients, micronutrients, and their functions",
    "Apply MyPlate/dietary guidelines to meal planning",
    "Implement therapeutic diets (diabetic, cardiac, renal, low-sodium)",
    "Perform basic nutritional assessment",
  ],
  units: [
    unit(
      "Nutritional Basics",
      "Macronutrients, micronutrients, and requirements.",
      "🍎",
      12,
      [
        pathway(
          "Macronutrients & Micronutrients",
          "The nutrients the body needs.",
          " Macronutrients",
          [
            vid("Essential Nutrients", "What the body needs and why.", { minutes: 8, transcript: "Macronutrients (carbs, proteins, fats) provide energy and structure. Micronutrients (vitamins, minerals) enable reactions. Water is essential for all metabolism." }),
            read("Macro & Micro at a Glance", "Functions and sources.", [
              "**Carbohydrates:** primary energy (4 kcal/g); whole grains, fruits.",
              "**Proteins:** tissue building/repair (4 kcal/g); meat, beans, dairy.",
              "**Fats:** energy storage, membranes, hormone precursors (9 kcal/g); oils, nuts.",
              "",
              "**Vitamins:** fat-soluble (A, D, E, K) and water-soluble (B, C).",
              "**Minerals:** calcium (bones), iron (hemoglobin), sodium/potassium (fluid balance), iodine (thyroid).",
              "",
              "**Deficiencies:** vitamin C → scurvy; vitamin D → rickets; iron → anemia; iodine → goiter; protein → kwashiorkor.",
            ].join("\n"), { minutes: 11, source: "WHO nutrition; dietary reference intakes", skills: ["nutrition"], takeaways: ["Carbs/protein = 4 kcal/g; fat = 9 kcal/g.", "Fat-soluble vitamins: A, D, E, K.", "Common deficiencies: iron, iodine, vitamin A, vitamin C, protein."] }),
            prac("Plan a Balanced Plate", "Apply MyPlate principles.", ["Half the plate: fruits & vegetables", "Quarter: whole grains", "Quarter: lean protein", "Include dairy/calcium", "Limit added sugar and salt"], { minutes: 10, skills: ["nutrition"] }),
            quiz("Quiz: Nutrients", "4 questions.", [
              q("Which provides 9 kcal per gram?", ["Carbohydrate", "Protein", "Fat", "Water"], 2, "Fat = 9 kcal/g."),
              q("Scurvy is caused by deficiency of:", ["Vitamin A", "Vitamin C", "Iron", "Calcium"], 1, "Vitamin C deficiency causes scurvy."),
              q("Goiter results from deficiency of:", ["Iron", "Iodine", "Vitamin D", "Protein"], 1, "Iodine deficiency causes goiter."),
              q("Which vitamins are fat-soluble?", ["B and C", "A, D, E, K", "Vitamin C only", "None"], 1, "A, D, E, K are fat-soluble."),
            ], { minutes: 6, skills: ["nutrition"] }),
          ],
        ),
      ],
    ),
    unit(
      "Therapeutic Diets",
      "Diets for diabetes, cardiac, and renal disease.",
      "🍽️",
      14,
      [
        pathway(
          "Common Therapeutic Diets",
          "Adapting nutrition to disease.",
          "🥦",
          [
            vid("Therapeutic Diet Basics", "Diets for common conditions.", { minutes: 9, transcript: "Therapeutic diets modify normal intake to manage disease: diabetic (carb-controlled), low-sodium/DASH (hypertension), low-fat/low-cholesterol (cardiac), low-protein & sodium/potassium/phosphorus restriction (renal)." }),
            read("Diets by Condition", "Key restrictions to know.", [
              "**Diabetic diet:** consistent carbohydrate intake, fiber, limit simple sugars; match carbs to medication/activity.",
              "",
              "**Cardiac / DASH:** low sodium (< 2 g/day), low saturated fat & cholesterol, high fruits/veg/whole grains.",
              "",
              "**Renal diet (CKD):** limit protein, sodium, potassium (bananas, oranges), phosphorus (dairy, nuts); watch fluid intake.",
              "",
              "**Low-residue / post-op:** low fiber during acute GI issues.",
              "",
              "**High-protein / high-calorie:** wounds, burns, malnutrition, cancer.",
            ].join("\n"), { minutes: 11, source: "Academy of Nutrition and Dietetics", skills: ["nutrition"], takeaways: ["Diabetic = carb control; DASH = low sodium; renal = limit protein/K/Na/P.", "Match the diet to the disease."] }),
            simDecision("Choose the Therapeutic Diet", "Match diet to patient.", "start", {
              start: { scenario: "A CKD patient has high potassium. Which food should be limited?", choices: [{ label: "Bananas and oranges (high potassium)", next: "correct", feedback: "Yes — these are potassium-rich and restricted in renal diets." }, { label: "Egg whites (low potassium)", next: "wrong", feedback: "Egg whites are relatively low potassium." }] },
              correct: { scenario: "Correct. Renal diets restrict potassium-rich foods.", success: true, debrief: "Renal diet limits protein, sodium, potassium (fruits/veg), and phosphorus (dairy/nuts)." },
              wrong: { scenario: "Pick the high-potassium food to restrict.", debrief: "Bananas, oranges, tomatoes, potatoes are potassium-rich.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 5, skills: ["nutrition"] }),
            quiz("Quiz: Therapeutic Diets", "4 questions.", [
              q("The DASH diet is low in:", ["Potassium", "Sodium", "Calcium", "Fiber"], 1, "DASH restricts sodium for hypertension."),
              q("A diabetic diet primarily controls:", ["Fat", "Carbohydrate", "Protein", "Water"], 1, "Carb control matches insulin/medication."),
              q("In CKD, potassium-rich foods to limit include:", ["Egg whites", "Bananas and oranges", "Butter", "Sugar"], 1, "These are high in potassium."),
              q("A high-protein diet is indicated for:", ["CKD", "Burns/wounds/malnutrition", "Gout", "Hypertension"], 1, "Increased needs in catabolic states."),
            ], { minutes: 6, skills: ["nutrition"] }),
          ],
        ),
      ],
    ),
  ],
});
