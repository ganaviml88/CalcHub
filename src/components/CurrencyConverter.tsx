import { useState } from "react";
import { DollarSign, ArrowRightLeft, TrendingUp } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);

  const currencies: Record<string, { name: string; symbol: string; rate: number }> = {
    USD: { name: "US Dollar", symbol: "$", rate: 1 },
    EUR: { name: "Euro", symbol: "€", rate: 0.92 },
    GBP: { name: "British Pound", symbol: "£", rate: 0.79 },
    JPY: { name: "Japanese Yen", symbol: "¥", rate: 149.50 },
    CAD: { name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
    AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.53 },
    CHF: { name: "Swiss Franc", symbol: "Fr", rate: 0.88 },
    CNY: { name: "Chinese Yuan", symbol: "¥", rate: 7.24 },
    INR: { name: "Indian Rupee", symbol: "₹", rate: 83.12 },
    MXN: { name: "Mexican Peso", symbol: "$", rate: 17.15 },
    BRL: { name: "Brazilian Real", symbol: "R$", rate: 4.97 },
    KRW: { name: "South Korean Won", symbol: "₩", rate: 1320.45 },
  };

  const convert = () => {
    const value = parseFloat(amount) || 0;
    const fromRate = currencies[fromCurrency].rate;
    const toRate = currencies[toCurrency].rate;
    const converted = (value / fromRate) * toRate;
    setResult(converted);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
          <DollarSign className="text-green-400" size={24} />
        </div>
        Currency Converter
      </h2>

      {/* Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-6 flex items-start gap-2">
        <TrendingUp size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-amber-200/80 text-sm">
          Exchange rates are for reference only. Actual rates may vary.
        </p>
      </div>

      <div className="space-y-4">
        {/* Amount */}
        <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5">
          <label className="block text-slate-400 mb-2 text-sm font-medium">Amount</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-slate-500">{currencies[fromCurrency].symbol}</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent text-white text-3xl font-bold outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* From Currency */}
        <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5">
          <label className="block text-slate-400 mb-2 text-sm font-medium">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full bg-slate-800 text-white text-lg font-medium border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50"
          >
            {Object.entries(currencies).map(([code, { name }]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20 hover:scale-110 transition-transform"
          >
            <ArrowRightLeft size={24} />
          </button>
        </div>

        {/* To Currency */}
        <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5">
          <label className="block text-slate-400 mb-2 text-sm font-medium">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full bg-slate-800 text-white text-lg font-medium border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50"
          >
            {Object.entries(currencies).map(([code, { name }]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convert}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
        >
          Convert
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 text-center border border-green-500/20">
          <div className="text-slate-400 text-sm mb-2">
            {amount} {fromCurrency} equals
          </div>
          <div className="text-4xl font-bold text-white mb-1">
            {currencies[toCurrency].symbol} {result.toFixed(2)}
          </div>
          <div className="text-slate-400 text-sm">{toCurrency}</div>
        </div>
      )}

      {/* Popular Rates */}
      <div className="mt-6 bg-slate-950/50 rounded-2xl p-5 border border-white/5">
        <h3 className="text-white font-semibold mb-4">Popular Exchange Rates (USD)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(currencies)
            .filter(([code]) => code !== "USD")
            .slice(0, 6)
            .map(([code, { symbol, rate }]) => (
              <div key={code} className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-slate-400 text-xs mb-1">{code}</div>
                <div className="text-white font-semibold">
                  {symbol} {rate.toFixed(2)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
