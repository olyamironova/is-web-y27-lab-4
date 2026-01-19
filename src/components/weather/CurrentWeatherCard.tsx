import SunCycle from "./SunCycle.tsx";
import AQICard from "./AQICard.tsx";
import WeatherMetrics from "./WeatherMetrics.tsx";
import type {CurrentProps} from "../response/Responses.ts";

const CurrentWeatherCard = ({current}: CurrentProps) => {
    if (!current) {
        return <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"/>;
    }

    return (
        <div
            className="flex items-center justify-between bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[25px] py-[15px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] w-full max-w-[780px] transition-colors duration-300">
            <SunCycle
                temp={current.main.temp}
                feelsLike={current.main.feels_like}
                sunrise={current.sys.sunrise}
                sunset={current.sys.sunset}
            />
            <AQICard current={current}/>
            <WeatherMetrics current={current}/>
        </div>
    );
};

export default CurrentWeatherCard;
