import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
  let user = null;
  const userData = localStorage.getItem("user");

  if (userData) {
    user = JSON.parse(userData);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
