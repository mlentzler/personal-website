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
    name: "Test 1",
    type: "Web App",
    description:
      "This is a detailed description for Test Project 1. It showcases the layout and formatting of the project preview area.",
    tech: ["React", "TypeScript", "Tailwind"],
    status: "Done",
    size: "1.2kb",
  },
  {
    id: 2,
    name: "Test 2",
    type: "CLI Tool",
    description:
      "This is a detailed description for Test Project 2. It demonstrates how different projects look when selected in the list.",
    tech: ["Rust", "Clap"],
    status: "Active",
    size: "0.8kb",
  },
  {
    id: 3,
    name: "Test 3",
    type: "API",
    description:
      "This is a detailed description for Test Project 3. You can see how the technology hashtags and metadata are displayed.",
    tech: ["Node.js", "Express", "PostgreSQL"],
    status: "In Progress",
    size: "2.5kb",
  },
  {
    id: 4,
    name: "Test 4",
    type: "Mobile",
    description:
      "This is a detailed description for Test Project 4. Use this as a template to fill in your real project information later.",
    tech: ["Flutter", "Dart"],
    status: "Alpha",
    size: "5.1kb",
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
                          ? "bg-cat-surface0 text-cat-mauve font-bold"
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
