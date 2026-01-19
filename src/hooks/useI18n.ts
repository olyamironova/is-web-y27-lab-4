import { useState, useEffect } from "react";

export type Language = "ru" | "en";

const subscribers: ((lang: Language) => void)[] = [];

export function useI18n() {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem("language");
        return (stored as Language) || "en";
    });

    const setLanguage = (value: Language) => {
        localStorage.setItem("language", value);
        setLanguageState(value);
        subscribers.forEach((fn) => fn(value));
    };

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "language" && e.newValue) {
                setLanguageState(e.newValue as Language);
            }
        };

        window.addEventListener("storage", handleStorage);

        const subscriber = (value: Language) => setLanguageState(value);
        subscribers.push(subscriber);

        return () => {
            window.removeEventListener("storage", handleStorage);
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) subscribers.splice(index, 1);
        };
    }, []);

    return [language, setLanguage] as const;
}
