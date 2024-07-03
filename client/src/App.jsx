import PlannerPage from "./components/planner/PlannerPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import authChecker from "./utils/helper.util";
import { useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage"


function App() {

  const cookies = new Cookies();

  const [jwtToken, setJwtToken] = useState(cookies.get("jwt_auth") || null);

  let decoded;
  if (jwtToken) {
    try {
      decoded = jwtDecode(jwtToken);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  } else {
    console.log(jwtToken);
  }

  useEffect(() => {
    cookies.set("jwt_auth", jwtToken, { path: "/" });
  }, [jwtToken]);

  


  return (
    <div className="h-screen w-full font-cusT">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={authChecker(<Home decoded={decoded} />)} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/" element={<Login setJwtToken={setJwtToken} jwtToken={jwtToken} />} />
          <Route path="/signin" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
