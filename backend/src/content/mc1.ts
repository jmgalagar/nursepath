import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/**
 * MC 1 — Anatomy and Physiology (FLAGSHIP).
 * Foundational structure & function of the human body.
 */
export const mc1 = course({
  code: "MC 1",
  title: "Anatomy and Physiology",
  category: "MC",
  tagline: "How the human body is built and how it works — the foundation for all clinical care.",
  icon: "🫀",
  hours: 90,
  outcomes: [
    "Describe the levels of structural organization and homeostasis",
    "Explain the major organ systems and their interdependence",
    "Identify anatomical landmarks and body planes",
    "Relate structure to function across all systems",
  ],
  units: [
    unit(
      "Organization & Homeostasis",
      "Levels of organization, body planes, and the principle of homeostasis.",
      "🧬",
      12,
      [
        pathway(
          "Body Organization & Homeostasis",
          "From atoms to organ systems, and how the body keeps its balance.",
          "⚖️",
          [
            vid("Introduction to Anatomy & Physiology", "Levels of organization and homeostasis overview.", { minutes: 8, url: "https://www.youtube.com/watch?v=uBGl2BujkPQ", transcript: "The body is organized hierarchically: chemical, cellular, tissue, organ, organ system, organism. Homeostasis is the maintenance of a stable internal environment via feedback loops." }),
            read("Homeostasis & Feedback Loops", "Negative and positive feedback keep the internal environment stable.", [
              "**Homeostasis** = maintenance of a relatively stable internal environment.",
              "",
              "**Negative feedback** reverses a change (e.g. blood pressure regulation, thermoregulation). Most homeostatic controls are negative.",
              "",
              "**Positive feedback** amplifies a change until an event ends it (e.g. blood clotting, childbirth contractions, lactation).",
              "",
              "Components of a feedback loop: stimulus → receptor → control center → effector → response.",
            ].join("\n"), { minutes: 10, source: "OpenStax Anatomy & Physiology", skills: ["physiology"], takeaways: ["Negative feedback restores the set point.", "Positive feedback amplifies until completion.", "Every loop has a receptor, control center, and effector."] }),
            prac("Map a Homeostatic Loop", "Trace a feedback loop for body temperature.", ["Identify the stimulus (cold environment)", "Name the receptors (skin thermoreceptors)", "Identify the control center (hypothalamus)", "List the effectors (skeletal muscles shivering, blood vessels constricting)", "Describe the response that restores 37°C"], { minutes: 12, skills: ["physiology"] }),
            quiz("Quiz: Homeostasis", "4 questions on feedback loops.", [
              q("Which feedback mechanism reverses a change to restore balance?", ["Positive feedback", "Negative feedback", "Feed-forward", "Passive"], 1, "Negative feedback reverses the change to return to the set point."),
              q("Childbirth contractions are an example of:", ["Negative feedback", "Positive feedback", "No feedback", "Homeothermy"], 1, "Oxytocin-driven contractions intensify — classic positive feedback."),
              q("The control center for body temperature is the:", ["Cerebellum", "Hypothalamus", "Pituitary", "Thyroid"], 1, "The hypothalamus integrates thermoregulatory signals."),
              q("Levels of organization go from:", ["Organ → cell → tissue", "Chemical → cellular → tissue → organ → system", "System → organ → atom", "Tissue → molecule → cell"], 1, "Correct ascending order: chemical, cellular, tissue, organ, system, organism."),
            ], { minutes: 7, skills: ["physiology"] }),
          ],
        ),
      ],
    ),
    unit(
      "The Cardiovascular System",
      "Heart structure, the cardiac cycle, and circulation.",
      "❤️",
      16,
      [
        pathway(
          "Heart Anatomy & Circulation",
          "Chambers, valves, vessels, and the path of blood.",
          "🫀",
          [
            vid("The Heart and Blood Flow", "Trace blood through the heart.", { minutes: 9, transcript: "Deoxygenated blood enters the right atrium via the superior/inferior vena cava, passes the tricuspid valve to the right ventricle, through the pulmonary valve to the lungs. Oxygenated blood returns to the left atrium, through the mitral valve to the left ventricle, and out the aortic valve to the body." }),
            read("Cardiac Chambers, Valves & the Cycle", "Four chambers, four valves, and the pump cycle.", [
              "**Chambers:** right atrium, right ventricle, left atrium, left ventricle.",
              "",
              "**Valves (right→left):** tricuspid → pulmonary → mitral (bicuspid) → aortic.",
              "",
              "**Cardiac cycle:** systole (contraction/ejection) and diastole (relaxation/filling).",
              "",
              "Coronary arteries supply the heart muscle itself; the left and right coronary arteries branch off the aorta.",
            ].join("\n"), { minutes: 11, source: "OpenStax Anatomy & Physiology", skills: ["cardiovascular"], takeaways: ["Right side = pulmonary circuit (lungs); left side = systemic circuit (body).", "Valves ensure one-way flow.", "Systole ejects, diastole fills."] }),
            prac("Trace One Drop of Blood", "Order the structures blood passes.", ["Right atrium", "Tricuspid valve", "Right ventricle", "Pulmonary valve", "Pulmonary artery → lungs", "Left atrium", "Mitral valve", "Left ventricle", "Aortic valve → aorta"], { minutes: 10, skills: ["cardiovascular"] }),
            simDecision("Patient Scenario: Heart Sounds", "Relate anatomy to auscultation.", "start", {
              start: { scenario: "You auscultate a patient and hear a 'lub-DUP'. What produces the 'lub' (S1)?", choices: [{ label: "Closing of the atrioventricular (mitral & tricuspid) valves", next: "correct", feedback: "Yes — S1 is AV valve closure at the start of ventricular systole." }, { label: "Closing of the semilunar (aortic & pulmonary) valves", next: "wrong", feedback: "That's S2, the 'DUP'." }] },
              correct: { scenario: "Correct. And S2 ('DUP') is the semilunar valves closing.", success: true, debrief: "S1 = AV valves (lub); S2 = semilunar valves (dup). Knowing this localizes valve pathology on auscultation." },
              wrong: { scenario: "S1 is the AV valves; S2 is the semilunar valves.", debrief: "Remember 'lub-DUP': lub is systole start (AV), dup is systole end (semilunar).", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["cardiovascular", "health-assessment"] }),
            quiz("Quiz: Cardiovascular System", "5 questions on heart anatomy.", [
              q("Which valve is between the left atrium and left ventricle?", ["Tricuspid", "Mitral (bicuspid)", "Pulmonary", "Aortic"], 1, "The mitral (bicuspid) valve separates the left atrium and ventricle."),
              q("The right side of the heart pumps blood to the:", ["Body", "Lungs", "Brain", "Kidneys"], 1, "Right side = pulmonary circuit → lungs."),
              q("Systole refers to:", ["Ventricular relaxation/filling", "Ventricular contraction/ejection", "Atrial filling only", "Resting phase"], 1, "Systole = contraction and ejection."),
              q("Deoxygenated blood returns to the heart via the:", ["Aorta", "Pulmonary veins", "Superior/inferior vena cava", "Carotids"], 2, "The venae cavae return deoxygenated blood to the right atrium."),
              q("The heart's own blood supply comes from the:", ["Pulmonary arteries", "Coronary arteries", "Subclavian arteries", "Carotid arteries"], 1, "Coronary arteries branch from the aorta to feed the myocardium."),
            ], { minutes: 8, skills: ["cardiovascular"] }),
          ],
        ),
      ],
    ),
    unit(
      "The Respiratory System",
      "Airway anatomy, gas exchange, and the mechanics of breathing.",
      "🫁",
      14,
      [
        pathway(
          "Breathing & Gas Exchange",
          "Structures of respiration and how O₂/CO₂ move.",
          "💨",
          [
            vid("The Respiratory System", "From nose to alveoli.", { minutes: 8, transcript: "Air travels: nose/mouth → pharynx → larynx → trachea → bronchi → bronchioles → alveoli. Gas exchange occurs in the alveoli across the respiratory membrane into pulmonary capillaries." }),
            read("Mechanics of Breathing", "Pressure gradients drive ventilation.", [
              "**Inspiration:** diaphragm contracts and flattens, chest expands, thoracic pressure drops below atmospheric, air flows in.",
              "",
              "**Expiration:** diaphragm relaxes, elastic recoil reduces volume, pressure rises, air flows out.",
              "",
              "**Gas exchange** at the alveolar–capillary membrane: O₂ diffuses into blood, CO₂ diffuses out.",
              "",
              "**Control:** the medulla oblongata and pons set the baseline respiratory rhythm, tuned by CO₂/pH sensed at central chemoreceptors.",
            ].join("\n"), { minutes: 10, source: "OpenStax Anatomy & Physiology", skills: ["respiratory"], takeaways: ["Air follows pressure gradients.", "Gas exchange is by diffusion across the alveolar membrane.", "CO₂ is the main driver of breathing rate."] }),
            prac("Label the Airway", "Order the structures air passes through.", ["Nose/mouth", "Pharynx", "Larynx", "Trachea", "Bronchi", "Bronchioles", "Alveoli"], { minutes: 8, skills: ["respiratory"] }),
            quiz("Quiz: Respiratory System", "4 questions on breathing.", [
              q("Gas exchange occurs at the:", ["Trachea", "Bronchi", "Alveoli", "Larynx"], 2, "The alveoli are the site of gas exchange."),
              q("During inspiration the diaphragm:", ["Relaxes and rises", "Contracts and flattens", "Does not move", "Inverts"], 1, "Contraction flattens the diaphragm, expanding the chest."),
              q("The main chemical driver of breathing is:", ["Oxygen", "Carbon dioxide (CO₂)", "Nitrogen", "Helium"], 1, "CO₂ (via pH at central chemoreceptors) is the primary driver."),
              q("The respiratory control centers are in the:", ["Cerebellum", "Medulla oblongata and pons", "Cerebral cortex", "Spinal cord only"], 1, "The medulla and pons generate the breathing rhythm."),
            ], { minutes: 6, skills: ["respiratory"] }),
          ],
        ),
      ],
    ),
    unit(
      "The Nervous System",
      "Central and peripheral divisions, neurons, and reflexes.",
      "🧠",
      16,
      [
        pathway(
          "Neurons & Neural Signaling",
          "How nerves transmit signals.",
          "⚡",
          [
            vid("The Nervous System", "CNS, PNS, and the action potential.", { minutes: 9, transcript: "The CNS (brain + spinal cord) integrates information; the PNS (cranial and spinal nerves) connects the CNS to the body. Neurons signal via action potentials — all-or-nothing electrical impulses propagated along axons." }),
            read("The Action Potential", "Resting, depolarization, repolarization.", [
              "**Resting potential:** ~ −70 mV, maintained by the Na⁺/K⁺ pump.",
              "",
              "**Depolarization:** stimulus opens Na⁺ channels → membrane potential shoots to ~ +30 mV.",
              "",
              "**Repolarization:** K⁺ flows out → potential falls back.",
              "",
              "**Refractory period:** the neuron can't immediately re-fire, ensuring one-way signal travel.",
              "",
              "At synapses, neurotransmitters (e.g. acetylcholine) cross the cleft to the next neuron.",
            ].join("\n"), { minutes: 11, source: "OpenStax Anatomy & Physiology", skills: ["nervous-system"], takeaways: ["Resting potential ≈ −70 mV.", "Depolarization = Na⁺ in; repolarization = K⁺ out.", "Signals cross synapses via neurotransmitters."] }),
            prac("Diagram an Action Potential", "Sketch and label the phases.", ["Label resting potential (−70 mV)", "Mark threshold", "Show depolarization (Na⁺ influx)", "Show repolarization (K⁺ efflux)", "Mark the refractory period"], { minutes: 12, skills: ["nervous-system"] }),
            quiz("Quiz: Nervous System", "4 questions on neural signaling.", [
              q("The CNS consists of the:", ["Brain and spinal cord", "Cranial and spinal nerves", "Somatic and autonomic nerves", "Sensory receptors only"], 0, "CNS = brain + spinal cord."),
              q("Resting membrane potential is approximately:", ["0 mV", "+30 mV", "−70 mV", "−20 mV"], 2, "Resting potential is about −70 mV."),
              q("Depolarization is caused by influx of:", ["Potassium", "Sodium", "Chloride", "Calcium"], 1, "Na⁺ influx depolarizes the membrane."),
              q("Signals cross the synaptic cleft via:", ["Direct electrical contact", "Neurotransmitters", "Hormones in blood", "Nothing"], 1, "Neurotransmitters carry the signal across the synapse."),
            ], { minutes: 6, skills: ["nervous-system"] }),
          ],
        ),
      ],
    ),
    unit(
      "Body Systems Integration",
      "How digestive, urinary, endocrine, and immune systems cooperate.",
      "🧩",
      12,
      [
        pathway(
          "Integration of Systems",
          "Homeostasis as a team effort across systems.",
          "🔗",
          [
            vid("Systems Working Together", "Why no system acts alone.", { minutes: 8, transcript: "Blood pressure regulation involves the heart (CV), kidneys (urinary, via RAAS), lungs (respiratory, via O₂), and hormones (endocrine). Disease in one system ripples into others." }),
            read("The Kidneys & RAAS", "How blood pressure and fluids are regulated.", [
              "The **kidneys** filter blood, regulate fluid/electrolytes and acid-base balance, and release renin.",
              "",
              "**RAAS (Renin-Angiotensin-Aldosterone System):** low blood pressure → kidneys release renin → angiotensinogen → angiotensin I → (ACE) → angiotensin II → vasoconstriction + aldosterone → Na⁺/water retention → blood pressure rises.",
              "",
              "This is why ACE inhibitors lower blood pressure.",
            ].join("\n"), { minutes: 10, source: "OpenStax Anatomy & Physiology", skills: ["physiology", "fluid-electrolytes"], takeaways: ["Kidneys filter, balance fluids, and trigger RAAS.", "Angiotensin II constricts vessels and releases aldosterone.", "ACE inhibitors interrupt this cascade."] }),
            quiz("Quiz: Systems Integration", "3 questions.", [
              q("RAAS is activated by:", ["High blood pressure", "Low blood pressure", "High oxygen", "Low glucose"], 1, "Low BP triggers renin release → RAAS → raises BP."),
              q("Aldosterone causes the kidneys to retain:", ["Potassium", "Sodium (and water)", "Calcium", "Magnesium"], 1, "Aldosterone promotes Na⁺ (and water) retention."),
              q("The functional unit of the kidney is the:", ["Alveolus", "Nephron", "Neuron", "Hepatocyte"], 1, "The nephron is the kidney's filtering unit."),
            ], { minutes: 5, skills: ["physiology"] }),
          ],
        ),
      ],
    ),
  ],
});
