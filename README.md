
# VIT Rank Predictor & Community Hub

## What is this website for?

This website is designed to help students aspiring to join Vellore Institute of Technology (VIT). It offers two main features:

1.  **Rank Analysis**: Provides a VITEEE rank prediction tool that helps students estimate their potential campus and course options based on their expected rank and historical data. It also includes an AI-powered summary to give personalized insights into the predictions.
2.  **Community Connections**: Features community forums where VIT aspirants and current students can connect, ask questions, share experiences, and discuss various topics related to VIT admissions, campus life, and courses.

**checkout screenshots - [Screenshots ](screenshots/screenshots.md)**

## Who built it?

This project was built by **LegitCoconut**.
You can find more of their work on GitHub: [https://github.com/LegitCoconut](https://github.com/LegitCoconut)

## How is it built?

The application is built using a modern web development stack:

*   **Frontend**:
    *   **Next.js**: A React framework for building server-rendered and statically generated web applications.
    *   **React**: A JavaScript library for building user interfaces.
    *   **TypeScript**: For static typing, improving code quality and maintainability.
*   **UI & Styling**:
    *   **ShadCN UI**: A collection of re-usable UI components built with Radix UI and Tailwind CSS.
    *   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
    *   **Lucide React**: For icons.
*   **Backend & Database**:
    *   **Next.js Server Actions**: For handling form submissions and data mutations without dedicated API endpoints.
    *   **MongoDB**: A NoSQL document database used to store feedback, prediction counts, forum messages, and student-submitted rank data.
*   **Generative AI**:
    *   **Genkit (Firebase Genkit)**: A toolkit used to integrate and manage generative AI models (specifically Google's Gemini models) for features like the AI-powered rank summary.
*   **Deployment**:
    *   **Vercel**: The application is deployed on Vercel, a platform for frontend frameworks and static sites.

This combination of technologies allows for a performant, interactive, and feature-rich experience for users.
