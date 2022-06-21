import { useState } from "react";
import { connect } from "react-redux";
import IEmployee from "../../Interfaces/Employee";
import ILogin from "../../Interfaces/ILogin";
import { saveLoginInfo } from "../../redux/actions";
import { getEmployeeByCredentials } from "../../utility/LoginManager";
import "./index.css";
import { IState } from "../../redux/interfaces";
import { setLoginInfo } from "../../utility/Common";
import history from "../../utility/History";
import IKeyValuePair from "../../Interfaces/IKeyValuePair";

interface ILoginProps extends IKeyValuePair {
  loginCallBack?: Function;
}

const Login = (props: ILoginProps): JSX.Element => {
  const [loginData, setLoginData] = useState({} as ILogin);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Get Employee record form the JSON Server Database for the given username and password.
    await getEmployeeByCredentials(loginData.userName, loginData.password).then(
      (response: any) => {
        if (response && response.length) {
          const employee = response[0] as IEmployee;
          setLoginInfo(employee);
          props.saveLoginInfo(employee);
          if (props.loginCallBack) {
            props.loginCallBack();
          }
          history.push("/home");
          window.location.reload();
        }
      }
    );
  };

  const handleChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h4>Enter the username and password for login to the system.</h4>
      <div className="row">
        <div className="column">
          <input
            type="text"
            name="userName"
            placeholder="Enter the username"
            value={loginData.userName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <input
            type="password"
            name="password"
            placeholder="Enter the password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <button type="submit" className="btn-login">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state: IState) => {
  return { user: state.user };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    saveLoginInfo: (employee: IEmployee) => dispatch(saveLoginInfo(employee)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
