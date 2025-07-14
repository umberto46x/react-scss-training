import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../slices/usersSlice";
import { useStateDispatch, type State } from "../stores/store";

export const Users = () => {
  const { entities, loading, error } = useSelector(
    (state: State) => state.users
  );
  const dispatch = useStateDispatch();

  useEffect(() => {
    if (loading === "idle") dispatch(fetchUsers());
  }, [loading, dispatch]);
  return (
    <>
      {loading === "pending" && <p>loading .....</p>}{" "}
      {loading === "failed" && <p>Error: {error}</p>}
      {loading === "succeeded" &&
        entities.map((user) => (
          <li key={user.id}>
            {user.name} - {user.username} - {user.email}
          </li>
        ))}
    </>
  );
};
