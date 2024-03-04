import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Pages/Login";
import { HashRouter, Route, Routes } from "react-router-dom";
import { registerGlobalLibs } from "./Util/globalLibs";
import { ConfigureAxios } from "./Util/configureAxios";
import AppFrame from "./AppFrame";
import { Register } from "./Pages/Register";
import { RegisterSuccess } from "./Pages/RegisterSuccess";
registerGlobalLibs();
ConfigureAxios();
function App() {
  return (
    <div className="App h-[100vh]">
      <HashRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerSuccess" element={<RegisterSuccess />} />
          <Route path="*" element={<AppFrame />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
