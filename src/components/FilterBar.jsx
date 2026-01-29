function FilterBar({ filter, setFilter }) {
  const levels = ["All", "High", "Medium", "Low"];

  return (
    <div className="flex gap-2 mb-4">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => setFilter(level)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === level
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
