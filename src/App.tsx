import { useState } from "react";
import { Calculator, Clock, Ruler, Percent, DollarSign, Thermometer, Users, Sparkles, Menu, X } from "lucide-react";
import StandardCalculator from "./components/StandardCalculator";
import ScientificCalculator from "./components/ScientificCalculator";
import AgeCalculator from "./components/AgeCalculator";
import UnitConverter from "./components/UnitConverter";
import PercentageCalculator from "./components/PercentageCalculator";
import BMICalculator from "./components/BMICalculator";
import CurrencyConverter from "./components/CurrencyConverter";
import TemperatureConverter from "./components/TemperatureConverter";

const tabs = [
  { id: "standard", label: "Standard", icon: Calculator, color: "from-blue-500 to-cyan-500" },
  { id: "scientific", label: "Scientific", icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { id: "age", label: "Age", icon: Clock, color: "from-emerald-500 to-teal-500" },
  { id: "unit", label: "Units", icon: Ruler, color: "from-orange-500 to-amber-500" },
  { id: "percentage", label: "Percentage", icon: Percent, color: "from-rose-500 to-red-500" },
  { id: "bmi", label: "BMI", icon: Users, color: "from-indigo-500 to-violet-500" },
  { id: "currency", label: "Currency", icon: DollarSign, color: "from-green-500 to-emerald-500" },
  { id: "temperature", label: "Temp", icon: Thermometer, color: "from-cyan-500 to-blue-500" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("standard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeTabData = tabs.find(t => t.id === activeTab);

  const renderCalculator = () => {
    switch (activeTab) {
      case "standard":
        return <StandardCalculator />;
      case "scientific":
        return <ScientificCalculator />;
      case "age":
        return <AgeCalculator />;
      case "unit":
        return <UnitConverter />;
      case "percentage":
        return <PercentageCalculator />;
      case "bmi":
        return <BMICalculator />;
      case "currency":
        return <CurrencyConverter />;
      case "temperature":
        return <TemperatureConverter />;
      default:
        return <StandardCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20">
                <Calculator size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">CalcHub</h1>
                <p className="text-slate-500 text-xs hidden sm:block">All-in-One Calculator Suite</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl opacity-20`} />
                    )}
                    <Icon size={16} className="relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 grid grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-4 py-8">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${activeTabData?.color} opacity-5 blur-3xl rounded-3xl`} />
        
        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Top accent line */}
          <div className={`h-1 bg-gradient-to-r ${activeTabData?.color}`} />
          
          {renderCalculator()}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Calculators</h3>
              <ul className="space-y-2">
                {tabs.slice(0, 4).map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {tab.label} Calculator
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">More Tools</h3>
              <ul className="space-y-2">
                {tabs.slice(4).map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {tab.label} Calculator
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Real-time Calculations</li>
                <li>History Tracking</li>
                <li>Multiple Units</li>
                <li>Mobile Friendly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">About</h3>
              <p className="text-slate-400 text-sm">
                CalcHub is a comprehensive calculator suite designed for everyday calculations. 
                Fast, accurate, and easy to use.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
            <p>© 2024 CalcHub. All calculations are for reference only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
