// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "researcher", // Default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend for validation
    // For now, we're assuming login is always successful

    
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="input"
        required
      />
      <select name="role" onChange={handleChange} className="input" required>
        <option value="researcher">Researcher</option>
        <option value="dataProvider">Data Provider</option>
      </select>
      <button type="submit" className="btn-primary">
        Login
      </button>
    </form>
  );
}

export default Login;
