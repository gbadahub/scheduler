import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    // setHistory((prev) => [...prev, mode]);
    setHistory((prev) =>
      replace ? [...prev.slice(0,-1), mode] : [...prev, mode]
    );
  }

  // returns last item
  function back() {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }
  return { mode: history[history.length - 1], transition, back };
}
