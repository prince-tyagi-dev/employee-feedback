import { useContext } from "react";
import { LoginContext } from "../../Contexts/LoginContexts";
import { IKeyValuePair } from "../../Interfaces/Common";
import { mergeStrings } from "../../utility/Common";
import "./index.css";

const Home = (props: IKeyValuePair): JSX.Element => {
  const { loginData } = useContext(LoginContext);
  
  return (
    <h1 className="welcome-name">
      <span>
        {`Welcome ${mergeStrings(loginData?.firstName, loginData?.lastName)}`}
      </span>
    </h1>
  );
};

export default Home;
