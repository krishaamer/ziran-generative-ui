import React, { useEffect, useState } from "react";

export default function Personal() {
  const [value, setValue] = useState("");

  useEffect(() => {
    // Fetch the initial value from Redis when the component mounts
    fetch("/api/personal")
      .then((response) => response.json())
      .then((data) => {
        // Access the nested 'value' property
        setValue(data.value?.value || "");
      });
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await fetch("/api/personal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: { value } }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="block w-full p-3 h-24 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text here"
        required
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary shadow-md hover:bg-primary/90 h-11 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Save
      </button>
    </form>
  );
}
