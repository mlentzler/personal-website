import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "./Typewriter";

interface NavigationProps {
  startTrigger: boolean;
  skipAnimation?: boolean;
  onMenuComplete?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  startTrigger,
  skipAnimation = false,
  onMenuComplete,
}) => {
  const navigate = useNavigate();

  const [headerFinished, setHeaderFinished] = useState(skipAnimation);
  const [visibleItemsCount, setVisibleItemsCount] = useState(
    skipAnimation ? 4 : 0,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasCalledComplete = useRef(false);

  const items = useMemo(
    () => [
      {
        id: "projects",
        label: "Projects",
        action: () => console.log("Navigate to projects"),
      },
      { id: "about", label: "About Me", action: () => navigate("/about") },
      {
        id: "contact",
        label: "Contact",
        action: () => (window.location.href = "mailto:michel@lentzler.com"),
      },
      {
        id: "github",
        label: "GitHub",
        action: () => window.open("https://github.com/mlentzler", "_blank"),
      },
    ],
    [navigate],
  );

  useEffect(() => {
    if (skipAnimation) {
      setHeaderFinished(true);
      setVisibleItemsCount(items.length);
    }
  }, [skipAnimation, items.length]);

  const allItemsFinished = visibleItemsCount >= items.length;

  const handleHeaderComplete = useCallback(() => {
    setHeaderFinished(true);
  }, []);

  const handleItemComplete = useCallback(() => {
    setVisibleItemsCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (
      allItemsFinished &&
      onMenuComplete &&
      !skipAnimation &&
      !hasCalledComplete.current
    ) {
      hasCalledComplete.current = true;
      const timeout = setTimeout(() => onMenuComplete(), 0);
      return () => clearTimeout(timeout);
    }
  }, [allItemsFinished, onMenuComplete, skipAnimation]);

  useEffect(() => {
    if (!allItemsFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "k":
          setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
          break;
        case "ArrowDown":
        case "j":
          setSelectedIndex((prev) => (prev + 1) % items.length);
          break;
        case "Enter":
        case " ":
          items[selectedIndex].action();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, items, allItemsFinished]);

  if (!startTrigger && !skipAnimation) return null;

  return (
    <div className="mt-12 w-full max-w-xs text-left px-4">
      {!skipAnimation ? (
        <Typewriter
          lines={[
            {
              text: "SELECT AN OPTION:",
              className: "text-cat-overlay0 text-sm mb-4 tracking-widest",
            },
          ]}
          speed={30}
          onComplete={handleHeaderComplete}
          hideCursorOnComplete={true}
        />
      ) : (
        <div className="text-cat-overlay0 text-sm mb-4 tracking-widest font-mono">
          SELECT AN OPTION:
        </div>
      )}

      {headerFinished && (
        <ul className="space-y-2 font-mono">
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            const isVisible = index < visibleItemsCount;
            const isCurrentlyTyping = index === visibleItemsCount;

            if (skipAnimation) {
              return (
                <li
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`cursor-pointer flex items-center transition-all duration-200 ${
                    isSelected
                      ? "text-cat-mauve translate-x-2"
                      : "text-cat-text opacity-70"
                  }`}
                >
                  <span className="mr-3 font-bold w-8">
                    {isSelected ? "[x]" : "[ ]"}
                  </span>
                  <span
                    className={`${isSelected ? "underline decoration-cat-mauve font-bold" : ""}`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            }

            if (!isVisible && !isCurrentlyTyping) return null;

            if (isCurrentlyTyping) {
              return (
                <li
                  key={item.id}
                  className="flex items-center text-cat-text opacity-70"
                >
                  <Typewriter
                    lines={[{ text: `[ ] ${item.label}`, className: "" }]}
                    speed={40}
                    onComplete={handleItemComplete}
                    hideCursorOnComplete={true}
                  />
                </li>
              );
            }

            return (
              <li
                key={item.id}
                onClick={allItemsFinished ? item.action : undefined}
                onMouseEnter={() => allItemsFinished && setSelectedIndex(index)}
                className={`cursor-pointer flex items-center transition-all duration-200 ${
                  isSelected && allItemsFinished
                    ? "text-cat-mauve translate-x-2"
                    : "text-cat-text opacity-70"
                }`}
              >
                <span className="mr-3 font-bold w-8">
                  {isSelected && allItemsFinished ? "[x]" : "[ ]"}
                </span>
                <span
                  className={`${isSelected && allItemsFinished ? "underline decoration-cat-mauve font-bold" : ""}`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}

          {allItemsFinished && (
            <div
              className={`mt-8 text-[10px] text-cat-overlay0 opacity-50 font-mono italic ${!skipAnimation ? "animate-in fade-in duration-700" : ""}`}
            >
              Use [j/k] or [↑/↓] to navigate • [Enter] to select
            </div>
          )}
        </ul>
      )}
    </div>
  );
};
