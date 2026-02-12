import React, { type ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-cat-mantle flex flex-col font-mono text-cat-text overflow-hidden">
      {/* Title Bar */}
      <div className="bg-cat-crust h-8 flex items-center px-4 space-x-2 border-b border-cat-surface0 shrink-0">
        {/* Traffic light Buttons */}
        <div className="w-3 h-3 rounded-full bg-cat-red" />
        <div className="w-3 h-3 rounded-full bg-cat-yellow" />
        <div className="w-3 h-3 rounded-full bg-cat-green" />

        <div className="flex-1 text-center text-xs text-cat-overlay0 select-none pr-[50px]">
          michel@lentzler.com: ~
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">{children}</div>
    </div>
  );
};
