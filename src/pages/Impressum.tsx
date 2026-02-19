import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typewriter } from "../components/Typewriter";
import "../index.css";

const Impressum: React.FC = () => {
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
            segments: [{ text: "> cat impressum.txt" }],
            className: "text-cat-overlay0 mb-8",
            speed: 20,
          },
          {
            segments: [{ text: "Impressum" }],
            className: "text-2xl font-bold text-cat-text mb-4",
            speed: 25,
          },
          {
            segments: [{ text: "Michel Lentzler" }],
            className: "text-cat-text leading-relaxed text-justify",
            speed: 10,
          },
          {
            segments: [{ text: "Kleiner Sand 23" }],
            className: "text-cat-text leading-relaxed text-justify",
            speed: 10,
          },
          {
            segments: [{ text: "25436 Uetersen" }],
            className: "text-cat-text leading-relaxed text-justify",
            speed: 10,
          },
          {
            segments: [{ text: "E-Mail: michel@lentzler.com" }],
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
};

export default Impressum;
