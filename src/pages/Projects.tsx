import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from '../components/Typewriter';

interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  tech: string[];
  status: string;
  size: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    name: 'ZulassungsstelleBot', 
    type: 'Automation', 
    description: 'A high-performance bot designed to automatically monitor and book available time slots at the local vehicle registration office (Zulassungsstelle). It polls the appointment system and secures slots faster than manual interaction.', 
    tech: ['Go', 'Web Scraping', 'Automation'], 
    status: 'Active', 
    size: '1.2mb',
    githubUrl: 'https://github.com/mlentzler/ZulassungsstelleBot'
  },
  { 
    id: 2, 
    name: 'MyRestaurantList', 
    type: 'Fullstack App', 
    description: 'A mobile-first web application for food enthusiasts to track restaurant visits, rate specific dishes, and manage a culinary wishlist. The application is self-hosted within a Docker container on a Raspberry Pi and is made securely accessible to the public via a Cloudflare tunnel.', 
    tech: ['React', 'Node.js', 'SQLite', 'Docker', 'Cloudflare'], 
    status: 'Released', 
    size: '15.2mb',
    liveUrl: 'https://restaurantlist.app'
  },
  { 
    id: 3, 
    name: 'mortalityClock', 
    type: 'Web App', 
    description: 'A minimalist "Memento Mori" visualization that displays your current age as a high-precision floating-point number. It serves as a constant, real-time reminder of the passage of time, encouraging focus and productivity.', 
    tech: ['HTML', 'CSS', 'JavaScript'], 
    status: 'Completed', 
    size: '142kb',
    githubUrl: 'https://github.com/mlentzler/mortalityClock',
    liveUrl: 'https://mortalityclock.lentzler.com'
  },
  { 
    id: 4, 
    name: 'Dotfiles & Configs', 
    type: 'System', 
    description: 'A consolidated collection of my personal development environment configurations. Includes setups for Neovim (Lua), Kitty Terminal, and AeroSpace window manager, optimized for a keyboard-centric workflow on macOS.', 
    tech: ['Lua', 'Shell', 'TOML', 'Vim Script'], 
    status: 'Maintained', 
    size: '8.4mb',
    githubUrl: 'https://github.com/mlentzler/neovim-config'
  },
  { 
    id: 5, 
    name: 'TodoList', 
    type: 'Web Utility', 
    description: 'A clean and efficient task management application. Built to track daily tasks with a focus on simplicity and user experience.', 
    tech: ['JavaScript', 'Web'], 
    status: 'Archived', 
    size: '450kb',
    githubUrl: 'https://github.com/mlentzler/TodoList'
  },
];

export function Projects() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'k':
        setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
        break;
      case 'ArrowDown':
      case 'j':
        setSelectedIndex((prev) => (prev + 1) % projects.length);
        break;
      case 'Enter':
        if (introFinished) {
           const p = projects[selectedIndex];
           if (p.liveUrl) window.open(p.liveUrl, '_blank');
           else if (p.githubUrl) window.open(p.githubUrl, '_blank');
        }
        break;
      case 'Backspace':
      case 'Escape':
      case 'q':
      case 'b':
        navigate('/');
        break;
      default:
        break;
    }
  }, [navigate, introFinished, selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const selectedProject = projects[selectedIndex];

  return (
    <div className="flex flex-col w-full h-full font-mono text-cat-text select-none max-w-5xl mx-auto">
      <div className="px-4 py-4 shrink-0">
        <Typewriter 
          lines={[{ 
            segments: [{ text: "explore ~/lentzler.com/projects" }], 
            className: "text-cat-mauve" 
          }]}
          speed={20}
          onComplete={() => setIntroFinished(true)}
          hideCursorOnComplete={true}
        />
      </div>
      
      {introFinished && (
        <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300 px-4 pb-4">
          <div className="flex-1 flex border border-cat-surface0 overflow-hidden rounded-sm">
            
            {/* Sidebar */}
            <div className="w-2/5 border-r border-cat-surface0 p-0 flex flex-col bg-cat-mantle/10 shrink-0">
              <div className="px-4 py-2 border-b border-cat-surface0 text-[10px] text-cat-overlay0 uppercase tracking-widest bg-cat-crust/50">
                Projects
              </div>
              <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
                {projects.map((proj, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={proj.id}
                      className={`px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                        isSelected ? 'bg-cat-surface0 text-cat-mauve font-bold' : 'hover:bg-cat-surface0/20 text-cat-text opacity-70'
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 font-bold w-8 text-center">
                          {isSelected ? '[x]' : '[ ]'}
                        </span>
                        <span>{proj.name}</span>
                      </div>
                      <span className="text-[10px] opacity-40">{proj.size}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview Area */}
            <div className="w-3/5 bg-cat-base p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-cat-surface1 scrollbar-track-transparent">
              <div className="mb-6">
                <div className="flex justify-between items-end gap-4 mb-4">
                  <div className="flex-1">
                    <div className="text-cat-overlay0 text-[10px] mb-1 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">Project Name:</div>
                    <h2 className="text-2xl font-bold text-cat-green uppercase tracking-tight break-all leading-tight">{selectedProject.name}</h2>
                  </div>
                  
                  <div className="flex gap-3 shrink-0 pb-1">
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-cat-blue hover:text-cat-mauve transition-all group border border-cat-surface0 px-3 py-1.5 rounded-sm bg-cat-mantle/30 hover:bg-cat-surface0/50"
                      >
                        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                        <span className="text-[10px] font-bold uppercase tracking-widest group-hover:underline">Visit</span>
                      </a>
                    )}
                    
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-cat-mauve hover:text-cat-text transition-all group border border-cat-mauve/50 px-3 py-1.5 rounded-sm bg-cat-mauve/5 hover:bg-cat-mauve/20"
                      >
                        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-[10px] font-bold uppercase tracking-widest group-hover:underline">GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="h-px w-full bg-cat-surface0 mb-8"></div>
              </div>

              <div className="mb-8">
                <div className="text-cat-overlay0 text-[10px] mb-2 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">Technologies:</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-cat-surface0/50 text-cat-peach text-xs rounded border border-cat-surface1/30">
                      #{t.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-cat-overlay0 text-[10px] mb-2 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">Description:</div>
                <p className="text-cat-text leading-relaxed text-[13px]">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </div>

          <div className="h-6 flex items-center px-4 text-[11px] bg-cat-surface0/30 border-l border-r border-b border-cat-surface0 rounded-b-sm">
            <div className="text-cat-green font-bold mr-4">EXPLORE</div>
            <div className="flex-1 truncate opacity-70">
              {selectedIndex + 1}/{projects.length} files • {selectedProject.name}
            </div>
            <div className="flex gap-4 opacity-70">
              <span className="text-cat-blue font-bold tracking-tighter uppercase text-[10px]">Mode: Detailed View</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center px-2">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center text-cat-mauve hover:text-cat-green transition-colors font-mono cursor-pointer"
            >
              <span className="mr-2">[</span>
              <span className="group-hover:underline text-[10px] uppercase tracking-widest">Back to Menu</span>
              <span className="ml-2">]</span>
            </button>
            <div className="text-[10px] text-cat-overlay0 italic">
              j/k: navigate • enter: open • q: back
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
