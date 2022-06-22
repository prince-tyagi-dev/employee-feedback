import "./index.css";
import Employee from "../Employee";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../Login";
import {
  getLoginInfo,
  getModuleName,
  mergeStrings,
  setLoginInfo,
} from "../../utility/Common";
import Home from "../Home";
import { useState } from "react";
import history from "../../utility/History";
import { LOGOUT } from "../../utility/Modules";
import enums from "../../utility/Enums";

function App() {
  const [moduleName, setModuleName] = useState(getModuleName());

  const handleClickLogout = () => {
    setLoginInfo(null);
    setModuleName(LOGOUT);
    history.push("/");
  };
  const handleClickLink = (e: any) => {
    const moduleName = getModuleName(e.target.href);
    setModuleName(moduleName);
  };

  let employee = getLoginInfo();

  return (
    <Router>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">{enums.msg.appHeaderTitle}</div>
          <span>
            {employee?.username
              ? `Login by "${mergeStrings(
                  employee.firstName,
                  employee.lastName
                )}" as ${employee.isAdmin ? "Admin" : "Employee"}`
              : ""}
          </span>
        </div>
        {employee?.username ? (
          <>
            <div className="nav-btn">
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              {employee.isAdmin ? (
                <>
                  <Link to="/employee" onClick={handleClickLink}>
                    Employee
                  </Link>
                  <Link to="/review" onClick={handleClickLink}>
                    Performance Review
                  </Link>
                </>
              ) : (
                // Employee view
                <Link to="/feedback" onClick={handleClickLink}>
                  Feedback
                </Link>
              )}
              <Link to="/" onClick={handleClickLogout} className="btn-logout">
                Logout
              </Link>
            </div>
          </>
        ) : null}
      </div>

      <div className="app-container">
        <Routes>
          {employee?.username ? (
            <>
              <Route path="/" element={<Home user={employee} />} />

              {/* Admin view */}
              {employee.isAdmin ? (
                <>
                  <Route
                    path="/employee"
                    element={<Employee moduleName={moduleName} />}
                  />
                  <Route
                    path="/review"
                    element={<Employee moduleName={moduleName} />}
                  />
                </>
              ) : (
                //  Employee view
                <Route
                  path="/feedback"
                  element={<Employee moduleName={moduleName} />}
                />
              )}
            </>
          ) : (
            <Route
              path="/"
              element={<Login loginCallBack={handleClickLink} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
