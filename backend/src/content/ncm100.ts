import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 100 — Theoretical Foundations in Nursing. */
export const ncm100 = course({
  code: "NCM 100",
  title: "Theoretical Foundations in Nursing",
  category: "NCM",
  tagline: "The theories, models, and paradigms that shape nursing practice.",
  icon: "📐",
  hours: 54,
  outcomes: [
    "Explain major nursing theories (Nightingale, Orem, Roy, Henderson, Watson)",
    "Distinguish the metaparadigm concepts: person, health, environment, nursing",
    "Apply a nursing theory to guide care planning",
    "Relate theory to evidence-based practice",
  ],
  units: [
    unit(
      "The Nursing Metaparadigm",
      "Person, health, environment, and nursing.",
      "🌍",
      10,
      [
        pathway(
          "Four Concepts of Nursing",
          "The shared language of the profession.",
          "🔮",
          [
            vid("The Metaparadigm of Nursing", "Four central concepts.", { minutes: 7, transcript: "Nursing's metaparadigm unifies the discipline around four concepts: the PERSON receiving care, the ENVIRONMENT affecting health, HEALTH as a continuum of wellness, and NURSING as the caring actions and knowledge applied." }),
            read("Person, Environment, Health, Nursing", "Defining the four domains.", [
              "- **Person** — the recipient of care: an individual, family, or community; holistic and bio-psycho-social-spiritual.",
              "- **Environment** — internal and external surroundings affecting health (physical, social, cultural).",
              "- **Health** — a continuum from wellness to illness; not just absence of disease.",
              "- **Nursing** — the diagnosis and treatment of human responses to health/illness (ANA).",
            ].join("\n"), { minutes: 9, source: "Fawcett's metaparadigm; ANA definition of nursing", skills: ["nursing-theory"], takeaways: ["Four concepts: person, environment, health, nursing.", "Person is holistic.", "Health is a continuum."] }),
            prac("Map a Patient to the Metaparadigm", "Apply the four concepts.", ["Person: describe the patient holistically", "Environment: note physical/social factors", "Health: place them on the wellness-illness continuum", "Nursing: state your caring role"], { minutes: 10, skills: ["nursing-theory"] }),
            quiz("Quiz: The Metaparadigm", "4 questions.", [
              q("The four metaparadigm concepts are:", ["Nurse, doctor, patient, family", "Person, environment, health, nursing", "Assessment, diagnosis, planning, evaluation", "Body, mind, spirit, society"], 1, "Person, environment, health, nursing."),
              q("The ANA defines nursing as the diagnosis and treatment of:", ["Disease", "Human responses to health/illness", "Surgical problems", "Pharmacology"], 1, "Nursing diagnoses human responses, not medical diseases."),
              q("Health in the metaparadigm is best seen as:", ["Only the absence of disease", "A wellness-illness continuum", "A fixed state", "Only physical fitness"], 1, "Health is a continuum."),
              q("The metaparadigm concept covering social/cultural context is:", ["Person", "Environment", "Health", "Nursing"], 1, "Environment includes social and cultural context."),
            ], { minutes: 6, skills: ["nursing-theory"] }),
          ],
        ),
      ],
    ),
    unit(
      "Grand Nursing Theorists",
      "The foundational thinkers of nursing.",
      "👩‍⚕️",
      18,
      [
        pathway(
          "Nightingale, Orem, Roy & Henderson",
          "Core theories every nurse should know.",
          "📚",
          [
            vid("Foundational Nursing Theorists", "From Nightingale to the present.", { minutes: 10, transcript: "Florence Nightingale defined nursing as putting the patient in the best condition for nature to act. Henderson described the nurse's role as assisting the patient with activities contributing to health. Orem's Self-Care Deficit theory says nursing helps when people can't meet self-care needs. Roy's Adaptation model sees the person as an adaptive system." }),
            read("Four Essential Theories", "Key ideas to remember.", [
              "**Nightingale — Environment theory:** manipulate environment (ventilation, light, cleanliness, noise) so nature can heal.",
              "",
              "**Henderson — Needs theory:** the nurse supplements the patient's strength/will/knowledge until 14 fundamental needs are met.",
              "",
              "**Orem — Self-Care Deficit:** people have self-care needs; nursing steps in when there's a self-care deficit (wholly/partly compensatory or supportive-educative).",
              "",
              "**Roy — Adaptation model:** the person adapts via four modes (physiological, self-concept, role function, interdependence); nursing promotes adaptation.",
              "",
              "**Watson — Caring theory:** caring is central; 'carative factors' and a transpersonal caring relationship.",
            ].join("\n"), { minutes: 12, source: "Nursing theorists primary works; Tomey & Alligood", skills: ["nursing-theory"], takeaways: ["Nightingale = environment; Henderson = needs; Orem = self-care deficit; Roy = adaptation; Watson = caring."] }),
            simDecision("Match Theory to Scenario", "Apply the right theorist.", "start", {
              start: { scenario: "A post-stroke patient can't dress independently. Which theory best frames the nurse's role?", choices: [{ label: "Orem's Self-Care Deficit (supportive-educative/partly compensatory)", next: "correct", feedback: "Yes — Orem addresses unmet self-care needs directly." }, { label: "Nightingale's Environment theory", next: "wrong", feedback: "Environment matters but doesn't directly frame self-care deficit." }] },
              correct: { scenario: "Correct. Orem's theory directly addresses when patients can't meet their own self-care needs.", success: true, debrief: "Match the theory to the clinical problem: self-care deficits → Orem; adaptation challenges → Roy; environmental needs → Nightingale." },
              wrong: { scenario: "Orem's Self-Care Deficit is the best fit.", debrief: "When a patient can't perform self-care, Orem's theory frames the nurse's compensatory/educative role.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["nursing-theory"] }),
            quiz("Quiz: Grand Theorists", "5 questions.", [
              q("Which theorist emphasized the ENVIRONMENT for healing?", ["Roy", "Nightingale", "Orem", "Peplau"], 1, "Nightingale's environment theory."),
              q("Orem's theory centers on:", ["Adaptation", "Self-care deficit", "Caring relationships", "14 fundamental needs"], 1, "Orem = self-care deficit nursing."),
              q("Roy's model views the person as:", ["A self-care agent", "An adaptive system", "A set of 14 needs", "An environmental product"], 1, "Roy's Adaptation model."),
              q("Henderson described the nurse as assisting with:", ["Self-care only", "Activities contributing to health the patient lacks strength to do", "Surgery", "Diagnosis"], 1, "Henderson's needs theory."),
              q("Watson's theory is best described as a theory of:", ["Environment", "Adaptation", "Caring", "Self-care"], 2, "Watson = caring science."),
            ], { minutes: 8, skills: ["nursing-theory"] }),
          ],
        ),
      ],
    ),
    unit(
      "Theory to Practice",
      "Using theory in real care planning.",
      "🛠️",
      10,
      [
        pathway(
          "Evidence-Based Practice",
          "Connecting theory, research, and the bedside.",
          "🔬",
          [
            vid("Theory Drives Practice", "From concepts to clinical decisions.", { minutes: 7, transcript: "Theories give nurses a lens to interpret patient needs and choose interventions. Combined with best evidence and patient preferences, they anchor evidence-based practice (EBP)." }),
            read("Evidence-Based Practice (EBP)", "Theory + research + patient values.", [
              "**EBP** integrates: (1) best research evidence, (2) clinical expertise, (3) patient values/preferences.",
              "",
              "Theories provide the *conceptual framework*; research provides the *evidence*; the nurse applies both with the patient.",
              "",
              "Steps of EBP: Ask (PICOT) → Acquire → Appraise → Apply → Assess.",
            ].join("\n"), { minutes: 9, source: "Melnyk & Fineout-Overholt EBP", skills: ["nursing-theory", "evidence-based-practice"], takeaways: ["EBP = evidence + expertise + patient values.", "PICOT frames clinical questions.", "Theories are the lens; research is the evidence."] }),
            quiz("Quiz: EBP", "3 questions.", [
              q("EBP integrates:", ["Research only", "Research + expertise + patient values", "Theory only", "Tradition"], 1, "All three pillars together."),
              q("PICOT is used to:", ["Diagnose disease", "Frame a clinical question", "Give a drug", "Order labs"], 1, "PICOT structures searchable clinical questions."),
              q("Theories in EBP serve as the:", ["Statistical test", "Conceptual framework/lens", "Drug dose", "Lab value"], 1, "Theories provide the lens for interpreting evidence."),
            ], { minutes: 5, skills: ["evidence-based-practice"] }),
          ],
        ),
      ],
    ),
  ],
});
