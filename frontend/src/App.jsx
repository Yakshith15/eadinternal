// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// You can keep this as a common home page component or just use DataProviderHome and ResearcherHome directly
import Register from "./pages/Register";
import Login from "./pages/Login";
import DataProviderHome from "./pages/DataProviderHome";
import ResearcherHome from "./pages/ResearcherHome";
import TopicData from "./pages/TopicData";
function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main route (Home) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "dataProvider" ? (
                <DataProviderHome />
              ) : (
                <ResearcherHome />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/data/:topic" element={<TopicData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
