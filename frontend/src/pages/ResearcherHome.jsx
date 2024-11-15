// import { useEffect, useState } from "react";

// function ResearcherHome() {
//   const [topics, setTopics] = useState([]);
//   const [error, setError] = useState(""); // For error handling

//   useEffect(() => {
//     // Fetch list of topics from API
//     const fetchTopics = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/data/data", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to fetch topics.");
//           return;
//         }

//         const data = await response.json();
//         console.log(data);
//         setTopics(data); // Update state with topics data
//       } catch (error) {
//         console.error("Error fetching topics:", error);
//         setError("Error fetching topics.");
//       }
//     };

//     fetchTopics();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-5">Available Topics</h2>
//       {error && <p className="text-red-500 mb-5">{error}</p>}{" "}
//       <ul className="list-disc pl-5 space-y-3">
//         {topics.map((topic, index) => (
//           <li key={index} className="text-gray-700">
//             {topic.topic}{" "}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ResearcherHome;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResearcherHome() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/data/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch topics.");
          return;
        }

        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setError("Error fetching topics.");
      }
    };

    fetchTopics();
  }, []);

  const handleTopicClick = (topic) => {
    navigate(`/data/${topic}`);
  };

  const handleCreateRoomClick = () => {
    navigate("/create");
  };

  const handleJoinRoomClick = () => {
    navigate("/rooms");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-5">Available Topics</h2>
      {error && <p className="text-red-500 mb-5">{error}</p>}

      <div className="flex gap-4 mb-5">
        <button
          onClick={handleCreateRoomClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Create Room
        </button>
        <button
          onClick={handleJoinRoomClick}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Join Room
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-4">
        {topics.map((topic, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => handleTopicClick(topic.topic)}
          >
            <span className="text-lg font-medium text-gray-700">
              {topic.topic}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResearcherHome;
