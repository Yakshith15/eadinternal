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


   const handleSubmit = async (e) => {
     console.log(formData);
     e.preventDefault();
    //  setError(null); // Clear previous errors
     try {
       const response = await fetch("http://localhost:3001/api/auth/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email: formData.email,
           password: formData.password,
         }),
       });

       if (response.ok) {
         const data = await response.json();
         localStorage.setItem("authToken", data.token);
         localStorage.setItem("userRole", formData.role);
        localStorage.setItem("userEmail", formData.email);
         // Dispatch login action to Redux with user role
         dispatch(login({ role: formData.role }));

         navigate("/");
       } else {
         const errorData = await response.json();
         setError(errorData.message);
       }
     } catch (error) {
       console.error("Error:", error);
       setError("An error occurred. Please try again later.");
     }
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
