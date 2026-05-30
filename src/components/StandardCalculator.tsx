import { useState } from "react";
import { calculateExpression } from "../utils/calculator";

export default function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState<{ eq: string; result: string }[]>([]);

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleEquals = () => {
    const fullEquation = equation + display;
    try {
      const result = calculateExpression(fullEquation);
      setHistory((prev) => [...prev.slice(-4), { eq: fullEquation, result: String(result) }]);
      setDisplay(String(result));
      setEquation("");
    } catch {
      setDisplay("Error");
      setEquation("");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleNegate = () => {
    setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
  };

  const buttons = [
    [
      { label: "AC", action: "clear", style: "bg-red-500/20 text-red-400 hover:bg-red-500/30" },
      { label: "⌫", action: "backspace", style: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30" },
      { label: "%", action: "percent", style: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" },
      { label: "÷", action: "operator", op: "/", style: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
    ],
    [
      { label: "7", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "8", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "9", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "×", action: "operator", op: "*", style: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
    ],
    [
      { label: "4", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "5", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "6", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "-", action: "operator", op: "-", style: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
    ],
    [
      { label: "1", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "2", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "3", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "+", action: "operator", op: "+", style: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
    ],
    [
      { label: "±", action: "negate", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "0", action: "number", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: ".", action: "decimal", style: "bg-white/5 text-white hover:bg-white/10" },
      { label: "=", action: "equals", style: "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-emerald-500/20" },
    ],
  ];

  return (
    <div className="p-6">
      {/* History */}
      {history.length > 0 && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {history.map((h, i) => (
            <button
              key={i}
              onClick={() => setDisplay(h.result)}
              className="flex-shrink-0 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-white/10 transition-colors"
            >
              {h.eq} = <span className="text-white font-medium">{h.result}</span>
            </button>
          ))}
        </div>
      )}

      {/* Display */}
      <div className="bg-slate-950/50 rounded-2xl p-5 mb-5 border border-white/5">
        <div className="text-slate-500 text-right h-6 text-sm overflow-hidden font-mono">
          {equation}
        </div>
        <div className="text-white text-right text-5xl font-light tracking-tight overflow-x-auto font-mono">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((btn, index) => (
          <button
            key={index}
            onClick={() => {
              switch (btn.action) {
                case "clear":
                  handleClear();
                  break;
                case "backspace":
                  handleBackspace();
                  break;
                case "percent":
                  handlePercent();
                  break;
                case "negate":
                  handleNegate();
                  break;
                case "equals":
                  handleEquals();
                  break;
                case "decimal":
                  handleDecimal();
                  break;
                case "operator":
                  handleOperator(btn.op!);
                  break;
                case "number":
                  handleNumber(btn.label);
                  break;
              }
            }}
            className={`h-16 rounded-xl font-semibold text-xl transition-all duration-150 active:scale-95 ${btn.style}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
