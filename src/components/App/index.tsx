import "./index.css";
import Employee from "../Employee";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../Login";
import { connect } from "react-redux";
import { IReducer, IKeyValuePair } from "../../Interfaces/Common";
import IEmployee from "../../Interfaces/Employee";
import {
  getLoginInfo,
  getModuleName,
  mergeStrings,
  setLoginInfo,
} from "../../utility/Common";
import { saveLoginInfo } from "../../redux/actions";
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

function App(props: IKeyValuePair) {
  const [moduleName, setModuleName] = useState(getModuleName());

  const handleClickLogout = () => {
    const employee = {} as IEmployee;
    setLoginInfo(employee);
    props.saveLoginInfo(employee);
    setModuleName(LOGOUT);
    history.push("/");
  };
  let employee: IEmployee = getLoginInfo();

  return (
    <Router>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">Employee Management System</div>
          <span>
            {employee?.userName
              ? `Login by "${mergeStrings(
                  employee.firstName,
                  employee.lastName
                )}" as ${employee.isAdmin ? "Admin" : "Employee"}`
              : ""}
          </span>
        </div>
        {employee?.userName ? (
          <>
            <div className="nav-btn">
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <div className="nav-links">
              <Link to="/home">Home</Link>
              {employee.isAdmin ? (
                <>
                  <Link to="/employee" onClick={() => setModuleName(EMPLOYEE)}>
                    Employee
                  </Link>
                  <Link
                    to="/review"
                    onClick={() => setModuleName(PERFORMANCE_REVIEW)}
                  >
                    Performance Review
                  </Link>
                </>
              ) : (
                // Employee view
                <Link to="/feedback" onClick={() => setModuleName(FEEDBACK)}>
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
          {employee?.userName ? (
            <>
              <Route path="/home" element={<Home user={employee} />} />

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
              element={<Login loginCallBack={() => setModuleName(HOME)} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: IReducer) => {
  return { user: state.login.user };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    saveLoginInfo: (employee: IEmployee) => dispatch(saveLoginInfo(employee)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
