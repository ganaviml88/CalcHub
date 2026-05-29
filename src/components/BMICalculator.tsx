import { useState } from "react";
import { Users, Activity } from "lucide-react";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w) return;

    let bmiValue: number;
    if (unit === "metric") {
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      bmiValue = (w / (h * h)) * 703;
    }

    setBmi(bmiValue);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400", bg: "from-blue-500 to-cyan-500" };
    if (bmi < 25) return { label: "Normal", color: "text-emerald-400", bg: "from-emerald-500 to-teal-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-amber-400", bg: "from-amber-500 to-orange-500" };
    return { label: "Obese", color: "text-red-400", bg: "from-red-500 to-rose-500" };
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
          <Users className="text-indigo-400" size={24} />
        </div>
        BMI Calculator
      </h2>

      {/* Unit Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-950/50 rounded-full p-1 flex">
          <button
            onClick={() => setUnit("metric")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              unit === "metric"
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              unit === "imperial"
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Imperial (lb/in)
          </button>
        </div>
      </div>

      <div className="bg-slate-950/50 rounded-2xl p-6 mb-6 border border-white/5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              {unit === "metric" ? "Height (cm)" : "Height (inches)"}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-900 text-white text-2xl font-semibold border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500/50"
              placeholder={unit === "metric" ? "170" : "67"}
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              {unit === "metric" ? "Weight (kg)" : "Weight (lb)"}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-900 text-white text-2xl font-semibold border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500/50"
              placeholder={unit === "metric" ? "70" : "154"}
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20"
        >
          Calculate BMI
        </button>
      </div>

      {bmi && category && (
        <>
          <div className={`relative overflow-hidden bg-gradient-to-br ${category.bg} rounded-2xl p-8 text-center shadow-lg mb-6`}>
            <div className="absolute inset-0 bg-white/10 opacity-50" />
            <div className="relative">
              <div className="text-6xl font-bold text-white mb-2">{bmi.toFixed(1)}</div>
              <div className="text-white/90 text-xl font-medium">{category.label}</div>
            </div>
          </div>

          {/* BMI Scale */}
          <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Activity size={18} className="text-slate-400" />
              BMI Categories
            </h3>
            <div className="space-y-3">
              {[
                { range: "< 18.5", label: "Underweight", color: "bg-blue-500" },
                { range: "18.5 - 24.9", label: "Normal", color: "bg-emerald-500" },
                { range: "25 - 29.9", label: "Overweight", color: "bg-amber-500" },
                { range: "≥ 30", label: "Obese", color: "bg-red-500" },
              ].map((cat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-slate-400 text-sm w-24">{cat.range}</span>
                  <span className="text-white text-sm">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
