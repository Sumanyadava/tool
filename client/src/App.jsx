import PlannerPage from "./components/planner/PlannerPage";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
function App() {
  return (
    <div className="h-screen w-full font-cusT">
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <div className="abc ">
                <Header />

                <Main />
              </div>
            }
          />

          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
