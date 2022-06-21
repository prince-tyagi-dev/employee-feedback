import IKeyValuePair from "../../Interfaces/IKeyValuePair";
import { mergeStrings } from "../../utility/Common";
import "./index.css";

const Home = (props: IKeyValuePair): JSX.Element => {
  return (
    <h1 className="welcome-name">
      <span>
        {`Welcome ${mergeStrings(
          props?.user?.firstName,
          props?.user?.lastName
        )}`}
      </span>
    </h1>
  );
};

export default Home;
