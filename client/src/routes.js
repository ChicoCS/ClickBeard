import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateAccountView from "./views/Login/CreateAccountView";
import LoginView from "./views/Login/LoginView";
import MainAdmView from "./views/Main/MainAdmView";
import MainClientView from "./views/Main/MainClientView";
import RegisterBarberView from "./views/Main/RegisterBarberView";
import RegisterScheduleView from "./views/Main/RegisterScheduleView";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginView />} path="/" />
        <Route element={<CreateAccountView />} path="/createAccount" />
        <Route element={<MainAdmView />} path="/adm/:id" />
        <Route element={<MainClientView />} path="/client/:id" />
        <Route element={<RegisterBarberView />} path="/:admin/barber/register" />
        <Route element={<RegisterScheduleView />} path="/:client/schedule/register" />
      </Routes>
    </BrowserRouter>
  );
};