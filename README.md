# CalcHub - All-in-One Calculator Suite

![CalcHub](https://img.shields.io/badge/CalcHub-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

CalcHub is a comprehensive calculator suite built with React, TypeScript, and Tailwind CSS. It provides multiple calculators for everyday calculations with a beautiful, modern UI.

## 🎯 Features

### Calculators Included

1. **Standard Calculator** - Basic arithmetic operations
   - Addition, subtraction, multiplication, division
   - Percentage calculations
   - Calculation history tracking
   - Backspace functionality

2. **Scientific Calculator** - Advanced mathematical functions
   - Trigonometric functions (sin, cos, tan, asin, acos, atan)
   - Logarithmic functions (log, ln)
   - Power functions (x², x³, √, ∛)
   - Constants (π, e)
   - Factorial calculations
   - Angle mode toggle (Degrees/Radians)
   - Memory operations (M+, M-, MR, MC)

3. **Age Calculator** - Calculate detailed age information
   - Display years, months, and days
   - Total days lived
   - Total weeks and months
   - Days until next birthday

4. **Unit Converter** - Convert between various units
   - **Length**: meter, kilometer, mile, yard, foot, inch, centimeter
   - **Weight**: kilogram, gram, pound, ounce, ton
   - **Area**: square units, acre, hectare
   - **Volume**: liter, milliliter, gallon, quart, pint, cup
   - **Speed**: m/s, km/h, mph, knot
   - **Time**: second, minute, hour, day, week, month, year

5. **Percentage Calculator** - Multiple percentage operations
   - Calculate percentage of a number
   - Percentage increase/decrease
   - Find what percentage one number is of another
   - Quick reference calculations

6. **BMI Calculator** - Body Mass Index calculator
   - Metric (kg/cm) and Imperial (lb/in) units
   - BMI categories with color indicators
   - Health reference guide

7. **Currency Converter** - Real-time currency conversion
   - 12 major currencies supported
   - Quick swap functionality
   - Popular exchange rates reference
   - USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, MXN, BRL, KRW

8. **Temperature Converter** - Temperature unit conversion
   - Celsius, Fahrenheit, Kelvin
   - Real-time conversion
   - Temperature status indicator (Freezing, Cold, Cool, Warm, Hot, Very Hot)
   - Common temperature reference

## 🎨 Design Features

- **Modern Dark Theme** - Eye-friendly dark interface
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** - Fluid transitions and interactive elements
- **Gradient Accents** - Colorful, vibrant UI elements
- **Accessible** - Keyboard friendly and screen reader compatible
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Beautiful Footer** - Organized navigation and information

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ganaviml88/CalcHub.git
   cd CalcHub
   ```

2. **Checkout the calchub-website branch**
   ```bash
   git checkout calchub-website
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
CalcHub/
├── src/
│   ├── components/
│   │   ├── StandardCalculator.tsx
│   │   ├── ScientificCalculator.tsx
│   │   ├── AgeCalculator.tsx
│   │   ├── UnitConverter.tsx
│   │   ├── PercentageCalculator.tsx
│   │   ├── BMICalculator.tsx
│   │   ├── CurrencyConverter.tsx
│   │   └── TemperatureConverter.tsx
│   ├── utils/
│   │   └── calculator.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library

## 📝 Usage

### Standard Calculator
- Click numbers to input
- Use operators (+, -, ×, ÷) for calculations
- Press = to get the result
- Use AC to clear, ⌫ to backspace
- View calculation history in the history bar

### Scientific Calculator
- All standard calculator features
- Toggle between Degrees and Radians for trigonometric functions
- Use memory buttons (M+, M-, MR, MC) to store values
- Access advanced functions (sin, cos, tan, log, √, etc.)

### Age Calculator
- Select your birth date
- View detailed age breakdown
- See days until next birthday

### Unit Converter
- Select conversion category (Length, Weight, Area, Volume, Speed, Time)
- Enter value and select units
- Use swap button to reverse conversion
- Get instant conversion results

### Percentage Calculator
- Choose calculation mode
- Enter values based on selected mode
- View formatted results

### BMI Calculator
- Toggle between metric and imperial units
- Enter height and weight
- Get BMI value and health category

### Currency Converter
- Enter amount to convert
- Select source and target currencies
- Use swap button to reverse currencies
- View popular exchange rates

### Temperature Converter
- Enter temperature in any unit (C, F, K)
- See real-time conversion to other units
- Get temperature status (Freezing, Cold, Warm, Hot, etc.)
- View common temperature references

## 🎓 Learning Resources

This project is great for learning:
- React hooks (useState)
- TypeScript with React
- Tailwind CSS styling
- Component composition
- State management
- Form handling

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from [Lucide React](https://lucide.dev/)
- UI inspiration from modern design principles
- Community feedback and contributions

## 📧 Support

If you find any bugs or have suggestions, please [open an issue](https://github.com/ganaviml88/CalcHub/issues) on GitHub.

## 🎉 Enjoy CalcHub!

Make accurate calculations with style! ✨
