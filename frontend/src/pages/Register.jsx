import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "researcher", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />

        <label className="block mb-2">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        >
          <option value="researcher">Researcher</option>
          <option value="dataProvider">Data Provider</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
