import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 107 — Care of Mother, Child, and Adolescent (Well Client). */
export const ncm107 = course({
  code: "NCM 107",
  title: "Care of Mother, Child, and Adolescent (Well Client)",
  category: "NCM",
  tagline: "Maternal-child nursing for the healthy mother, newborn, child, and adolescent.",
  icon: "🤰",
  hours: 72,
  outcomes: [
    "Describe the stages of pregnancy and normal prenatal care",
    "Explain the stages of labor and immediate newborn care",
    "Apply growth, development, and immunization schedules for children",
    "Promote adolescent wellness and preventive care",
  ],
  units: [
    unit(
      "Prenatal & Maternal Care",
      "Pregnancy from conception to birth.",
      "🤱",
      16,
      [
        pathway(
          "Pregnancy & Prenatal Care",
          "Trimesters, danger signs, and prenatal visits.",
          "🤰",
          [
            vid("Normal Pregnancy", "Trimester milestones and care.", { minutes: 10, transcript: "Pregnancy spans three trimesters over ~40 weeks. Prenatal care monitors maternal health, fetal growth, and screens for complications. Danger signs — bleeding, severe headache, no fetal movement — need urgent review." }),
            read("Prenatal Care Essentials", "What every visit checks.", [
              "**Each visit:** weight, BP, fundal height, fetal heart rate, edema, urine (protein/glucose).",
              "",
              "**Key danger signs:** vaginal bleeding, severe headache with blurred vision (preeclampsia), severe abdominal pain, reduced/absent fetal movement, fever, convulsions.",
              "",
              "**Nutrition:** folic acid (prevents neural tube defects), iron, calcium, adequate protein/calories.",
              "",
              "**Immunization:** tetanus toxoid during pregnancy protects mother and newborn.",
            ].join("\n"), { minutes: 11, source: "WHO antenatal care guidelines", skills: ["maternal-child"], takeaways: ["Danger signs: bleeding, severe headache/vision change, absent fetal movement.", "Folic acid prevents neural tube defects.", "Tetanus toxoid protects mother and baby."] }),
            prac("Run a Prenatal Check", "Steps for the visit.", ["Measure BP and weight", "Check fundal height", "Auscultate fetal heart rate", "Test urine for protein/glucose", "Ask about fetal movement and danger signs"], { minutes: 12, skills: ["maternal-child"] }),
            quiz("Quiz: Prenatal Care", "4 questions.", [
              q("Folic acid supplementation prevents:", ["Gestational diabetes", "Neural tube defects", "Preeclampsia", "Preterm labor"], 1, "Folic acid prevents neural tube defects."),
              q("A danger sign in pregnancy requiring urgent care is:", ["Mild nausea", "Vaginal bleeding or severe headache", "Mild fatigue", "Food cravings"], 1, "Bleeding/severe headache may signal serious complications."),
              q("Which immunization protects mother and newborn during pregnancy?", ["MMR", "Tetanus toxoid", "BCG", "Polio"], 1, "Tetanus toxoid prevents neonatal tetanus."),
              q("Normal pregnancy lasts about:", ["30 weeks", "40 weeks", "50 weeks", "20 weeks"], 1, "~40 weeks gestation."),
            ], { minutes: 6, skills: ["maternal-child"] }),
          ],
        ),
      ],
    ),
    unit(
      "Labor, Birth & Newborn",
      "Stages of labor and immediate care.",
      "👶",
      16,
      [
        pathway(
          "Stages of Labor & Newborn Care",
          "From first contraction to the first hour of life.",
          "✨",
          [
            vid("The Stages of Labor", "Four stages of childbirth.", { minutes: 10, transcript: "Stage 1: onset of regular contractions to full cervical dilation (latent, active, transition). Stage 2: full dilation to delivery of the baby. Stage 3: delivery of the placenta. Stage 4: first 1-4 hours, the recovery/hemorrhage-watch period." }),
            read("Labor Stages & Newborn Resuscitation", "Key milestones.", [
              "**Stage 1:** cervical effacement and dilation (0-10 cm).",
              "**Stage 2:** pushing and birth.",
              "**Stage 3:** placenta delivers (~5-30 min); inspect for completeness to prevent hemorrhage.",
              "**Stage 4:** monitor for postpartum hemorrhage (firm fundus, lochia, vitals).",
              "",
              "**Newborn immediate care (HELPING approach):** dry, warm, position, assess breathing; skin-to-skin; initiate breastfeeding within first hour; cord care; vitamin K; eye prophylaxis per protocol.",
              "",
              "**APGAR score (0-10) at 1 and 5 min:** Appearance, Pulse, Grimace, Activity, Respiration.",
            ].join("\n"), { minutes: 12, source: "WHO Essential Newborn Care; AAP", skills: ["maternal-child"], takeaways: ["4 stages of labor; Stage 4 = hemorrhage watch.", "APGAR at 1 and 5 minutes.", "Warm, dry, skin-to-skin, early breastfeeding."] }),
            simDecision("APGAR at One Minute", "Score the newborn.", "start", {
              start: { scenario: "Newborn: pink body, blue extremities (acrocyanosis); HR 120; cries; some flexion; vigorous cry. Approximate APGAR?", choices: [{ label: "8-9 (vigorous, minor color deduction)", next: "correct", feedback: "Acrocyanosis loses 1 point for color; otherwise strong scores." }, { label: "3 (severely depressed)", next: "wrong", feedback: "HR 120 and crying are reassuring, not depressed." }] },
              correct: { scenario: "Correct — about 8-9. Acrocyanosis is common and minor.", success: true, debrief: "APGAR 7-10 = reassuring; 4-6 = moderately depressed; 0-3 = severely depressed, needs resuscitation." },
              wrong: { scenario: "Reconsider: HR > 100 and vigorous cry are good signs.", debrief: "Score each of 5 components 0-2; acrocyanosis = 1 for color.", choices: [{ label: "Rescore", next: "start" }] },
            }, { minutes: 6, skills: ["maternal-child"] }),
            quiz("Quiz: Labor & Newborn", "5 questions.", [
              q("Stage 2 of labor ends with:", ["Full dilation", "Birth of the baby", "Placental delivery", "Recovery"], 1, "Stage 2 = birth."),
              q("APGAR is assessed at:", ["1 and 5 minutes", "1 hour only", "24 hours", "Birth only"], 0, "At 1 and 5 minutes."),
              q("Postpartum hemorrhage watch is most critical in:", ["Stage 1", "Stage 4", "Stage 2 only", "1 week later"], 1, "Stage 4 (first hours) — monitor fundus/lochia."),
              q("Early breastfeeding should begin within:", ["12 hours", "The first hour", "1 week", "2 days"], 1, "Within the first hour (golden hour)."),
              q("An APGAR of 3 indicates:", ["Reassuring", "Moderately depressed", "Severely depressed — resuscitate", "Perfect"], 2, "0-3 = severely depressed."),
            ], { minutes: 8, skills: ["maternal-child"] }),
          ],
        ),
      ],
    ),
    unit(
      "Child Growth, Development & Immunization",
      "Milestones and the vaccine schedule.",
      "🍼",
      14,
      [
        pathway(
          "Pediatric Milestones & EPI",
          "Track development and immunize on time.",
          "💉",
          [
            vid("Child Development & Vaccines", "Milestones and the EPI schedule.", { minutes: 9, transcript: "Track milestones across motor, language, and social domains. The Expanded Programme on Immunization (EPI) protects children from vaccine-preventable diseases starting at birth (BCG, Hepatitis B) through infancy." }),
            read("Milestones & EPI Schedule", "Key ages and vaccines.", [
              "**Milestones:** social smile ~2 mo, sits ~6 mo, first words ~12 mo, walks ~12-15 mo, two-word phrases ~2 yr.",
              "",
              "**EPI (WHO/DOH) — birth:** BCG, Hepatitis B (within 24h).",
              "**6 weeks:** OPV, DPT, Hep B, Hib, PCV.",
              "**10 & 14 weeks:** repeat doses.",
              "**9 months:** measles.",
              "",
              "Missed doses should be given as soon as possible (no need to restart series).",
            ].join("\n"), { minutes: 11, source: "WHO EPI; DOH Philippines immunization schedule", skills: ["maternal-child", "pediatric"], takeaways: ["BCG + Hep B at birth; measles at 9 months.", "Track motor/language/social milestones.", "Missed doses: catch up, don't restart."] }),
            prac("Counsel a Parent on Immunization", "Explain the schedule.", ["Confirm the child's age", "List due vaccines today", "Explain each disease prevented", "Address side-effect concerns", "Schedule the next visit"], { minutes: 12, skills: ["maternal-child", "communication"] }),
            quiz("Quiz: Development & EPI", "4 questions.", [
              q("BCG and Hepatitis B are given at:", ["9 months", "Birth (within 24h)", "2 years", "School age"], 1, "Birth dose."),
              q("An infant typically walks independently by about:", ["6 months", "9 months", "12-15 months", "24 months"], 2, "Around 12-15 months."),
              q("Measles vaccine is typically given at:", ["Birth", "9 months", "5 years", "Never"], 1, "9 months in the EPI schedule."),
              q("If a child misses a vaccine dose, you should:", ["Restart the whole series", "Give the missed dose ASAP without restarting", "Skip it forever", "Double the next dose"], 1, "Catch up; don't restart."),
            ], { minutes: 6, skills: ["maternal-child", "pediatric"] }),
          ],
        ),
      ],
    ),
  ],
});
