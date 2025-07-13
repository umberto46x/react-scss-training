import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <div className="counterContainer">
        <button
          className="setCounterBtn"
          onClick={() => setCount((pre) => pre * 2)}
        >
          Double it!
        </button>
        <div className="counter">Count: {count}</div>;
      </div>
    </>
  );
};
