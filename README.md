# 🎓 UniFindr

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

**UniFindr** is a premium, high-fidelity college discovery and decision-making platform. Built with modern web technologies, it helps students efficiently search, explore, compare, and predict their chances of admission to top engineering institutions across India.

Developed By - **Shashi Kumar Sahu**

---

## ✨ Features

- **🔍 Advanced College Explorer:** Browse through top IITs, NITs, and Private Universities with infinite scrolling and dynamic filtering by fees, ranking, and institution type.
- **📊 Interactive Comparison Matrix:** Select up to 3 colleges and compare them side-by-side on critical data points like fees, ratings, and placement records.
- **🎯 AI-Powered Admission Predictor:** Enter your JEE rank to instantly calculate your admission probability (High/Medium/Low) based on historical cutoff data scaling up to 100,000+ ranks.
- **🎨 Stunning Visual Design:** A premium User Interface utilizing deep glassmorphism, dynamic gradients, and smooth micro-interactions powered by Framer Motion.
- **📈 Detailed Analytics:** Visualized placement statistics (2022-2025) using Recharts, comprehensive course listings, and student reviews.
- **🌗 Dark Mode Ready:** Seamless circular view transitions between Light and Dark themes.

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Database ORM:** Prisma
- **Database:** Neon Serverless PostgreSQL
- **Data Visualization:** Recharts

## 🚀 Getting Started Locally

Follow these steps to set up the project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/Shashi0103/UniFindr.git
cd UniFindr
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your Neon PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@your-neon-hostname.tech/neondb?sslmode=require"
```

### 4. Setup Database & Seed Data
Generate the Prisma client, push the schema, and populate the database with 45+ colleges:
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ☁️ Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).
1. Import the repository into Vercel.
2. Add your `DATABASE_URL` to the Environment Variables.
3. Click Deploy. (The included `postinstall` script will automatically handle Prisma generation).

---
*Designed to make the college decision process beautiful, intuitive, and data-driven.*
