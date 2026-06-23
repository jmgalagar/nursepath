import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 108 — Health Care Ethics (Bioethics). */
export const ncm108 = course({
  code: "NCM 108",
  title: "Health Care Ethics (Bioethics)",
  category: "ELECTIVE",
  tagline: "Ethical principles and dilemmas in nursing and healthcare.",
  icon: "⚖️",
  hours: 54,
  outcomes: [
    "Apply the four bioethical principles (autonomy, beneficence, non-maleficence, justice)",
    "Apply the Philippine Code of Ethics for Nurses and Patient's Bill of Rights",
    "Analyze ethical dilemmas using a decision framework",
    "Practice informed consent, confidentiality, and patient rights",
  ],
  units: [
    unit(
      "Core Ethical Principles",
      "The four principles + veracity/fidelity.",
      "🧭",
      14,
      [
        pathway(
          "Autonomy, Beneficence, Non-maleficence, Justice",
          "The backbone of ethical practice.",
          "📜",
          [
            vid("The Four Principles", "Beauchamp & Childress framework.", { minutes: 9, transcript: "Bioethics rests on four principles: Autonomy (respect patient's right to choose), Beneficence (act for the patient's good), Non-maleficence (do no harm), and Justice (fair distribution of resources). Veracity (truthfulness) and Fidelity (keeping promises) round these out." }),
            read("The Principles in Practice", "What each demands of the nurse.", [
              "**Autonomy:** respect the patient's informed choices — the basis of informed consent and the right to refuse.",
              "**Beneficence:** act in the patient's best interest.",
              "**Non-maleficence:** avoid harm — 'first, do no harm.'",
              "**Justice:** fair, equitable treatment and resource allocation.",
              "",
              "**Veracity:** tell the truth.",
              "**Fidelity:** keep promises; be loyal and accountable.",
              "",
              "**Informed consent** requires: capacity, disclosure, comprehension, voluntariness.",
            ].join("\n"), { minutes: 11, source: "Beauchamp & Childress, Principles of Biomedical Ethics", skills: ["ethics"], takeaways: ["4 principles: autonomy, beneficence, non-maleficence, justice.", "Autonomy underlies informed consent and the right to refuse.", "Informed consent needs capacity + disclosure + comprehension + voluntariness."] }),
            prac("Apply the Principles", "Map a case to principles.", ["Respecting a refusal → autonomy", "Giving pain relief → beneficence", "Checking a high-risk drug dose → non-maleficence", "Triaging fairly → justice"], { minutes: 10, skills: ["ethics"] }),
            simDecision("The Refusing Patient", "Apply autonomy.", "start", {
              start: { scenario: "A competent adult refuses a life-saving blood transfusion for religious reasons. What is the ethically correct action?", choices: [{ label: "Respect the refusal (autonomy), document, and continue to offer care", next: "correct", feedback: "Yes — a competent adult's informed refusal must be respected, even if you disagree." }, { label: "Give the transfusion anyway to save their life", next: "wrong", feedback: "That would violate autonomy and be battery." }] },
              correct: { scenario: "Correct. Document thoroughly, ensure informed refusal, and provide alternative care.", success: true, debrief: "Competent patients may refuse even life-saving treatment. Ensure the refusal is informed, document, and continue supportive care." },
              wrong: { scenario: "Overriding a competent refusal is battery.", debrief: "Autonomy protects the right to refuse; document and continue care.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["ethics"] }),
            quiz("Quiz: Bioethics", "5 questions.", [
              q("Respecting a patient's informed choice reflects:", ["Beneficence", "Autonomy", "Justice", "Fidelity"], 1, "Autonomy = self-determination."),
              q("'First, do no harm' is:", ["Beneficence", "Non-maleficence", "Justice", "Veracity"], 1, "Non-maleficence."),
              q("Fair distribution of scarce resources is:", ["Autonomy", "Justice", "Fidelity", "Beneficence"], 1, "Justice."),
              q("Informed consent requires all EXCEPT:", ["Capacity", "Disclosure", "Comprehension", "Family approval"], 3, "Family approval is not a core element for a competent adult."),
              q("Telling the truth is the principle of:", ["Veracity", "Fidelity", "Justice", "Autonomy"], 0, "Veracity = truthfulness."),
            ], { minutes: 8, skills: ["ethics"] }),
          ],
        ),
      ],
    ),
    unit(
      "Patient Rights & the Nursing Code",
      "The Philippine Code of Ethics and the Patient's Bill of Rights.",
      "📋",
      12,
      [
        pathway(
          "Code of Ethics & Patient Rights",
          "Your professional and legal duties.",
          "🤝",
          [
            vid("Patient Rights & Nursing Code", "The rules that govern practice.", { minutes: 8, transcript: "The Patient's Bill of Rights guarantees respectful care, information, consent, privacy, and refusal. The Philippine Code of Ethics for Nurses defines the nurse's responsibilities to people, practice, co-workers, society, and the profession." }),
            read("Key Rights & Duties", "What patients can expect, what nurses owe.", [
              "**Patient rights include:** respectful care, informed consent, privacy/confidentiality, refusal of treatment, access to records, and to know caregivers.",
              "",
              "**Confidentiality (HIPAA-style principles):** protect health information; share only with those involved in care or as the law requires.",
              "",
              "**Code of Ethics for Nurses (PH):** responsibilities to people (respect, dignity), practice (competence), co-workers (collaboration), society (public health), and the profession (integrity, development).",
            ].join("\n"), { minutes: 10, source: "Philippine Code of Ethics for Registered Nurses; Patient's Bill of Rights", skills: ["ethics", "professionalism"], takeaways: ["Patients have enforceable rights (consent, privacy, refusal).", "Protect confidentiality; share on a need-to-know basis.", "The nursing code governs professional conduct."] }),
            quiz("Quiz: Rights & Code", "4 questions.", [
              q("Which is a patient right?", ["Forced treatment", "Informed consent and refusal", "Free medication always", "Choosing the doctor's diagnosis"], 1, "Informed consent and the right to refuse."),
              q("Confidentiality means sharing information:", ["With anyone", "Only with those involved in care or as law requires", "On social media", "With family without consent"], 1, "Need-to-know basis."),
              q("The nursing code of ethics guides:", ["Only student nurses", "Professional conduct and duties", "Hospital billing", "Drug doses"], 1, "Professional behavior."),
              q("Documenting an informed refusal is part of:", ["Ignoring the patient", "Respecting autonomy and protecting legally", "Battery", "Negligence"], 1, "Honors autonomy and provides legal protection."),
            ], { minutes: 6, skills: ["ethics"] }),
          ],
        ),
      ],
    ),
  ],
});
