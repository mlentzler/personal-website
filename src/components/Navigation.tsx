import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navigation: React.FC<{ showDelay?: number }> = ({ showDelay = 0 }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    { id: 'projects', label: 'Projects', action: () => console.log('Navigate to projects') },
    { id: 'about', label: 'About Me', action: () => console.log('Navigate to about') },
    { id: 'contact', label: 'Contact', action: () => window.location.href = 'mailto:michel@lentzler.com' },
    { id: 'github', label: 'GitHub', action: () => window.open('https://github.com/mlentzler', '_blank') },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), showDelay);
    return () => clearTimeout(timer);
  }, [showDelay]);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [selectedIndex, items, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="mt-12 w-full max-w-xs animate-in fade-in duration-1000">
      <div className="text-cat-overlay0 mb-4 text-sm font-mono uppercase tracking-widest">
        Select an option:
      </div>
      <ul className="space-y-2 font-mono">
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={item.id}
              onClick={item.action}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`cursor-pointer flex items-center transition-all duration-200 ${
                isSelected ? 'text-cat-mauve translate-x-2' : 'text-cat-text opacity-70'
              }`}
            >
              <span className={`mr-3 font-bold ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                {'>'}
              </span>
              <span className={`${isSelected ? 'underline decoration-cat-mauve font-bold' : ''}`}>
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 text-[10px] text-cat-overlay0 opacity-50 font-mono">
        Use [j/k] or [↑/↓] to navigate • [Enter] to select
      </div>
    </div>
  );
};
