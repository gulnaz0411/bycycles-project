import React, { useState } from "react";

export const StoreContext = React.createContext();
export function StoreContextProvider({ children }) {
  const userToken = localStorage.getItem("token");

  const caseStates = [
    { value: "new", label: "Новый" },
    { value: "in_progress", label: "В работе" },
    { value: "done", label: "Завершен" },
  ];

  const bikeTypes = [
    { value: "general", label: "Городской" },
    { value: "sport", label: "Спортивный" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const apiDomain = "https://sf-final-project-be.herokuapp.com/api/";

  const store = {
    userToken,
    isLoggedIn,
    setIsLoggedIn,
    showAuthForm,
    setShowAuthForm,
    apiDomain,
    caseStates,
    bikeTypes,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
