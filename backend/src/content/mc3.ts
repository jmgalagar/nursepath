import { course, pathway, unit, vid, read, prac, quiz, q, simDecision } from "./builder.js";

/** MC 3 — Microbiology and Parasitology: microbes, immunity, and infection. */
export const mc3 = course({
  code: "MC 3",
  title: "Microbiology and Parasitology",
  category: "MC",
  tagline: "The microbes that cause disease and the defenses that fight them.",
  icon: "🦠",
  hours: 60,
  outcomes: [
    "Distinguish bacteria, viruses, fungi, and parasites",
    "Explain the chain of infection and how to break it",
    "Describe the immune response and immunity types",
    "Relate microbiology to common healthcare-associated infections",
  ],
  units: [
    unit(
      "Microbial World",
      "Bacteria, viruses, fungi, and parasites.",
      "🔬",
      14,
      [
        pathway(
          "Types of Microorganisms",
          "What makes each pathogen unique.",
          "🧫",
          [
            vid("Meet the Microbes", "Bacteria vs viruses vs fungi vs parasites.", { minutes: 9, transcript: "Bacteria are prokaryotic single cells treated with antibiotics; viruses are obligate intracellular pathogens needing antivirals/vaccines; fungi are eukaryotic (yeasts/molds) treated with antifungals; parasites (protozoa, helminths) need antiparasitics." }),
            read("Classifying Pathogens", "Key features of each group.", [
              "**Bacteria:** prokaryotes; Gram-positive (purple) vs Gram-negative (pink); treated with antibiotics (e.g. penicillins).",
              "",
              "**Viruses:** DNA or RNA in a protein coat; need host cells; treated symptomatically, with antivirals, or prevented by vaccines.",
              "",
              "**Fungi:** eukaryotes (Candida, Aspergillus); antifungals (e.g. fluconazole).",
              "",
              "**Parasites:** protozoa (Plasmodium/malaria) and helminths (worms); antiparasitic drugs.",
              "",
              "**Normal flora** colonize skin/gut harmlessly and can opportunistically infect.",
            ].join("\n"), { minutes: 11, source: "OpenStax Microbiology", skills: ["microbiology"], takeaways: ["Bacteria = antibiotics; viruses = antivirals/vaccines.", "Gram stain splits bacteria into two groups.", "Normal flora can become opportunistic pathogens."] }),
            prac("Sort the Pathogens", "Match organism to class.", ["Staphylococcus → bacterium", "Influenza → virus", "Candida → fungus", "Plasmodium → parasite (protozoan)"], { minutes: 8, skills: ["microbiology"] }),
            quiz("Quiz: Microbe Types", "4 questions.", [
              q("Which group requires antibiotics?", ["Viruses", "Bacteria", "Fungi", "Worms"], 1, "Bacterial infections are treated with antibiotics."),
              q("Gram staining distinguishes:", ["Viruses from bacteria", "Two groups of bacteria", "Fungi from parasites", "RNA from DNA"], 1, "Gram-positive vs Gram-negative bacteria."),
              q("Obligate intracellular pathogens that need host cells are:", ["Bacteria", "Viruses", "Fungi", "Algae"], 1, "Viruses must replicate inside host cells."),
              q("Candida is a:", ["Bacterium", "Virus", "Fungus", "Helminth"], 2, "Candida is a yeast (fungus)."),
            ], { minutes: 6, skills: ["microbiology"] }),
          ],
        ),
      ],
    ),
    unit(
      "Chain of Infection",
      "How infections spread — and how nurses break the chain.",
      "⛓️",
      12,
      [
        pathway(
          "Breaking the Chain",
          "Six links and where to intervene.",
          "✂️",
          [
            vid("The Chain of Infection", "Six links from agent to susceptible host.", { minutes: 8, transcript: "The chain: infectious agent → reservoir → portal of exit → mode of transmission → portal of entry → susceptible host. Break any link to stop infection." }),
            read("The Six Links & Interventions", "Where nursing actions cut the chain.", [
              "1. **Agent** — the microbe (hard to change).",
              "2. **Reservoir** — where it lives (human, water, food). *Action: sterilize, treat water.*",
              "3. **Portal of exit** — respiratory, GI, blood. *Action: cover coughs, contain waste.*",
              "4. **Mode of transmission** — contact, droplet, airborne, vector. *Action: hand hygiene, PPE, isolation.*",
              "5. **Portal of entry** — mucous membranes, breaks in skin, devices. *Action: aseptic technique, safe injections.*",
              "6. **Susceptible host** — immunocompromised, elderly. *Action: immunization, nutrition.*",
            ].join("\n"), { minutes: 10, source: "CDC Standard Precautions; OpenStax Microbiology", skills: ["infection-control", "microbiology"], takeaways: ["Six links; break any one to stop spread.", "Hand hygiene breaks the transmission link.", "Isolation types match transmission routes."] }),
            simDecision("Break the Chain", "Choose the best intervention.", "start", {
              start: { scenario: "A patient has MRSA in a wound. Which intervention best breaks the transmission link?", choices: [{ label: "Hand hygiene + contact precautions + gloves/gown", next: "correct", feedback: "Yes — contact precautions interrupt direct/indirect transmission." }, { label: "Give the patient more painkillers", next: "wrong", feedback: "That doesn't address transmission." }] },
              correct: { scenario: "Correct. Contact precautions + hand hygiene break the chain for MRSA.", success: true, debrief: "Match the precaution to the transmission route: contact, droplet, or airborne." },
              wrong: { scenario: "Focus on the transmission link.", debrief: "MRSA spreads by contact — so hand hygiene and contact precautions are key.", choices: [{ label: "Reconsider", next: "start" }] },
            }, { minutes: 5, skills: ["infection-control"] }),
            quiz("Quiz: Chain of Infection", "4 questions.", [
              q("Hand hygiene primarily breaks which link?", ["Agent", "Mode of transmission", "Susceptible host", "Reservoir"], 1, "It interrupts transmission by contact."),
              q("Airborne precautions (negative-pressure room, N95) are for:", ["MRSA", "Tuberculosis, measles, chickenpox", "C. difficile only", "Pinworm"], 1, "Airborne pathogens like TB need N95 + negative pressure."),
              q("A wound is a portal of:", ["Exit only", "Entry", "Transmission", "Reservoir"], 1, "Broken skin is a portal of entry for microbes."),
              q("Droplet precautions require:", ["N95 and negative pressure", "Surgical mask within 1-2 m", "No precautions", "Gown only"], 1, "Droplets travel short distances — a surgical mask suffices."),
            ], { minutes: 6, skills: ["infection-control"] }),
          ],
        ),
      ],
    ),
    unit(
      "Immunity",
      "Innate and adaptive defenses, and how vaccines work.",
      "🛡️",
      12,
      [
        pathway(
          "The Immune Response",
          "How the body recognizes and remembers threats.",
          "🧬",
          [
            vid("Innate vs Adaptive Immunity", "Two arms of defense.", { minutes: 8, transcript: "Innate immunity (barriers, phagocytes, inflammation, complement) is fast and non-specific. Adaptive immunity (B cells → antibodies, T cells → cell-mediated) is slower but specific and remembers — the basis of vaccination." }),
            read("How Immunity & Vaccines Work", "From exposure to memory.", [
              "**Innate:** skin, mucous, phagocytes (neutrophils, macrophages), natural killer cells, complement, inflammation — immediate, non-specific.",
              "",
              "**Adaptive:**",
              "- **B cells** → plasma cells → **antibodies** (humoral immunity).",
              "- **T cells** → helper (CD4) and cytotoxic (CD8) cells (cellular immunity).",
              "",
              "**Memory cells** respond faster on re-exposure — this is how vaccines protect: they prime the adaptive response without causing disease.",
              "",
              "**Active immunity:** own antibodies (infection or vaccine). **Passive immunity:** given antibodies (e.g. maternal, antiserum) — temporary.",
            ].join("\n"), { minutes: 11, source: "OpenStax Microbiology", skills: ["immunology"], takeaways: ["Innate = fast/non-specific; adaptive = slow/specific/memory.", "B cells make antibodies; T cells do cell-mediated immunity.", "Vaccines create active immunity via memory."] }),
            prac("Distinguish Immunity Types", "Classify examples.", ["Having measles → active natural", "MMR vaccine → active artificial", "Mother's breast milk antibodies → passive natural", "Rabies immunoglobulin → passive artificial"], { minutes: 8, skills: ["immunology"] }),
            quiz("Quiz: Immunity", "4 questions.", [
              q("Antibodies are produced by:", ["T cells", "B cells (plasma cells)", "Macrophages", "Red blood cells"], 1, "Plasma cells (from B cells) secrete antibodies."),
              q("Vaccination creates:", ["Passive natural immunity", "Active artificial immunity", "Passive artificial immunity", "No immunity"], 1, "Vaccines induce active artificial immunity via memory."),
              q("The fast, non-specific arm is:", ["Adaptive", "Innate", "Memory", "Humoral"], 1, "Innate immunity is immediate and non-specific."),
              q("Helper T cells are identified as:", ["CD4", "CD8", "CD20", "CD56"], 0, "Helper T cells are CD4+."),
            ], { minutes: 6, skills: ["immunology"] }),
          ],
        ),
      ],
    ),
  ],
});
