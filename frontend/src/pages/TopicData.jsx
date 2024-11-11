import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TopicData() {
  const { topic } = useParams(); // Get the topic from the URL
  const [dataEntries, setDataEntries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDataEntries = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/data/data/${topic}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add auth token
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch data entries.");
          return;
        }

        const data = await response.json();
        setDataEntries(data); // Set the fetched data entries
      } catch (error) {
        console.error("Error fetching data entries:", error);
        setError("Error fetching data entries.");
      }
    };

    fetchDataEntries();
  }, [topic]); // Re-fetch data if the topic changes

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-5">Data Entries for {topic}</h2>

      {error && <p className="text-red-500 mb-5">{error}</p>}

      <ul className="space-y-4">
        {dataEntries.map((entry, index) => (
          <li
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold">{entry.topic}</h3>
            <p className="text-gray-700 mt-2">{entry.summary}</p>
            <a
              href={entry.dataLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Data
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Submitted by: {entry.provider.username}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicData;
