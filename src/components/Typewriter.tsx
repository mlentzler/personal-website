import React, { useState, useEffect, useRef } from "react";

interface TypewriterLine {
  text: string;
  className?: string;
  speed?: number;
  delayAfter?: number;
}

interface TypewriterProps {
  lines: TypewriterLine[];
  containerClassName?: string;
  onComplete?: () => void;
  hideCursorOnComplete?: boolean;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  lines,
  containerClassName = "",
  onComplete,
  hideCursorOnComplete = false,
  speed: defaultSpeed = 50,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [completedLines, setCompletedLines] = useState<
    Array<{ text: string; className: string }>
  >([]);
  const [isFinished, setIsFinished] = useState(false);
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (!isFinished) {
        const t = setTimeout(() => setIsFinished(true), 0);
        return () => clearTimeout(t);
      }

      if (onComplete && !hasCalledComplete.current) {
        hasCalledComplete.current = true;
        const t = setTimeout(() => onComplete(), 0);
        return () => clearTimeout(t);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];
    const typingSpeed = currentLine.speed || defaultSpeed;

    if (displayedText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.text.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < lines.length - 1) {
      const waitTime =
        currentLine.delayAfter !== undefined ? currentLine.delayAfter : 500;
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [
          ...prev,
          { text: currentLine.text, className: currentLine.className || "" },
        ]);
        setDisplayedText("");
        setCurrentLineIndex((prev) => prev + 1);
      }, waitTime);
      return () => clearTimeout(timeout);
    } else {
      //Last line finished
      if (!isFinished) {
        const t = setTimeout(() => setIsFinished(true), 0);
        return () => clearTimeout(t);
      }
      if (onComplete && !hasCalledComplete.current) {
        hasCalledComplete.current = true;
        const t = setTimeout(() => onComplete(), 0);
        return () => clearTimeout(t);
      }
    }
  }, [
    displayedText,
    currentLineIndex,
    lines,
    onComplete,
    isFinished,
    defaultSpeed,
  ]);

  const showCursor = !hideCursorOnComplete || !isFinished;

  return (
    <div className={`font-mono ${containerClassName}`}>
      {completedLines.map((line, idx) => (
        <div key={idx} className={line.className}>
          {line.text}
        </div>
      ))}

      {currentLineIndex < lines.length && (
        <div className={lines[currentLineIndex].className}>
          <span>{displayedText}</span>
          {showCursor && (
            <span className="inline-block w-2 h-5 ml-1 bg-cat-mauve align-middle animate-cursor -translate-y-[2px]" />
          )}
        </div>
      )}
    </div>
  );
};
