import { useState, useEffect } from "react";

export type Unit = "metric" | "imperial";

const subscribers: ((unit: Unit) => void)[] = [];
export function useUnits() {
    const [unit, setUnitState] = useState<Unit>(() => {
        const stored = localStorage.getItem("units");
        return (stored as Unit) || "metric";
    });

    const setUnit = (value: Unit) => {
        localStorage.setItem("units", value);
        setUnitState(value);
        subscribers.forEach((fn) => fn(value));
    };

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "units" && e.newValue) {
                setUnitState(e.newValue as Unit);
            }
        };

        window.addEventListener("storage", handleStorage);

        const subscriber = (value: Unit) => setUnitState(value);
        subscribers.push(subscriber);

        return () => {
            window.removeEventListener("storage", handleStorage);
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) subscribers.splice(index, 1);
        };
    }, []);

    return [unit, setUnit] as const;
}
