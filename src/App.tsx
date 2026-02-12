import { TerminalWindow } from "./components/TerminalWindow";

function App() {
  return (
    <TerminalWindow>
      <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-cat-mauve mb-4">
          {">"} Welcome to lentzler.com...
        </h1>
        <p className="text-cat-mauve">Terminal border done right???</p>
      </div>
    </TerminalWindow>
  );
}

export default App;
