import { useContext, useState } from "react";
import { ILogin } from "../../Interfaces/Common";
import { processLogin } from "../../utility/LoginManager";
import "./index.css";
import enums from "../../utility/Enums";
import { LoginContext } from "../../Contexts/LoginContexts";

const Login = (): JSX.Element => {
  const [loginFormData, setLoginFormData] = useState({} as ILogin);
  const { setLoginData } = useContext(LoginContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    processLogin(loginFormData, setLoginData);
  };

  const handleChange = (e: any) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
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
            value={loginFormData.username}
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
            value={loginFormData.password}
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
