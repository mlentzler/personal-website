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
}

export const Typewriter: React.FC<TypewriterProps> = ({
  lines,
  containerClassName = "",
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [completedLines, setCompletedLines] = useState<
    Array<{ text: string; className: string }>
  >([]);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    if (displayedText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.text.slice(0, displayedText.length + 1));
      }, currentLine.speed || 50);
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < lines.length - 1) {
      // if more then one line, wait and start typing again
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
    }
  }, [displayedText, currentLineIndex, lines]);

  return (
    <div className={`font-mono ${containerClassName}`}>
      {/* Finished lines */}
      {completedLines.map((line, idx) => (
        <div key={idx} className={line.className}>
          {line.text}
        </div>
      ))}

      {/* Current or last lines */}
      {currentLineIndex < lines.length && (
        <div className={lines[currentLineIndex].className}>
          <span>{displayedText}</span>
          <span className="inline-block w-2 h-5 ml-1 bg-cat-mauve align-middle animate-cursor -translate-y-[2px]" />
        </div>
      )}
    </div>
  );
};
