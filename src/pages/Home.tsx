import { useState } from "react";
import { Typewriter } from "../components/Typewriter";
import { Navigation } from "../components/Navigation";

interface HomeProps {
  hasSeenIntro: boolean;
  onIntroComplete: () => void;
}

export function Home({ hasSeenIntro, onIntroComplete }: HomeProps) {
  const [localIntroDone, setLocalIntroDone] = useState(false);

  const containerClass =
    "flex flex-col items-start w-full max-w-4xl mx-auto mt-20 px-8";

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
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Typewriter
        lines={[
          {
            text: "Hello, Welcome to Lentzler.com",
            className: "text-4xl font-bold text-cat-mauve mb-2",
            speed: 70,
            delayAfter: 1000,
          },
          {
            text: "The personal website of Michel Lentzler",
            className: "text-xl text-cat-text",
            speed: 50,
            delayAfter: 500,
          },
        ]}
        onComplete={() => setLocalIntroDone(true)}
        hideCursorOnComplete={true}
      />
      <Navigation
        startTrigger={localIntroDone}
        skipAnimation={false}
        onMenuComplete={onIntroComplete}
      />
    </div>
  );
}
