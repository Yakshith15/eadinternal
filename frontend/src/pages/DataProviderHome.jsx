// function DataProviderHome() {
//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <form className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-5">Submit Data</h2>
//         <label className="block mb-2">Topic</label>
//         <input
//           type="text"
//           className="border border-gray-300 p-2 w-full mb-4 rounded"
//         />

//         <label className="block mb-2">Data Link</label>
//         <input
//           type="url"
//           className="border border-gray-300 p-2 w-full mb-4 rounded"
//         />

//         <label className="block mb-2">Summary</label>
//         <textarea
//           className="border border-gray-300 p-2 w-full mb-4 rounded"
//           rows="4"
//         ></textarea>

//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default DataProviderHome;


import { useState } from "react";

function DataProviderHome() {
  const [formData, setFormData] = useState({
    topic: "",
    dataLink: "",
    summary: "",
  });
  const [message, setMessage] = useState(""); // To display success or error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    try {
      const response = await fetch("http://localhost:3001/api/data/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Data entry created successfully!");
        setFormData({ topic: "", dataLink: "", summary: "" }); // Reset form
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to create data entry.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-5">Submit Data</h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <label className="block mb-2">Topic</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />

        <label className="block mb-2">Data Link</label>
        <input
          type="url"
          name="dataLink"
          value={formData.dataLink}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />

        <label className="block mb-2">Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DataProviderHome;
