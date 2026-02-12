import React, { useState, useEffect } from "react";

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
}

export const Typewriter: React.FC<TypewriterProps> = ({
  lines,
  containerClassName = "",
  onComplete,
  hideCursorOnComplete = false,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [completedLines, setCompletedLines] = useState<
    Array<{ text: string; className: string }>
  >([]);
  const [hasCalledComplete, setHasCalledComplete] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (!isFinished) setIsFinished(true);
      if (onComplete && !hasCalledComplete) {
        onComplete();
        setHasCalledComplete(true);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (displayedText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.text.slice(0, displayedText.length + 1));
      }, currentLine.speed || 50);
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < lines.length - 1) {
      const waitTime =
        currentLine.delayAfter !== undefined ? currentLine.delayAfter : 500;
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [
          ...prev,
          {
            text: currentLine.text,
            className: currentLine.className || "",
          },
        ]);
        setDisplayedText("");
        setCurrentLineIndex((prev) => prev + 1);
      }, waitTime);
      return () => clearTimeout(timeout);
    } else {
      // Letzte Zeile ist fertig
      if (!isFinished) setIsFinished(true);
      if (onComplete && !hasCalledComplete) {
        onComplete();
        setHasCalledComplete(true);
      }
    }
  }, [displayedText, currentLineIndex, lines, onComplete, hasCalledComplete, isFinished]);

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
