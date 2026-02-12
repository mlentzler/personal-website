import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "../components/Typewriter";

interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  tech: string[];
  status: string;
  size: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "ZulassungsstelleBot",
    type: "Automation",
    description:
      "A bot designed to automatically monitor and book available time slots at the local vehicle registration office (Zulassungsstelle). It polls the appointment system and secures slots faster than manual interaction.",
    tech: ["Go", "Web Scraping", "Automation"],
    status: "Active",
    size: "1.2mb",
    // image: ''
  },
  {
    id: 2,
    name: "mortalityClock",
    type: "Web App",
    description:
      'A minimalist "Memento Mori" visualization that displays your current age as a high-precision floating-point number. It serves as a constant, real-time reminder of the passage of time, encouraging focus and productivity.',
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed",
    size: "142kb",
    // image: ''
  },
  {
    id: 3,
    name: "Dotfiles & Configs",
    type: "System",
    description:
      "A consolidated collection of my personal development environment configurations. Includes setups for Neovim (Lua), Kitty Terminal, and AeroSpace window manager, optimized for a keyboard-centric workflow on macOS.",
    tech: ["Lua", "Shell", "TOML", "Vim Script"],
    status: "Maintained",
    size: "8.4mb",
    // image: ''
  },
  {
    id: 4,
    name: "TodoList",
    type: "Web Utility",
    description:
      "A clean and efficient task management application. Built to track daily tasks with a focus on simplicity and user experience.",
    tech: ["JavaScript", "Web"],
    status: "Archived",
    size: "450kb",
    // image: ''
  },
];

export function Projects() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "k":
          setSelectedIndex(
            (prev) => (prev - 1 + projects.length) % projects.length,
          );
          break;
        case "ArrowDown":
        case "j":
          setSelectedIndex((prev) => (prev + 1) % projects.length);
          break;
        case "Backspace":
        case "Escape":
        case "q":
          navigate("/");
          break;
        default:
          break;
      }
    },
    [navigate],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const selectedProject = projects[selectedIndex];

  return (
    <div className="flex flex-col w-full h-full font-mono text-cat-text select-none max-w-5xl mx-auto">
      <div className="px-4 py-4 shrink-0">
        <Typewriter
          lines={[
            {
              text: "explore ~/lentzler.com/projects",
              className: "text-cat-mauve",
            },
          ]}
          speed={20}
          onComplete={() => setIntroFinished(true)}
          hideCursorOnComplete={true}
        />
      </div>

      {introFinished && (
        <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300 px-4 pb-8">
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
                        isSelected
                          ? "bg-cat-surface0 text-cat-mauve font-bold translate-x-1"
                          : "hover:bg-cat-surface0/20 text-cat-text opacity-70"
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 font-bold w-8">
                          {isSelected ? "[x]" : "[ ]"}
                        </span>
                        <span>{proj.name}</span>
                      </div>
                      <span className="text-[10px] opacity-40">
                        {proj.size}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Structured Preview Area */}
            <div className="w-3/5 bg-cat-base p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-cat-surface1 scrollbar-track-transparent">
              {/* 1. Project Name */}
              <div className="mb-8">
                <div className="text-cat-overlay0 text-[10px] mb-1 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                  Project Name:
                </div>
                <h2 className="text-3xl font-bold text-cat-green uppercase tracking-tight">
                  {selectedProject.name}
                </h2>
                <div className="h-px w-full bg-cat-surface0 mt-4"></div>
              </div>

              {/* 2. Technologies */}
              <div className="mb-8">
                <div className="text-cat-overlay0 text-[10px] mb-2 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                  Technologies:
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-cat-surface0/50 text-cat-peach text-xs rounded border border-cat-surface1/30"
                    >
                      #{t.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Description */}
              <div className="mb-8">
                <div className="text-cat-overlay0 text-[10px] mb-2 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                  Description:
                </div>
                <p className="text-cat-text leading-relaxed text-[13px]">
                  {selectedProject.description}
                </p>
              </div>

              {/* 4. Images (Optional) */}
              {selectedProject.image && (
                <div className="mb-4 animate-in fade-in duration-500">
                  <div className="text-cat-overlay0 text-[10px] mb-3 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                    Visual Reference:
                  </div>
                  <div className="border border-cat-surface0 rounded-sm overflow-hidden bg-cat-crust/50 group shadow-lg">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statusbar */}
          <div className="h-6 flex items-center px-4 text-[11px] bg-cat-surface0/30 border-l border-r border-b border-cat-surface0 rounded-b-sm">
            <div className="text-cat-green font-bold mr-4">EXPLORE</div>
            <div className="flex-1 truncate opacity-70">
              {selectedIndex + 1}/{projects.length} files •{" "}
              {selectedProject.name}
            </div>
            <div className="flex gap-4 opacity-70">
              <span className="text-cat-blue font-bold tracking-tighter uppercase">
                Mode: Detailed View
              </span>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-cat-overlay0 italic flex justify-between px-2">
            <span>j/k: navigate • q: back • scroll: enabled</span>
            <span>~/lentzler.com/projects</span>
          </div>
        </div>
      )}
    </div>
  );
}
