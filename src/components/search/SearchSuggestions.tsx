import type {SearchSuggestionsProps} from "../response/Responses.ts";

const SearchSuggestions = ({suggestions, onSelect}: SearchSuggestionsProps) => {
    if (!suggestions.length) return null;

    return (
        <ul className="absolute z-10 w-full max-w-[800px] mt-2 bg-white dark:bg-[#333] rounded-xl shadow-lg">
            {suggestions.map((city) => (
                <li
                    key={`${city.name}-${city.lat}-${city.lon}`}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={() =>
                        onSelect({
                            latitude: city.lat,
                            longitude: city.lon,
                        })
                    }
                >
                    {city.name}, {city.country}
                </li>
            ))}
        </ul>
    );
};

export default SearchSuggestions;
