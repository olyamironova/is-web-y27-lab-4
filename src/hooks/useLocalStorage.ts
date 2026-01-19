import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.warn(`Ошибка при чтении ключа "${key}" из localStorage:`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Ошибка при записи ключа "${key}" в localStorage:`, error);
        }
    }, [key, value])

    return [value, setValue] as const;
}