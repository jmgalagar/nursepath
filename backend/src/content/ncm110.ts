import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 110 — Nursing Informatics. */
export const ncm110 = course({
  code: "NCM 110",
  title: "Nursing Informatics",
  category: "ELECTIVE",
  tagline: "Technology, data, and information systems in nursing practice.",
  icon: "💻",
  hours: 54,
  outcomes: [
    "Explain the role of nursing informatics in healthcare",
    "Use electronic health records safely and ethically",
    "Apply data privacy and security principles",
    "Evaluate telehealth and health IT tools",
  ],
  units: [
    unit(
      "Foundations of Nursing Informatics",
      "The intersection of nursing, information, and technology.",
      "🖥️",
      12,
      [
        pathway(
          "What is Nursing Informatics?",
          "Data → information → knowledge → wisdom.",
          "🧠",
          [
            vid("Nursing Informatics Overview", "A specialty that powers modern care.", { minutes: 8, transcript: "Nursing informatics integrates nursing science with information and computer science to manage and communicate data, information, and knowledge in nursing practice. The DIKW pyramid: Data → Information → Knowledge → Wisdom." }),
            read("DIKW & Informatics Roles", "From raw data to clinical wisdom.", [
              "**Data:** raw facts (e.g. a temperature reading of 38.5°C).",
              "**Information:** data with context (38.5°C = fever for Mr. Reyes).",
              "**Knowledge:** synthesized information (fever + wound → likely infection).",
              "**Wisdom:** applying knowledge ethically and appropriately (start cultures and antipyretic, monitor).",
              "",
              "**Systems:** Electronic Health Records (EHR), Computerized Provider Order Entry (CPOE), bar-code medication administration, clinical decision support.",
            ].join("\n"), { minutes: 10, source: "AMIA Nursing Informatics; HIMSS", skills: ["informatics"], takeaways: ["DIKW: Data → Information → Knowledge → Wisdom.", "Informatics improves safety (CPOE, bar-code med admin).", "EHRs centralize and share patient data."] }),
            prac("Map DIKW", "Apply the pyramid.", ["Data: 160/100 reading", "Information: Mr. Reyes, BP 160/100", "Knowledge: Stage 2 hypertension", "Wisdom: arrange follow-up, teach lifestyle + meds"], { minutes: 8, skills: ["informatics"] }),
            quiz("Quiz: Informatics Foundations", "4 questions.", [
              q("The DIKW pyramid ends with:", ["Data", "Wisdom", "Information", "Codes"], 1, "Wisdom."),
              q("An EHR is a(n):", ["Electronic Health Record", "Emergency Heat Rule", "Epidemic Health Report", "Equipment Hire Rate"], 0, "Electronic Health Record."),
              q("Bar-code medication administration primarily reduces:", ["Cost", "Medication errors", "Paper only", "Staffing"], 1, "It verifies the right drug/patient."),
              q("CPOE stands for:", ["Computerized Provider Order Entry", "Care Plan Of Ethics", "Clinical Patient Oxygen Equipment", "None"], 0, "Computerized Provider Order Entry."),
            ], { minutes: 6, skills: ["informatics"] }),
          ],
        ),
      ],
    ),
    unit(
      "Data Privacy, Security & Telehealth",
      "Protecting patients and reaching them remotely.",
      "🔐",
      14,
      [
        pathway(
          "Privacy, Security & Telehealth",
          "Safe use of health technology.",
          "📡",
          [
            vid("Health Data Security & Telehealth", "Protecting information; delivering care remotely.", { minutes: 9, transcript: "Health data is sensitive: protect it with access controls, encryption, and audit trails. Telehealth extends care via video/remote monitoring — with new consent, privacy, and documentation considerations." }),
            read("Privacy Practices & Telehealth", "Security and virtual care.", [
              "**Data security:** strong unique passwords, role-based access, encryption, audit logs, never share logins, lock screens.",
              "",
              "**Privacy:** share the minimum necessary; verify identity; respect patient preferences.",
              "",
              "**Telehealth considerations:** confirm patient identity and consent, ensure a private setting, verify the technology, document thoroughly, know your jurisdiction's rules.",
              "",
              "**Human factors** in health IT: alert fatigue, copy-paste errors, workarounds — recognize and reduce them.",
            ].join("\n"), { minutes: 11, source: "HIPAA/HIMSS privacy & security; telehealth best practices", skills: ["informatics", "ethics"], takeaways: ["Strong access controls + encryption + audits protect data.", "Minimum necessary disclosure.", "Telehealth adds identity, consent, and tech-check steps."] }),
            simDecision("Alert Fatigue", "Reduce human-factors risk.", "start", {
              start: { scenario: "A nurse bypasses a clinical decision support alert to save time. What risk does this create?", choices: [{ label: "Missing a genuine safety warning (alert fatigue/workaround)", next: "correct", feedback: "Yes — ignoring or bypassing alerts risks real harm." }, { label: "No risk — alerts are always wrong", next: "wrong", feedback: "Some alerts are valid; bypassing them is dangerous." }] },
              correct: { scenario: "Correct. Systems must balance alert sensitivity; staff must not work around safety checks.", success: true, debrief: "Workarounds and alert fatigue undermine safety. Report excessive false alerts to improve the system." },
              wrong: { scenario: "Workarounds defeat the safety net.", debrief: "Alert fatigue is a known hazard — tune alerts and avoid bypassing.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 5, skills: ["informatics"] }),
            quiz("Quiz: Privacy & Telehealth", "4 questions.", [
              q("Sharing the minimum necessary information is a principle of:", ["Efficiency", "Data privacy/security", "Billing", "Speed"], 1, "Minimum necessary disclosure."),
              q("A risk of copying old chart notes forward is:", ["Better care", "Perpetuating errors (copy-paste)", "Nothing", "Lower cost"], 1, "Copy-paste errors propagate mistakes."),
              q("Before a telehealth visit you should:", ["Skip consent", "Verify identity, consent, privacy, and tech", "Use any device", "Ignore documentation"], 1, "Identity, consent, privacy, technology checks."),
              q("Alert fatigue can lead to:", ["Safer care", "Ignoring real warnings", "Better sleep", "Lower BP"], 1, "Too many alerts → real ones get dismissed."),
            ], { minutes: 6, skills: ["informatics"] }),
          ],
        ),
      ],
    ),
  ],
});
