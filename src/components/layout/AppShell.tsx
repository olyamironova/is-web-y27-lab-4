import Header from "./Header.tsx";
import Body from "./Body.tsx";
import {useWeather} from "../../hooks/useWeather.ts";
import type {GeolocationState} from "../response/Responses.ts";
import Loader from "../common/Loader.tsx";
import ErrorState from "../common/ErrorState.tsx";
import EmptyState from "../common/EmptyState.tsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useUnits} from "../../hooks/useUnits.ts";
import {useI18n} from "../../hooks/useI18n.ts";
import {useOnlineStatus} from "../../hooks/useOnlineStatus.ts";

const AppShell = () => {
    const [location, setLocation] = useLocalStorage<GeolocationState>("location", {
        latitude: null,
        longitude: null,
        loading: false,
        error: null,
    });
    const [unit] = useUnits();
    const [language] = useI18n();
    const isOnline = useOnlineStatus();


    const {current, forecast, loading, error} = useWeather(location.latitude, location.longitude, unit, language);

    return (
        <div
            className="
                min-h-screen
                bg-[linear-gradient(112.65deg,#FFFFFF_0.28%,rgba(70,97,115,0)_178.65%)]
                dark:bg-[linear-gradient(110.05deg,#383838_0%,rgba(158,158,158,0)_71.82%)]
                bg-[#1E1E1E]
                font-poppins
                text-[rgba(41,41,41,1)] dark:text-[#FFFFFF]
            "
        >
            <div className={`w-full text-center py-2 font-bold transition-colors duration-300 ${
                isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}>
                {isOnline ? "You are online" : "You are offline"}
            </div>
            <div className="w-full max-w-[1350px] mx-auto py-[80px]">
                <Header onLocationUpdate={setLocation}/>

                {!location.latitude || !location.longitude ? (
                    <EmptyState message={"Choose your location"} />
                ) : loading ? (
                    <Loader/>
                ) : error ? (
                    <ErrorState message={"Error"}></ErrorState>
                ) : (
                    <Body current={current} forecast={forecast}/>
                )}
            </div>
        </div>
    );
};

export default AppShell;
