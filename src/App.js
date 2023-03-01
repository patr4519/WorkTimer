import axios from "axios";
import React from "react";

const link = "https://63fef788571200b7b7d2e115.mockapi.io/Time"; // lovchikov45@mail.ru

function App() {
  let hours = 1;
  let minutes = 0;
  let seconds = 0;

  React.useEffect(() => {
    axios
      .get("https://63fef788571200b7b7d2e115.mockapi.io/Time")
      .then(res => (res.data[0].time))
      .then((res) => {
        hours = res.h;
        minutes = res.m;
        seconds = res.s
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [hours, minutes, seconds])

  return (
    <>
      <CountUp hours={hours} minutes={minutes} seconds={seconds} />
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
        `https://63fef788571200b7b7d2e115.mockapi.io/Time/${'1'}`
      );
      await axios.post("https://63fef788571200b7b7d2e115.mockapi.io/Time", {
        time: { h, m, s },
      });
    } catch (error) {
      alert("Не удалось сохранить информацию");
    }
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
        <button onClick={addDateToServer}>Save progress</button>
      </div>
    </>
  );
};

export default App;
