"use client";

import { useState } from "react";

export const TopicSelector = () => {
  const [selectedTopic, setSelectedTopic] = useState("VIDEO PRODUCTOR");

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <span className="text-white text-2xl">TOPIC:</span>
      <button
        className={`text-center px-7 py-3 text-2xl ${
          selectedTopic === "VIDEO PRODUCTOR"
            ? "bg-[#00FF7F] text-black"
            : "text-white border-2 border-white"
        }`}
        onClick={() => setSelectedTopic("VIDEO PRODUCTOR")}
      >
        VIDEO PRODUCTOR
      </button>
      <button
        className={`text-center px-7 py-3 text-2xl ${
          selectedTopic === "POST PRODUCTION"
            ? "bg-[#00FF7F] text-black"
            : "text-white border-2 border-white"
        }`}
        onClick={() => setSelectedTopic("POST PRODUCTION")}
      >
        POST PRODUCTION
      </button>
      <button
        className={`text-center px-7 py-3 text-2xl ${
          selectedTopic === "PHOTOGRAPHY"
            ? "bg-[#00FF7F] text-black"
            : "text-white border-2 border-white"
        }`}
        onClick={() => setSelectedTopic("PHOTOGRAPHY")}
      >
        PHOTOGRAPHY
      </button>
    </div>
  );
};
