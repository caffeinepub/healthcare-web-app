export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export interface Disease {
  name: string;
  symptoms: string[];
  riskLevel: RiskLevel;
  description: string;
  recommendations: string[];
}

export interface PredictionResult {
  disease: Disease;
  confidence: number;
  matchedSymptoms: string[];
}

export const diseases: Disease[] = [
  {
    name: "Common Cold",
    symptoms: [
      "Runny Nose",
      "Sneezing",
      "Sore Throat",
      "Cough",
      "Mild Fever",
      "Fatigue",
    ],
    riskLevel: "Low",
    description:
      "A viral infection of the upper respiratory tract that typically resolves on its own within 7-10 days. It is very common and rarely leads to serious complications.",
    recommendations: [
      "Rest and stay hydrated with plenty of fluids",
      "Use over-the-counter cold medications to manage symptoms",
      "Gargle with warm salt water to soothe a sore throat",
      "Consult a doctor if symptoms worsen or persist beyond 10 days",
    ],
  },
  {
    name: "Influenza",
    symptoms: [
      "Fever",
      "Body Aches",
      "Fatigue",
      "Headache",
      "Cough",
      "Sore Throat",
      "Chills",
    ],
    riskLevel: "Moderate",
    description:
      "A contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness and at times can lead to hospitalization or death.",
    recommendations: [
      "Rest at home and avoid contact with others to prevent spread",
      "Take antiviral medications as prescribed if caught early",
      "Stay hydrated and use fever-reducing medications",
      "Seek emergency care for difficulty breathing or persistent chest pain",
    ],
  },
  {
    name: "COVID-19",
    symptoms: [
      "Fever",
      "Cough",
      "Fatigue",
      "Shortness of Breath",
      "Loss of Taste",
      "Loss of Smell",
      "Body Aches",
      "Headache",
    ],
    riskLevel: "High",
    description:
      "A respiratory illness caused by the SARS-CoV-2 virus. Symptoms range from mild to severe, and some cases require hospitalization or intensive care.",
    recommendations: [
      "Isolate immediately to prevent spreading to others",
      "Monitor oxygen levels and seek emergency care if below 94%",
      "Follow local health authority guidelines on testing and treatment",
      "Contact your doctor about antiviral treatment options",
    ],
  },
  {
    name: "Pneumonia",
    symptoms: [
      "Cough",
      "Fever",
      "Shortness of Breath",
      "Chest Pain",
      "Fatigue",
      "Chills",
    ],
    riskLevel: "High",
    description:
      "An infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus. It can be life-threatening, especially for infants, elderly, and immunocompromised individuals.",
    recommendations: [
      "Seek immediate medical attention for proper diagnosis",
      "Complete the full course of prescribed antibiotics or antivirals",
      "Rest and drink plenty of fluids",
      "Get hospitalized if oxygen levels drop or breathing becomes difficult",
    ],
  },
  {
    name: "Migraine",
    symptoms: [
      "Headache",
      "Nausea",
      "Vomiting",
      "Sensitivity to Light",
      "Dizziness",
      "Visual Disturbances",
    ],
    riskLevel: "Moderate",
    description:
      "A neurological condition characterized by intense, debilitating headaches often accompanied by nausea and sensitivity to light and sound. Episodes can last from hours to days.",
    recommendations: [
      "Rest in a dark, quiet room during attacks",
      "Use prescribed migraine-specific medications (triptans) at onset",
      "Identify and avoid personal migraine triggers",
      "Consult a neurologist for preventive treatment if migraines are frequent",
    ],
  },
  {
    name: "Gastroenteritis",
    symptoms: [
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Abdominal Pain",
      "Fever",
      "Fatigue",
    ],
    riskLevel: "Moderate",
    description:
      "An intestinal infection characterized by diarrhea, abdominal cramps, nausea, vomiting, and sometimes fever. It is often called the stomach flu, though it is not related to influenza.",
    recommendations: [
      "Stay hydrated with oral rehydration solutions to replace lost fluids",
      "Follow a bland diet (BRAT: bananas, rice, applesauce, toast)",
      "Avoid dairy, fatty, and spicy foods until symptoms resolve",
      "Seek medical care if symptoms persist more than 3 days or you see blood in stool",
    ],
  },
  {
    name: "Hypertension",
    symptoms: [
      "Headache",
      "Dizziness",
      "Blurred Vision",
      "Chest Pain",
      "Shortness of Breath",
    ],
    riskLevel: "High",
    description:
      "A condition in which the force of the blood against artery walls is too high. It is often called the silent killer as it may have no symptoms until it causes a heart attack or stroke.",
    recommendations: [
      "Monitor blood pressure regularly and keep a log",
      "Take prescribed antihypertensive medications consistently",
      "Reduce sodium intake and follow a heart-healthy diet",
      "Exercise regularly and reduce stress through relaxation techniques",
    ],
  },
  {
    name: "Diabetes",
    symptoms: [
      "Excessive Thirst",
      "Frequent Urination",
      "Fatigue",
      "Blurred Vision",
      "Slow Healing",
      "Weight Loss",
    ],
    riskLevel: "High",
    description:
      "A chronic condition in which the body cannot properly process blood sugar (glucose). Unmanaged diabetes can lead to serious complications affecting the heart, kidneys, eyes, and nerves.",
    recommendations: [
      "Monitor blood glucose levels regularly as directed by your doctor",
      "Take insulin or other prescribed diabetes medications consistently",
      "Follow a balanced diet low in refined carbohydrates and sugars",
      "Exercise regularly and schedule routine check-ups with your healthcare team",
    ],
  },
  {
    name: "Anxiety Disorder",
    symptoms: [
      "Rapid Heartbeat",
      "Shortness of Breath",
      "Sweating",
      "Trembling",
      "Fatigue",
      "Headache",
      "Dizziness",
    ],
    riskLevel: "Moderate",
    description:
      "A mental health condition characterized by persistent, excessive worry and fear. Physical symptoms can be intense and may mimic other medical conditions.",
    recommendations: [
      "Practice deep breathing and mindfulness techniques",
      "Consult a mental health professional for therapy (CBT is highly effective)",
      "Consider prescribed anti-anxiety medication if therapy alone is insufficient",
      "Limit caffeine and alcohol, maintain regular sleep and exercise routines",
    ],
  },
  {
    name: "Asthma",
    symptoms: ["Shortness of Breath", "Wheezing", "Chest Tightness", "Cough"],
    riskLevel: "High",
    description:
      "A chronic condition involving inflammation and narrowing of the airways, making it difficult to breathe. Attacks can be triggered by allergens, exercise, or respiratory infections.",
    recommendations: [
      "Always carry a rescue inhaler and use it as prescribed during attacks",
      "Take controller medications daily even when symptoms are absent",
      "Identify and avoid asthma triggers such as allergens and smoke",
      "Create an asthma action plan with your doctor for emergencies",
    ],
  },
  {
    name: "Urinary Tract Infection",
    symptoms: [
      "Frequent Urination",
      "Burning Urination",
      "Pelvic Pain",
      "Fever",
      "Lower Back Pain",
    ],
    riskLevel: "Moderate",
    description:
      "An infection in any part of the urinary system including kidneys, ureters, bladder, and urethra. Most infections involve the lower urinary tract and are more common in women.",
    recommendations: [
      "Drink plenty of water to help flush out bacteria",
      "Complete the full course of prescribed antibiotics",
      "Avoid holding urine and urinate after sexual intercourse",
      "Seek immediate care if you develop high fever or back pain indicating kidney involvement",
    ],
  },
  {
    name: "Dengue Fever",
    symptoms: [
      "High Fever",
      "Severe Headache",
      "Body Aches",
      "Rash",
      "Nausea",
      "Fatigue",
    ],
    riskLevel: "High",
    description:
      "A mosquito-borne viral disease that occurs in tropical and subtropical regions. Severe dengue can cause serious illness and death if not managed properly.",
    recommendations: [
      "Seek immediate medical attention for proper diagnosis and monitoring",
      "Rest and maintain adequate hydration with fluids",
      "Use acetaminophen for fever — avoid aspirin and ibuprofen",
      "Monitor for warning signs: severe abdominal pain, persistent vomiting, or bleeding",
    ],
  },
  {
    name: "Malaria",
    symptoms: [
      "Fever",
      "Chills",
      "Sweating",
      "Headache",
      "Nausea",
      "Muscle Pain",
      "Fatigue",
    ],
    riskLevel: "Critical",
    description:
      "A life-threatening disease caused by parasites transmitted through the bites of infected female Anopheles mosquitoes. It is preventable and curable but can be fatal if untreated.",
    recommendations: [
      "Seek emergency medical care immediately — malaria is life-threatening",
      "Begin prescribed antimalarial treatment without delay",
      "Use mosquito nets and insect repellent to prevent re-infection",
      "Complete the full treatment course even after symptoms improve",
    ],
  },
  {
    name: "Tuberculosis",
    symptoms: [
      "Chronic Cough",
      "Coughing Blood",
      "Fever",
      "Night Sweats",
      "Weight Loss",
      "Fatigue",
    ],
    riskLevel: "Critical",
    description:
      "A potentially serious infectious disease that mainly affects the lungs, caused by the bacterium Mycobacterium tuberculosis. It spreads through the air when infected people cough or sneeze.",
    recommendations: [
      "Seek immediate medical attention and get tested for TB",
      "Complete the full 6-9 month antibiotic treatment course without interruption",
      "Isolate from others during the infectious phase to prevent spread",
      "Ensure close contacts are screened and treated if necessary",
    ],
  },
  {
    name: "Appendicitis",
    symptoms: [
      "Abdominal Pain",
      "Nausea",
      "Vomiting",
      "Fever",
      "Loss of Appetite",
    ],
    riskLevel: "Critical",
    description:
      "An inflammation of the appendix that requires immediate surgical intervention. If left untreated, the appendix can rupture, spreading infection throughout the abdomen and becoming life-threatening.",
    recommendations: [
      "Go to the emergency room immediately if appendicitis is suspected",
      "Do not eat, drink, or take pain medications before medical evaluation",
      "Prepare for possible emergency surgery (appendectomy)",
      "Follow post-operative care instructions carefully to prevent infection",
    ],
  },
  {
    name: "Anemia",
    symptoms: [
      "Fatigue",
      "Shortness of Breath",
      "Dizziness",
      "Pale Skin",
      "Rapid Heartbeat",
      "Headache",
    ],
    riskLevel: "Moderate",
    description:
      "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues. It can leave you feeling tired and weak.",
    recommendations: [
      "Eat iron-rich foods such as lean meats, beans, and leafy green vegetables",
      "Take prescribed iron or vitamin supplements as directed",
      "Identify and treat the underlying cause with your doctor",
      "Schedule regular blood tests to monitor hemoglobin levels",
    ],
  },
  {
    name: "Thyroid Disorder",
    symptoms: [
      "Fatigue",
      "Weight Changes",
      "Hair Loss",
      "Rapid Heartbeat",
      "Sweating",
      "Sensitivity to Cold",
    ],
    riskLevel: "Moderate",
    description:
      "A condition affecting the thyroid gland's hormone production. Hypothyroidism (underactive) and hyperthyroidism (overactive) both affect metabolism and overall body function.",
    recommendations: [
      "Get blood tests to measure TSH, T3, and T4 hormone levels",
      "Take prescribed thyroid medications consistently at the same time daily",
      "Avoid iodine-rich foods if hyperthyroid; ensure adequate iodine if hypothyroid",
      "Schedule regular endocrinologist follow-ups to adjust medication dosage",
    ],
  },
  {
    name: "Kidney Stones",
    symptoms: [
      "Severe Back Pain",
      "Abdominal Pain",
      "Nausea",
      "Frequent Urination",
      "Blood in Urine",
      "Fever",
    ],
    riskLevel: "High",
    description:
      "Hard deposits of minerals and salts that form inside the kidneys. They can affect any part of the urinary tract and can be extremely painful when passing.",
    recommendations: [
      "Drink large amounts of water (2-3 liters daily) to help pass small stones",
      "Take prescribed pain medications to manage severe pain",
      "Seek emergency care for fever with chills indicating possible kidney infection",
      "Consult a urologist about dietary changes and preventive measures",
    ],
  },
  {
    name: "Arthritis",
    symptoms: [
      "Joint Pain",
      "Stiffness",
      "Swelling",
      "Reduced Range of Motion",
      "Fatigue",
    ],
    riskLevel: "Moderate",
    description:
      "Inflammation of one or more joints that causes pain and stiffness. There are over 100 types of arthritis, with osteoarthritis and rheumatoid arthritis being the most common.",
    recommendations: [
      "Exercise regularly with low-impact activities like swimming or cycling",
      "Take prescribed anti-inflammatory medications or DMARDs for rheumatoid arthritis",
      "Apply hot or cold packs to affected joints for pain relief",
      "Consult a rheumatologist for specialized treatment planning",
    ],
  },
  {
    name: "Heart Disease",
    symptoms: [
      "Chest Pain",
      "Shortness of Breath",
      "Rapid Heartbeat",
      "Fatigue",
      "Dizziness",
      "Sweating",
    ],
    riskLevel: "Critical",
    description:
      "A range of conditions affecting the heart, including coronary artery disease, arrhythmias, and heart defects. Heart disease is the leading cause of death worldwide.",
    recommendations: [
      "Call emergency services immediately if experiencing chest pain or heart attack symptoms",
      "Take prescribed heart medications consistently and monitor blood pressure",
      "Follow a heart-healthy diet low in saturated fats, sodium, and cholesterol",
      "Exercise regularly, quit smoking, and schedule routine cardiology check-ups",
    ],
  },
  {
    name: "Sinusitis",
    symptoms: [
      "Facial Pain",
      "Nasal Congestion",
      "Headache",
      "Post-nasal Drip",
      "Cough",
      "Fever",
    ],
    riskLevel: "Low",
    description:
      "Inflammation or swelling of the tissue lining the sinuses. When sinuses become blocked and filled with fluid, germs can grow and cause infection.",
    recommendations: [
      "Use saline nasal rinses to clear nasal passages",
      "Apply warm compresses to the face to relieve sinus pressure",
      "Take over-the-counter decongestants and pain relievers",
      "See a doctor if symptoms persist beyond 10 days or are severe",
    ],
  },
  {
    name: "Allergies",
    symptoms: [
      "Sneezing",
      "Runny Nose",
      "Itchy Eyes",
      "Rash",
      "Nasal Congestion",
      "Watery Eyes",
    ],
    riskLevel: "Low",
    description:
      "An immune system reaction to a foreign substance that is not typically harmful to most people. Allergies range from mildly annoying to potentially life-threatening (anaphylaxis).",
    recommendations: [
      "Identify and avoid known allergen triggers",
      "Take prescribed antihistamines or nasal corticosteroids",
      "Consider allergy testing and immunotherapy for long-term relief",
      "Carry an epinephrine auto-injector if you have severe allergies",
    ],
  },
];

export function predictDiseases(
  selectedSymptoms: string[],
): PredictionResult[] {
  if (selectedSymptoms.length === 0) return [];

  return diseases
    .map((disease) => {
      const matched = selectedSymptoms.filter((s) =>
        disease.symptoms.some(
          (ds) =>
            ds.toLowerCase().includes(s.toLowerCase()) ||
            s.toLowerCase().includes(ds.toLowerCase()),
        ),
      );
      const confidence =
        matched.length === 0
          ? 0
          : Math.round(
              (matched.length /
                Math.max(selectedSymptoms.length, disease.symptoms.length)) *
                100,
            );
      return { disease, confidence, matchedSymptoms: matched };
    })
    .filter((r) => r.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}
