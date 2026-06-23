import { course, pathway, unit, vid, read, prac, quiz, q } from "./builder.js";

/** NCM 111 — Nursing Research I. */
export const ncm111 = course({
  code: "NCM 111",
  title: "Nursing Research I",
  category: "ELECTIVE",
  tagline: "Reading, appraising, and applying research to nursing practice.",
  icon: "🔬",
  hours: 54,
  outcomes: [
    "Understand the research process and its role in nursing",
    "Read and critique quantitative and qualitative studies",
    "Formulate a research question using PICOT",
    "Appraise evidence using a hierarchy/levels of evidence",
  ],
  units: [
    unit(
      "The Research Process",
      "From question to dissemination.",
      "🧪",
      14,
      [
        pathway(
          "Steps of Nursing Research",
          "How a study is built.",
          "📐",
          [
            vid("The Nursing Research Process", "Steps from idea to application.", { minutes: 9, transcript: "The research process: identify a problem → review literature → state the question/hypothesis → design the study → collect data → analyze → interpret → disseminate → apply to practice." }),
            read("Research Steps & PICOT", "Frame good questions.", [
              "**Process:** problem → literature → question/hypothesis → design → data collection → analysis → interpretation → dissemination.",
              "",
              "**PICOT** frames a researchable question:",
              "- **P**opulation (who)",
              "- **I**ntervention (what you test)",
              "- **C**omparison (alternative)",
              "- **O**utcome (what you measure)",
              "- **T**ime (timeframe)",
              "",
              "Example: In **hospitalized older adults (P)**, does **hourly rounding (I)** compared with **call-light-only care (C)** reduce **fall rates (O)** over **6 months (T)**?",
            ].join("\n"), { minutes: 11, source: "Polit & Beck, Nursing Research", skills: ["research", "evidence-based-practice"], takeaways: ["8-step research process.", "PICOT frames searchable questions."] }),
            prac("Write a PICOT Question", "Build a question.", ["P: define the population", "I: state the intervention", "C: name the comparison", "O: specify the outcome", "T: set the timeframe"], { minutes: 12, skills: ["research"] }),
            quiz("Quiz: Research Process", "4 questions.", [
              q("PICOT is used to:", ["Give a drug", "Frame a research question", "Diagnose disease", "Order labs"], 1, "It structures the question."),
              q("The first step of research is:", ["Data analysis", "Identifying the problem", "Publishing", "Giving informed consent"], 1, "Start with the problem."),
              q("In PICOT, 'O' stands for:", ["Outcome", "Object", "Order", "Only"], 0, "Outcome."),
              q("A hypothesis is a(n):", ["Final answer", "Testable prediction/statement", "Patient", "Drug"], 1, "A testable statement of the expected relationship."),
            ], { minutes: 6, skills: ["research"] }),
          ],
        ),
      ],
    ),
    unit(
      "Appraising Evidence",
      "Levels of evidence and critical reading.",
      "📊",
      12,
      [
        pathway(
          "Levels of Evidence & Critique",
          "Which studies to trust.",
          "📈",
          [
            vid("Hierarchy of Evidence", "From expert opinion to systematic reviews.", { minutes: 8, transcript: "Evidence ranges from expert opinion (weakest) through case-control and cohort studies, randomized controlled trials, to systematic reviews and meta-analyses (strongest). Higher levels better support practice change." }),
            read("Levels of Evidence & Validity", "Appraise before applying.", [
              "**Hierarchy (low → high):** expert opinion → case reports → case-control → cohort → RCT → systematic review/meta-analysis.",
              "",
              "**Quantitative** measures numbers (RCT, cohort); **qualitative** explores experience (interviews, focus groups).",
              "",
              "**Appraise for:** validity (are the results true?), reliability (repeatable?), applicability (do they fit my patients?), and bias.",
              "",
              "**Common biases:** selection, measurement, publication, and confounding.",
            ].join("\n"), { minutes: 10, source: "Melnyk levels of evidence; Cochrane", skills: ["research", "evidence-based-practice"], takeaways: ["Highest evidence: systematic reviews/meta-analyses.", "Quantitative vs qualitative answer different questions.", "Always check validity and applicability."] }),
            quiz("Quiz: Appraising Evidence", "4 questions.", [
              q("The strongest level of evidence is a:", ["Case report", "Expert opinion", "Systematic review/meta-analysis", "Single anecdote"], 2, "Synthesized evidence."),
              q("An RCT is good for testing:", ["Lived experience", "Whether an intervention causes an effect", "Family trees", "Lab ranges"], 1, "Cause-effect via randomization."),
              q("Qualitative research explores:", ["Numbers only", "Lived experience and meaning", "Drug doses", "Vital signs"], 1, "Meaning and experience."),
              q("Bias threatens a study's:", ["Color", "Validity", "Length only", "Title"], 1, "Bias distorts the truth of findings."),
            ], { minutes: 6, skills: ["research"] }),
          ],
        ),
      ],
    ),
  ],
});
