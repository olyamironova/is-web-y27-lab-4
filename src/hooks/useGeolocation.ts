import {useState, useEffect} from "react";
import type {GeolocationState} from "../components/response/Responses.ts";

export function useGeolocation() {
    const [location, setLocation] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation({
                latitude: null,
                longitude: null,
                error: "Geolocation не поддерживается браузером",
                loading: false,
            });
            return;
        }

        const success = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                loading: false,
            });
        };

        const error = (err: GeolocationPositionError) => {
            setLocation({
                latitude: null,
                longitude: null,
                error: err.message,
                loading: false,
            });
        };
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return location;
}
