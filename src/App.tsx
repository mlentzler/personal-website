import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TerminalWindow } from "./components/TerminalWindow";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";

function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  return (
    <BrowserRouter>
      <TerminalWindow>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                hasSeenIntro={hasSeenIntro} 
                onIntroComplete={() => setHasSeenIntro(true)} 
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </TerminalWindow>
    </BrowserRouter>
  );
}

export default App;
