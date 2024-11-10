// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
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
    // Registration logic (store data, call API, etc.)
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="input"
        required
      />
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
        Register
      </button>
    </form>
  );
}

export default Register;
