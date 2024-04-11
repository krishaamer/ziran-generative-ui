"use client"

import React, { useEffect, useState } from "react";

export default function Personal() {
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("/api/personal")
      .then((response) => response.json())
      .then((data) => {
        // Ensure the received value is a string before setting the state
        setValue(typeof data.value === "string" ? data.value : "");
      });
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await fetch("/api/personal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text here"
        required
      />
      <button
        type="submit"
        className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 ${
          value.trim()
            ? "hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
            : "cursor-not-allowed opacity-50"
        }`}
        disabled={!value.trim()}
      >
        Save
      </button>
    </form>
  );
}
