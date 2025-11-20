"use client";

import { createContext, useState } from "react";

export const UsersContexts = createContext(null);

export default function UserContextProvider({ children }) {
  const [users, setUsers] = useState("Affan");

  return (
    <UsersContexts.Provider value={{ users, setUsers }}>
      {children}
    </UsersContexts.Provider>
  );
}
