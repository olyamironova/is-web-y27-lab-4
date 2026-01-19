import SearchIcon from "../../assets/SearchIcon.png";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce.ts";
import type { CitySuggestion } from "../response/CitySuggestion.ts";
import { useFetchJson } from "../../hooks/useFetchJson.ts";
import type { CallbackPropsForLocation } from "../response/Responses.ts";
import SearchSuggestions from "./SearchSuggestions.tsx";
import { useI18n } from "../../hooks/useI18n.ts";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const SearchBar = ({ onLocationUpdate }: CallbackPropsForLocation) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const debouncedQuery = useDebounce(query, 500);

    const [language] = useI18n();

    const url =
        debouncedQuery.trim() !== ""
            ? `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=5&appid=${API_KEY}`
            : null;

    const { data, loading, error } = useFetchJson<CitySuggestion>(url, [debouncedQuery]);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            return;
        }

        if (data && Array.isArray(data)) {
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }
    }, [data, debouncedQuery]);

    const texts = {
        en: {
            placeholder: "Search for your preferred city...",
            loading: "Loading...",
            error: "Error: Failed to fetch data from API",
        },
        ru: {
            placeholder: "Поиск нужного города...",
            loading: "Загрузка...",
            error: "Ошибка: Не удалось получить данные с API",
        },
    };

    const t = texts[language];

    return (
        <div className="w-full max-w-[600px] mx-auto relative">
            <form className="flex relative items-center">
                <img
                    src={SearchIcon}
                    alt="Search"
                    className="w-[40px] h-[46px] absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.placeholder}
                    className="
                        flex-1
                        rounded-[40px]
                        px-[33px] py-[15px] pl-[70px]
                        font-poppins font-normal text-1.1
                        bg-[#D9D9D9] dark:bg-[#444444]
                        border border-black dark:border-transparent
                        placeholder-[#292929] dark:placeholder-[rgba(255,255,255,0.6)]
                        transition-colors duration-300
                    "
                />
            </form>

            <SearchSuggestions
                suggestions={suggestions}
                onSelect={({ latitude, longitude }) => {
                    setQuery("");
                    setSuggestions([]);
                    onLocationUpdate({ latitude, longitude, error: null, loading: false });
                }}
            />
            {loading && <p className="mt-2 text-gray-500">{t.loading}</p>}
            {error && <p className="mt-2 text-red-500">{t.error}</p>}
        </div>
    );
};

export default SearchBar;
