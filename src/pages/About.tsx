import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typewriter } from "../components/Typewriter";

export function About() {
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Escape" || e.key === "b") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="flex flex-col items-start w-full max-w-4xl mx-auto mt-20 px-8">
      <Typewriter
        lines={[
          {
            segments: [{ text: "> cat about_me.txt" }],
            className: "text-cat-overlay0 mb-8",
            speed: 20,
          },
          {
            segments: [
              { text: "Hello! I am " },
              {
                text: "Michel Lentzler",
                className: "text-cat-mauve font-bold",
              },
              { text: "." },
            ],
            className: "text-2xl font-bold text-cat-text mb-4",
            speed: 25,
          },
          {
            segments: [
              { text: "I'm a 23-year-old " },
              { text: "Computer Science", className: "text-cat-green" },
              { text: " student at the " },
              { text: "University of Hamburg", className: "text-cat-green" },
              { text: ". Currently, I'm in the final steps of finishing my " },
              { text: "Bachelor's Thesis", className: "text-cat-mauve" },
              { text: " titled '" },
              {
                text: "Attacking the BMCA in Time-Sensitive Networks",
                className: "text-cat-peach italic",
              },
              {
                text: "', where I analyze possible Attack-Vecotrs in initial time synchronization. (Once finished, you'll find it in the projects section.)",
              },
            ],
            className: "text-cat-text mb-4 leading-relaxed text-justify",
            speed: 10,
          },
          {
            segments: [
              { text: "Besides university, I work as a " },
              {
                text: "Cloud Data Engineer",
                className: "text-cat-green font-bold",
              },
              { text: " (Working Student) at " },
              { text: "Otto Group data.works", className: "text-cat-green" },
              {
                text: ". Over the past 1.5 years, I've gained insights into every aspect of the ",
              },
              { text: "SDLC", className: "text-cat-mauve" },
              { text: ". My work is primarily " },
              { text: "fullstack", className: "text-cat-mauve" },
              {
                text: ": I optimize SQL queries, fix frontend bugs, and improve CI/CD pipelines while taking full ",
              },
              { text: "ownership", className: "text-cat-mauve font-bold" },
              { text: " of products end-to-end." },
            ],
            className: "text-cat-text mb-8 leading-relaxed text-justify",
            speed: 10,
          },
          {
            segments: [
              { text: "In my free time, I'm an " },
              { text: "engineering enthusiast", className: "text-cat-peach" },
              { text: ". I love everything " },
              { text: "DIY", className: "text-cat-mauve" },
              { text: ": from designing and " },
              { text: "3D-printing", className: "text-cat-mauve" },
              {
                text: " parts to working on cars. I've been passionate about mechanics since I was young, often spending my time fine-tuning my ",
              },
              {
                text: "Honda Civic track tool",
                className: "text-cat-mauve font-bold",
              },
              { text: " or helping friends with their cars." },
            ],
            className: "text-cat-text mb-8 leading-relaxed text-justify",
            speed: 10,
          },
          {
            segments: [
              { text: "[Press 'b' or 'Backspace' to return to main menu]" },
            ],
            className: "text-cat-overlay0 text-sm italic mt-4",
            speed: 10,
            delayAfter: 0,
          },
        ]}
        onComplete={() => setShowBackButton(true)}
        hideCursorOnComplete={true}
      />

      {showBackButton && (
        <button
          onClick={() => navigate("/")}
          className="mt-12 group flex items-center text-cat-mauve hover:text-cat-green transition-colors font-mono cursor-pointer animate-in fade-in slide-in-from-left-4 duration-700"
        >
          <span className="mr-2">[</span>
          <span className="group-hover:underline uppercase text-xs tracking-widest">
            Back to Menu
          </span>
          <span className="ml-2">]</span>
        </button>
      )}
    </div>
  );
}
