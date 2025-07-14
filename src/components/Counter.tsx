import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../stores/store";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../slices/counterSlice";

export const Counter = () => {
  const state = useSelector((s: State) => s.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);

  return (
    <>
      <div className="counterContainer">
        <input
          onChange={(e) => setAmount(Number(e.currentTarget.value))}
          className="setCounterAmount"
          type="number"
          name="amount"
          id="amount"
        />
        <button className="setCounterBtn" onClick={() => dispatch(increment())}>
          Increase By 1
        </button>
        <button className="setCounterBtn" onClick={() => dispatch(decrement())}>
          Decrease By 1
        </button>
        <button
          className="setCounterBtn"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          Increase By amount {amount}
        </button>
        <button
          className="setCounterBtn"
          onClick={() => dispatch(decrementByAmount(amount))}
        >
          Decrease By amount {amount}
        </button>
        <div className="counter">Count: {state}</div>;
      </div>
    </>
  );
};
