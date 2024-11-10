// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "researcher", // Default role
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful login (you'd normally authenticate with a backend)
    const authToken = "mockToken"; // Should be a token from the backend
    localStorage.setItem("authToken", authToken); // Store token in localStorage
    localStorage.setItem("userRole", formData.role); // Store role in localStorage

    // Dispatch login action to Redux
    dispatch(login({ role: formData.role }));

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <div>
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-600">
            Role
          </label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="researcher">Researcher</option>
            <option value="dataProvider">Data Provider</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>

        <div className="text-center text-gray-600">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
