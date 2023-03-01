import React from "react";

function App() {
  return (
    <>
      <CountUp hours={1} minutes={0} seconds={0}/>
    </>
  );
}

const CountUp = ({ hours, minutes, seconds }) => {
  const [paused, setPaused] = React.useState(true);

  let [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

  const tick = () => {
    if (paused) return;

    if (m === 60) {
      setTime([(h += 1), (m = 0), (s = 0)]);
    } else if (s === 60) {
      setTime([h, (m += 1), (s = 0)]);
    } else {
      setTime([h, m, (s = s + 1)]);
    }
  };

  const reset = () => {
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    setPaused(true);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timerID);
  }, [paused]);

  return (
    <>
      <h1>Working time</h1>
      <div>
        <p>{`${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p>
        <button onClick={() => setPaused(!paused)}>
          {paused ? "Start" : "Pause"}
        </button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </>
  );
};

export default App;
