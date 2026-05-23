# ParsaGPT — Frontend

The React + TypeScript frontend for **ParsaGPT**: an AI recruiter assistant that lets anyone chat with my professional background in real time instead of reading a static CV.

🔗 **Live Demo:** [personal-chatbot-app.vercel.app](https://personal-chatbot-app.vercel.app)  
⚙️ **Backend (RAG + LLaMA):** [parsagpt repo](https://github.com/ai-art-dev99/parsagpt)

---

## What is ParsaGPT?

Most CVs answer questions nobody asked. ParsaGPT lets recruiters ask the questions they actually care about:

> *"What experience do you have with RAG pipelines?"*  
> *"Have you worked with Claude or the Anthropic API?"*  
> *"Tell me about your MSc dissertation."*

A local **LLaMA 3** model retrieves relevant chunks from a structured knowledge base of my background and answers — grounded in facts, no hallucination.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React · TypeScript |
| Build tool | Vite |
| Styling | CSS |
| Server | Nginx |
| Containerisation | Docker · docker-compose |
| Deployment | Vercel |
| Backend (separate) | FastAPI · LLaMA 3 · FAISS · RAG |

---

## Getting Started

```bash
git clone https://github.com/ai-art-dev99/personal-chatbot-app.git
cd personal-chatbot-app

npm install

# Set backend URL
cp .env.example .env
# Add VITE_API_URL pointing to your ParsaGPT backend

npm run dev
```

**Or with Docker:**
```bash
docker-compose up --build
```

---

## Related

- ⚙️ [ParsaGPT backend](https://github.com/ai-art-dev99/parsagpt) — FastAPI · LLaMA 3 · FAISS · RAG pipeline

---

## Author

**Amirparsa Rouhi** · [aprouhi.com](https://aprouhi.com) · [LinkedIn](https://linkedin.com/in/amirparsa-rouhi)
