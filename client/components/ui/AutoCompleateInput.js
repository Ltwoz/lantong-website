import { useState } from "react";

const Autocomplete = ({ suggestions, input, setInput }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [blurTimeout, setBlurTimeout] = useState(null);

    const handleClick = (event) => {
        if (suggestions.some((suggestion) => suggestion === input)) {
            return false;
        }

        const value = event.target.value;
        setInput(value);

        const filtered = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInput(value);

        const filtered = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setFilteredSuggestions([]);
    };

    const handleBlur = () => {
        // Set a timeout to hide suggestions after a short delay
        const timeout = setTimeout(() => {
            setFilteredSuggestions([]);
        }, 200); // Adjust the delay as needed

        // Store the timeout ID
        setBlurTimeout(timeout);
    };

    const handleSuggestionListClick = (event) => {
        if (blurTimeout) {
            clearTimeout(blurTimeout);
        }
    };

    return (
        <div className="relative" onBlur={handleBlur}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onMouseDown={handleClick}
                className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
            />
            {filteredSuggestions.length > 0 && (
                <ul
                    className="absolute w-full border rounded-md mt-1 divide-y bg-white"
                    onClick={handleSuggestionListClick}
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`px-3 py-2 hover:bg-gray-100 text-sm md:text-base`}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
