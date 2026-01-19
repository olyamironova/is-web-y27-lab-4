import type {ForecastProps} from "../response/Responses.ts";
import {useUnits} from "../../hooks/useUnits.ts";
import {useI18n} from "../../hooks/useI18n.ts";

const ForecastList = ({forecast}: ForecastProps) => {
    const [unit] = useUnits();
    const [lang] = useI18n();

    const tempSymbol = unit === "metric" ? "°C" : "°F";

    const texts = {
        en: {
            title: "5 Days Forecast:",
            noData: "No forecast data available",
        },
        ru: {
            title: "Прогноз на 5 дней:",
            noData: "Нет данных о прогнозе",
        },
    };

    const t = texts[lang] || texts.en;

    if (!forecast || !forecast.list.length) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-300">
                {t.noData}
            </div>
        );
    }

    const dailyForecast = forecast.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    return (
        <div className="flex flex-col font-bold
                        items-center justify-between bg-[#D9D9D9] dark:bg-[#444444]
                        rounded-[30px] px-[15px] pt-[15px] pb-[3px]
                        shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)]
                        w-full max-w-[414px] transition-colors duration-300">
            <h2 className="text-[32px]">
                {t.title}
            </h2>
            {dailyForecast.map(item => {
                const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                const date = new Date(item.dt_txt);
                const dayName = date.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {weekday: "long"});
                const monthDay = date.getDate();
                const temp = Math.round(item.main.temp);

                return (
                    <div
                        key={item.dt}
                        className="flex items-center justify-between w-full max-w-[330px]"
                    >
                        <div className="w-[60px] flex justify-center">
                            <img src={iconUrl} alt={item.weather[0].main} className="w-[60px] h-[60px] mr-[40px]"/>
                        </div>
                        <div className="w-[150px] text-center text-[24px] font-bold">
                            {temp}{tempSymbol}
                        </div>
                        <div className="flex-1 text-center text-[20px] capitalize">
                            {dayName}, {monthDay}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ForecastList;
