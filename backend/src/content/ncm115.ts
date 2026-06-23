import { course, pathway, unit, vid, read, prac, quiz, q } from "./builder.js";

/** NCM 115 — Nursing Research II (conducting and disseminating research). */
export const ncm115 = course({
  code: "NCM 115",
  title: "Nursing Research II",
  category: "ELECTIVE",
  tagline: "Designing, conducting, and disseminating a nursing research project.",
  icon: "📝",
  hours: 54,
  outcomes: [
    "Design a study (sampling, data collection, ethics)",
    "Understand basic descriptive and inferential statistics",
    "Apply research ethics and informed consent",
    "Disseminate findings and integrate into practice",
  ],
  units: [
    unit(
      "Study Design & Methods",
      "Sampling, data, and ethics.",
      "🧭",
      14,
      [
        pathway(
          "Designing Your Study",
          "From plan to data.",
          "🛠️",
          [
            vid("Study Design & Sampling", "Choosing methods and participants.", { minutes: 9, transcript: "Design choices include sampling (random vs convenience), data collection (surveys, observation, biophysiologic measures), and ethical protections — informed consent, confidentiality, and IRB review." }),
            read("Sampling, Data & Research Ethics", "Key methodological choices.", [
              "**Sampling:** probability (random — generalizable) vs non-probability (convenience — less generalizable).",
              "",
              "**Data collection:** questionnaires, interviews, observation, chart review, biophysiologic measures.",
              "**Validity & reliability:** does your tool measure what it should, consistently?",
              "",
              "**Research ethics:** IRB/ethics-board approval, informed consent, confidentiality, voluntary participation, protection of vulnerable groups, the right to withdraw.",
              "",
              "**Helsinki/Nuremberg** legacies: respect for persons, beneficence, justice.",
            ].join("\n"), { minutes: 11, source: "Declaration of Helsinki; Belmont Report", skills: ["research", "ethics"], takeaways: ["Random sampling → more generalizable.", "IRB approval + informed consent are mandatory.", "Protect vulnerable participants."] }),
            prac("Plan a Study's Ethics", "Checklist for ethical research.", ["Obtain IRB/ethics approval", "Prepare a clear informed consent form", "Ensure voluntary participation", "Protect confidentiality", "Allow withdrawal at any time"], { minutes: 10, skills: ["research", "ethics"] }),
            quiz("Quiz: Design & Ethics", "4 questions.", [
              q("IRB approval is required to:", ["Increase funding", "Protect human participants and ensure ethical conduct", "Speed up publication", "Replace consent"], 1, "Ethics oversight."),
              q("Random sampling improves:", ["Bias", "Generalizability", "Cost", "Pain"], 1, "Representativeness of the sample."),
              q("Informed consent must be:", ["Forced", "Voluntary and informed", "Verbal only", "Skipped for nurses"], 1, "Voluntary + informed."),
              q("A reliable tool is one that is:", ["Inconsistent", "Consistent/repeatable", "Always wrong", "Expensive"], 1, "Reliability = consistency."),
            ], { minutes: 6, skills: ["research"] }),
          ],
        ),
      ],
    ),
    unit(
      "Statistics & Dissemination",
      "Analyzing data and sharing results.",
      "📊",
      12,
      [
        pathway(
          "Basic Statistics & Sharing Findings",
          "Make sense of data and apply it.",
          "📐",
          [
            vid("Statistics & Dissemination", "From data to practice change.", { minutes: 8, transcript: "Descriptive statistics summarize data (mean, median, mode, standard deviation); inferential statistics test hypotheses (p-values, confidence intervals). Dissemination: write the report, present, publish, and integrate findings into practice." }),
            read("Descriptive vs Inferential", "And p-values explained.", [
              "**Descriptive:** mean (average), median (middle), mode (most common), standard deviation (spread).",
              "",
              "**Inferential:** tests whether differences are real (t-test, chi-square, ANOVA).",
              "- **p-value:** probability the result is due to chance; p < 0.05 is the conventional threshold for significance (not the same as clinical importance).",
              "- **Confidence interval:** range likely to contain the true effect.",
              "",
              "**Dissemination:** report → present → publish → adopt in practice (close the loop).",
            ].join("\n"), { minutes: 10, source: "Statistics primers; research dissemination literature", skills: ["research"], takeaways: ["Descriptive summarizes; inferential tests.", "p < 0.05 = statistically significant (not necessarily meaningful).", "Share findings and apply them."] }),
            quiz("Quiz: Statistics & Dissemination", "4 questions.", [
              q("The mean is a measure of:", ["Spread", "Central tendency (average)", "Significance", "Sampling"], 1, "Average."),
              q("Standard deviation measures:", ["The average", "Spread/variability", "The median", "The mode"], 1, "How spread out the data are."),
              q("A p-value < 0.05 conventionally means:", ["Result is due to chance", "Result is statistically significant", "Result is clinically important", "Result is invalid"], 1, "Unlikely due to chance — but not necessarily clinically meaningful."),
              q("Dissemination is important because:", ["It wastes time", "It shares findings so practice can improve", "It hides data", "It's optional"], 1, "Closes the loop to practice change."),
            ], { minutes: 6, skills: ["research"] }),
          ],
        ),
      ],
    ),
  ],
});
