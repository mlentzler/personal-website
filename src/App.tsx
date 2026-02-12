import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TerminalWindow } from "./components/TerminalWindow";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <TerminalWindow>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </TerminalWindow>
    </BrowserRouter>
  );
}

export default App;
