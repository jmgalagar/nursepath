import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 118 — Nursing Leadership and Management. */
export const ncm118 = course({
  code: "NCM 118",
  title: "Nursing Leadership and Management",
  category: "ELECTIVE",
  tagline: "Leading teams, managing care delivery, and shaping the profession.",
  icon: "👔",
  hours: 54,
  outcomes: [
    "Apply leadership and management theories in nursing",
    "Use delegation and assignment principles safely",
    "Manage time, staffing, and conflict",
    "Apply quality improvement and change management",
  ],
  units: [
    unit(
      "Leadership & Management Theory",
      "From bedside nurse to nurse leader.",
      "🧭",
      12,
      [
        pathway(
          "Leadership Styles & Functions",
          "Leading people, managing work.",
          "🎯",
          [
            vid("Nursing Leadership Styles", "Autocratic to transformational.", { minutes: 9, transcript: "Leadership sets a vision; management organizes the work to get there. Styles: autocratic (directive), democratic (participative), laissez-faire (hands-off), and transformational (inspiring, change-driven). The best style depends on the situation and staff." }),
            read("Styles, Functions & Delegation", "Core management concepts.", [
              "**Styles:** autocratic (fast, directive), democratic (consensus), laissez-faire (autonomy for experts), transformational (vision, motivation, change).",
              "",
              "**Management functions:** planning, organizing, directing, controlling.",
              "",
              "**Delegation (5 Rights of Delegation):**",
              "1. Right Task (within scope/competence)",
              "2. Right Circumstance",
              "3. Right Person",
              "4. Right Direction/Communication",
              "5. Right Supervision/Feedback",
              "",
              "Delegated tasks remain the nurse's responsibility — accountability is not delegated.",
            ].join("\n"), { minutes: 11, source: "ANA Principles of Delegation; leadership texts", skills: ["leadership"], takeaways: ["Leadership = vision; management = execution.", "5 Rights of Delegation; accountability isn't delegated.", "Match style to situation."] }),
            prac("Apply the 5 Rights of Delegation", "Delegate safely.", ["Is it the right task (in scope)?", "Right circumstance?", "Right person (competent)?", "Clear direction/communication?", "Plan supervision and feedback?"], { minutes: 10, skills: ["leadership"] }),
            simDecision("Delegation Dilemma", "Delegate appropriately.", "start", {
              start: { scenario: "Which task can a nurse delegate to a nursing assistant?", choices: [{ label: "Taking routine vital signs on a stable patient", next: "correct", feedback: "Yes — routine vitals on a stable patient are within the assistant's scope." }, { label: "Initial head-to-toe assessment of a new admission", next: "wrong", feedback: "Assessment requires nursing judgment and cannot be delegated." }] },
              correct: { scenario: "Correct. The nurse retains assessment, teaching, and evaluation.", success: true, debrief: "Delegate routine, stable-patient tasks; retain assessment, teaching, evaluation, and unstable-patient care. Accountability stays with the nurse." },
              wrong: { scenario: "Assessment needs nursing judgment — keep it.", debrief: "Use the 5 Rights of Delegation; supervise and follow up.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 5, skills: ["leadership"] }),
            quiz("Quiz: Leadership & Delegation", "5 questions.", [
              q("A transformational leader:", ["Controls rigidly", "Inspires change and vision", "Avoids decisions", "Does nothing"], 1, "Vision and motivation."),
              q("The 5 Rights of Delegation do NOT include:", ["Right Task", "Right Person", "Right Salary", "Right Supervision"], 2, "Salary isn't one of the five."),
              q("After delegating, the nurse is:", ["No longer responsible", "Still accountable", "Off-duty", "Anonymous"], 1, "Accountability stays with the nurse."),
              q("A nursing assessment is:", ["Delegatable to anyone", "Not delegated — needs nursing judgment", "Always the doctor's job", "Optional"], 1, "Assessment requires the nurse."),
              q("Planning, organizing, directing, controlling are:", ["Leadership styles", "Management functions", "Drug classes", "Vital signs"], 1, "Core management functions."),
            ], { minutes: 8, skills: ["leadership"] }),
          ],
        ),
      ],
    ),
    unit(
      "Quality, Change & Conflict",
      "Improving care and resolving issues.",
      "🔄",
      14,
      [
        pathway(
          "Quality Improvement & Conflict",
          "Lead change, manage conflict.",
          "📊",
          [
            vid("Quality Improvement & Conflict", "Better care, smoother teams.", { minutes: 9, transcript: "Quality improvement (QI) uses data to systematically improve care — Plan-Do-Study-Act (PDSA) cycles. Conflict resolution styles range from avoiding to collaborating; the best choice depends on the situation. Change management (Lewin's model: unfreeze-change-refreeze) guides adoption." }),
            read("QI, Conflict & Change", "Tools for the nurse leader.", [
              "**PDSA cycle:** Plan (set aim + changes), Do (test), Study (measure), Act (adopt/adjust).",
              "",
              "**Conflict styles:** avoiding, accommodating, competing, compromising, collaborating (win-win — usually best for important issues).",
              "",
              "**Lewin's change model:** Unfreeze (build readiness) → Change (implement) → Refreeze (sustain).",
              "",
              "**Time management:** prioritize (urgent/important matrix), avoid multitasking, cluster tasks, delegate.",
              "",
              "**Staffing:** match skill mix and ratios to patient acuity; ensure safe coverage.",
            ].join("\n"), { minutes: 11, source: "IHI quality improvement; Lewin change model", skills: ["leadership"], takeaways: ["PDSA drives QI.", "Collaborating = win-win for important conflicts.", "Unfreeze → change → refreeze."] }),
            prac("Run a PDSA Cycle", "Plan an improvement.", ["Plan: define aim and the change to test", "Do: test it on a small scale", "Study: measure and reflect", "Act: adopt, adapt, or abandon", "Share and scale what works"], { minutes: 12, skills: ["leadership"] }),
            quiz("Quiz: QI & Change", "4 questions.", [
              q("PDSA stands for:", ["Plan-Do-Study-Act", "Patient-Disease-Study-Action", "Plan-Direct-Study-Audit", "Prevent-Detect-Stop-Act"], 0, "Plan-Do-Study-Act."),
              q("The usually best conflict style for important issues is:", ["Avoiding", "Collaborating (win-win)", "Competing", "Forcing"], 1, "Collaboration."),
              q("Lewin's change model is:", ["Unfreeze-Change-Refreeze", "Plan-Budget-Execute", "Assess-Diagnose-Plan", "Start-Stop-Continue"], 0, "Unfreeze-Change-Refreeze."),
              q("In the urgent/important matrix, what's most valuable to prioritize?", ["Trivial tasks", "Important (not just urgent) tasks", "Distractions", "Nothing"], 1, "Focus on important work."),
            ], { minutes: 6, skills: ["leadership"] }),
          ],
        ),
      ],
    ),
  ],
});
