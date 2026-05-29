import { useState } from "react";
import { calculateAge } from "../utils/calculator";
import { Calendar, Gift, Clock } from "lucide-react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    const result = calculateAge(birthDate);
    setAge(result);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
          <Calendar className="text-emerald-400" size={24} />
        </div>
        Age Calculator
      </h2>

      <div className="bg-slate-950/50 rounded-2xl p-6 mb-6 border border-white/5">
        <label className="block text-slate-400 mb-3 font-medium">
          Enter your birth date
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full bg-slate-900 text-white border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
        />
        <button
          onClick={handleCalculate}
          className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all active:scale-98 shadow-lg shadow-emerald-500/20"
        >
          Calculate Age
        </button>
      </div>

      {age && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-center shadow-lg shadow-emerald-500/20">
              <div className="absolute inset-0 bg-white/10 opacity-50" />
              <div className="relative">
                <div className="text-6xl font-bold text-white mb-2">{age.years}</div>
                <div className="text-emerald-100 font-medium text-lg">Years</div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center shadow-lg shadow-blue-500/20">
              <div className="absolute inset-0 bg-white/10 opacity-50" />
              <div className="relative">
                <div className="text-6xl font-bold text-white mb-2">{age.months}</div>
                <div className="text-blue-100 font-medium text-lg">Months</div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-center shadow-lg shadow-purple-500/20">
              <div className="absolute inset-0 bg-white/10 opacity-50" />
              <div className="relative">
                <div className="text-6xl font-bold text-white mb-2">{age.days}</div>
                <div className="text-purple-100 font-medium text-lg">Days</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Days", value: age.totalDays.toLocaleString(), icon: Clock },
              { label: "Total Weeks", value: age.totalWeeks.toLocaleString(), icon: Clock },
              { label: "Total Months", value: age.totalMonths, icon: Clock },
              { label: "Days to Birthday", value: age.nextBirthday, icon: Gift },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-950/50 rounded-xl p-4 text-center border border-white/5">
                <stat.icon size={20} className="mx-auto mb-2 text-slate-500" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Next Birthday Card */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-5 border border-pink-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-pink-500/20">
                <Gift className="text-pink-400" size={24} />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">
                  {age.nextBirthday === 0
                    ? "🎉 Happy Birthday!"
                    : `${age.nextBirthday} days until your next birthday`}
                </div>
                <div className="text-slate-400 text-sm">
                  {age.nextBirthday > 0 && "Start planning your celebration!"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
