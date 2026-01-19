import TopArrowIcon from "../../assets/navigation 1.png";
import type {ForecastProps} from "../response/Responses.ts";
import {useUnits} from "../../hooks/useUnits.ts";
import {useI18n} from "../../hooks/useI18n.ts";

const ForecastDayCard = ({forecast}: ForecastProps) => {
    const [unit] = useUnits();
    const [lang] = useI18n();

    const tempSymbol = unit === "metric" ? "°C" : "°F";

    const texts = {
        en: {
            title: "Hourly Forecast:",
            noData: "No hourly forecast available",
            windUnit: "km/h"
        },
        ru: {
            title: "Почасовой прогноз:",
            noData: "Нет почасового прогноза",
            windUnit: "км/ч"
        }
    };

    const t = texts[lang] || texts.en;

    if (!forecast || !forecast.list.length) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-300">
                {t.noData}
            </div>
        );
    }

    const hours = [12, 15, 18, 21, 0];
    const hourlyForecast = hours.map(hour => {
        const item = forecast.list.find(f =>
            new Date(f.dt_txt).getHours() === hour
        );
        return item ?? null;
    });

    return (
        <div className="flex flex-col font-bold
            items-center justify-between bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[15px] pt-[15px] pb-[3px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] w-full max-w-[870px] transition-colors duration-500"
        >
            <h2 className="text-[32px]">{t.title}</h2>
            <div className="flex items-center justify-between gap-[15px] py-[15px]">
                {hourlyForecast.map((item, index) => {
                    const iconUrl = item ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` : "";
                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-between
                            ${index < 3
                                ? "bg-[linear-gradient(170.72deg,#F88508_-12.41%,rgba(246,250,217,0)_163.32%)]"
                                : "bg-[linear-gradient(173.72deg,#443D64_-15.92%,rgba(101,130,198,0)_192.45%)]"}
                            dark:bg-[linear-gradient(170.72deg,#383838_-12.41%,rgba(158,158,158,0)_163.32%)]

                            rounded-[40px] py-[10px] px-[25px] transition-all duration-500`}
                        >
                            <h3 className="text-[24px]">
                                {item ? `${new Date(item.dt_txt).getHours()}:00` : "-:--"}
                            </h3>
                            {item && <img src={iconUrl} alt={item.weather[0].main}/>}
                            <p className="text-[20px]">
                                {item ? Math.round(item.main.temp) : "--"}{tempSymbol}
                            </p>
                            <img src={TopArrowIcon} alt="Top Arrow"
                                 style={{transform: `rotate(${item?.wind.deg}deg)`}}/>
                            <p className="text-[20px]">
                                {item ? Math.round(item.wind.speed) : "--"} {t.windUnit}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastDayCard;
