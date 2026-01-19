import type {CitySuggestion} from "./CitySuggestion.ts";

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface CurrentWeather {
    coord: { lon: number; lat: number };
    weather: WeatherCondition[];
    main: WeatherMain;
    wind: Wind;
    name: string;
    dt: number;
    sys: { country: string; sunrise: number; sunset: number };
    uvi: number;
    timezone: number;
}

export interface ForecastItem {
    dt: number;
    main: WeatherMain;
    weather: WeatherCondition[];
    wind: Wind;
    dt_txt: string;
}

export interface ForecastResponse {
    cod: string;
    list: ForecastItem[];
    city: { name: string; country: string; coord: { lat: number; lon: number } };
}

export interface AirPollutionResponse {
    coord: { lon: number; lat: number };
    list: {
        main: { aqi: number };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
            uvi: number;
        };
        dt: number;
    }[];
}

export interface ReverseGeocodeResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface CallbackPropsForLocation {
    onLocationUpdate: (location: GeolocationState) => void;
}

export type GeolocationState = {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
    loading: boolean;
};

export type BodyProps = {
    current: CurrentWeather | null;
    forecast: ForecastResponse | null;
};

export type DateCardProps = {
    city: string;
    timezone?: number;
};

export type CurrentProps = {
    current: CurrentWeather | null;
};

export type SunCycleProps = {
    temp: number;
    feelsLike: number;
    sunrise: number;
    sunset: number;
};

export type ForecastProps = {
    forecast: ForecastResponse | null;
};

export type SearchSuggestionsProps = {
    suggestions: CitySuggestion[];
    onSelect: (city: { latitude: number; longitude: number }) => void;
};

export type ToggleProps<T> = {
    value: T;
    onChange: (val: T) => void;
    options: [T, T];
    labels?: [string, string];
};