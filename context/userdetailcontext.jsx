// context/userdetailcontext.jsx
import { createContext } from "react";

export const UserDetailContext = createContext({
  user: null,
  setUser: () => {},
});
