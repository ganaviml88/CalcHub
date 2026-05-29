import { useState } from "react";
import { unitConversions } from "../utils/calculator";
import { ArrowRightLeft, Ruler } from "lucide-react";

type UnitCategory = "length" | "weight" | "area" | "volume" | "speed" | "time";

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromValue, setFromValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState(0);

  const categories: Record<UnitCategory, { label: string; units: string[]; icon: string }> = {
    length: { label: "Length", units: ["meter", "kilometer", "mile", "yard", "foot", "inch", "centimeter"], icon: "📏" },
    weight: { label: "Weight", units: ["kilogram", "gram", "pound", "ounce", "ton"], icon: "⚖️" },
    area: { label: "Area", units: ["sq meter", "sq kilometer", "sq mile", "sq yard", "sq foot", "acre", "hectare"], icon: "📐" },
    volume: { label: "Volume", units: ["liter", "milliliter", "gallon", "quart", "pint", "cup"], icon: "🧪" },
    speed: { label: "Speed", units: ["m/s", "km/h", "mph", "knot"], icon: "🚀" },
    time: { label: "Time", units: ["second", "minute", "hour", "day", "week", "month", "year"], icon: "⏱️" },
  };

  const handleConvert = () => {
    const value = parseFloat(fromValue) || 0;
    const converted = unitConversions(category, value, fromUnit, toUnit);
    setResult(converted);
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    setFromUnit(categories[newCategory].units[0]);
    setToUnit(categories[newCategory].units[1]);
    setFromValue("1");
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    handleConvert();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20">
          <Ruler className="text-orange-400" size={24} />
        </div>
        Unit Converter
      </h2>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(categories) as UnitCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              category === cat
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <span>{categories[cat].icon}</span>
            <span>{categories[cat].label}</span>
          </button>
        ))}
      </div>

      {/* Converter */}
      <div className="space-y-4">
        {/* From */}
        <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5">
          <label className="block text-slate-400 mb-2 text-sm font-medium">From</label>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="w-full bg-slate-900 text-white text-3xl font-bold border-none outline-none mb-3"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full bg-slate-800 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50"
          >
            {categories[category].units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 hover:scale-110 transition-transform"
          >
            <ArrowRightLeft size={24} />
          </button>
        </div>

        {/* To */}
        <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5">
          <label className="block text-slate-400 mb-2 text-sm font-medium">To</label>
          <div className="text-3xl font-bold text-emerald-400 mb-3">
            {result.toFixed(6).replace(/\.?0+$/, "")}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full bg-slate-800 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50"
          >
            {categories[category].units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
        >
          Convert
        </button>
      </div>
    </div>
  );
}
