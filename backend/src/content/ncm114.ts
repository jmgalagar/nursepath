import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 114 — Care of Older Adults (Gerontological nursing). */
export const ncm114 = course({
  code: "NCM 114",
  title: "Care of Older Adults",
  category: "NCM",
  tagline: "Promoting health, function, and dignity in the aging population.",
  icon: "👵",
  hours: 54,
  outcomes: [
    "Describe normal age-related changes across body systems",
    "Differentiate normal aging from disease",
    "Apply geriatric assessment tools (fall risk, cognition)",
    "Prevent and manage common geriatric syndromes",
  ],
  units: [
    unit(
      "Normal Aging vs Disease",
      "What's normal, what's not.",
      "🕰️",
      12,
      [
        pathway(
          "Age-Related Changes",
          "Physiology of healthy aging.",
          "🧓",
          [
            vid("Normal Aging Changes", "Body systems across the lifespan.", { minutes: 9, transcript: "Aging brings predictable changes: slower reflexes, reduced skin elasticity, decreased cardiac reserve, mild kidney function decline, lens stiffening (presbyopia), and some cognitive slowing — but dementia and severe frailty are NOT normal aging." }),
            read("Normal Aging by System", "Distinguish from pathology.", [
              "**Skin:** thinner, less elastic, fewer sweat glands (heat risk).",
              "**Cardiovascular:** stiffer vessels, higher systolic BP, reduced maximal heart rate.",
              "**Respiratory:** decreased elasticity, weaker cough — pneumonia risk.",
              "**Renal:** slower GFR decline → cautious drug dosing.",
              "**Musculoskeletal:** loss of muscle mass (sarcopenia), bone density (osteoporosis).",
              "**Sensory:** presbyopia (reading), presbycusis (high-frequency hearing loss).",
              "**Neuro:** slower reaction time; memory changes — but **dementia is NOT normal.**",
            ].join("\n"), { minutes: 11, source: "Touhy & Jett Ebersole and Hess' Gerontological Nursing", skills: ["gerontology"], takeaways: ["Aging: stiffer vessels, weaker cough, slower GFR, sarcopenia.", "Dementia and severe frailty are NOT normal aging."] }),
            prac("Differentiate Aging from Disease", "Sort findings.", ["Presbyopia → normal", "Presbycusis → normal", "Sudden confusion → delirium (abnormal)", "Progressive memory loss → dementia (abnormal)"], { minutes: 8, skills: ["gerontology"] }),
            quiz("Quiz: Aging", "4 questions.", [
              q("Which is a NORMAL age-related change?", ["Dementia", "Presbyopia (difficulty reading)", "Delirium", "Pathologic fracture"], 1, "Lens stiffening is normal."),
              q("Dementia is:", ["A normal part of aging", "A disease, not normal aging", "Inevitable", "Curable with vitamins"], 1, "Dementia is pathology."),
              q("Older adults need lower doses of many drugs because of:", ["Stronger livers", "Reduced kidney function", "Faster metabolism", "Higher absorption"], 1, "Slower renal excretion."),
              q("Sarcopenia refers to:", ["Bone loss", "Age-related muscle loss", "Memory loss", "Hearing loss"], 1, "Loss of muscle mass."),
            ], { minutes: 6, skills: ["gerontology"] }),
          ],
        ),
      ],
    ),
    unit(
      "Geriatric Syndromes & Assessment",
      "Falls, delirium, dementia, polypharmacy.",
      "🩺",
      16,
      [
        pathway(
          "Falls, Delirium & Polypharmacy",
          "Common, dangerous, and often preventable.",
          "⚠️",
          [
            vid("Geriatric Syndromes", "High-impact problems in elders.", { minutes: 10, transcript: "Geriatric syndromes cross single diseases: falls, delirium, dementia, incontinence, and polypharmacy. Each is multifactorial and often preventable with targeted assessment." }),
            read("Key Syndromes & Assessment Tools", "Recognize and intervene.", [
              "**Falls:** assess risk (history of falls, gait, medications, vision, environment); prevent with exercise, home safety, medication review.",
              "",
              "**Delirium** (acute confusion): fluctuating, inattention — usually reversible; identify triggers (infection, drugs, dehydration, surgery). CAM tool screens for it.",
              "**Dementia** (chronic, progressive): memory, executive function decline; MMSE/MoCA screen.",
              "",
              "**Polypharmacy:** multiple drugs raise interaction/fall risk; review regularly; use the Beers Criteria for potentially inappropriate medications.",
              "",
              "**Pressure injury risk:** Braden Scale; turn and reposition.",
            ].join("\n"), { minutes: 12, source: "AGS Beers Criteria; CAM delirium tool; Braden Scale", skills: ["gerontology", "pharmacology"], takeaways: ["Delirium = acute, reversible; dementia = chronic.", "Review medications (Beers) to cut polypharmacy harm.", "Braden Scale for pressure injury risk."] }),
            simDecision("Acute Confusion", "Delirium vs dementia.", "start", {
              start: { scenario: "An 82-year-old admitted for a UTI becomes acutely confused and inattentive overnight, fluctuating through the day. What is this?", choices: [{ label: "Delirium — acute, often reversible, find and treat the trigger (UTI)", next: "correct", feedback: "Yes — acute onset, fluctuating, inattention = delirium." }, { label: "Dementia — permanent", next: "wrong", feedback: "Dementia is chronic and progressive, not acute/fluctuating." }] },
              correct: { scenario: "Correct — treat the UTI and the delirium often resolves.", success: true, debrief: "Delirium: acute onset, fluctuating, inattention, often reversible. Always look for a trigger (infection, drugs, dehydration)." },
              wrong: { scenario: "Acute fluctuating confusion is delirium, not dementia.", debrief: "Dementia is gradual and progressive.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["gerontology"] }),
            quiz("Quiz: Geriatric Syndromes", "5 questions.", [
              q("Delirium is best described as:", ["Chronic and progressive", "Acute, fluctuating, often reversible", "Permanent memory loss", "Normal aging"], 1, "Acute and reversible."),
              q("Dementia differs from delirium by being:", ["Acute", "Chronic and progressive", "Fluctuating hourly", "Caused by infection"], 1, "Gradual and progressive."),
              q("Polypharmacy raises the risk of:", ["Better outcomes", "Falls, interactions, adverse effects", "Nothing", "Faster recovery"], 1, "Multiple drugs compound risk."),
              q("The Beers Criteria guide:", ["Vaccination", "Potentially inappropriate medications in older adults", "Wound care", "Surgery"], 1, "Lists drugs to avoid/reduce in elders."),
              q("Falls can be reduced by:", ["Bed rest always", "Exercise, home safety, medication review", "More sedatives", "Restraints"], 1, "Multifactorial prevention."),
            ], { minutes: 8, skills: ["gerontology"] }),
          ],
        ),
      ],
    ),
  ],
});
