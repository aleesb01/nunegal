import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar" id="search-bar">
      <div className="search-bar__inner">
        <svg
          className="search-bar__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          id="search-input"
          className="search-bar__input"
          placeholder="Search by brand or model..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          aria-label="Search products"
        />
        {value && (
          <button
            className="search-bar__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
            id="search-clear"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
