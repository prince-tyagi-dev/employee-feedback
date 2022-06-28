import "./index.css";
import Employee from "../Employee";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../Login";
import {
  getLoginSession,
  mergeStrings,
  setLoginSession,
} from "../../utility/Common";
import Home from "../Home";
import { useState } from "react";
import history from "../../utility/History";
import {
  EMPLOYEE,
  FEEDBACK,
  HOME,
  LOGOUT,
  PERFORMANCE_REVIEW,
} from "../../utility/Modules";
import enums from "../../utility/Enums";
import { LoginContext } from "../../Contexts/LoginContexts";
import IEmployee from "../../Interfaces/Employee";
import { INITIAL_EMPLOYEE } from "../../utility/EmployeeManager";

function App() {
  const [loginData, setLoginData] = useState<IEmployee>(getLoginSession());

  const handleClickLogout = () => {
    setLoginSession(null);
    setLoginData(INITIAL_EMPLOYEE);
    history.push("/");
  };

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      <Router>
        <div className="nav">
          <input type="checkbox" id="nav-check" />
          <div className="nav-header">
            <div className="nav-title">{enums.msg.appHeaderTitle}</div>
            <span>
              {loginData?.username
                ? `Login by "${mergeStrings(
                    loginData.firstName,
                    loginData.lastName
                  )}" as ${loginData.isAdmin ? "Admin" : "Employee"}`
                : ""}
            </span>
          </div>
          {loginData?.username ? (
            <>
              <div className="nav-btn">
                <label htmlFor="nav-check">
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
              </div>
              <div className="nav-links">
                <Link to="/">{HOME}</Link>
                {loginData.isAdmin ? (
                  <>
                    <Link to="/employee">{EMPLOYEE}</Link>
                    <Link to="/review">{PERFORMANCE_REVIEW}</Link>
                  </>
                ) : (
                  // Employee view
                  <Link to="/feedback">{FEEDBACK}</Link>
                )}
                <Link to="/" onClick={handleClickLogout} className="btn-logout">
                  {LOGOUT}
                </Link>
              </div>
            </>
          ) : null}
        </div>

        <div className="app-container">
          <Routes>
            {loginData?.username ? (
              <>
                <Route path="/" element={<Home />} />

                {/* Admin view */}
                {loginData.isAdmin ? (
                  <>
                    <Route
                      path="/employee"
                      element={<Employee moduleName={EMPLOYEE} />}
                    />
                    <Route
                      path="/review"
                      element={<Employee moduleName={PERFORMANCE_REVIEW} />}
                    />
                  </>
                ) : (
                  //  Employee view
                  <Route
                    path="/feedback"
                    element={<Employee moduleName={FEEDBACK} />}
                  />
                )}
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
