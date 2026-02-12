import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typewriter } from "../components/Typewriter";

export function About() {
  const navigate = useNavigate();

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
    <div className="flex flex-col items-start w-full max-w-2xl mx-auto mt-12 px-4">
      <Typewriter
        lines={[
          { text: "> cat about_me.txt", className: "text-cat-overlay0 mb-8" },
          {
            text: "Hello! I am Michel Lentzler.",
            className: "text-2xl font-bold text-cat-mauve mb-4",
            speed: 20,
          },
          {
            text: "This is a test text foo and barlinger",
            className: "text-cat-text mb-4 leading-relaxed",
            speed: 15,
          },
          {
            text: "This again is anouther test paragraph and its testing very well i suppose",
            className: "text-cat-text mb-8 leading-relaxed",
            speed: 15,
          },
          {
            text: "[Press 'b' or 'Backspace' to return to main menu]",
            className: "text-cat-overlay0 text-sm italic",
            speed: 10,
            delayAfter: 0,
          },
        ]}
        hideCursorOnComplete={false}
      />
    </div>
  );
}
