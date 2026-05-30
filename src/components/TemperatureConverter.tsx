import { useState } from "react";

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [kelvin, setKelvin] = useState("");
  const [lastChanged, setLastChanged] = useState<"C" | "F" | "K">("C");

  const convertFromCelsius = (c: number) => {
    setFahrenheit(((c * 9) / 5 + 32).toFixed(2));
    setKelvin((c + 273.15).toFixed(2));
  };

  const convertFromFahrenheit = (f: number) => {
    setCelsius((((f - 32) * 5) / 9).toFixed(2));
    setKelvin((((f - 32) * 5) / 9 + 273.15).toFixed(2));
  };

  const convertFromKelvin = (k: number) => {
    setCelsius((k - 273.15).toFixed(2));
    setFahrenheit(((k - 273.15) * 1.8 + 32).toFixed(2));
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    setLastChanged("C");
    const num = parseFloat(value);
    if (!isNaN(num)) {
      convertFromCelsius(num);
    } else {
      setFahrenheit("");
      setKelvin("");
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    setLastChanged("F");
    const num = parseFloat(value);
    if (!isNaN(num)) {
      convertFromFahrenheit(num);
    } else {
      setCelsius("");
      setKelvin("");
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    setLastChanged("K");
    const num = parseFloat(value);
    if (!isNaN(num)) {
      convertFromKelvin(num);
    } else {
      setCelsius("");
      setFahrenheit("");
    }
  };

  const clearAll = () => {
    setCelsius("");
    setFahrenheit("");
    setKelvin("");
  };

  const getTemperatureInfo = (temp: number, unit: "C" | "F" | "K") => {
    const celsiusTemp = unit === "C" ? temp : unit === "F" ? ((temp - 32) * 5) / 9 : temp - 273.15;
    
    if (celsiusTemp <= 0) return { status: "Freezing", color: "text-blue-400" };
    if (celsiusTemp < 10) return { status: "Cold", color: "text-cyan-400" };
    if (celsiusTemp < 20) return { status: "Cool", color: "text-teal-400" };
    if (celsiusTemp < 30) return { status: "Warm", color: "text-amber-400" };
    if (celsiusTemp < 40) return { status: "Hot", color: "text-orange-400" };
    return { status: "Very Hot", color: "text-red-400" };
  };

  const currentTemp = lastChanged === "C" ? parseFloat(celsius) || 0 : 
                      lastChanged === "F" ? parseFloat(fahrenheit) || 0 : 
                      parseFloat(kelvin) || 0;
  const tempInfo = getTemperatureInfo(currentTemp, lastChanged);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Temperature Converter</h2>

      <div className="space-y-4">
        <div className="bg-slate-900 rounded-xl p-4">
          <label className="flex items-center justify-between text-slate-400 mb-2">
            <span>Celsius (°C)</span>
            <span className="text-blue-400 font-medium">Water freezes at 0°C</span>
          </label>
          <input
            type="number"
            value={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
            className="w-full bg-slate-800 text-white text-2xl font-semibold border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="0"
          />
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <label className="flex items-center justify-between text-slate-400 mb-2">
            <span>Fahrenheit (°F)</span>
            <span className="text-amber-400 font-medium">Water freezes at 32°F</span>
          </label>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => handleFahrenheitChange(e.target.value)}
            className="w-full bg-slate-800 text-white text-2xl font-semibold border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="32"
          />
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <label className="flex items-center justify-between text-slate-400 mb-2">
            <span>Kelvin (K)</span>
            <span className="text-purple-400 font-medium">Absolute zero: 0K</span>
          </label>
          <input
            type="number"
            value={kelvin}
            onChange={(e) => handleKelvinChange(e.target.value)}
            className="w-full bg-slate-800 text-white text-2xl font-semibold border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="273.15"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={clearAll}
          className="flex-1 bg-slate-700 text-white font-semibold py-3 rounded-lg hover:bg-slate-600 transition-all"
        >
          Clear All
        </button>
      </div>

      {(celsius || fahrenheit || kelvin) && (
        <div className="mt-6 bg-slate-900 rounded-xl p-4">
          <div className="text-center">
            <span className={`text-xl font-semibold ${tempInfo.color}`}>
              {tempInfo.status}
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 bg-slate-900 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-3">Common Temperatures</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-slate-400">Absolute Zero:</div>
          <div className="text-white font-medium">-273.15°C / -459.67°F / 0K</div>
          <div className="text-slate-400">Water Freezes:</div>
          <div className="text-white font-medium">0°C / 32°F / 273.15K</div>
          <div className="text-slate-400">Room Temp:</div>
          <div className="text-white font-medium">20-22°C / 68-72°F</div>
          <div className="text-slate-400">Body Temp:</div>
          <div className="text-white font-medium">37°C / 98.6°F / 310.15K</div>
          <div className="text-slate-400">Water Boils:</div>
          <div className="text-white font-medium">100°C / 212°F / 373.15K</div>
        </div>
      </div>
    </div>
  );
}
