import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { TerminalWindow } from "./components/TerminalWindow";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import Impressum from "./pages/Impressum"; // Import the Impressum component

function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  return (
    <BrowserRouter>
      <AppContent
        hasSeenIntro={hasSeenIntro}
        setHasSeenIntro={setHasSeenIntro}
      />
    </BrowserRouter>
  );
}

function AppContent({
  hasSeenIntro,
  setHasSeenIntro,
}: {
  hasSeenIntro: boolean;
  setHasSeenIntro: (value: boolean) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "i" || event.key === "I") {
        navigate("/impressum");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  return (
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
        <Route path="/impressum" element={<Impressum />} />{" "}
        {/* New Impressum Route */}
      </Routes>
    </TerminalWindow>
  );
}

export default App;
