# 🚀 RepoRescue AI

> **Autonomous Debugging Agent for Modern Development Teams**

RepoRescue AI is a powerful, autonomous debugging tool that bridges the gap between your production crash logs and your GitHub repository. By simply pasting an error trace and a repository URL, the AI agent dynamically clones your code, navigates the file system, analyzes the architectural context, and pinpoints the exact root cause in seconds.

---

## ✨ Features

* **⚡ Lightning Fast Fixes:** Reads your error logs the second you paste them. No waiting around—get the exact solution you need instantly.
* **🧠 Reads Your Actual Code:** It doesn't just guess blindly. The AI connects to your GitHub, looks at your specific files, and finds out exactly where the mistake is.
* **☁️ Paste Any Error Log:** Whether your app crashed on Vercel, Render, AWS, or your own computer, just copy the raw text and paste it. We'll handle the rest.
* **🎨 Premium SaaS Interface:** Built with a sleek, dark-mode, mobile-responsive UI inspired by top developer tools like Vercel and Linear.

---

## 🛠️ Tech Stack

**Frontend (Client):**
* React 18
* Vite
* Tailwind CSS (Custom Dark Dev Theme)
* Lucide React (Icons)
* React Router DOM (Navigation)

**Backend (Agent Engine):**
* Node.js & Express
* Axios (Network requests)
* Isomorphic-Git (In-memory repository cloning & file reading)
* AI Inference API (Llama-3 model for lightning-fast analysis)

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables.

### Backend (.env)
PORT=5000
GROQ_API_KEY=your_groq_api_key_here

### Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000/api
(For production on Vercel, set this to your hosted backend URL)

---

## 🚀 Local Setup Instructions

Follow these steps to get the project running on your local machine.

### 1. Clone the repository
git clone https://github.com/manikkori/traceroot.git
cd traceroot

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
cd backend
npm install
npm run dev

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
cd frontend
npm install
npm run dev

---

## 🌍 Deployment Guide

### Deploying the Backend (Render)
1. Push your code to GitHub.
2. Log into Render and create a new Web Service.
3. Connect your repository and set the Root Directory to backend.
4. Set the Build Command to npm install and the Start Command to node src/index.js (or npm start).
5. Add the GROQ_API_KEY in the Environment Variables section.
6. Deploy!

### Deploying the Frontend (Vercel)
1. Log into Vercel and import your repository.
2. Set the Root Directory to frontend.
3. Add the VITE_API_BASE_URL environment variable and set it to your Render backend URL.
4. Ensure you have the vercel.json file in your frontend root for proper React Router handling.
5. Deploy!

---

## 🧠 How the Agent Loop Works

1. **Initialization:** The user provides a GitHub URL and a crash log.
2. **Repository Retrieval:** The backend temporarily pulls the necessary repository structure into memory.
3. **Investigation Loop (Up to 3 Iterations):**
   * The AI reviews the error log and the repository's file structure.
   * If it needs more context, it requests to read specific file contents.
   * The backend reads the requested files and feeds the exact code back to the AI.
4. **Resolution:** Once confident, the AI stops the loop and returns a structured JSON response containing the Root Cause, Explanation, and a Suggested Code Fix.

---

## 👨‍💻 Author

**Manik Kori**
* Full-Stack Web Developer
* GitHub: https://github.com/manikkori

---
*Built with ❤️ for developers who hate reading crash logs.*