# EcoTrace 🌍 — Carbon Footprint Awareness Platform
> Track it. Reduce it. Own it.

EcoTrace is an enterprise-grade Carbon Footprint Awareness Platform built as part of **Hack2skill PromptWars Virtual Challenge 3**. It offers custom estimators, interactive data charts, streak gamification badges, and an AI advisory assistant designed to model individual sustainability metrics.

---

## 🚀 Key Features

* **MVC architecture & Observer State**: Strict decoupling of state models, dynamic page render views, and user controllers.
* **Granular estimation parameters**: Calculated ranges for transport configurations, diet variations, energy grid variables, and purchase consumption lifespans.
* **EcoAI Simulator Integration**: Connects with Anthropic Claude API using `claude-haiku-4-5-20251001` with built-in sandbox mock fallbacks.
* **Interactive Charting System**: Inline Chart.js dashboard layouts with fallback HTML5 2D Canvas graphing engines.
* **10 Milestone Badges**: Gamified streaking and achievement logic (e.g. *Clean Commuter*, *Earth Guardian*) updating dynamically.
* **A11y focus traps & high-contrast themes**: Designed to WCAG AA guidelines with keyboard trap states on overlay modals.
* **Built-in 130-Test Diagnostic Suite**: High-confidence regression test runner panel embedded in the app.

---

## 🛠️ Tech Stack

* **Structure**: Semantic HTML5
* **Logic**: Modern Vanilla JavaScript (MVC Model-View-Controller framework, Observer patterns, and Factory logic)
* **Styling**: Vanilla CSS3 Custom variables, design system tokens, and transitions
* **Dependencies (CDNs)**: 
  * DOMPurify (Sanitization)
  * Chart.js (Data Vis)
  * Animate.css (Micro-animations)

---

## 💻 Running Locally

No server builds or bundlers required:

1. Clone this repository.
2. Open `index.html` in your web browser.
3. Access the **Automated Test Runner** drawer in the bottom right corner of the dashboard to run the test suite.

---

## 🌐 Project Deployment Info

* **GitHub Repository**: [ecotrace-carbon-platform](https://github.com/poovarasu638178-rgb/ecotrace-carbon-platform)
* **Live Deployment**: Hosted on Netlify.
