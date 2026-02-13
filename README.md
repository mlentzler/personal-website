# lentzler.com 🖥️

A minimalist, TUI-inspired (Terminal User Interface) personal portfolio website. Built with focus on speed, accessibility, and a keyboard-centric workflow.

Live at: [https://lentzler.com](https://lentzler.com)

## ✨ Features

- **TUI Aesthetic:** A terminal-themed interface featuring the [Catppuccin](https://catppuccin.com/) color scheme and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) font.
- **Dynamic Typewriter Engine:** Custom-built sequential animation system that handles text segments and highlights without risking security vulnerabilities (no `dangerouslySetInnerHTML`).
- **Keyboard Navigation:** Fully navigable via keyboard:
  - `j` / `k` or `↑` / `↓` to browse menus and projects.
  - `Enter` to select or open links.
  - `b` / `Backspace` / `Esc` / `q` to go back.
- **Interactive Project Explorer:** A `yazi`/`ranger` inspired project manager with a two-column layout, metadata tracking, and visual previews.
- **Responsive Design:** Mobile-optimized view that transitions from a split-pane layout to a full-screen focused detail view on smaller devices.
- **Automated Deployment:** CI/CD pipeline via GitHub Actions, deployed to GitHub Pages with custom domain support.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** Custom SVGs

## 🚀 Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mlentzler/personal-website.git
   cd personal-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components (TerminalWindow, Typewriter, etc.)
├── pages/           # Page-level components (Home, About, Projects)
├── assets/          # Static assets
└── index.css        # Global styles & Tailwind 4 theme configuration
```

---

Designed and developed by Michel Lentzler. 2026.
