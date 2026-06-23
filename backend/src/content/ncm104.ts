import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** NCM 104 — Community Health Nursing I (Individual and Family). */
export const ncm104 = course({
  code: "NCM 104",
  title: "Community Health Nursing I (Individual and Family)",
  category: "NCM",
  tagline: "Nursing care for individuals and families in the community setting.",
  icon: "🏘️",
  hours: 72,
  outcomes: [
    "Apply the levels of prevention (primary, secondary, tertiary)",
    "Conduct a family health assessment using the family nursing process",
    "Deliver home-based and family-centered care",
    "Promote wellness across the lifespan in the community",
  ],
  units: [
    unit(
      "Levels of Prevention",
      "Primary, secondary, and tertiary prevention.",
      "🛡️",
      12,
      [
        pathway(
          "The Three Levels of Prevention",
          "Where nursing intervenes across the disease continuum.",
          "🚦",
          [
            vid("Levels of Prevention", "Leavell & Clark's framework.", { minutes: 8, transcript: "Primary prevention prevents disease before it occurs (immunization, health education). Secondary prevention detects/treats early (screening, early treatment). Tertiary prevention limits complications of established disease (rehabilitation)." }),
            read("Primary, Secondary, Tertiary", "Examples of each level.", [
              "**Primary prevention — before disease:** immunizations, safe water/sanitation, nutrition education, smoking prevention, safe sex.",
              "",
              "**Secondary prevention — early disease:** screenings (BP, mammography, Pap smear), case finding, early treatment.",
              "",
              "**Tertiary prevention — established disease:** rehabilitation, diabetic foot care, cardiac rehab, preventing disability/complications.",
            ].join("\n"), { minutes: 10, source: "Leavell & Clark; WHO; Public Health Nursing", skills: ["community-health"], takeaways: ["Primary = prevent; Secondary = screen/early treat; Tertiary = rehabilitate.", "Immunization = primary; mammography = secondary; cardiac rehab = tertiary."] }),
            prac("Classify the Intervention", "Sort by prevention level.", ["Immunization → primary", "Pap smear → secondary", "Cardiac rehab → tertiary", "Smoking prevention → primary"], { minutes: 8, skills: ["community-health"] }),
            simDecision("Pick the Right Level", "Apply the framework.", "start", {
              start: { scenario: "Organizing a hypertension screening event at a barangay health center is which level?", choices: [{ label: "Secondary prevention (early detection)", next: "correct", feedback: "Screening for undiagnosed disease = secondary." }, { label: "Primary prevention", next: "wrong", feedback: "Primary prevents disease before it occurs." }] },
              correct: { scenario: "Correct — screening detects disease early.", success: true, debrief: "Screening = secondary prevention. Adding health education about salt/exercise would add a primary-prevention component." },
              wrong: { scenario: "Screening detects existing disease early — that's secondary.", debrief: "Primary prevents onset; secondary detects/treats early.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 5, skills: ["community-health"] }),
            quiz("Quiz: Levels of Prevention", "4 questions.", [
              q("Immunization is which level?", ["Primary", "Secondary", "Tertiary", "Quaternary"], 0, "Vaccines prevent disease — primary."),
              q("A mammography screening program is:", ["Primary", "Secondary", "Tertiary", "Not prevention"], 1, "Early detection = secondary."),
              q("Cardiac rehabilitation is:", ["Primary", "Secondary", "Tertiary", "None"], 2, "Rehab after established disease = tertiary."),
              q("Which is a primary prevention activity?", ["Pap smear", "Smoking prevention education", "Stroke rehab", "Diabetic foot care"], 1, "Preventing risk before disease = primary."),
            ], { minutes: 6, skills: ["community-health"] }),
          ],
        ),
      ],
    ),
    unit(
      "Family Nursing Process",
      "Assessing and caring for families.",
      "👨‍👩‍👧",
      16,
      [
        pathway(
          "Family Assessment & Home Visiting",
          "Tools and techniques for family care.",
          "🏠",
          [
            vid("The Family Nursing Process", "Assessing a family as the unit of care.", { minutes: 9, transcript: "The family is the unit of care. Assessment looks at family structure, function, roles, health beliefs, and resources. Home visiting builds rapport and reveals environmental factors." }),
            read("Assessing the Family", "Structure, function, and health.", [
              "**Family structure:** nuclear, extended, single-parent; composition; genogram.",
              "**Family functions:** affective, socialization, economic, health care, reproductive.",
              "**Assessment tools:** genogram (family tree), ecomap (relationships), APGAR (satisfaction), home/environment assessment.",
              "",
              "Phases of a **home visit:** preparation, initiation, working, termination, and documentation/follow-up.",
            ].join("\n"), { minutes: 11, source: "Public Health Nursing in the Philippines; Friedman Family Assessment", skills: ["community-health"], takeaways: ["The family is the unit of care.", "Genogram + ecomap map structure and relationships.", "Home visits have defined phases."] }),
            prac("Draw a Genogram", "Map a family's health history.", ["Use standard symbols (square=M, circle=F)", "Show 3 generations", "Mark deceased/affected members", "Note relationships and diseases"], { minutes: 15, skills: ["community-health"] }),
            quiz("Quiz: Family Nursing", "4 questions.", [
              q("In community health, the unit of care is often the:", ["Individual only", "Family", "Hospital", "Doctor"], 1, "Family-centered care is central."),
              q("A genogram is a:", ["Drug chart", "Family tree diagram", "Vital sign graph", "Schedule"], 1, "Genograms map family structure/history."),
              q("Which is a family function?", ["Blood pressure", "Socialization of children", "X-ray results", "Lab values"], 1, "Socialization is a core family function."),
              q("The final phase of a home visit is:", ["Initiation", "Termination + documentation/follow-up", "Preparation", "Working"], 1, "Terminate, document, and plan follow-up."),
            ], { minutes: 6, skills: ["community-health"] }),
          ],
        ),
      ],
    ),
  ],
});
