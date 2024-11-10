import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = false/* logic to check authentication */;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? (
            <ProtectedRoute />
          ) : (
            <Navigate to="/register" replace />
          )
        } />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
