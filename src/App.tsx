import "./App.css";
import Employee from "./components/Employee";

function App() {
  return (
    <div className="app-container">
      <Employee moduleName="Employee" />
      <br />
      <Employee moduleName="Performance Review" />
      <br />
      <Employee moduleName="Feedback" />
    </div>
  );
}

export default App;
