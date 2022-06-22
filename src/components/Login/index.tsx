import { useState } from "react";
import { connect } from "react-redux";
import IEmployee from "../../Interfaces/Employee";
import { ILogin, IKeyValuePair } from "../../Interfaces/Common";
import { saveLoginInfo } from "../../redux/actions";
import { getEmployeeByCredentials } from "../../utility/LoginManager";
import "./index.css";
import { IState } from "../../Interfaces/Common";
import { setLoginInfo } from "../../utility/Common";
import history from "../../utility/History";
import enums from "../../utility/Enums";

interface ILoginProps extends IKeyValuePair {
  loginCallBack?: Function;
}

const Login = (props: ILoginProps): JSX.Element => {
  const [loginData, setLoginData] = useState({} as ILogin);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Get Employee record form the JSON Server Database for the given username and password.
    await getEmployeeByCredentials(loginData.username, loginData.password).then(
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
      <h4>{enums.msg.loginSteps}</h4>
      <div className="row">
        <div className="column">
          <input
            type="text"
            name="username"
            placeholder="Enter the username"
            value={loginData.username}
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
