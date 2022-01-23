import { createGlobalState } from "react-hooks-global-state";
const { useGlobalState } = createGlobalState({
  user: JSON.parse(localStorage.getItem("user")),
});
export { useGlobalState };
