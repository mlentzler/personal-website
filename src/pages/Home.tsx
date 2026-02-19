import { useState } from "react";
import { Typewriter } from "../components/Typewriter";
import { Navigation } from "../components/Navigation";
import { Link } from "react-router-dom"; // Import Link

interface HomeProps {
  hasSeenIntro: boolean;
  onIntroComplete: () => void;
}

export function Home({ hasSeenIntro, onIntroComplete }: HomeProps) {
  const [localIntroDone, setLocalIntroDone] = useState(false);

  const containerClass = "flex flex-col items-start w-full max-w-4xl mx-auto mt-20 px-8";

  if (hasSeenIntro) {
    return (
      <div className={containerClass}>
        <div className="text-4xl font-bold text-cat-mauve mb-2 font-mono">
          Hello, Welcome to Lentzler.com
        </div>
        <div className="text-xl text-cat-text font-mono">
          The personal website of Michel Lentzler
        </div>
        <Navigation startTrigger={true} skipAnimation={true} />
        <Link to="/impressum" className="impressum-link group flex items-center text-cat-subtext0 hover:text-cat-text transition-colors font-mono cursor-pointer">
          <span className="mr-1">[</span>
          <span className="group-hover:underline uppercase text-xs tracking-widest">
            Impressum
          </span>
          <span className="ml-1">]</span>
        </Link> {/* Impressum Link */}
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Typewriter 
        lines={[
          { 
            segments: [{ text: "Hello, Welcome to Lentzler.com" }], 
            className: "text-4xl font-bold text-cat-mauve mb-2",
            speed: 70,
            delayAfter: 1000
          },
          { 
            segments: [{ text: "The personal website of Michel Lentzler" }], 
            className: "text-xl text-cat-text",
            speed: 50,
            delayAfter: 500
          }
        ]}
        onComplete={() => setLocalIntroDone(true)}
        hideCursorOnComplete={true}
      />
      <Navigation 
        startTrigger={localIntroDone} 
        skipAnimation={false} 
        onMenuComplete={onIntroComplete} 
      />
      <Link to="/impressum" className="impressum-link group flex items-center text-cat-subtext0 hover:text-cat-text transition-colors font-mono cursor-pointer">
        <span className="mr-1">[</span>
        <span className="group-hover:underline uppercase text-xs tracking-widest">
          Impressum
        </span>
        <span className="ml-1">]</span>
      </Link> {/* Impressum Link */}
    </div>
  );
}
