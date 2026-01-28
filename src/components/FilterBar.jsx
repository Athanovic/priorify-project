function FilterBar({ filter, setFilter }) {
    return (
      <div className="filter-bar">
        {["All", "High", "Medium", "Low"].map(level => (
          <button
            key={level}
            className={filter === level ? "active" : ""}
            onClick={() => setFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>
    );
  }
  
  export default FilterBar;