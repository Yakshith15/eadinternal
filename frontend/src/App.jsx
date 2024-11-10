import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtecetedRoute';
import Login from './pages/Login';

function App() {
  const isAuthenticated = false/* logic to check authentication */;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
