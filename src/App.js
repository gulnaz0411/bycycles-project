import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { SignUp } from "./components/SignUp/SignUp";
import { CaseForm } from "./components/CaseForm/CaseForm";
import { Main } from "./components/Main/Main";
import { OfficerDetail } from "./components/OfficerDetail/OfficerDetail";

import { AddOfficer } from "./components/AddOfficer/AddOfficer";
import axios from "axios";
import { StoreContext } from "./context/store";
import { OfficersList } from "./components/OfficersList/OfficersList";

function App() {
  const { setIsLoggedIn, apiDomain, userToken } = useContext(StoreContext);

  useEffect(() => {
    const checkAuthUrl = "auth";

    axios
      .get(apiDomain + checkAuthUrl, {
        headers: {
          Authorization: "bearer " + userToken,
        },
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.clear();
      });
  }, [setIsLoggedIn]);

  return (
    <div className="container">
      <Header />

      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/caseform" element={<CaseForm />}></Route>
          <Route path="/officers/:itemId" element={<OfficerDetail />}></Route>
          <Route path="/officers" element={<OfficersList />}></Route>
          <Route path="/add-officer" element={<AddOfficer />}></Route>
        
        </Routes>
      </div>
    </div>
  );
}

export default App;