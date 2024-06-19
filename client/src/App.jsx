import DetailTodo from "./components/Details/DetailTodo";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="abc font-cusT">
                <Header />

                <Main />
              </div>
            }
          />

          <Route path="/details" element={<DetailTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
