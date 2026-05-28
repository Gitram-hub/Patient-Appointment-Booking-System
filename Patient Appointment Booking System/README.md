# AI-Powered Patient Appointment Booking System

A production-ready full-stack healthcare appointment platform built with JavaScript only.

## Stack
- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios, React Hot Toast, Context API
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- AI Service: LangChain, OpenAI-compatible chat, Chroma vector store, semantic retrieval

## Local Setup
1. Copy `.env.example` to `.env` and fill in values if needed.
2. Install dependencies from the repo root:
   ```bash
   npm install
   ```
3. Start all services:
   ```bash
   npm run dev
   ```

## Demo Credentials
- Patient: `patient@demo.com` / `Patient@123`
- Doctor: `doctor@demo.com` / `Doctor@123`
- Admin: `admin@demo.com` / `Admin@123`

## Deployment
- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas
- Vector DB: ChromaDB or FAISS-compatible setup
