import axios from "axios";
import React from "react";

const link = "https://63fef788571200b7b7d2e115.mockapi.io/Time"; // lovchikov45@mail.ru

function App() {
  let [hours, setHours] = React.useState(0);
  let [minutes, setMinutes] = React.useState(0);
  let [seconds, setSeconds] = React.useState(0);
  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(link)
      .then((res) => res.data[0].time)
      .then((res) => {
        setHours(res.h);
        setMinutes(res.m);
        setSeconds(res.s);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [hours, minutes, seconds]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <CountUp hours={hours} minutes={minutes} seconds={seconds} />
      )}
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

  const addDateToServer = async () => {
    try {
      await axios.delete(
        `https://63fef788571200b7b7d2e115.mockapi.io/Time/${"1"}`
      );
      await axios.post("https://63fef788571200b7b7d2e115.mockapi.io/Time", {
        time: { h, m, s },
      });
    } catch (error) {
      alert("Failed to save information");
    }
  };

  React.useEffect(() => {
    const timerID = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timerID);
  }, [paused]);

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Working time</h1>
        <div className="timer">
          <p className="time">{`${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p>
          <button onClick={() => setPaused(!paused)}>
            {paused ? "Start" : "Pause"}
          </button>
          <button style={{ "--c": "red" }} onClick={() => reset()}>
            Reset
          </button>
          <button style={{ "--c": "orange" }} onClick={addDateToServer}>
            Save progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
