import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateAccountView from "./views/Login/CreateAccountView";
import LoginView from "./views/Login/LoginView";
import MainAdmView from "./views/Main/MainAdmView";
import MainClientView from "./views/Main/MainClientView";
import RegisterBarberView from "./views/Main/RegisterBarberView";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginView />} path="/" />
        <Route element={<CreateAccountView />} path="/createAccount" />
        <Route element={<MainAdmView />} path="/adm" />
        <Route element={<MainClientView />} path="/client" />
        <Route element={<RegisterBarberView />} path="/barber/register" />
      </Routes>
    </BrowserRouter>
  );
};