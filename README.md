# Aditya Patil - Personal Portfolio (Version 2026/1.0)

A fully dynamic, highly interactive, and beautifully animated frontend portfolio showcasing my journey, technical arsenal, and professional projects as a Software Engineer.

## 🚀 Features

*   **Dynamic Role Titles Banner**: A fun animated Airbus plane flying through the sky, trailing a banner that elegantly cycles through target roles (SDE, AI Engineer, Product Manager, Software Engineer).
*   **Built-in Admin CMS**: Full live-editing capabilities through a hidden Admin mode via Google OAuth. Authorized users can add, edit, or delete projects, skills, custom domains, and directly update the downloadable Resume PDF link right from the browser.
*   **Firebase Integration**: All real-time data modifications made in the Admin CMS are persisted seamlessly onto Google Firebase Firestore, enabling dynamic global updates without changing the source code.
*   **Custom Thematic Domain Tabs**: Easily create endless custom project tabs using an ad-hoc category builder in the Admin dashboard, automatically saving to the cloud. Each tab receives tailored dynamic accents, tag colors, and glass-morphic lighting effects.
*   **Dark/Light Mode Sync**: Features a dedicated fluid Theme Toggle that syncs seamlessly with modern web browsers, shifting the UI between dark matter palettes and crisp glass-morphic lights.
*   **Framer Motion Animations**: Polished micro-animations across route changes, hero elements, and widgets, providing an incredibly premium user experience.

## 🛠 Tech Stack

*   **Core**: React + Vite
*   **Styling**: Vanilla CSS (TailwindCSS integration structure) + custom glass-morphism classes.
*   **Animation Engine**: Framer Motion
*   **Backend / Database**: Google Firebase (Firestore)
*   **Authentication**: `@react-oauth/google` & `jwt-decode`
*   **Iconography**: `lucide-react`

## 🏃‍♂️ Getting Started

### Prerequisites

To run this application locally, you'll need the following installed:
- Node.js (v16+ recommended)
- npm or yarn

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/adityap817/adityapatil-2026.git
    cd adityapatil-2026
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # Wait for completion, including all Framer Motion and Firebase packages
    ```

3.  **Local Development Server**
    ```bash
    npm run dev
    ```
    This will spin up a local server (typically `http://localhost:5173/`).

### Firebase Context

To preserve personal edits locally or for personal deployment:
Ensure that `firebase.js` holds your proper API Keys. Currently, it is linked exactly to the `adityapatil-2026` Google Firebase Project for global data persistence across views!

## 🔐 Admin Access Mode

There is a floating "Lock" icon located at the bottom-left of the application. 
Clicking it will trigger Google Authentication. Only Google accounts matching the verified `VITE_ADMIN_EMAILS` (or environment equivalents inside `App.jsx`) are authorized. Once unlocked, various `+`, `Edit`, and `Trash` icons will natively appear across the entire application interface, letting you mold the portfolio globally.

## 🎨 Design Philosophy

This project aims to break the traditional bounds of typical static portfolios by incorporating **"Rich Aesthetics"**. Instead of relying on rigid, templated designs, it achieves a premium look via high-contrast tailored colors, dynamic layout grids, and engaging CSS-level hover translations, ensuring continuous interaction and awe for any hiring managers navigating the page.

---
*Architected and developed by Aditya Patil.*
