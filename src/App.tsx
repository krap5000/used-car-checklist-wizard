// Used Car Checklist Wizard – minimal working wizard (Vehicle Info → First Call → Summary)
// Tailwind is already configured. This file compiles on Vercel (no unused React import).

import { useMemo, useState } from "react";

type VehicleInfo = {
  make: string;
  model: string;
  year: string;
  vin: string;
  odometer: string;
  askingPrice: string;
  sellerName: string;
  phone: string;
  cityState: string;
  listingUrl: string;
};

type FirstCallAnswer = { id: string; question: string; expected?: string; answer: string };

// TODO: Add the rest of the First Call questions verbatim from your Excel.
// For now, this includes the one you called out specifically.
const FIRST_CALL_QUESTIONS: Array<{ id: string; question: string; expected?: string }> = [
  {
    id: "emissions_and_registration",
    // verbatim per your sheet
    question:
      "Ask When was the emission testing done when is the registration (if not in the ad)."
  }
];

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function download(filename: string, data: string, mime = "text/plain;charset=utf-8") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: mime }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}

function toCSV(rows: string[][]) {
  const esc = (s: string) => {
    const v = s ?? "";
    return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  };
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

export default function App() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [vehicle, setVehicle] = useState<VehicleInfo>({
    make: "",
    model: "",
    year: "",
    vin: "",
    odometer: "",
    askingPrice: "",
    sellerName: "",
    phone: "",
    cityState: "",
    listingUrl: ""
  });
  const [answers, setAnswers] = useState<Record<string, FirstCallAnswer>>({});

  const firstCallList: FirstCallAnswer[] = useMemo(
    () =>
      FIRST_CALL_QUESTIONS.map((q) => ({
        id: q.id,
        question: q.question,
        expected: q.expected,
        answer: answers[q.id]?.answer ?? ""
      })),
    [answers]
  );

  const onVehicle = (k: keyof VehicleInfo, v: string) =>
    setVehicle((prev) => ({ ...prev, [k]: v }));

  const setAnswer = (id: string, question: string, expected: string | undefined, answer: string) =>
    setAnswers((prev) => ({ ...prev, [id]: { id, question, expected, answer } }));

  const nav = (
    <div className="flex items-center gap-2">
      <button
        className={classNames(
          "rounded-lg px-4 py-2 border",
          step === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
        )}
        disabled={step === 0}
        onClick={() => setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)))}
      >
        Back
      </button>
      <button
        className={classNames(
          "rounded-lg px-4 py-2 text-white",
          step < 2 ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
        )}
        onClick={() => setStep((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : s))}
      >
        {step < 2 ? "Next" : "Finish"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Steps */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Used Car Checklist Wizard</h1>
          <div className="flex gap-2 text-sm">
            <StepBadge label="Vehicle Info" active={step === 0} done={step > 0} />
            <StepBadge label="First Call to Seller" active={step === 1} done={step > 1} />
            <StepBadge label="Summary" active={step === 2} />
          </div>
          {nav}
        </div>
      </header>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {step === 0 && (
          <section className="bg-white rounded-2xl border p-5 space-y-4">
            <h2 className="text-base font-semibold mb-1">Vehicle Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label="Make" value={vehicle.make} onChange={(v) => onVehicle("make", v)} />
              <TextInput label="Model" value={vehicle.model} onChange={(v) => onVehicle("model", v)} />
              <TextInput label="Year" value={vehicle.year} onChange={(v) => onVehicle("year", v)} />
              <TextInput label="VIN" value={vehicle.vin} onChange={(v) => onVehicle("vin", v)} />
              <TextInput label="Odometer" value={vehicle.odometer} onChange={(v) => onVehicle("odometer", v)} />
              <TextInput label="Asking Price" value={vehicle.askingPrice} onChange={(v) => onVehicle("askingPrice", v)} />
              <TextInput label="Seller Name" value={vehicle.sellerName} onChange={(v) => onVehicle("sellerName", v)} />
              <TextInput label="Phone" value={vehicle.phone} onChange={(v) => onVehicle("phone", v)} />
              <TextInput label="City / State" value={vehicle.cityState} onChange={(v) => onVehicle("cityState", v)} />
              <TextInput label="Listing URL" value={vehicle.listingUrl} onChange={(v) => onVehicle("listingUrl", v)} />
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="bg-white rounded-2xl border p-5 space-y-5">
            <h2 className="text-base font-semibold">First Call to Seller</h2>
            {firstCallList.map((q) => (
              <div key={q.id} className="rounded-xl border p-4">
                <div className="font-medium">{q.question}</div>
                {q.expected && (
                  <div className="text-xs text-gray-500 mt-1">
                    Expected / reference answer: {q.expected}
                  </div>
                )}
                <textarea
                  className="mt-3 w-full min-h-[90px] rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type the seller's answer here…"
                  value={q.answer}
                  onChange={(e) => setAnswer(q.id, q.question, q.expected, e.target.value)}
                />
              </div>
            ))}
          </section>
        )}

        {step === 2 && (
          <section className="bg-white rounded-2xl border p-5 space-y-4">
            <h2 className="text-base font-semibold">Summary</h2>

            {/* Vehicle Info Summary */}
            <div className="rounded-xl border bg-gray-50 p-4">
              <h3 className="font-medium mb-2">Vehicle</h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {Object.entries(vehicle).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-gray-600">{labelize(k)}:</span>
                    <span className="font-medium break-all">{v || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* First Call Answers */}
            <div className="rounded-xl border bg-gray-50 p-4">
              <h3 className="font-medium mb-2">First Call to Seller</h3>
              <ol className="space-y-3 list-decimal pl-5">
                {firstCallList.map((a, idx) => (
                  <li key={a.id} className="text-sm">
                    <div className="font-medium">{a.question}</div>
                    {a.expected && <div className="text-gray-600">Expected: {a.expected}</div>}
                    <div className="mt-1">
                      <span className="text-gray-600">Answer: </span>
                      <span className="font-medium break-words whitespace-pre-wrap">{a.answer || "—"}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Downloads */}
            <div className="flex items-center gap-3">
              <button
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
                onClick={() => {
                  const payload = { vehicle, firstCall: firstCallList };
                  download(
                    `used-car-first-call-${new Date().toISOString().slice(0, 19)}.json`,
                    JSON.stringify(payload, null, 2),
                    "application/json;charset=utf-8"
                  );
                }}
              >
                Download JSON
              </button>

              <button
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
                onClick={() => {
                  const rows: string[][] = [];
                  rows.push(["Section", "Field", "Value"]);
                  Object.entries(vehicle).forEach(([k, v]) => rows.push(["Vehicle", labelize(k), v]));
                  firstCallList.forEach((a, i) => {
                    rows.push(["First Call", `Q${i + 1}: ${a.question}`, a.answer || ""]);
                  });
                  download(
                    `used-car-first-call-${new Date().toISOString().slice(0, 19)}.csv`,
                    toCSV(rows),
                    "text/csv;charset=utf-8"
                  );
                }}
              >
                Download CSV
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function StepBadge({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <div
      className={classNames(
        "px-2 py-1 rounded-full border text-xs",
        active && "bg-blue-600 text-white border-blue-600",
        !active && done && "bg-green-50 text-green-800 border-green-200",
        !active && !done && "bg-gray-50 text-gray-700 border-gray-200"
      )}
    >
      {label}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <input
        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
