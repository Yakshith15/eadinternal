function DataProviderHome() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5">Submit Data</h2>
        <label className="block mb-2">Topic</label>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />

        <label className="block mb-2">Data Link</label>
        <input
          type="url"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />

        <label className="block mb-2">Summary</label>
        <textarea
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          rows="4"
        ></textarea>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DataProviderHome;
