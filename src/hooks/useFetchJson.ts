import {useState, useEffect} from "react";

export function useFetchJson<T>(url: string | null, deps: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) return;

        let isCancelled = false;
        setLoading(true);
        setError(null);

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json() as Promise<T>;
            })
            .then((json) => {
                if (!isCancelled) setData(json);
            })
            .catch((err) => {
                if (!isCancelled) setError(err as Error);
            })
            .finally(() => {
                if (!isCancelled) setLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, [url, ...deps]);

    return {data, loading, error};
}
