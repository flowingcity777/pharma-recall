const drugs = [
    {
        id: "acetaminophen",
        genericName: "Acetaminophen",
        brandNames: ["Tylenol"],
        category: "Analgesic / Antipyretic",

        sideEffects: [
            "Nausea",
            "Rash",
            "Hepatotoxicity"
        ],

        clinicalPharmacology:
            "Analgesic and antipyretic; reduces central prostaglandin synthesis.",

        foodInteractions:
            "Avoid excessive alcohol; increased hepatotoxicity risk."
    },

    {
        id: "acetylcysteine",
        genericName: "Acetylcysteine",
        brandNames: ["Acetadote"],
        category: "Antidote",

        sideEffects: [
            "Rash",
            "Urticaria",
            "Pruritus",
            "Flushing",
            "Hypotension",
            "Bronchospasm",
            "Hypersensitivity/anaphylaxis"
        ],

        clinicalPharmacology:
            "Antidote for acetaminophen poisoning; replenishes glutathione to detoxify NAPQI and reduce liver injury.",

        foodInteractions:
            "No clinically significant food–drug interactions for IV Acetadote."
    },

    {
        id: "celecoxib",
        genericName: "Celecoxib",
        brandNames: ["Celebrex"],
        category: "NSAID",

        sideEffects: [
            "Dyspepsia",
            "Abdominal pain",
            "Diarrhea",
            "Edema",
            "Hypertension",
            "GI bleeding/ulceration",
            "Cardiovascular thrombotic risk",
            "Renal impairment"
        ],

        clinicalPharmacology:
            "Selective COX-2 inhibitor; reduces prostaglandins to relieve pain and inflammation.",

        foodInteractions:
            "May be taken with or without food; high-fat meals can delay absorption."
    },

    {
        id: "ibuprofen",
        genericName: "Ibuprofen",
        brandNames: ["Motrin", "Advil"],
        category: "NSAID",

        sideEffects: [
            "Dyspepsia",
            "Nausea",
            "Abdominal pain",
            "GI bleeding/ulceration",
            "Renal impairment",
            "Fluid retention",
            "Hypertension",
            "Cardiovascular thrombotic risk"
        ],

        clinicalPharmacology:
            "Nonselective COX inhibitor; provides analgesic, anti-inflammatory, and antipyretic effects.",

        foodInteractions:
            "Take with food if GI upset occurs; alcohol can increase GI bleeding risk."
    },

    {
        id: "meloxicam",
        genericName: "Meloxicam",
        brandNames: ["Mobic"],
        category: "NSAID",

        sideEffects: [
            "Dyspepsia",
            "Diarrhea",
            "Nausea",
            "GI bleeding/ulceration",
            "Hypertension",
            "Edema",
            "Renal impairment",
            "Cardiovascular thrombotic risk"
        ],

        clinicalPharmacology:
            "NSAID that inhibits COX enzymes to reduce prostaglandins; commonly used for osteoarthritis and rheumatoid arthritis.",

        foodInteractions:
            "May be taken with or without food."
    },

    {
        id: "diclofenac",
        genericName: "Diclofenac",
        brandNames: ["Voltaren"],
        category: "NSAID",

        sideEffects: [
            "Dyspepsia",
            "Nausea",
            "Abdominal pain",
            "GI bleeding/ulceration",
            "Hepatotoxicity",
            "Renal impairment",
            "Edema",
            "Hypertension",
            "Cardiovascular thrombotic risk"
        ],

        clinicalPharmacology:
            "Nonselective COX inhibitor; reduces prostaglandins to provide analgesic and anti-inflammatory effects.",

        foodInteractions:
            "May be taken with food; food can delay absorption."
    },

    {
        id: "indomethacin",
        genericName: "Indomethacin",
        brandNames: ["Indocin"],
        category: "NSAID",

        sideEffects: [
            "GI irritation",
            "Ulceration",
            "GI bleeding",
            "Headache",
            "Dizziness",
            "Confusion",
            "Renal impairment",
            "Edema",
            "Hypertension",
            "Hepatotoxicity"
        ],

        clinicalPharmacology:
            "Potent nonselective COX inhibitor; provides analgesic and anti-inflammatory effects, including use in acute gout.",

        foodInteractions:
            "May be taken with food to reduce GI irritation."
    },

    {
        id: "naproxen",
        genericName: "Naproxen",
        brandNames: ["Aleve", "Naprosyn"],
        category: "NSAID",

        sideEffects: [
            "Dyspepsia",
            "Nausea",
            "Abdominal pain",
            "GI bleeding/ulceration",
            "Renal impairment",
            "Edema",
            "Hypertension",
            "Cardiovascular thrombotic risk"
        ],

        clinicalPharmacology:
            "Nonselective COX inhibitor; provides analgesic, anti-inflammatory, and antipyretic effects with a longer duration of action.",

        foodInteractions:
            "May be taken with food or milk if stomach upset occurs; alcohol can increase GI bleeding risk."
    },

    {
        id: "lidocaine",
        genericName: "Lidocaine",
        brandNames: ["Lidoderm"],
        category: "Local Anesthetic",

        sideEffects: [
            "Application-site redness",
            "Irritation",
            "Burning",
            "Itching",
            "Dermatitis",
            "Systemic CNS toxicity with excessive use"
        ],

        clinicalPharmacology:
            "Local amide anesthetic; blocks sodium channels to reduce nerve conduction and localized pain.",

        foodInteractions:
            "No significant food–drug interactions."
    },

    {
        id: "sumatriptan",
        genericName: "Sumatriptan",
        brandNames: ["Imitrex"],
        category: "Triptan",

        sideEffects: [
            "Paresthesia",
            "Dizziness",
            "Fatigue",
            "Chest/neck/jaw pressure",
            "Increased blood pressure",
            "Rare cardiovascular events"
        ],

        clinicalPharmacology:
            "5-HT₁B/₁D agonist; constricts cranial vessels and inhibits trigeminal signaling to relieve acute migraine.",

        foodInteractions:
            "May be taken with or without food."
    },

    {
        id: "rizatriptan",
        genericName: "Rizatriptan",
        brandNames: ["Maxalt"],
        category: "Triptan",

        sideEffects: [
            "Dizziness",
            "Drowsiness",
            "Fatigue",
            "Paresthesia",
            "Chest/neck/jaw pressure",
            "Increased blood pressure",
            "Rare cardiovascular events"
        ],

        clinicalPharmacology:
            "5-HT₁B/₁D agonist; constricts cranial vessels and inhibits trigeminal signaling to relieve acute migraine.",

        foodInteractions:
            "May be taken with or without food; food may delay absorption."
    },

    {
        id: "erenumab",
        genericName: "Erenumab",
        brandNames: ["Aimovig"],
        category: "CGRP Migraine Prevention",

        sideEffects: [
            "Injection-site reactions",
            "Constipation",
            "Hypertension",
            "Hypersensitivity reactions",
            "Raynaud's phenomenon"
        ],

        clinicalPharmacology:
            "CGRP receptor antagonist; blocks CGRP signaling to prevent migraine.",

        foodInteractions:
            "No significant food–drug interactions."
    },

    {
        id: "fremanezumab",
        genericName: "Fremanezumab",
        brandNames: ["Ajovy"],
        category: "CGRP Migraine Prevention",

        sideEffects: [
            "Injection-site reactions",
            "Constipation",
            "Hypertension",
            "Hypersensitivity reactions",
            "Raynaud's phenomenon"
        ],

        clinicalPharmacology:
            "CGRP ligand antagonist; blocks CGRP activity to prevent migraine.",

        foodInteractions:
            "No significant food–drug interactions."
    },

    {
        id: "galcanezumab",
        genericName: "Galcanezumab",
        brandNames: ["Emgality"],
        category: "CGRP Migraine Prevention",

        sideEffects: [
            "Injection-site reactions",
            "Hypersensitivity reactions",
            "Hypertension",
            "Raynaud's phenomenon"
        ],

        clinicalPharmacology:
            "CGRP ligand antagonist; binds CGRP and blocks its activity to prevent migraine.",

        foodInteractions:
            "No significant food–drug interactions."
    }
];
