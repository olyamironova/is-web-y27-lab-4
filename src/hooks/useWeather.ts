import {useFetchJson} from "./useFetchJson";
import type {CurrentWeather, ForecastResponse, ReverseGeocodeResponse,} from "../components/response/Responses.ts";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export function useWeather(
    lat: number | null,
    lon: number | null,
    units: "metric" | "imperial" = "metric",
    lang: "ru" | "en" = "en"
) {
    const currentUrl = lat && lon ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}` : null;
    const forecastUrl = lat && lon ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}` : null;
    const reverseUrl = lat && lon ? `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}` : null;

    const { data: current, loading: loadingCurrent, error: errorCurrent } = useFetchJson<CurrentWeather>(currentUrl, [lat, lon, units, lang]);
    const { data: forecast, loading: loadingForecast, error: errorForecast } = useFetchJson<ForecastResponse>(forecastUrl, [lat, lon, units, lang]);
    const { data: reverseData } = useFetchJson<ReverseGeocodeResponse[]>(reverseUrl, [lat, lon]);

    const cityName = reverseData?.[0]?.local_names?.[lang] || reverseData?.[0]?.name || "";

    const attachCity = <T extends { name?: string; city?: { name?: string } }>(data: T | null) => {
        return data
            ? "city" in data
                ? {...data, city: {...data.city, name: cityName}}
                : {...data, name: cityName || data.name}
            : null;
    }

    const currentWithCity = attachCity(current);
    const forecastWithCity = attachCity(forecast);

    const loading = loadingCurrent || loadingForecast;
    const error = errorCurrent || errorForecast ;

    return {current: currentWithCity, forecast: forecastWithCity, loading, error};
}
