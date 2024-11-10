import { useEffect, useState } from "react";

function ResearcherHome() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Fetch list of topics from API
    const fetchTopics = async () => {
      const response = await fetch("/api/topics"); // Replace with actual endpoint
      const data = await response.json();
      setTopics(data);
    };
    fetchTopics();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Available Topics</h2>
      <ul className="list-disc pl-5 space-y-3">
        {topics.map((topic, index) => (
          <li key={index} className="text-gray-700">
            {topic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResearcherHome;
