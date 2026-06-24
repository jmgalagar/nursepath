import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 101 — Health Assessment (FLAGSHIP): head-to-toe assessment skills. */
export const ncm101 = course({
  code: "NCM 101",
  title: "Health Assessment",
  category: "NCM",
  tagline: "Systematic assessment skills to gather accurate clinical data.",
  icon: "🩺",
  hours: 54,
  outcomes: [
    "Take a complete health history (present illness, past, family, psychosocial)",
    "Perform a systematic head-to-toe physical exam",
    "Use inspection, palpation, percussion, and auscultation correctly",
    "Document and interpret normal vs abnormal findings",
  ],
  units: [
    unit(
      "Health History Interview",
      "Gathering subjective data effectively.",
      "🗣️",
      10,
      [
        pathway(
          "The Health History",
          "Structure of a complete nursing interview.",
          "📋",
          [
            vid("Taking a Health History", "How to interview a patient.", { minutes: 9, transcript: "A complete history includes identifying data, chief complaint, history of present illness (OPQRST), past medical history, medications/allergies, family and psychosocial history, and review of systems." }),
            read("Components of the Health History", "What to ask and why.", [
              "- **Chief Complaint (CC):** the main reason for the visit, in the patient's words.",
              "- **HPI (OPQRST):** Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Timing.",
              "- **PMH:** illnesses, hospitalizations, surgeries, immunizations.",
              "- **Medications & Allergies:** include reactions.",
              "- **Family History:** major diseases in relatives.",
              "- **Psychosocial:** occupation, lifestyle, support, habits.",
              "- **Review of Systems (ROS):** symptom checklist by system.",
            ].join("\n"), { minutes: 11, source: "Bates' Guide to Physical Examination", skills: ["health-assessment", "communication"], takeaways: ["CC in patient's own words.", "Use OPQRST for pain/symptoms.", "Always ask allergies + reactions."] }),
            prac("Conduct an OPQRST Pain Interview", "Ask the right questions.", ["Onset — when did it start?", "Provocation/Palliation — what makes it better/worse?", "Quality — what does it feel like?", "Region/Radiation — where does it go?", "Severity — rate 0-10", "Timing — constant or intermittent?"], { minutes: 12, skills: ["health-assessment", "communication"] }),
            quiz("Quiz: Health History", "4 questions.", [
              q("OPQRST is used to assess:", ["Medication doses", "Pain/symptoms", "Lab values", "Vital signs"], 1, "OPQRST structures symptom/pain assessment."),
              q("The chief complaint should be recorded:", ["In your own clinical words", "In the patient's own words", "As a diagnosis", "From the chart only"], 1, "Capture the CC verbatim in the patient's words."),
              q("Which is part of the psychosocial history?", ["Blood pressure", "Occupation and support system", "Reflexes", "Heart sounds"], 1, "Psychosocial history covers lifestyle, occupation, support."),
              q("Documenting allergies should include:", ["Only the drug name", "Drug and the reaction it caused", "Nothing if unsure", "Only food allergies"], 1, "Always note the specific reaction."),
            ], { minutes: 6, skills: ["health-assessment"] }),
          ],
        ),
      ],
    ),
    unit(
      "Physical Examination Techniques",
      "Inspection, palpation, percussion, auscultation.",
      "👐",
      14,
      [
        pathway(
          "The Four Techniques",
          "Performing each skill correctly.",
          "🔎",
          [
            vid("The Four Exam Techniques", "Proper technique for each.", { minutes: 10, transcript: "Order for most systems: Inspection (look), Palpation (feel), Percussion (tap), Auscultation (listen). For the abdomen, auscultate before palpation/percussion so you don't alter bowel sounds." }),
            read("Mastering Each Technique", "Pearls and pitfalls.", [
              "**Inspection:** good lighting; compare sides for symmetry; look before you touch.",
              "",
              "**Palpation:** warm hands; start light then deep; use finger pads; note temperature, texture, tenderness, masses.",
              "",
              "**Percussion:** tap the middle finger over the other hand; sounds: resonant (normal lung), dull (liver/fluid), hyperresonant (emphysema/pneumothorax), tympanic (gas in bowel).",
              "",
              "**Auscultation:** diaphragm for high-pitched (heart, lungs, BP), bell for low-pitched (murmurs, bruits); listen to a full inspiration-expiration at each spot.",
            ].join("\n"), { minutes: 12, source: "Bates' Guide to Physical Examination", skills: ["health-assessment"], takeaways: ["Order: inspect, palpate, percuss, auscultate (abdomen swaps last two).", "Warm hands before palpation.", "Diaphragm = high pitch; bell = low pitch."] }),
            prac("Auscultate Lung Fields", "Check off the steps.", ["Have the patient sit upright", "Have them breathe deeply through the mouth", "Listen posteriorly side-to-side, top-to-bottom", "Compare right vs left at each level", "Note any crackles, wheezes, or absent sounds"], { minutes: 15, skills: ["health-assessment", "respiratory"] }),
            simDecision("Abdominal Assessment Order", "Get the order right.", "start", {
              start: { scenario: "You begin an abdominal exam. In what order do you perform the techniques?", choices: [{ label: "Inspect → Auscultate → Percuss → Palpate", next: "correct", feedback: "Correct — auscultate before palpation/percussion to avoid altering bowel sounds." }, { label: "Inspect → Palpate → Percuss → Auscultate", next: "wrong", feedback: "Palpating/percussing first can change bowel sounds." }] },
              correct: { scenario: "Correct. The abdomen is the exception to the general order.", success: true, debrief: "Abdomen: inspect, auscultate, percuss, palpate — preserving natural bowel sounds." },
              wrong: { scenario: "Reorder so you listen first.", debrief: "Auscultating before percussing/palpating preserves the true bowel sounds.", choices: [{ label: "Try again", next: "start" }] },
            }, { minutes: 5, skills: ["health-assessment"] }),
            quiz("Quiz: Exam Techniques", "5 questions.", [
              q("Abdominal assessment order is:", ["Inspect, palpate, percuss, auscultate", "Inspect, auscultate, percuss, palpate", "Auscultate, inspect, palpate, percuss", "Percuss, auscultate, inspect, palpate"], 1, "Auscultate before palpation to preserve bowel sounds."),
              q("The stethoscope diaphragm is best for:", ["Low-pitched murmurs", "High-pitched sounds (heart, lungs, BP)", "Bowel sounds only", "Nothing"], 1, "Diaphragm = high pitch; bell = low pitch."),
              q("A dull percussion note suggests:", ["Normal air", "Fluid or solid tissue", "Excess air", "Gas"], 1, "Dullness = fluid/solid (e.g. liver, effusion)."),
              q("Before palpation you should:", ["Use cold hands", "Warm your hands", "Skip consent", "Press deeply first"], 1, "Warm hands respect patient comfort."),
              q("Inspection should be:", ["Brief and casual", "Deliberate, comparing both sides", "Skipped if busy", "Done after auscultation only"], 1, "Deliberate, symmetric inspection is key."),
            ], { minutes: 8, skills: ["health-assessment"] }),
          ],
        ),
      ],
    ),
    unit(
      "Head-to-Toe Examination",
      "Putting it all together.",
      "🧍",
      16,
      [
        pathway(
          "Full Head-to-Toe",
          "A systematic cephalocaudal exam.",
          "🧭",
          [
            vid("Head-to-Toe Assessment", "A complete demonstration.", { minutes: 12, transcript: "Move head-to-toe: neuro/mental status, HEENT, neck, chest/lungs, cardiovascular, abdomen, musculoskeletal, skin, and neurovascular checks." }),
            read("Exam Sequence & Red Flags", "What to find, what to flag.", [
              "**Neuro:** mental status (alert/oriented x3), pupils equal & reactive, grip strength, gait.",
              "**HEENT:** sclera, mucous membranes, throat, lymph nodes, trachea midline.",
              "**Chest:** symmetrical expansion, vesicular breath sounds.",
              "**Cardiac:** S1/S2, no murmurs/rubs/gallops; apical pulse.",
              "**Abdomen:** soft, non-tender, bowel sounds present.",
              "**Skin:** warm, dry, intact, no breakdown.",
              "**Extremities:** pulses, capillary refill < 3 s, no edema, range of motion.",
              "",
              "**Red flags:** unequal pupils, absent breath sounds, new murmur, rigid abdomen, cold/pulseless limb.",
            ].join("\n"), { minutes: 12, source: "Bates' Guide; Jarvis Physical Examination", skills: ["health-assessment"], takeaways: ["Work head-to-toe (cephalocaudal).", "Know normal findings first.", "Flag: unequal pupils, absent breath sounds, rigid abdomen, pulseless limb."] }),
            prac("Complete a Head-to-Toe", "Check off each region.", ["Neuro: alert & oriented x3", "HEENT & neck", "Chest & lungs", "Cardiovascular", "Abdomen", "Skin & extremities", "Document findings"], { minutes: 25, skills: ["health-assessment"] }),
            quiz("Quiz: Head-to-Toe", "4 questions.", [
              q("A normal capillary refill is:", ["> 5 seconds", "< 3 seconds", "~10 seconds", "0 seconds"], 1, "Brisk refill < 3 s indicates good perfusion."),
              q("'Oriented x3' means the patient knows:", ["Name, date, location", "Age, weight, height", "Diagnosis, doctor, room", "Nothing"], 0, "Person, place, and time."),
              q("A rigid, board-like abdomen suggests:", ["Normal", "Peritonitis — an emergency", "Gas only", "Hunger"], 1, "Guarding/rigidity signals peritonitis."),
              q("Unequal pupils (anisocoria) may indicate:", ["Nothing important", "Serious neurologic pathology", "Normal aging only", "Dehydration"], 1, "New unequal pupils can signal raised ICP/stroke."),
            ], { minutes: 6, skills: ["health-assessment"] }),
          ],
        ),
      ],
    ),
  ],
});
