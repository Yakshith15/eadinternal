// import { useEffect, useState } from "react";

// function ResearcherHome() {
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     // Fetch list of topics from API
//     const fetchTopics = async () => {
//       const response = await fetch("http://localhost:3001/api/data/data"); // Replace with actual endpoint
//       const data = await response.json();
//       console.log(data);
//       setTopics(data);
//     };
//     fetchTopics();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-5">Available Topics</h2>
//       <ul className="list-disc pl-5 space-y-3">
//         {topics.map((topic, index) => (
//           <li key={index} className="text-gray-700">
//             {topic.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ResearcherHome;


import { useEffect, useState } from "react";

function ResearcherHome() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(""); // For error handling

  useEffect(() => {
    // Fetch list of topics from API
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/data/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the auth token for validation
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch topics.");
          return;
        }

        const data = await response.json();
        console.log(data);
        setTopics(data); // Update state with topics data
      } catch (error) {
        console.error("Error fetching topics:", error);
        setError("Error fetching topics.");
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Available Topics</h2>
      {error && <p className="text-red-500 mb-5">{error}</p>}{" "}
      {/* Display error message if any */}
      <ul className="list-disc pl-5 space-y-3">
        {topics.map((topic, index) => (
          <li key={index} className="text-gray-700">
            {topic.topic}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResearcherHome;
