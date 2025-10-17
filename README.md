# ☁️ Nimbus  
### _The Forecast of You_

Nimbus is a modern, cross-platform wellness and productivity app built with **Expo** and **React Native**.  
It helps users visualize their personal “forecast” — moods, habits, routines, and reminders — in an elegant, ADHD-friendly dashboard that’s designed to be both **visually engaging** and **mentally uncluttered**.

---

## ✨ Features (in development)
- 📅 **Routine Tracking** – Build and visualize daily/weekly routines with smooth animations  
- 💭 **Mood Forecasting** – Log emotional “weather” to spot patterns over time  
- 📋 **Reminders & Notes** – Quick, glanceable sticky reminders (“Take out the trash,” “Feed the dog,” etc.)  
- 🧠 **Offline-First Design** – Uses local secure storage; no sign-ups or cloud sync required  
- 🎨 **Dynamic UI** – Theme inspired by clouds, sunlight, and shifting skies — calm, minimal, reactive  

---

## 🧰 Tech Stack
| Layer | Tools / Frameworks |
|--------|---------------------|
| Framework | [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/) |
| Language | TypeScript |
| UI Library | [React Native Paper](https://callstack.github.io/react-native-paper/) |
| Navigation | [React Navigation](https://reactnavigation.org/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Storage | [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/) |
| State Management | React Context (planned: Zustand or Redux Toolkit) |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/nimbus.git
cd nimbus
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npx expo start
```

### 4. Run on your device
- Install **Expo Go** on iOS/Android  
- Scan the QR code printed in your terminal  

---

## 🧩 Project Structure
```
nimbus/
├── app/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Core screens (Dashboard, Journal, Settings, etc.)
│   ├── hooks/           # Custom hooks (data, storage, etc.)
│   ├── theme/           # Typography, color palettes, theming utilities
│   └── utils/           # Helper functions
│
├── assets/              # Icons, illustrations, and fonts
├── App.tsx              # Root entry point
└── LICENSE              # Non-commercial license (see file)
```

---

## 💡 Vision
Nimbus is designed to feel like checking the weather — but for your life.  
Each interaction aims to reduce friction for users with ADHD or executive dysfunction by combining calm visuals, lightweight data entry, and positive reinforcement loops.  

### Future plans
- 🔄 Cross-device sync  
- 📊 Data visualization and trend analysis  
- 🧘 Integration with focus timers and mindfulness tools  
- ☁️ “Nimbus AI” — contextual suggestions and dynamic insights  

---

## 🛠️ Development Status
Currently in **prototype** stage.  
Focus areas:
- Implementing base navigation and dashboard UI  
- Local data storage and sync layer  
- Core animation patterns  

---

## 🧑‍💻 Author
**Daniel Fausz**  
Senior Software Engineer (Front-End / .NET MAUI / React)  
[fausz.dev](https://fausz.dev) · [GitHub](https://github.com/dfausz)
