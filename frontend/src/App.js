import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import User from "./components/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      {/* <User /> */}
    </div>
  );
}

export default App;
