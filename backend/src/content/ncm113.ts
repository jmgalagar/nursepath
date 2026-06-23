import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 113 — Community Health Nursing II (Population Groups and Community). */
export const ncm113 = course({
  code: "NCM 113",
  title: "Community Health Nursing II (Population Groups and Community)",
  category: "NCM",
  tagline: "Population-level public health: epidemiology, programs, and community diagnosis.",
  icon: "🌐",
  hours: 72,
  outcomes: [
    "Apply epidemiology to community health problems",
    "Conduct a community diagnosis and needs assessment",
    "Deliver DOH public health programs (EPI, NTP, maternal health)",
    "Plan and evaluate community health interventions",
  ],
  units: [
    unit(
      "Epidemiology",
      "Measuring health in populations.",
      "📊",
      14,
      [
        pathway(
          "Measures of Disease Frequency",
          "Incidence, prevalence, and the epidemiologic triad.",
          "📈",
          [
            vid("Epidemiology Basics", "How disease is measured.", { minutes: 9, transcript: "Epidemiology studies the distribution and determinants of disease in populations. Key measures: incidence (new cases) and prevalence (existing cases). The epidemiologic triad is agent-host-environment." }),
            read("Incidence, Prevalence & the Triad", "Core epidemiologic concepts.", [
              "**Incidence:** number of NEW cases in a time period / population at risk — measures risk.",
              "**Prevalence:** ALL existing cases at a point/period — measures burden.",
              "",
              "**Epidemiologic triad:** Agent (microbe) × Host (susceptibility) × Environment — interaction causes disease.",
              "",
              "**Levels of prevention** apply at the population level (immunization, screening, rehab).",
            ].join("\n"), { minutes: 11, source: "CDC Principles of Epidemiology", skills: ["community-health", "epidemiology"], takeaways: ["Incidence = new cases (risk); prevalence = existing (burden).", "Triad: agent-host-environment."] }),
            prac("Calculate Disease Measures", "Apply the formulas.", ["Incidence = new cases ÷ population at risk", "Prevalence = existing cases ÷ total population", "Distinguish risk vs burden", "Interpret a rising incidence"], { minutes: 10, skills: ["epidemiology"] }),
            quiz("Quiz: Epidemiology", "4 questions.", [
              q("Incidence measures:", ["Existing cases", "New cases in a period", "Deaths only", "Cost"], 1, "New cases over time."),
              q("Prevalence measures:", ["Disease burden (all cases)", "Only new cases", "Births", "Vital signs"], 0, "All existing cases."),
              q("The epidemiologic triad is:", ["Agent-host-environment", "Sun-moon-earth", "DNA-RNA-protein", "Food-water-air"], 0, "Agent-host-environment."),
              q("A disease with high prevalence but low incidence is likely:", ["Acute and short", "Chronic with long duration", "Non-existent", "Cured instantly"], 1, "Long duration accumulates prevalent cases."),
            ], { minutes: 6, skills: ["epidemiology"] }),
          ],
        ),
      ],
    ),
    unit(
      "Community Diagnosis & DOH Programs",
      "Assessing and serving a community.",
      "🏥",
      16,
      [
        pathway(
          "Community Diagnosis & Public Health Programs",
          "Tools for population health.",
          "🗺️",
          [
            vid("Community Health Diagnosis", "Assessing a whole community.", { minutes: 9, transcript: "Community diagnosis identifies a population's health problems using demographic, environmental, and health data, then prioritizes interventions. DOH programs operationalize national priorities." }),
            read("Community Diagnosis & Key Programs", "Process and Philippine programs.", [
              "**Community diagnosis steps:** collect data (census, surveys, records) → analyze → identify problems → prioritize → plan → implement → evaluate.",
              "",
              "**Key DOH programs:**",
              "- **EPI** — Expanded Program on Immunization (free childhood vaccines).",
              "- **NTP** — National TB Program (DOTS).",
              "- **Maternal & Child Health** — prenatal care, safe delivery.",
              "- **Family Planning** — access to contraception.",
              "- **Nutrition** — feeding programs, micronutrient supplementation.",
              "- **Dengue, HIV/AIDS, NCD control.**",
            ].join("\n"), { minutes: 12, source: "DOH Philippines public health programs; WHO", skills: ["community-health"], takeaways: ["Community diagnosis = data → analyze → prioritize → act.", "Core DOH programs: EPI, NTP, MCH, Family Planning."] }),
            simDecision("Prioritize Community Problems", "Decide what to address first.", "start", {
              start: { scenario: "Your community diagnosis shows: (1) low immunization coverage, (2) occasional colds, (3) rare cosmetic concerns. What do you prioritize?", choices: [{ label: "Low immunization coverage (high impact, preventable)", next: "correct", feedback: "Yes — prioritization weighs severity, feasibility, and impact." }, { label: "Cosmetic concerns", next: "wrong", feedback: "Low impact on population health." }] },
              correct: { scenario: "Correct — high-impact, preventable problems come first.", success: true, debrief: "Prioritize by magnitude, severity, feasibility, and community concern." },
              wrong: { scenario: "Focus on high-impact preventable issues.", debrief: "Use problem-prioritization criteria.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 5, skills: ["community-health"] }),
            quiz("Quiz: Community Health", "4 questions.", [
              q("EPI stands for:", ["Emergency Patient Index", "Expanded Program on Immunization", "Epidemic Plan", "Essential Pill Index"], 1, "Childhood immunization program."),
              q("NTP provides what for TB?", ["Vaccines only", "DOTS — directly observed treatment", "Surgery", "Nothing"], 1, "DOTS ensures adherence."),
              q("Community diagnosis is best described as:", ["Treating one patient", "Assessing the population's health and problems", "A single survey", "A hospital audit"], 1, "Population-level assessment."),
              q("Prioritization weighs:", ["Cost only", "Magnitude, severity, feasibility, impact", "Doctor preference", "Random choice"], 1, "Multiple criteria."),
            ], { minutes: 6, skills: ["community-health"] }),
          ],
        ),
      ],
    ),
  ],
});
