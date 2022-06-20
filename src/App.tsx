import "./App.css";
import Employee from "./components/Employee";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { connect } from "react-redux";
import { IAppProps, IState } from "./redux/interfaces";
import IEmployee from "./Interfaces/Employee";
import { getLoginInfo, setLoginInfo } from "./utility/Common";
import { saveLoginInfo } from "./redux/actions";

function App(props: IAppProps) {
  const handleClick = () => {
    setLoginInfo({} as IEmployee);
    props.saveLoginInfo({} as IEmployee);
    window.location.href = "http://localhost:3000/#/login";
    window.location.reload();
  };

  let emplpyee: IEmployee = getLoginInfo();

  return (
    <Router>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">Employee Management System</div>
        </div>
        {emplpyee?.userName ? (
          <>
            <div className="nav-btn">
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <div className="nav-links">
              {emplpyee.isAdmin ? (
                <>
                  <Link to="/employee">Employee</Link>
                  <Link to="/review">Performance Review</Link>
                </>
              ) : // Employee view
              emplpyee?.userName ? (
                <Link to="/feedback">Feedback</Link>
              ) : null}
              <Link to="/login" onClick={handleClick} className="btn-logout">
                Logout
              </Link>
            </div>
          </>
        ) : null}
      </div>

      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin view */}
          {emplpyee.isAdmin ? (
            <>
              <Route
                path="/employee"
                element={<Employee moduleName="Employee" />}
              />
              <Route
                path="/review"
                element={<Employee moduleName="Performance Review" />}
              />
            </>
          ) : // Employee view
          emplpyee?.userName ? (
            <Route
              path="/feedback"
              element={<Employee moduleName="Feedback" />}
            />
          ) : null}
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: IState) => {
  return { user: state.user };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    saveLoginInfo: (employee: IEmployee) => dispatch(saveLoginInfo(employee)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
