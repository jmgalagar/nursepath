import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 102 — Health Education. */
export const ncm102 = course({
  code: "NCM 102",
  title: "Health Education",
  category: "NCM",
  tagline: "Teaching patients and communities to promote wellness and self-care.",
  icon: "📢",
  hours: 54,
  outcomes: [
    "Apply learning theories to patient education",
    "Conduct a learning-needs assessment",
    "Design effective teaching plans with measurable objectives",
    "Evaluate learning outcomes and document education",
  ],
  units: [
    unit(
      "Principles of Teaching & Learning",
      "How adults learn in healthcare.",
      "🧠",
      12,
      [
        pathway(
          "Adult Learning & Health Literacy",
          "Teach so patients understand.",
          "📚",
          [
            vid("Teaching Patients Effectively", "Adult learning principles.", { minutes: 8, transcript: "Adults learn best when teaching is relevant, problem-centered, respectful of experience, and immediately applicable. Health literacy — the ability to obtain and understand health information — strongly predicts outcomes." }),
            read("Health Literacy & the Teach-Back", "Reach understanding, not just deliver.", [
              "**Health literacy** is the degree to which patients can obtain, process, and understand basic health information. Low literacy worsens outcomes.",
              "",
              "**Teach-back method:** after teaching, ask the patient to explain it back in their own words — 'Just to be sure I explained clearly, can you tell me how you'll take this medicine?'",
              "",
              "**Plain language:** short sentences, avoid jargon, use pictures.",
              "",
              "**Adult learning (Knowles):** self-directed, experience-based, relevance-driven, problem-oriented.",
            ].join("\n"), { minutes: 10, source: "AHRQ Health Literacy Universal Precautions; Knowles' andragogy", skills: ["health-education", "communication"], takeaways: ["Teach-back confirms understanding, not memory.", "Use plain language and pictures.", "Adults want relevance and problem-solving."] }),
            prac("Run a Teach-Back", "Teach a medication and confirm understanding.", ["Explain the drug in plain words", "Avoid jargon", "Ask the patient to teach it back", "Re-teach gaps without blame", "Document understanding"], { minutes: 12, skills: ["health-education", "communication"] }),
            quiz("Quiz: Health Education", "4 questions.", [
              q("The teach-back method is used to:", ["Test the patient", "Confirm the patient understands by explaining back", "Punish errors", "Save time"], 1, "Teach-back verifies understanding — it checks YOUR teaching, not their memory."),
              q("Low health literacy is associated with:", ["Better outcomes", "Worse health outcomes", "Faster recovery", "No effect"], 1, "Low literacy predicts worse outcomes."),
              q("Adult learners prefer learning that is:", ["Irrelevant and abstract", "Relevant and problem-centered", "Purely theoretical", "Childlike"], 1, "Adults want relevance and problem-solving."),
              q("Plain language means:", ["Medical jargon", "Short sentences and no jargon", "Long paragraphs", "Latin terms"], 1, "Plain language improves comprehension."),
            ], { minutes: 6, skills: ["health-education"] }),
          ],
        ),
      ],
    ),
    unit(
      "Designing a Teaching Plan",
      "From needs assessment to evaluation.",
      "📝",
      14,
      [
        pathway(
          "Build a Teaching Plan",
          "Assess, plan, teach, evaluate.",
          "🏗️",
          [
            vid("The Nursing Process for Education", "Assess → plan → implement → evaluate.", { minutes: 8, transcript: "Patient education mirrors the nursing process: assess learning needs and barriers, set SMART learning objectives, choose methods/content, implement the teaching, and evaluate whether objectives were met." }),
            read("Writing SMART Learning Objectives", "Measurable by design.", [
              "Learning objectives should be **SMART**: Specific, Measurable, Achievable, Relevant, Time-bound — and written from the *learner's* perspective.",
              "",
              "Use action verbs (Bloom's taxonomy): *state, demonstrate, list, describe* — avoid 'understand' (not measurable).",
              "",
              "Example: 'By discharge, the patient will **demonstrate** insulin self-injection using correct technique.'",
            ].join("\n"), { minutes: 9, source: "Bloom's taxonomy; nurse-educator literature", skills: ["health-education"], takeaways: ["Objectives are learner-centered and measurable.", "Use action verbs (demonstrate, list).", "Assess needs/barriers before planning."] }),
            simDecision("Evaluate the Objective", "Spot the good objective.", "start", {
              start: { scenario: "Which is a well-written learning objective?", choices: [{ label: "The patient will demonstrate correct insulin injection before discharge.", next: "correct", feedback: "Measurable, specific, time-bound, learner-centered." }, { label: "The patient will understand diabetes.", next: "wrong", feedback: "'Understand' isn't measurable." }] },
              correct: { scenario: "Correct — it uses an observable action verb and a deadline.", success: true, debrief: "Measurable objectives use action verbs (demonstrate, list, describe) with a timeframe." },
              wrong: { scenario: "'Understand' can't be measured. Choose an observable behavior.", debrief: "Replace 'understand/know' with 'state/demonstrate/list'.", choices: [{ label: "Revise", next: "start" }] },
            }, { minutes: 5, skills: ["health-education"] }),
            quiz("Quiz: Teaching Plans", "3 questions.", [
              q("'The patient will understand the diet' is weak because:", ["It's too specific", "Understanding isn't measurable", "It has a timeframe", "It's achievable"], 1, "Use measurable verbs instead."),
              q("Before planning teaching you should:", ["Skip assessment", "Assess learning needs and barriers", "Lecture immediately", "Give a test"], 1, "Assess first."),
              q("A SMART objective is written from the perspective of the:", ["Nurse", "Learner/patient", "Doctor", "Family"], 1, "Objectives describe what the learner will do."),
            ], { minutes: 5, skills: ["health-education"] }),
          ],
        ),
      ],
    ),
  ],
});
