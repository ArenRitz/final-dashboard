import { useState } from 'react';


// handle transitions between modes
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  let historyT = [...history];
  let historyB = [...history];

  const transition = (newMode, replace = false) => {
    // if replace is true, replace the current mode with the new mode
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      historyT.push(newMode);
      setHistory(historyT);
    }
  };
  // transition to the previous mode in the history
  const back = () => {
    historyB.pop();
    setHistory(historyB);
    if (history.length > 1) {
      setMode(historyB[(historyB.length - 1)]);
    }
  };

  return { mode, transition, back }
}


