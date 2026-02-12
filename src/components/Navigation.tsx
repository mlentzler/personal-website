import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from './Typewriter';

export const Navigation: React.FC<{ startTrigger: boolean }> = ({ startTrigger }) => {
  const navigate = useNavigate();
  const [headerFinished, setHeaderFinished] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    { id: 'projects', label: 'Projects', action: () => console.log('Navigate to projects') },
    { id: 'about', label: 'About Me', action: () => console.log('Navigate to about') },
    { id: 'contact', label: 'Contact', action: () => window.location.href = 'mailto:michel@lentzler.com' },
    { id: 'github', label: 'GitHub', action: () => window.open('https://github.com/mlentzler', '_blank') },
  ];

  const allItemsFinished = visibleItemsCount >= items.length;

  useEffect(() => {
    if (!allItemsFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'k':
          setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
          break;
        case 'ArrowDown':
        case 'j':
          setSelectedIndex((prev) => (prev + 1) % items.length);
          break;
        case 'Enter':
        case ' ':
          items[selectedIndex].action();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items, allItemsFinished]);

  if (!startTrigger) return null;

  return (
    <div className="mt-12 w-full max-w-xs text-left px-4">
      <Typewriter 
        lines={[{ text: "SELECT AN OPTION:", className: "text-cat-overlay0 text-sm mb-4 tracking-widest" }]}
        speed={30}
        onComplete={() => setHeaderFinished(true)}
        hideCursorOnComplete={true}
      />
      
      {headerFinished && (
        <ul className="space-y-2 font-mono">
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            const isVisible = index < visibleItemsCount;
            const isCurrentlyTyping = index === visibleItemsCount;

            if (!isVisible && !isCurrentlyTyping) return null;

            if (isCurrentlyTyping) {
              return (
                <li key={item.id} className="flex items-center text-cat-text opacity-70">
                  <Typewriter 
                    lines={[{ text: `[ ] ${item.label}`, className: "" }]}
                    speed={40}
                    onComplete={() => setVisibleItemsCount(prev => prev + 1)}
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
                  isSelected && allItemsFinished ? 'text-cat-mauve translate-x-2' : 'text-cat-text opacity-70'
                }`}
              >
                <span className="mr-3 font-bold w-8">
                  {isSelected && allItemsFinished ? '[x]' : '[ ]'}
                </span>
                <span className={`${isSelected && allItemsFinished ? 'underline decoration-cat-mauve font-bold' : ''}`}>
                  {item.label}
                </span>
              </li>
            );
          })}
          
          {allItemsFinished && (
            <div className="mt-8 text-[10px] text-cat-overlay0 opacity-50 font-mono italic animate-in fade-in duration-700">
              Use [j/k] or [↑/↓] to navigate • [Enter] to select
            </div>
          )}
        </ul>
      )}
    </div>
  );
};
