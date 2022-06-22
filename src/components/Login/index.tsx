import { useState } from "react";
import { ILogin, ILoginProps } from "../../Interfaces/Common";
import { processLogin } from "../../utility/LoginManager";
import "./index.css";
import enums from "../../utility/Enums";

const Login = (props: ILoginProps): JSX.Element => {
  const [loginData, setLoginData] = useState({} as ILogin);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    processLogin(props, loginData);
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

export default Login;
