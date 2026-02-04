# CPE494 ERP Systems with AI Enhancements - Take Home Quiz 2
**Topic:** Sales Pipeline and Revenue Forecasting

This repository contains the solution for Take Home Quiz 2, focusing on Sales Pipeline Management and Revenue Forecasting for **Aurora Solutions Co., Ltd.** The project demonstrates the implementation of data calculation, mobile UI design, and management dashboard visualization.

## 📂 Project Structure

- **Task I:** Revenue Forecast Calculation (Spreadsheet & Analysis)
- **Task II:** Mobile-Friendly Sales Agent Entry Form (UI Design)
- **Task III:** Management Dashboard Views (Frontend Implementation)

---

## 🚀 Task I: Revenue Forecast Calculation

Calculated the total projected revenue for **January 2026** based on the probability of opportunities in the sales pipeline.

- **Methodology:** `Expected Value = Estimated Value × Probability`
- **Result:** The total projected revenue for Jan 2026 is **1,516,000 THB**.
- **Data Source:** [Google Sheets - Master Sales Data](https://docs.google.com/spreadsheets/d/1zLKuf-D_0ihwdHSkCnWaFbah9ZcdDqcthueRxG2me3A/edit?usp=sharing)

---

## 📱 Task II: Mobile Sales Agent Entry Form

Designed a mobile-friendly user interface for sales agents to enter and update opportunity data on-site.

### Key Features:
- **Responsive Design:** Optimized for mobile screens with a vertical stack layout.
- **Smart Logic:** The `Probability` field automatically updates based on the selected `Status`.
- **User Experience:** Includes numeric keypads for value entry and date pickers for month selection.

*(Images/Mockups of the UI are included in the repository)*

---

## 📊 Task III: Management Dashboard

Developed a modern, responsive frontend dashboard using **React**, **Tailwind CSS**, and **Recharts**.

### 1. Monthly Revenue Forecast (Company Level)
A comprehensive view displaying:
- **Actual Revenue:** Past 9 months (Apr 2025 - Dec 2025) shown in dark blue.
- **Forecasted Revenue:** Next 3 months (Jan 2026 - Mar 2026) shown in light blue/cyan.
- **Tech Stack:** Recharts (ComposedChart), Framer Motion (for entrance animations).

### 2. Sales Performance by Staff
A dynamic multi-bar chart comparing sales performance across agents (Ananya, Pimchanok, Nattapon).
- **Interactive:** Management can toggle specific sales staff to compare performance.
- **Timeframe:** 5-month window (3 months actual + 2 months forecast).
- **Visual Cues:** Distinct colors for each staff and background highlighting for forecasted months.

---

## 🛠️ Technology Stack (Frontend)

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🔗 Links & Resources

- **GitHub Repository:** [SOtwoX1/CPE494-ERP_WEB](https://github.com/SOtwoX1/CPE494-ERP_WEB)
- **Excel Calculation:** [Google Sheets Link](https://docs.google.com/spreadsheets/d/1zLKuf-D_0ihwdHSkCnWaFbah9ZcdDqcthueRxG2me3A/edit?usp=sharing)

---

**Student Info:**
* **Name:** Siratee Saiprom
* **Student ID:** 65070507227
