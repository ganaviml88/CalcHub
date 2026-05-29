import { useState } from "react";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setDisplay((prev) => prev + " " + op + " ");
  };

  const calculate = () => {
    try {
      let expr = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, String(Math.PI))
        .replace(/e(?![a-z])/g, String(Math.E));
      
      const result = Function('"use strict"; return (' + expr + ")")();
      setDisplay(String(parseFloat(result.toFixed(10))));
    } catch {
      setDisplay("Error");
    }
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    const toRad = angleMode === "deg" ? (v: number) => (v * Math.PI) / 180 : (v: number) => v;
    const fromRad = angleMode === "deg" ? (v: number) => (v * 180) / Math.PI : (v: number) => v;

    switch (func) {
      case "sin":
        result = Math.sin(toRad(value));
        break;
      case "cos":
        result = Math.cos(toRad(value));
        break;
      case "tan":
        result = Math.tan(toRad(value));
        break;
      case "asin":
        result = fromRad(Math.asin(value));
        break;
      case "acos":
        result = fromRad(Math.acos(value));
        break;
      case "atan":
        result = fromRad(Math.atan(value));
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "cbrt":
        result = Math.cbrt(value);
        break;
      case "x²":
        result = value * value;
        break;
      case "x³":
        result = value * value * value;
        break;
      case "1/x":
        result = 1 / value;
        break;
      case "π":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      case "!":
        result = factorial(Math.floor(value));
        break;
      case "exp":
        result = Math.exp(value);
        break;
      default:
        return;
    }

    setDisplay(String(parseFloat(result.toFixed(10))));
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const handleClear = () => setDisplay("0");

  const scientificButtons = [
    [
      { label: "sin", action: "sci" },
      { label: "cos", action: "sci" },
      { label: "tan", action: "sci" },
      { label: "log", action: "sci" },
    ],
    [
      { label: "asin", action: "sci" },
      { label: "acos", action: "sci" },
      { label: "atan", action: "sci" },
      { label: "ln", action: "sci" },
    ],
    [
      { label: "x²", action: "sci" },
      { label: "x³", action: "sci" },
      { label: "sqrt", action: "sci" },
      { label: "cbrt", action: "sci" },
    ],
    [
      { label: "1/x", action: "sci" },
      { label: "π", action: "sci" },
      { label: "e", action: "sci" },
      { label: "!", action: "sci" },
    ],
  ];

  const standardButtons = [
    ["(", ")", "exp", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "AC", "="],
  ];

  return (
    <div className="p-6">
      {/* Angle Mode Toggle */}
      <div className="flex justify-center mb-4">
        <div className="bg-slate-950/50 rounded-full p-1 flex">
          <button
            onClick={() => setAngleMode("deg")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              angleMode === "deg"
                ? "bg-purple-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DEG
          </button>
          <button
            onClick={() => setAngleMode("rad")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              angleMode === "rad"
                ? "bg-purple-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            RAD
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="bg-slate-950/50 rounded-2xl p-5 mb-4 border border-white/5">
        <div className="text-white text-right text-3xl font-light tracking-tight overflow-x-auto font-mono">
          {display}
        </div>
      </div>

      {/* Memory buttons */}
      <div className="flex gap-2 mb-3">
        {[
          { label: "MC", action: () => setMemory(0) },
          { label: "MR", action: () => setDisplay(String(memory)) },
          { label: "M+", action: () => setMemory(memory + parseFloat(display || "0")) },
          { label: "M-", action: () => setMemory(memory - parseFloat(display || "0")) },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="flex-1 py-2 rounded-lg bg-slate-800/50 text-slate-300 text-sm font-medium hover:bg-slate-700/50 transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Scientific buttons */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {scientificButtons.flat().map((btn, index) => (
          <button
            key={index}
            onClick={() => handleScientific(btn.label)}
            className="h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all active:scale-95 text-sm"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Standard buttons */}
      <div className="grid grid-cols-4 gap-2">
        {standardButtons.flat().map((btn, index) => {
          const isOperator = ["÷", "×", "-", "+"].includes(btn);
          const isEquals = btn === "=";
          const isFunction = btn === "AC";

          return (
            <button
              key={index}
              onClick={() => {
                if (btn === "AC") handleClear();
                else if (btn === "=") calculate();
                else if (isOperator) handleOperator(btn);
                else handleNumber(btn);
              }}
              className={`h-14 rounded-xl font-semibold text-lg transition-all active:scale-95 ${
                isEquals
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20"
                  : isOperator
                  ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                  : isFunction
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
