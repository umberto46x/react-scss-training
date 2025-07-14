import { useDispatch, useSelector } from "react-redux";
import type { State } from "../stores/store";
import { useState } from "react";
import { setFilter, type Filter } from "../slices/filterSlice";
import { addToDo, deleteToDo } from "../slices/todosSlice";

export const Todos = () => {
  const [text, setText] = useState("");
  const todosState = useSelector((s: State) => s.todos);
  const filterState = useSelector((s: State) => s.filter.filter);
  const dispatch = useDispatch();

  return (
    <>
      <div className="todos_container">
        <h1 className="todos_title">Todos</h1>
        
        <div className="todos_inputs">
          <input
            type="text"
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Insert a ToDo description"
          />
          <input
            type="submit"
            value={"Submit the To Do"}
            onClick={() => dispatch(addToDo(text))}
          />
          <button
            onClick={() => dispatch(setFilter("All" as unknown as Filter))}
          >
            Select All Todos
          </button>
          <button
            onClick={() =>
              dispatch(setFilter("Not Completed" as unknown as Filter))
            }
          >
            Select Not Completed Todos
          </button>
          <button
            onClick={() =>
              dispatch(setFilter("Completed" as unknown as Filter))
            }
          >
            Select Completed Todos
          </button>
        </div>

        <div className="todos_wrapper">
          <ul>
            {todosState
              .filter((t) => String(t.status) === String(filterState))
              .map((todo) => (
                <li>
                  {todo.id} - {todo.description} - {todo.status}{" "}
                  <button onClick={() => dispatch(deleteToDo(todo.id))}>
                    {" "}
                    X{" "}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
