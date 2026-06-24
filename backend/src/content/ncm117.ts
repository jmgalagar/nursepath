import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 117 — Care of Clients with Maladaptive Patterns of Behavior / Psychiatric Nursing (FLAGSHIP). */
export const ncm117 = course({
  code: "NCM 117",
  title: "Care of Clients with Maladaptive Patterns of Behavior (Psychiatric Nursing)",
  category: "ELECTIVE",
  tagline: "Therapeutic communication and care for mental health conditions.",
  icon: "🧠",
  hours: 72,
  outcomes: [
    "Apply therapeutic communication techniques",
    "Care for patients with depression, anxiety, bipolar, and schizophrenia",
    "Recognize and respond to psychiatric emergencies (suicide risk)",
    "Administer psychotropic medications and monitor effects",
  ],
  units: [
    unit(
      "Therapeutic Communication",
      "The nurse's most powerful psychiatric tool.",
      "💬",
      12,
      [
        pathway(
          "Therapeutic vs Non-therapeutic",
          "Communication that heals.",
          "🤝",
          [
            vid("Therapeutic Communication", "Techniques that build trust.", { minutes: 9, transcript: "Therapeutic communication is purposeful, patient-centered, and goal-directed. Techniques include active listening, silence, reflection, clarification, and summarizing. Non-therapeutic blocks include giving advice, judging, and changing the subject." }),
            read("Techniques & Blocks", "What to use and what to avoid.", [
              "**Therapeutic techniques:** active listening, silence, broad openings ('Tell me about...'), reflection, clarification, restating, summarizing, focusing.",
              "",
              "**Non-therapeutic blocks (avoid):** giving advice, reassurance ('It'll be fine'), agreeing/disagreeing, judging, why-questions, changing the subject, false reassurance, probing.",
              "",
              "**Peplau's therapeutic relationship phases:** orientation, working, termination.",
              "",
              "Always assess **suicide risk** in at-risk patients directly and compassionately.",
            ].join("\n"), { minutes: 11, source: "Hildegard Peplau; Townsend Psychiatric Mental Health Nursing", skills: ["psychiatric", "communication"], takeaways: ["Therapeutic: listen, reflect, clarify, summarize.", "Avoid: advice, judgment, false reassurance.", "Always assess suicide risk directly."] }),
            prac("Practice Therapeutic Responses", "Use the right technique.", ["Reflect: 'It sounds like you feel hopeless.'", "Clarify: 'Can you tell me more about that?'", "Use therapeutic silence", "Avoid giving advice", "Summarize before closing"], { minutes: 12, skills: ["psychiatric", "communication"] }),
            simDecision("Respond Therapeutically", "Choose the right reply.", "start", {
              start: { scenario: "A patient says, 'Everything feels pointless.' Which is the most therapeutic response?", choices: [{ label: "'You're saying things feel pointless — tell me more about that.' (reflection + clarification)", next: "correct", feedback: "Yes — you validate and invite exploration." }, { label: "'Don't say that, things will get better!' (false reassurance)", next: "wrong", feedback: "This dismisses the feeling and blocks communication." }] },
              correct: { scenario: "Correct. Then gently assess for suicide risk.", success: true, debrief: "Hopelessness is a suicide-risk flag. Reflect, explore, then ask directly about self-harm thoughts." },
              wrong: { scenario: "Avoid false reassurance and judgment; reflect and explore.", debrief: "Statements of hopelessness warrant suicide-risk assessment.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["psychiatric", "communication"] }),
            quiz("Quiz: Communication", "4 questions.", [
              q("'Everything will be fine' is an example of:", ["Therapeutic reflection", "False reassurance (non-therapeutic)", "Clarification", "Silence"], 1, "Non-therapeutic block."),
              q("Asking 'Tell me more about that' is:", ["Advice", "A broad opening / clarification", "Judgment", "Changing the subject"], 1, "Therapeutic technique."),
              q("Peplau's phases are:", ["Assessment, diagnosis, planning", "Orientation, working, termination", "Pre-op, intra-op, post-op", "Morning, noon, night"], 1, "The therapeutic relationship phases."),
              q("With an at-risk patient you should:", ["Avoid the topic", "Ask directly about suicide", "Give advice", "Change the subject"], 1, "Direct, compassionate assessment reduces risk."),
            ], { minutes: 6, skills: ["psychiatric"] }),
          ],
        ),
      ],
    ),
    unit(
      "Mood & Thought Disorders",
      "Depression, bipolar, schizophrenia.",
      "🌧️",
      18,
      [
        pathway(
          "Depression, Bipolar & Schizophrenia",
          "Recognize and care.",
          "🧩",
          [
            vid("Common Mental Health Disorders", "Mood and thought disorders.", { minutes: 11, transcript: "Depression: persistent low mood, anhedonia, hopelessness, sleep/appetite changes. Bipolar: alternating depression and mania (elevated mood, risky behavior). Schizophrenia: psychosis — hallucinations, delusions, disorganized thought and negative symptoms." }),
            read("Disorders & Nursing Care", "Recognize and respond.", [
              "**Major depression:** depressed mood, anhedonia, hopelessness, fatigue, sleep/appetite changes, suicidal thoughts. Care: safety (remove means), structured activity, monitor for sudden 'improvement' (risk window), SSRIs take weeks.",
              "",
              "**Bipolar disorder — mania:** elevated/irritable mood, decreased need for sleep, pressured speech, risky behavior, grandiosity. Care: low-stimulation environment, set limits, protect from harm, medications (mood stabilizers like lithium).",
              "",
              "**Schizophrenia:** positive symptoms (hallucinations, delusions), negative symptoms (apathy, flat affect, withdrawal), disorganized speech/behavior. Care: trust, don't argue with delusions, redirect, structured routine, antipsychotics.",
              "",
              "**Lithium toxicity:** therapeutic level 0.6-1.2; toxicity > 1.5 — tremor, confusion, ataxia, seizures. Monitor levels and sodium; maintain hydration.",
            ].join("\n"), { minutes: 13, source: "APA practice guidelines; DSM-5-TR concepts", skills: ["psychiatric", "pharmacology"], takeaways: ["Depression: safety + watch for suicide risk windows.", "Mania: low stimulation + limits.", "Schizophrenia: don't argue with delusions; structured routine.", "Lithium toxicity > 1.5."] }),
            prac("Care for a Depressed Patient", "Safety and support.", ["Assess suicide risk directly and remove means", "Encourage small achievable activities", "Monitor mood and watch for sudden 'improvement'", "Support sleep and nutrition", "Coordinate therapy and medication follow-up"], { minutes: 12, skills: ["psychiatric"] }),
            simDecision("Lithium Toxicity", "Spot the danger.", "start", {
              start: { scenario: "A bipolar patient on lithium presents with coarse tremor, confusion, and unsteady gait. Likely cause?", choices: [{ label: "Lithium toxicity — check the level, hold the dose, hydrate", next: "correct", feedback: "Yes — tremor, confusion, ataxia are classic toxicity signs." }, { label: "It's just their mental illness", next: "wrong", feedback: "These are neurologic toxicity signs, not baseline illness." }] },
              correct: { scenario: "Correct. Lithium has a narrow therapeutic window.", success: true, debrief: "Lithium toxicity > 1.5: tremor, confusion, ataxia, seizures. Check level, stop the drug, hydrate; monitor sodium and renal function." },
              wrong: { scenario: "Neurologic signs on lithium = toxicity until proven otherwise.", debrief: "Narrow window; check the blood level.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 6, skills: ["psychiatric", "pharmacology"] }),
            quiz("Quiz: Mood & Thought Disorders", "5 questions.", [
              q("A key symptom of major depression is:", ["Pressured speech", "Anhedonia (loss of interest)", "Grandiosity", "Insomnia with no fatigue"], 1, "Anhedonia is core to depression."),
              q("Mania typically includes:", ["Decreased energy", "Decreased need for sleep, risky behavior", "Flat affect", "Social withdrawal"], 1, "Classic manic features."),
              q("When a patient has delusions, you should:", ["Argue they're false", "Not argue; acknowledge feelings, redirect", "Ignore the patient", "Confirm the delusion"], 1, "Don't argue; focus on feelings."),
              q("Lithium toxicity (>1.5) shows:", ["Calm euphoria", "Tremor, confusion, ataxia", "Weight loss only", "Nothing"], 1, "Classic toxicity triad."),
              q("SSRIs for depression typically take how long to work?", ["Instantly", "2-6 weeks", "1 year", "1 hour"], 1, "Several weeks to reach effect."),
            ], { minutes: 8, skills: ["psychiatric"] }),
          ],
        ),
      ],
    ),
    unit(
      "Psychiatric Emergencies & Psychotropics",
      "Suicide risk, agitation, and medications.",
      "🆘",
      14,
      [
        pathway(
          "Suicide Risk & Psychotropic Drugs",
          "High-stakes psychiatric care.",
          "🚨",
          [
            vid("Suicide Risk Assessment", "Saving lives through direct questions.", { minutes: 9, transcript: "Assess suicide risk directly: ideation, plan, means, intent, and protective factors. The highest risk is a specific plan with access to means. Remove means, provide constant observation, and escalate." }),
            read("Suicide Risk & Medications", "Assess, protect, treat.", [
              "**Risk factors:** prior attempts (strongest), specific plan + access to means, hopelessness, substance use, recent loss, depression, command hallucinations.",
              "",
              "**Assessment:** ask directly — 'Are you thinking about hurting yourself? Do you have a plan? Access to means?'",
              "",
              "**Care:** remove means (sharps, ligatures, medications), constant one-to-one observation for high risk, no-suicide contracts are NOT sufficient alone, escalate to psychiatry.",
              "",
              "**Psychotropic classes:** antipsychotics (haloperidol, risperidone, olanzapine), antidepressants (SSRIs), mood stabilizers (lithium, valproate), anxiolytics (benzodiazepines — short-term, dependence risk).",
              "",
              "**Antipsychotic monitoring:** extrapyramidal symptoms (EPS), tardive dyskinesia, metabolic syndrome (weight, glucose, lipids).",
            ].join("\n"), { minutes: 12, source: "Suicide prevention guidelines; psychotropic references", skills: ["psychiatric", "pharmacology"], takeaways: ["Prior attempt = strongest risk factor.", "Ask directly; remove means; observe constantly.", "Antipsychotics: watch EPS, tardive dyskinesia, metabolic syndrome."] }),
            prac("Respond to Suicide Risk", "Safety first.", ["Ask directly about thoughts/plan/means", "Remove access to means", "Initiate constant observation", "Notify the psychiatrist/team", "Document assessment and interventions"], { minutes: 12, skills: ["psychiatric"] }),
            quiz("Quiz: Emergencies & Psychotropics", "5 questions.", [
              q("The strongest suicide risk factor is:", ["A good mood", "A prior suicide attempt", "Being busy", "Eating well"], 1, "Prior attempts strongly predict risk."),
              q("For a high-risk patient, observe:", ["Hourly", "Constant one-to-one", "Never", "Weekly"], 1, "Continuous observation."),
              q("No-suicide contracts alone are:", ["Fully protective", "Insufficient without other measures", "Required by law", "Drug orders"], 1, "They do not guarantee safety."),
              q("Long-term antipsychotic use risks:", ["Weight loss", "Tardive dyskinesia and metabolic syndrome", "Hypertension crisis", "Deafness"], 1, "Known long-term adverse effects."),
              q("Benzodiazepines carry a risk of:", ["Weight gain only", "Dependence with long-term use", "Cure of psychosis", "Nothing"], 1, "Use short-term when possible."),
            ], { minutes: 8, skills: ["psychiatric", "pharmacology"] }),
          ],
        ),
      ],
    ),
  ],
});
