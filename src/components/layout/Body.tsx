import DateCard from "../weather/DateCard.tsx";
import CurrentWeatherCard from "../weather/CurrentWeatherCard.tsx";
import ForecastList from "../weather/ForecastList.tsx";
import ForecastDayCard from "../weather/ForecastDayCard.tsx";
import type {BodyProps} from "../response/Responses.ts";

const Body = ({current, forecast}: BodyProps) => {
    return (
        <div className="py-[50px] flex flex-col gap-[55px]">
            <div className="flex gap-[55px]">
                <DateCard city={current?.name ?? "Unknown"} timezone={current?.timezone}/>
                <CurrentWeatherCard current={current}/>
            </div>

            <div className="flex gap-[55px]">
                <ForecastList forecast={forecast}/>
                <ForecastDayCard forecast={forecast}/>
            </div>
        </div>
    );
};

export default Body;
