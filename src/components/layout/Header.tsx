import Toggle from "./Toggle.tsx";
import SearchBar from "../search/SearchBar.tsx";
import LocationBadge from "../search/LocationBadge.tsx";
import type {CallbackPropsForLocation} from "../response/Responses.ts";
import {useEffect} from "react";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useUnits} from "../../hooks/useUnits.ts";
import {useI18n} from "../../hooks/useI18n.ts";

const Header = ({ onLocationUpdate }: CallbackPropsForLocation) => {
    const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");
    const [units, setUnits] = useUnits();
    const [language, setLanguage] = useI18n();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex justify-between items-center w-full">
            <Toggle
                value={theme}
                onChange={setTheme}
                options={["light", "dark"]}
                labels={["Light Mode", "Dark Mode"]}
            />
            <Toggle
                value={units}
                onChange={setUnits}
                options={["metric", "imperial"]}
                labels={["metric", "imperial"]}
            />
            <Toggle
                value={language}
                onChange={setLanguage}
                options={["ru", "en"]}
                labels={["RU", "EN"]}
            />
            <SearchBar onLocationUpdate={onLocationUpdate}/>
            <LocationBadge onLocationUpdate={onLocationUpdate}/>
        </div>
    );
};

export default Header;