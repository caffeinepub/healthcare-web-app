import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Cross,
  Database,
  Send,
  Shield,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { type PredictionResult, predictDiseases } from "./data/diseaseDataset";
import { useActor } from "./hooks/useActor";

const SYMPTOMS = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Nausea",
  "Sore Throat",
  "Shortness of Breath",
  "Body Aches",
  "Runny Nose",
  "Sneezing",
  "Chills",
  "Dizziness",
  "Chest Pain",
  "Vomiting",
  "Diarrhea",
  "Abdominal Pain",
  "Joint Pain",
  "Rash",
  "Loss of Taste",
  "Loss of Smell",
  "Sweating",
  "Blurred Vision",
  "Rapid Heartbeat",
  "Wheezing",
  "Night Sweats",
  "Weight Loss",
  "Hair Loss",
  "Swelling",
  "Pale Skin",
  "Sensitivity to Light",
];

const RISK_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Low: { bg: "#f0fdf4", text: "#16a34a", border: "#16a34a" },
  Moderate: { bg: "#fffbeb", text: "#d97706", border: "#d97706" },
  High: { bg: "#fff7ed", text: "#ea580c", border: "#ea580c" },
  Critical: { bg: "#fef2f2", text: "#dc2626", border: "#dc2626" },
};

const RISK_COLORS_HC: Record<string, string> = {
  Low: "#4ade80",
  Moderate: "#facc15",
  High: "#fb923c",
  Critical: "#f87171",
};

function generateUniqueId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `USER-2026-${digits}`;
}

export default function App() {
  const { actor } = useActor();
  const [highContrast, setHighContrast] = useState(false);

  // Symptom Checker
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Booking
  const [bookingName, setBookingName] = useState("");
  const [bookingAge, setBookingAge] = useState("");
  const [bookingResult, setBookingResult] = useState<{
    uniqueId: string;
    isPriority: boolean;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Chat widget
  const [chatOpen, setChatOpen] = useState(true);

  const symptomRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    );
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setPredictions([]);
    setHasAnalyzed(false);
    setTimeout(() => {
      const allSymptoms = [
        ...selectedSymptoms,
        ...(customSymptom.trim() ? [customSymptom.trim()] : []),
      ];
      const results = predictDiseases(allSymptoms);
      setPredictions(results);
      setHasAnalyzed(true);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");
    if (!bookingName.trim()) {
      setBookingError("Please enter your name.");
      return;
    }
    const ageNum = Number.parseInt(bookingAge, 10);
    if (!bookingAge || Number.isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      setBookingError("Please enter a valid age (0\u2013120).");
      return;
    }

    setIsSubmitting(true);
    const uniqueId = generateUniqueId();
    const isPriority = ageNum < 5 || ageNum > 65;

    try {
      if (actor) {
        await actor.addAppointment({
          name: bookingName.trim(),
          age: BigInt(ageNum),
          uniqueId,
          isPriority,
          timestamp: BigInt(Date.now()),
        });
      }
    } catch {
      // backend optional — continue with local state
    } finally {
      setIsSubmitting(false);
      setBookingResult({ uniqueId, isPriority, name: bookingName.trim() });
    }
  };

  const hc = highContrast;

  return (
    <div className={hc ? "high-contrast" : ""} style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: hc
            ? "#000000"
            : "linear-gradient(90deg, #1a91d1 0%, #0284c7 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ background: hc ? "#FFE600" : "rgba(255,255,255,0.2)" }}
            >
              <Cross size={18} style={{ color: hc ? "#000" : "#22c55e" }} />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ color: hc ? "#FFE600" : "#ffffff" }}
            >
              MediCare Connect
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              {
                label: "Home",
                action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                ocid: "nav.home.link",
              },
              {
                label: "Symptom Checker",
                action: () => scrollTo(symptomRef),
                ocid: "nav.symptom_checker.link",
              },
              {
                label: "Book Appointment",
                action: () => scrollTo(bookingRef),
                ocid: "nav.book_appointment.link",
              },
            ].map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={link.action}
                data-ocid={link.ocid}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{
                  color: hc ? "#FFE600" : "#ffffff",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* High Contrast Toggle */}
          <button
            type="button"
            data-ocid="accessibility.high_contrast.toggle"
            onClick={() => setHighContrast((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all"
            style={{
              background: hc ? "#FFE600" : "transparent",
              color: hc ? "#000000" : "#ffffff",
              borderColor: hc ? "#FFE600" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          >
            <Shield size={14} />
            {hc ? "Disable High Contrast" : "Enable High Contrast"}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        className="hc-hero"
        style={{
          background: hc
            ? "#000000"
            : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 60%, #bae6fd 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: hc ? "#222" : "#bae6fd",
                color: hc ? "#FFE600" : "#0369a1",
              }}
            >
              <Activity size={12} />
              AI-Powered Healthcare Platform
            </div>
            <h1
              className="font-extrabold leading-tight"
              style={{
                color: hc ? "#FFE600" : "#0c4a6e",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
              }}
            >
              Your Health,{" "}
              <span style={{ color: hc ? "#FFE600" : "#0284c7" }}>
                Our Priority
              </span>
            </h1>
            <p
              className="text-lg max-w-lg"
              style={{ color: hc ? "#FFE600" : "#0e7490", lineHeight: 1.7 }}
            >
              Advanced AI-powered healthcare tools at your fingertips. Check
              symptoms, book appointments, and get priority care when you need
              it most.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                data-ocid="hero.symptom_checker.primary_button"
                size="lg"
                onClick={() => scrollTo(symptomRef)}
                className="font-semibold px-8"
                style={{
                  background: hc ? "#FFE600" : "#0284c7",
                  color: hc ? "#000" : "#fff",
                }}
              >
                Get Started
              </Button>
              <Button
                data-ocid="hero.book_appointment.secondary_button"
                variant="outline"
                size="lg"
                onClick={() => scrollTo(bookingRef)}
                className="font-semibold px-8"
                style={{
                  borderColor: hc ? "#FFE600" : "#0284c7",
                  color: hc ? "#FFE600" : "#0284c7",
                  background: "transparent",
                }}
              >
                Book Appointment
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-2">
              {[
                { icon: <Shield size={16} />, stat: "99.9%", label: "Uptime" },
                {
                  icon: <Clock size={16} />,
                  stat: "< 2 min",
                  label: "Response",
                },
                {
                  icon: <CheckCircle size={16} />,
                  stat: "50k+",
                  label: "Patients",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span style={{ color: hc ? "#FFE600" : "#0284c7" }}>
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
                    >
                      {item.stat}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: hc ? "#FFE600" : "#6B7280" }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="relative rounded-3xl p-8 flex flex-col items-center gap-6"
              style={{
                background: hc
                  ? "#111"
                  : "linear-gradient(145deg, #ffffff, #e0f2fe)",
                boxShadow: hc ? "none" : "0 20px 60px rgba(2,132,199,0.15)",
                width: 340,
              }}
            >
              <div
                className="flex items-center justify-center w-24 h-24 rounded-full"
                style={{ background: hc ? "#FFE600" : "#0284c7" }}
              >
                <Cross size={44} style={{ color: hc ? "#000" : "#22c55e" }} />
              </div>
              <p
                className="text-center font-semibold text-base"
                style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
              >
                Trusted Medical Care
              </p>
              <p
                className="text-center text-sm"
                style={{ color: hc ? "#FFE600" : "#6B7280" }}
              >
                Board-certified physicians and AI-powered diagnosis tools
                available 24/7.
              </p>
              {["Symptom Analysis", "Smart Scheduling", "Priority Triage"].map(
                (feat) => (
                  <div key={feat} className="flex items-center gap-2 w-full">
                    <CheckCircle
                      size={14}
                      style={{ color: hc ? "#FFE600" : "#0284c7" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: hc ? "#FFE600" : "#374151" }}
                    >
                      {feat}
                    </span>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SYMPTOM CHECKER */}
      <section
        id="symptom-checker"
        ref={symptomRef}
        className="py-20 px-4"
        style={{ background: hc ? "#000" : "#ffffff" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Stethoscope
                size={28}
                style={{ color: hc ? "#FFE600" : "#0284c7" }}
              />
              <h2
                className="text-3xl font-bold"
                style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
              >
                AI Disease Prediction
              </h2>
            </div>
            <p
              className="text-base"
              style={{ color: hc ? "#FFE600" : "#6B7280" }}
            >
              Select your symptoms for an evidence-based disease prediction
              powered by our medical dataset.
            </p>
          </motion.div>

          {/* Dataset Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8 flex-wrap"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: hc ? "#222" : "#e0f2fe",
                color: hc ? "#FFE600" : "#0369a1",
                border: hc ? "1px solid #FFE600" : "1px solid #7dd3fc",
              }}
            >
              <Database size={14} />
              22+ diseases tracked
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: hc ? "#222" : "#e0f2fe",
                color: hc ? "#FFE600" : "#0369a1",
                border: hc ? "1px solid #FFE600" : "1px solid #7dd3fc",
              }}
            >
              <Activity size={14} />
              30+ symptoms analyzed
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: hc ? "#222" : "#e0f2fe",
                color: hc ? "#FFE600" : "#0369a1",
                border: hc ? "1px solid #FFE600" : "1px solid #7dd3fc",
              }}
            >
              <CheckCircle size={14} />
              Evidence-based recommendations
            </div>
          </motion.div>

          <Card
            className="hc-card shadow-lg"
            style={{ border: hc ? "2px solid #FFE600" : "1px solid #bae6fd" }}
          >
            <CardContent className="p-8">
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: hc ? "#FFE600" : "#374151" }}
              >
                Select All Symptoms You Are Experiencing
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {SYMPTOMS.map((symptom) => (
                  <div key={symptom} className="flex items-center gap-2">
                    <Checkbox
                      id={`symptom-${symptom}`}
                      data-ocid={`symptom.${symptom.toLowerCase().replace(/ /g, "_")}.checkbox`}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => toggleSymptom(symptom)}
                    />
                    <Label
                      htmlFor={`symptom-${symptom}`}
                      className="text-sm cursor-pointer"
                      style={{ color: hc ? "#FFE600" : "#374151" }}
                    >
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <Label
                  htmlFor="custom-symptom"
                  className="text-sm font-semibold mb-2 block"
                  style={{ color: hc ? "#FFE600" : "#374151" }}
                >
                  Describe additional symptoms
                </Label>
                <Input
                  id="custom-symptom"
                  data-ocid="symptom.custom.input"
                  placeholder="e.g., chest pain, dizziness..."
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  className="border-2"
                  style={{
                    borderColor: hc ? "#FFE600" : "#bae6fd",
                    background: hc ? "#111" : "#fff",
                    color: hc ? "#FFE600" : "#111827",
                  }}
                />
              </div>

              <Button
                data-ocid="symptom.analyze.primary_button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3 font-semibold text-base"
                style={{
                  background: hc ? "#FFE600" : "#0284c7",
                  color: hc ? "#000" : "#fff",
                }}
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Activity size={16} className="animate-spin" />
                    Analyzing with Medical Dataset...
                  </span>
                ) : (
                  "Predict Disease"
                )}
              </Button>

              {/* PREDICTION RESULTS */}
              <AnimatePresence>
                {hasAnalyzed && (
                  <motion.div
                    data-ocid="symptom.result.success_state"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8"
                  >
                    {/* Results Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
                      >
                        Prediction Results
                      </h3>
                    </div>
                    <p
                      className="text-sm mb-4"
                      style={{ color: hc ? "#FFE600" : "#6B7280" }}
                    >
                      Based on medical dataset analysis
                    </p>

                    {predictions.length === 0 ? (
                      <div
                        className="rounded-xl p-6 text-center border-2"
                        style={{
                          background: hc ? "#111" : "#f9fafb",
                          borderColor: hc ? "#FFE600" : "#bae6fd",
                        }}
                      >
                        <p
                          className="font-semibold mb-1"
                          style={{ color: hc ? "#FFE600" : "#374151" }}
                        >
                          No strong matches found.
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: hc ? "#FFE600" : "#6B7280" }}
                        >
                          Please describe more symptoms or consult a doctor for
                          a proper diagnosis.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {predictions.map((result, idx) => {
                          const riskColor =
                            RISK_COLORS[result.disease.riskLevel];
                          const riskColorHc =
                            RISK_COLORS_HC[result.disease.riskLevel];
                          return (
                            <motion.div
                              key={result.disease.name}
                              data-ocid={`symptom.prediction.item.${idx + 1}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.35 }}
                              className="rounded-xl p-5 border-2"
                              style={{
                                background: hc ? "#111" : riskColor.bg,
                                borderColor: hc
                                  ? riskColorHc
                                  : riskColor.border,
                              }}
                            >
                              {/* Disease name + Risk badge */}
                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <h4
                                  className="text-lg font-bold"
                                  style={{ color: hc ? "#FFE600" : "#111827" }}
                                >
                                  {result.disease.name}
                                </h4>
                                <Badge
                                  className="text-xs font-bold px-2.5 py-0.5"
                                  style={{
                                    background: hc ? "#222" : riskColor.bg,
                                    color: hc ? riskColorHc : riskColor.text,
                                    border: `1.5px solid ${hc ? riskColorHc : riskColor.border}`,
                                  }}
                                >
                                  {result.disease.riskLevel} Risk
                                </Badge>
                              </div>

                              {/* Confidence bar */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span
                                    className="text-xs font-semibold"
                                    style={{
                                      color: hc ? "#FFE600" : "#6B7280",
                                    }}
                                  >
                                    Match Confidence
                                  </span>
                                  <span
                                    className="text-sm font-bold"
                                    style={{
                                      color: hc ? "#FFE600" : riskColor.text,
                                    }}
                                  >
                                    {result.confidence}% match
                                  </span>
                                </div>
                                <div
                                  className="w-full rounded-full h-2.5"
                                  style={{
                                    background: hc ? "#333" : "#e5e7eb",
                                  }}
                                >
                                  <motion.div
                                    className="h-2.5 rounded-full"
                                    style={{
                                      background: hc
                                        ? riskColorHc
                                        : riskColor.border,
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.confidence}%` }}
                                    transition={{
                                      duration: 0.7,
                                      delay: idx * 0.1 + 0.2,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Matched symptoms pills */}
                              <div className="mb-3">
                                <p
                                  className="text-xs font-semibold mb-1.5"
                                  style={{ color: hc ? "#FFE600" : "#6B7280" }}
                                >
                                  Matched symptoms:
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {result.matchedSymptoms.map((s) => (
                                    <span
                                      key={s}
                                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                                      style={{
                                        background: hc ? "#333" : "#ffffff",
                                        color: hc
                                          ? riskColorHc
                                          : riskColor.text,
                                        border: `1px solid ${hc ? riskColorHc : riskColor.border}`,
                                      }}
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Description */}
                              <p
                                className="text-sm mb-3 leading-relaxed"
                                style={{ color: hc ? "#FFE600" : "#4B5563" }}
                              >
                                {result.disease.description}
                              </p>

                              {/* Recommendations */}
                              <div>
                                <p
                                  className="text-xs font-bold mb-1.5 uppercase tracking-wide"
                                  style={{
                                    color: hc ? "#FFE600" : riskColor.text,
                                  }}
                                >
                                  Recommended Actions:
                                </p>
                                <ul className="space-y-1">
                                  {result.disease.recommendations.map((rec) => (
                                    <li
                                      key={rec}
                                      className="flex items-start gap-2 text-sm"
                                      style={{
                                        color: hc ? "#FFE600" : "#374151",
                                      }}
                                    >
                                      <span
                                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                                        style={{
                                          background: hc
                                            ? riskColorHc
                                            : riskColor.border,
                                        }}
                                      />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          );
                        })}

                        {/* Disclaimer */}
                        <div
                          className="rounded-xl p-4 border flex items-start gap-2"
                          style={{
                            background: hc ? "#111" : "#fffbeb",
                            borderColor: hc ? "#FFE600" : "#f59e0b",
                          }}
                        >
                          <AlertTriangle
                            size={16}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: hc ? "#FFE600" : "#d97706" }}
                          />
                          <p
                            className="text-sm"
                            style={{ color: hc ? "#FFE600" : "#92400e" }}
                          >
                            <strong>Disclaimer:</strong> This is a simulation
                            only and does not constitute medical advice.
                            Predictions are based on symptom pattern matching
                            and should not replace professional diagnosis.
                            Please consult a qualified healthcare professional
                            for proper diagnosis and treatment.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section
        id="book-appointment"
        ref={bookingRef}
        className="py-20 px-4"
        style={{ background: hc ? "#000" : "#e0f2fe" }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar
                size={28}
                style={{ color: hc ? "#FFE600" : "#0284c7" }}
              />
              <h2
                className="text-3xl font-bold"
                style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
              >
                Schedule an Appointment
              </h2>
            </div>
            <p
              className="text-base"
              style={{ color: hc ? "#FFE600" : "#6B7280" }}
            >
              Book your visit. Priority care available for children under 5 and
              adults over 65.
            </p>
          </motion.div>

          <Card
            className="hc-card shadow-lg"
            style={{ border: hc ? "2px solid #FFE600" : "1px solid #bae6fd" }}
          >
            <CardContent className="p-8">
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="booking-name"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: hc ? "#FFE600" : "#374151" }}
                  >
                    Full Name
                  </Label>
                  <Input
                    id="booking-name"
                    data-ocid="booking.name.input"
                    placeholder="Enter your full name"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="border-2"
                    style={{
                      borderColor: hc ? "#FFE600" : "#bae6fd",
                      background: hc ? "#111" : "#fff",
                      color: hc ? "#FFE600" : "#111827",
                    }}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="booking-age"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: hc ? "#FFE600" : "#374151" }}
                  >
                    Age
                  </Label>
                  <Input
                    id="booking-age"
                    data-ocid="booking.age.input"
                    type="number"
                    placeholder="Enter your age"
                    value={bookingAge}
                    onChange={(e) => setBookingAge(e.target.value)}
                    min={0}
                    max={120}
                    className="border-2"
                    style={{
                      borderColor: hc ? "#FFE600" : "#bae6fd",
                      background: hc ? "#111" : "#fff",
                      color: hc ? "#FFE600" : "#111827",
                    }}
                  />
                </div>

                {bookingError && (
                  <p
                    data-ocid="booking.error_state"
                    className="text-sm font-medium"
                    style={{ color: hc ? "#FFE600" : "#dc2626" }}
                  >
                    {bookingError}
                  </p>
                )}

                <Button
                  type="submit"
                  data-ocid="booking.submit.primary_button"
                  disabled={isSubmitting}
                  className="w-full py-3 font-semibold text-base"
                  style={{
                    background: hc ? "#FFE600" : "#0284c7",
                    color: hc ? "#000" : "#fff",
                  }}
                >
                  {isSubmitting ? "Booking..." : "Confirm Appointment"}
                </Button>
              </form>

              <AnimatePresence>
                {bookingResult && (
                  <motion.div
                    data-ocid="booking.result.success_state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 rounded-xl p-6 border-2"
                    style={{
                      background: hc ? "#111" : "#f0f9ff",
                      borderColor: hc ? "#FFE600" : "#0284c7",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <CheckCircle
                        size={20}
                        style={{ color: hc ? "#FFE600" : "#0284c7" }}
                      />
                      <p
                        className="font-bold text-lg"
                        style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
                      >
                        {bookingResult.name}
                      </p>
                      {bookingResult.isPriority && (
                        <Badge
                          data-ocid="booking.priority.badge"
                          className="font-bold text-xs px-3 py-1"
                          style={{
                            background: "#F2C94C",
                            color: "#7a4f00",
                            border: "none",
                          }}
                        >
                          \u2b50 Priority Booking
                        </Badge>
                      )}
                    </div>

                    <div
                      className="rounded-lg p-4 mb-3 text-center"
                      style={{ background: hc ? "#222" : "#e0f2fe" }}
                    >
                      <p
                        className="text-xs font-semibold mb-1"
                        style={{ color: hc ? "#FFE600" : "#6B7280" }}
                      >
                        YOUR UNIQUE BOOKING ID
                      </p>
                      <p
                        className="text-2xl font-extrabold tracking-widest"
                        style={{ color: hc ? "#FFE600" : "#0284c7" }}
                      >
                        {bookingResult.uniqueId}
                      </p>
                    </div>

                    <p
                      className="text-sm text-center"
                      style={{ color: hc ? "#FFE600" : "#6B7280" }}
                    >
                      Keep this ID for your records. Our team will contact you
                      shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 px-4"
        style={{ background: hc ? "#000" : "#1a91d1" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cross size={16} style={{ color: hc ? "#FFE600" : "#22c55e" }} />
            <span
              className="font-bold"
              style={{ color: hc ? "#FFE600" : "#ffffff" }}
            >
              MediCare Connect
            </span>
          </div>
          <p className="text-sm" style={{ color: hc ? "#FFE600" : "#e0f2fe" }}>
            \u00a9 {new Date().getFullYear()} MediCare Connect. All rights
            reserved.
          </p>
          <p className="text-xs" style={{ color: hc ? "#FFE600" : "#bae6fd" }}>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              style={{ color: hc ? "#FFE600" : "#bae6fd" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* FLOATING CHAT WIDGET */}
      <div
        className="chat-widget fixed bottom-5 right-5 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          border: hc ? "2px solid #FFE600" : "1px solid #7dd3fc",
          background: hc ? "#111" : "#ffffff",
        }}
      >
        {/* Chat Header */}
        <div
          className="chat-header flex items-center justify-between px-4 py-3"
          style={{ background: hc ? "#222" : "#e0f2fe" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full"
              style={{ background: hc ? "#FFE600" : "#0284c7" }}
            >
              <Activity size={14} style={{ color: hc ? "#000" : "#fff" }} />
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: hc ? "#FFE600" : "#0c4a6e" }}
            >
              AI Health Assistant
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: hc ? "#333" : "#0284c7",
                color: hc ? "#FFE600" : "#fff",
              }}
            >
              Beta
            </span>
          </div>
          <button
            type="button"
            data-ocid="chat.toggle.button"
            onClick={() => setChatOpen((v) => !v)}
            className="rounded-full p-1 hover:opacity-70 transition-opacity"
            style={{
              color: hc ? "#FFE600" : "#0284c7",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={chatOpen ? "Minimize chat" : "Expand chat"}
          >
            {chatOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {/* Chat Body */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="p-4 space-y-3">
                <div
                  className="rounded-xl p-3 text-sm"
                  style={{
                    background: hc ? "#222" : "#f0f9ff",
                    border: hc ? "1px solid #FFE600" : "1px solid #7dd3fc",
                    color: hc ? "#FFE600" : "#374151",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                      style={{ background: hc ? "#333" : "#e0f2fe" }}
                    >
                      <X
                        size={10}
                        style={{ color: hc ? "#FFE600" : "#0284c7" }}
                      />
                    </div>
                    <p style={{ lineHeight: 1.6 }}>
                      This feature will be available in the future. Stay tuned
                      for AI-powered health guidance!
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    data-ocid="chat.message.input"
                    disabled
                    placeholder="Feature coming soon..."
                    className="text-sm flex-1"
                    style={{
                      background: hc ? "#222" : "#f0f9ff",
                      borderColor: hc ? "#555" : "#7dd3fc",
                      color: hc ? "#666" : "#9CA3AF",
                      cursor: "not-allowed",
                    }}
                  />
                  <Button
                    data-ocid="chat.send.button"
                    disabled
                    size="icon"
                    className="flex-shrink-0"
                    style={{
                      background: hc ? "#333" : "#e0f2fe",
                      color: hc ? "#555" : "#9CA3AF",
                      cursor: "not-allowed",
                    }}
                  >
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
