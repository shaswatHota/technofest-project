import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./Pages/Home"; // Make sure this path is correct
import './App.css';
import RequireProfileComplete from "./components/RequireProfileComplete";
import CreateProfile from "./Pages/CreateProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={
            <RequireProfileComplete>
              <Home />
            </RequireProfileComplete>
          }
        />
        <Route path="/initial-create-profile" element={<CreateProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
