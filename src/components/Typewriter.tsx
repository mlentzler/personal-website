import React, { useState, useEffect, useRef } from "react";

export interface TextSegment {
  text: string;
  className?: string;
}

interface TypewriterLine {
  segments: TextSegment[];
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
  const [currentSegmentIndex, setCurrentLineSegmentIndex] = useState(0);
  const [displayedCharsInSegment, setDisplayedCharsInSegment] = useState(0);
  
  const [completedLines, setCompletedLines] = useState<TypewriterLine[]>([]);
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
    const currentSegment = currentLine.segments[currentSegmentIndex];
    const typingSpeed = currentLine.speed || defaultSpeed;

    if (displayedCharsInSegment < currentSegment.text.length) {
      // Tippe nächsten Buchstaben im aktuellen Segment
      const timeout = setTimeout(() => {
        setDisplayedCharsInSegment(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (currentSegmentIndex < currentLine.segments.length - 1) {
      // Gehe zum nächsten Segment in der gleichen Zeile
      setCurrentLineSegmentIndex(prev => prev + 1);
      setDisplayedCharsInSegment(0);
    } else if (currentLineIndex < lines.length - 1) {
      // Zeile fertig -> Warte und gehe zur nächsten Zeile
      const waitTime = currentLine.delayAfter !== undefined ? currentLine.delayAfter : 500;
      const timeout = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentLineSegmentIndex(0);
        setDisplayedCharsInSegment(0);
      }, waitTime);
      return () => clearTimeout(timeout);
    } else {
      // Letzte Zeile komplett fertig
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
  }, [currentLineIndex, currentSegmentIndex, displayedCharsInSegment, lines, onComplete, isFinished, defaultSpeed]);

  const showCursor = !hideCursorOnComplete || !isFinished;

  // Hilfsfunktion zum Rendern einer Zeile
  const renderLineContent = (line: TypewriterLine, isActive: boolean) => {
    return (
      <div className={line.className}>
        {line.segments.map((seg, sIdx) => {
          if (!isActive || sIdx < currentSegmentIndex) {
            // Fertiges Segment
            return <span key={sIdx} className={seg.className}>{seg.text}</span>;
          } else if (sIdx === currentSegmentIndex) {
            // Aktuelles Segment
            return (
              <span key={sIdx} className={seg.className}>
                {seg.text.slice(0, displayedCharsInSegment)}
              </span>
            );
          }
          return null; // Zukünftiges Segment
        })}
        {isActive && showCursor && (
          <span className="inline-block w-2 h-5 ml-1 bg-cat-mauve align-middle animate-cursor -translate-y-[2px]" />
        )}
      </div>
    );
  };

  return (
    <div className={`font-mono ${containerClassName}`}>
      {completedLines.map((line, idx) => (
        <React.Fragment key={idx}>
          {renderLineContent(line, false)}
        </React.Fragment>
      ))}

      {currentLineIndex < lines.length && renderLineContent(lines[currentLineIndex], true)}
    </div>
  );
};
