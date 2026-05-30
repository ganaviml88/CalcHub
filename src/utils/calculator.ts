export function calculateExpression(expression: string): number {
  const sanitized = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");

  const tokens = sanitized.match(/(\d+\.?\d*|[+\-*/])/g) || [];

  if (tokens.length === 0) return 0;

  let result = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = parseFloat(tokens[i + 1]);

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        if (operand === 0) throw new Error("Division by zero");
        result /= operand;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}

export function calculateAge(birthDate: string): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: number;
} {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysToNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextBirthday: daysToNext,
  };
}

export function unitConversions(
  category: string,
  value: number,
  from: string,
  to: string
): number {
  const conversions: Record<string, Record<string, number>> = {
    meter: { meter: 1, kilometer: 0.001, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701, centimeter: 100 },
    kilometer: { meter: 1000, kilometer: 1, mile: 0.621371, yard: 1093.61, foot: 3280.84, inch: 39370.1, centimeter: 100000 },
    mile: { meter: 1609.34, kilometer: 1.60934, mile: 1, yard: 1760, foot: 5280, inch: 63360, centimeter: 160934 },
    yard: { meter: 0.9144, kilometer: 0.0009144, mile: 0.000568182, yard: 1, foot: 3, inch: 36, centimeter: 91.44 },
    foot: { meter: 0.3048, kilometer: 0.0003048, mile: 0.000189394, yard: 0.333333, foot: 1, inch: 12, centimeter: 30.48 },
    inch: { meter: 0.0254, kilometer: 0.0000254, mile: 0.0000157828, yard: 0.0277778, foot: 0.0833333, inch: 1, centimeter: 2.54 },
    centimeter: { meter: 0.01, kilometer: 0.00001, mile: 0.00000621371, yard: 0.0109361, foot: 0.0328084, inch: 0.393701, centimeter: 1 },
    kilogram: { kilogram: 1, gram: 1000, pound: 2.20462, ounce: 35.274, ton: 0.001 },
    gram: { kilogram: 0.001, gram: 1, pound: 0.00220462, ounce: 0.035274, ton: 0.000001 },
    pound: { kilogram: 0.453592, gram: 453.592, pound: 1, ounce: 16, ton: 0.000453592 },
    ounce: { kilogram: 0.0283495, gram: 28.3495, pound: 0.0625, ounce: 1, ton: 0.0000283495 },
    ton: { kilogram: 1000, gram: 1000000, pound: 2204.62, ounce: 35274, ton: 1 },
    liter: { liter: 1, milliliter: 1000, gallon: 0.264172, quart: 1.05669, pint: 2.11338, cup: 4.22675 },
    milliliter: { liter: 0.001, milliliter: 1, gallon: 0.000264172, quart: 0.00105669, pint: 0.00211338, cup: 0.00422675 },
    gallon: { liter: 3.78541, milliliter: 3785.41, gallon: 1, quart: 4, pint: 8, cup: 16 },
    quart: { liter: 0.946353, milliliter: 946.353, gallon: 0.25, quart: 1, pint: 2, cup: 4 },
    pint: { liter: 0.473176, milliliter: 473.176, gallon: 0.125, quart: 0.5, pint: 1, cup: 2 },
    cup: { liter: 0.236588, milliliter: 236.588, gallon: 0.0625, quart: 0.25, pint: 0.5, cup: 1 },
    "m/s": { "m/s": 1, "km/h": 3.6, mph: 2.23694, knot: 1.94384 },
    "km/h": { "m/s": 0.277778, "km/h": 1, mph: 0.621371, knot: 0.539957 },
    mph: { "m/s": 0.44704, "km/h": 1.60934, mph: 1, knot: 0.868976 },
    knot: { "m/s": 0.514444, "km/h": 1.852, mph: 1.15078, knot: 1 },
    second: { second: 1, minute: 0.0166667, hour: 0.000277778, day: 0.0000115741, week: 0.00000165344, month: 0.000000380517, year: 0.0000000317098 },
    minute: { second: 60, minute: 1, hour: 0.0166667, day: 0.000694444, week: 0.0000992063, month: 0.000022831, year: 0.00000190258 },
    hour: { second: 3600, minute: 60, hour: 1, day: 0.0416667, week: 0.00595238, month: 0.00136986, year: 0.000114155 },
    day: { second: 86400, minute: 1440, hour: 24, day: 1, week: 0.142857, month: 0.0328767, year: 0.00273973 },
    week: { second: 604800, minute: 10080, hour: 168, day: 7, week: 1, month: 0.230137, year: 0.0191781 },
    month: { second: 2629746, minute: 43829.1, hour: 730.485, day: 30.4368, week: 4.34524, month: 1, year: 0.0833333 },
    year: { second: 31556952, minute: 525949, hour: 8765.81, day: 365.242, week: 52.1775, month: 12, year: 1 },
    "sq meter": { "sq meter": 1, "sq kilometer": 0.000001, "sq mile": 3.861e-7, "sq yard": 1.19599, "sq foot": 10.7639, acre: 0.000247105, hectare: 0.0001 },
    "sq kilometer": { "sq meter": 1000000, "sq kilometer": 1, "sq mile": 0.386102, "sq yard": 1195990, "sq foot": 10763900, acre: 247.105, hectare: 100 },
    "sq mile": { "sq meter": 2589990, "sq kilometer": 2.58999, "sq mile": 1, "sq yard": 3097600, "sq foot": 27878400, acre: 640, hectare: 258.999 },
    "sq yard": { "sq meter": 0.836127, "sq kilometer": 8.36127e-7, "sq mile": 3.22831e-7, "sq yard": 1, "sq foot": 9, acre: 0.000206612, hectare: 8.36127e-5 },
    "sq foot": { "sq meter": 0.092903, "sq kilometer": 9.2903e-8, "sq mile": 3.587e-8, "sq yard": 0.111111, "sq foot": 1, acre: 2.29568e-5, hectare: 9.2903e-6 },
    acre: { "sq meter": 4046.86, "sq kilometer": 0.00404686, "sq mile": 0.0015625, "sq yard": 4840, "sq foot": 43560, acre: 1, hectare: 0.404686 },
    hectare: { "sq meter": 10000, "sq kilometer": 0.01, "sq mile": 0.00386102, "sq yard": 11959.9, "sq foot": 107639, acre: 2.47105, hectare: 1 },
  };

  const fromUnit = conversions[from];
  if (!fromUnit) return value;

  const toValue = fromUnit[to];
  if (toValue === undefined) return value;

  return value * toValue;
}
