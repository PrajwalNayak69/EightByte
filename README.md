# Live Portfolio Dashboard  
*A Full-Stack Financial Dashboard using Next.js, TypeScript, Tailwind, and Node.js*

---

## Overview

This project is a **real-time portfolio tracking dashboard** that displays stock holdings with live market data.  
It fetches **Current Market Price (CMP)** from **Yahoo Finance** and automatically recalculates **Present Value** and **Gain/Loss** every 15 seconds.

Built for the **Octa Byte AI** case study challenge.

---

## Features

Displays detailed portfolio table:  
- Stock name, exchange, purchase price, quantity  
- Investment value, CMP, Present Value, and Gain/Loss  

Dynamic real-time updates (every 15 seconds)  
 Live CMP data fetched from Yahoo Finance  
Color-coded gains/losses (green = profit, red = loss)  
Sector grouping with total investment & value per sector  
Caching with NodeCache to reduce API load  
Responsive, clean UI built with Tailwind CSS  
TypeScript throughout for safer, maintainable code

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | Next.js (React + App Router) |
| Backend | Node.js (Next.js API Route) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| API | Yahoo Finance (unofficial) |
| Caching | NodeCache |
| State Management | React hooks + useMemo |
| Deployment | (Optional) Vercel |

---

## Setup Instructions

1. Clone the repository  
   ```bash
   git clone <your-repo-url>
   cd eightbit

2. Install dependencies
    ```bash
    npm install

3. Run the development server
     ```bash
     npm run dev

4. Open the app
    http://localhost:3000


## Data Source

Yahoo Finance is used to fetch the Current Market Price (CMP).

The Yahoo Finance API used here is unofficial, implemented via the yahoo-finance2 NPM package.

The app uses caching (20-second TTL) to avoid rate limits.

Each stock updates automatically every 15 seconds.

## Folder Structure
src/
├── app/
│   ├── api/
│   │   └── quotes/
│   │       └── route.ts       # Backend API (Yahoo Finance fetch + caching)
│   ├── page.tsx               # Main dashboard (React logic + polling)
│
├── components/
│   └── PortfolioTable.tsx     # Table UI with Tailwind styling
│
├── data/
│   └── portfolio.json         # Local seed portfolio data
│
└── types/
    └── portfolio.ts           # TypeScript types

## Technical Highlights

| Challenge                     | Solution                                    |
| ----------------------------- | ------------------------------------------- |
| Yahoo Finance API instability | Added error handling + caching              |
| Rate limiting                 | Implemented in-memory cache (20s TTL)       |
| React polling duplication     | Used `useRef` to prevent multiple intervals |
| Real-time calculations        | Used `useMemo` to avoid unnecessary renders |
| UI performance                | Separated table rendering and state updates |

## How It Works
On load, static portfolio JSON initializes investment data.

Every 15 seconds, the app calls /api/quotes?symbols=....

The backend fetches current CMPs from Yahoo Finance.

Frontend recalculates:

Present Value = CMP × Qty

Gain/Loss = Present Value − Investment

Sector totals and overall portfolio value are updated live.

## Possible Improvements

Add Google Finance / Finnhub fallback for reliability

Integrate P/E ratio & earnings

Add Recharts visualizations

Add authentication and user-specific portfolios

Deploy to Vercel with API routes cached using ISR

## Author

Prajwal Nayak
Case Study Submission — Octa Byte AI Pvt. Ltd.