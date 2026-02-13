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
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "ZulassungsstelleBot",
    type: "Automation & TUI",
    description: `A sophisticated automation solution designed to navigate the highly competitive appointment system of the local vehicle registration office (Zulassungsstelle Pinneberg).

<span class='text-cat-mauve font-bold'>The Workflow:</span>
The application starts with a sleek <a href='https://github.com/charmbracelet/bubbletea' target='_blank' rel='noopener noreferrer' class='text-cat-mauve underline hover:text-cat-peach transition-colors'>Bubble Tea</a> powered interface where users input their personal details. It then guides the user through a dynamic category selection—driven by a hierarchical <span class='text-cat-peach'>menu.json</span> configuration—to define the exact service required using X-Path navigation.

<span class='text-cat-mauve font-bold'>Smart Scheduling:</span>
Users can choose between scanning for a <span class='text-cat-peach'>single specific date</span> or setting up a <span class='text-cat-peach'>recurring weekly schedule</span>. In recurring mode, the bot provides granular control, allowing users to define custom time windows for each individual day of the week.

<span class='text-cat-mauve font-bold'>The Engine:</span>
Under the hood, the bot utilizes <a href='https://github.com/chromedp/chromedp' target='_blank' rel='noopener noreferrer' class='text-cat-mauve underline hover:text-cat-peach transition-colors'>chromedp</a> for headless browser automation. It continuously polls the appointment system at configurable intervals, identifies available slots, and cross-references them with the user's availability. Upon finding a match, it automatically executes the multi-step booking process, injecting user data and confirming the appointment instantly.`,
    tech: ["Go", "Chromedp", "Bubble Tea", "X-Path", "Automation"],
    status: "Active",
    size: "1.2mb",
    githubUrl: "https://github.com/mlentzler/ZulassungsstelleBot",
    image: "./zulassungsstellebot_demo.gif",
  },
  {
    id: 2,
    name: "MyRestaurantList",
    type: "Fullstack & Social",
    description: `A mobile-first fullstack application inspired by the tracking logic of <span class='text-cat-mauve font-bold'>MyAnimeList</span>, built to catalog and rank culinary experiences.

The project was born out of a practical need: after visiting every ramen restaurant in Hamburg with my girlfriend, we realized we had lost track of which one actually served the best bowl. I developed this app to provide a definitive, shared record of our food adventures and to ensure no great meal is ever forgotten.

<span class='text-cat-mauve font-bold'>Collaborative Groups:</span>
Tailored for couples and friend groups, the <span class='text-cat-mauve'>Social Group Engine</span> allows users to maintain synchronized lists via unique join codes. This enables shared reviews, dish-specific ratings (Like/Dislike), and collective wishlist management.

<span class='text-cat-mauve font-bold'>Technical Stack & Security:</span>
The app implements secure <span class='text-cat-mauve'>JWT</span> authentication with <span class='text-cat-peach'>bcrypt</span> hashing. For privacy and control, the entire system is <span class='text-cat-mauve'>Dockerized</span> and self-hosted on a local <span class='text-cat-peach'>Raspberry Pi</span>, exposed to the web via a secure <span class='text-cat-peach'>Cloudflare Tunnel</span>.`,
    tech: ["React", "Node.js", "SQLite", "Docker", "JWT", "Cloudflare"],
    status: "Released",
    size: "15.2mb",
    liveUrl: "https://myrestaurantlist.app",
    image: "./myrestaurantlist_demo.gif",
  },
  {
    id: 3,
    name: "mortalityClock",
    type: "Web App",
    description: `A minimalist <span class='text-cat-mauve font-bold'>"Memento Mori"</span> productivity tool designed to visualize the relentless passage of time.

The project was inspired by the <a href='https://github.com/alphabt/mortality' target='_blank' rel='noopener noreferrer' class='text-cat-mauve underline hover:text-cat-peach transition-colors'>Mortality Chrome Plugin</a>. Upon realizing that no such native tool existed for Safari, I developed this browser-independent web application. It is intended to be set as a <span class='text-cat-mauve font-bold'>homepage</span>, providing a visceral reminder of life's brevity every time a new browsing session begins.

<span class='text-cat-mauve font-bold'>High-Precision Visualization:</span>
The core engine calculates the user's age with extreme precision, displaying it as a <span class='text-cat-peach'>9-decimal floating-point number</span>. By updating the state every 100ms, the app creates a "ticking" effect that serves as a real-time reminder of time's movement.

<span class='text-cat-mauve font-bold'>Technical Implementation:</span>
Built with React, the application utilizes <span class='text-cat-peach'>localStorage</span> to persist birth data and theme preferences locally. The logic accounts for leap years (<span class='text-cat-peach'>365.25 days</span>) to maintain accuracy over long durations and respects the user's system dark/light mode settings.`,
    tech: ["React", "JavaScript", "CSS", "LocalStorage", "Temporal Logic"],
    status: "Completed",
    size: "142kb",
    githubUrl: "https://github.com/mlentzler/mortalityClock",
    liveUrl: "https://mortalityclock.lentzler.com",
    image: "./mortalityClock_demo.gif",
  },
  {
    id: 4,
    name: "Dotfiles & Configs",
    type: "System",
    description:
      "A consolidated collection of my personal development environment configurations. Includes setups for Neovim (Lua), Kitty Terminal, and AeroSpace window manager, optimized for a keyboard-centric workflow on macOS.",
    tech: ["Lua", "Shell", "TOML", "Vim Script"],
    status: "Maintained",
    size: "8.4mb",
    githubUrl: "https://github.com/mlentzler/neovim-config",
  },
  {
    id: 5,
    name: "TodoList",
    type: "Web Utility",
    description:
      "A clean and efficient task management application. Built to track daily tasks with a focus on simplicity and user experience.",
    tech: ["JavaScript", "Web"],
    status: "Archived",
    size: "450kb",
    githubUrl: "https://github.com/mlentzler/TodoList",
  },
];

export function Projects() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const selectedProject = projects[selectedIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (showMobileDetail) {
        if (
          e.key === "Backspace" ||
          e.key === "Escape" ||
          e.key === "q" ||
          e.key === "ArrowLeft" ||
          e.key === "h"
        ) {
          setShowMobileDetail(false);
          return;
        }
      }

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
        case "Enter":
          if (introFinished) {
            if (window.innerWidth < 768 && !showMobileDetail) {
              setShowMobileDetail(true);
            } else {
              if (selectedProject.liveUrl)
                window.open(selectedProject.liveUrl, "_blank");
              else if (selectedProject.githubUrl)
                window.open(selectedProject.githubUrl, "_blank");
            }
          }
          break;
        case "Backspace":
        case "Escape":
        case "q":
        case "b":
          navigate("/");
          break;
        default:
          break;
      }
    },
    [navigate, introFinished, selectedProject, showMobileDetail],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleProjectSelect = (index: number) => {
    setSelectedIndex(index);
    if (window.innerWidth < 768) {
      setShowMobileDetail(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-full font-mono text-cat-text select-none max-w-7xl mx-auto px-4 md:px-12">
      <div className="px-4 py-4 shrink-0">
        <Typewriter
          lines={[
            {
              segments: [{ text: "explore ~/lentzler.com/projects" }],
              className: "text-cat-mauve",
            },
          ]}
          speed={20}
          onComplete={() => setIntroFinished(true)}
          hideCursorOnComplete={true}
        />
      </div>

      {introFinished && (
        <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300 px-0 md:px-4 pb-4">
          <div className="flex-1 flex border border-cat-surface0 overflow-hidden rounded-sm shadow-2xl relative">
            {/* Sidebar (List View) */}
            <div
              className={`${showMobileDetail ? "hidden md:flex" : "flex"} w-full md:w-80 border-r border-cat-surface0 p-0 flex flex-col bg-cat-mantle/10 shrink-0`}
            >
              <div className="px-4 py-2 border-b border-cat-surface0 text-[10px] text-cat-overlay0 uppercase tracking-widest bg-cat-crust/50">
                Projects
              </div>
              <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
                {projects.map((proj, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={proj.id}
                      className={`px-4 py-3 md:py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-cat-surface0 text-cat-mauve font-bold"
                          : "hover:bg-cat-surface0/20 text-cat-text opacity-70"
                      }`}
                      onClick={() => handleProjectSelect(index)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 font-bold w-8 text-center">
                          {isSelected ? "[x]" : "[ ]"}
                        </span>
                        <span className="text-sm md:text-base">
                          {proj.name}
                        </span>
                      </div>
                      <span className="text-[10px] opacity-40">
                        {proj.size}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Structured Preview Area (Detail View) */}
            <div
              className={`${showMobileDetail ? "flex" : "hidden md:flex"} flex-1 bg-cat-base flex flex-col overflow-hidden`}
            >
              {/* Mobile Header with Back Button */}
              <div className="md:hidden flex items-center p-4 border-b border-cat-surface0 bg-cat-crust/30">
                <button
                  onClick={() => setShowMobileDetail(false)}
                  className="text-cat-mauve text-xs flex items-center"
                >
                  <span className="mr-2">&lt; [BACK]</span>
                </button>
                <div className="flex-1 text-center text-[10px] text-cat-overlay0 uppercase tracking-widest truncate px-4">
                  {selectedProject.name}
                </div>
              </div>

              <div className="flex-1 p-6 md:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-cat-surface1 scrollbar-track-transparent">
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-4">
                    <div className="flex-1">
                      <div className="text-cat-overlay0 text-[10px] mb-1 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                        Project Name:
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-cat-green uppercase tracking-tight break-all leading-tight">
                        {selectedProject.name}
                      </h2>
                    </div>

                    <div className="flex gap-2 md:gap-3 shrink-0">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-cat-blue hover:text-cat-mauve transition-all group border border-cat-surface0 px-2 md:px-3 py-1 md:py-1.5 rounded-sm bg-cat-mantle/30 hover:bg-cat-surface0/50"
                        >
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 mr-2 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            Visit
                          </span>
                        </a>
                      )}

                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-cat-mauve hover:text-cat-text transition-all group border border-cat-mauve/50 px-2 md:px-3 py-1 md:py-1.5 rounded-sm bg-cat-mauve/5 hover:bg-cat-mauve/20"
                        >
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 mr-2 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                            GitHub
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="h-px w-full bg-cat-surface0 mb-6 md:mb-8"></div>
                </div>

                <div className="mb-6 md:mb-8">
                  <div className="text-cat-overlay0 text-[10px] mb-2 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                    Technologies:
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-cat-surface0/50 text-cat-peach text-[10px] md:text-xs rounded border border-cat-surface1/30"
                      >
                        #{t.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <div className="text-cat-overlay0 text-[10px] mb-2 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                    Description:
                  </div>
                  <div
                    className="text-cat-text leading-relaxed text-[13px] md:text-[14px] whitespace-pre-line text-justify pr-0 md:pr-4"
                    dangerouslySetInnerHTML={{
                      __html: selectedProject.description,
                    }}
                  ></div>
                </div>

                {selectedProject.image && (
                  <div className="mt-8 animate-in fade-in duration-700 pb-4">
                    <div className="text-cat-overlay0 text-[10px] mb-3 uppercase tracking-widest underline decoration-cat-surface1 underline-offset-4 decoration-1">
                      UI Preview:
                    </div>
                    <div
                      className={`border border-cat-surface0 rounded-sm overflow-hidden bg-cat-crust/50 group shadow-lg ${selectedProject.name === "MyRestaurantList" ? "max-w-[250px]" : "max-w-full"}`}
                    >
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
          </div>

          {/* Statusbar */}
          <div className="h-6 flex items-center px-4 text-[11px] bg-cat-surface0/30 border-l border-r border-b border-cat-surface0 rounded-b-sm">
            <div className="text-cat-green font-bold mr-4 hidden md:block">
              EXPLORE
            </div>
            <div className="flex-1 truncate opacity-70">
              {selectedIndex + 1}/{projects.length} • {selectedProject.name}
            </div>
            <div className="flex gap-4 opacity-70">
              <span className="text-cat-blue font-bold tracking-tighter uppercase text-[10px] hidden sm:inline">
                Detailed View
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center px-2">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center text-cat-mauve hover:text-cat-green transition-colors font-mono cursor-pointer"
            >
              <span className="mr-2">[</span>
              <span className="group-hover:underline text-[10px] uppercase tracking-widest">
                Back to Menu
              </span>
              <span className="ml-2">]</span>
            </button>
            <div className="text-[10px] text-cat-overlay0 italic hidden sm:block">
              j/k: navigate • enter: open • q: back
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
