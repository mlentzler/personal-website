import { BrowserRouter } from "react-router-dom";
import { TerminalWindow } from "./components/TerminalWindow";
import { Typewriter } from "./components/Typewriter";
import { Navigation } from "./components/Navigation";

function AppContent() {
  return (
    <TerminalWindow>
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto text-center mt-20">
        <Typewriter 
          lines={[
            { 
              text: "Hello, Welcome to Lentzler.com", 
              className: "text-4xl font-bold text-cat-mauve mb-2",
              speed: 70,
              delayAfter: 1000
            },
            { 
              text: "The personal website of Michel Lentzler", 
              className: "text-xl text-cat-text",
              speed: 50,
              delayAfter: 500
            }
          ]}
        />
        <Navigation showDelay={4500} />
      </div>
    </TerminalWindow>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
