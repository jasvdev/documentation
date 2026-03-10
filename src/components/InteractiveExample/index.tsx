import React, { useState } from "react";

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-center">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Tailwind + React + MDX
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        This is an interactive component embedded right into your Markdown docs!
      </p>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors"
          onClick={() => setCount(count - 1)}
        >
          - Decrement
        </button>
        <span className="text-2xl font-bold font-mono text-gray-900 dark:text-white w-12 text-center">
          {count}
        </span>
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium transition-colors"
          onClick={() => setCount(count + 1)}
        >
          + Increment
        </button>
      </div>
    </div>
  );
}
