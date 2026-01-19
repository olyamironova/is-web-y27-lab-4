import SunriseLightIcon from "../../assets/sunrise-light.png";
import SunsetLightIcon from "../../assets/sunset-light.png";
import SunriseDarkIcon from "../../assets/sunrise-dark.png";
import SunsetDarkIcon from "../../assets/sunset-dark.png";
import type { SunCycleProps } from "../response/Responses.ts";
import { useUnits } from "../../hooks/useUnits.ts";
import { useI18n } from "../../hooks/useI18n.ts";

const SunCycle = ({ temp, feelsLike, sunrise, sunset }: SunCycleProps) => {
    const [unit] = useUnits();
    const [lang] = useI18n();

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const tempSymbol = unit === "metric" ? "°C" : "°F";

    const t = {
        en: {
            feelsLike: "Feels like",
            sunrise: "Sunrise",
            sunset: "Sunset",
        },
        ru: {
            feelsLike: "Ощущается как",
            sunrise: "Восход",
            sunset: "Закат",
        },
    }[lang];

    return (
        <div>
            <h2
                className="font-poppins text-[80px] font-bold
                bg-[linear-gradient(80.34deg,#292929_-2.93%,rgba(255,255,255,0)_212.44%)]
                dark:bg-[linear-gradient(84.4deg,#FFFFFF_-16.56%,rgba(255,255,255,0)_118.43%)]
                bg-clip-text
                text-transparent
                leading-[0.8]"
            >
                {Math.round(temp)}{tempSymbol}
            </h2>

            <div className="flex items-center justify-center mb-[25px]">
                <h3
                    className="font-poppins text-[20px] font-semibold
                    bg-[linear-gradient(80.34deg,#292929_-2.93%,rgba(255,255,255,0)_212.44%)]
                    dark:bg-[linear-gradient(84.4deg,#FFFFFF_-16.56%,rgba(255,255,255,0)_118.43%)]
                    bg-clip-text text-transparent mr-[10px]"
                >
                    {t.feelsLike}:
                </h3>
                <h4
                    className="font-poppins text-[32px] font-semibold
                    bg-[linear-gradient(80.34deg,#292929_-2.93%,rgba(255,255,255,0)_212.44%)]
                    dark:bg-[linear-gradient(84.4deg,#FFFFFF_-16.56%,rgba(255,255,255,0)_118.43%)]
                    bg-clip-text text-transparent"
                >
                    {Math.round(feelsLike)}{tempSymbol}
                </h4>
            </div>

            <div className="flex flex-col items-center justify-center gap-[10px]">
                <div className="flex items-center justify-between gap-[10px] max-w-[130px]">
                    <img src={SunriseLightIcon} alt="sunrise" className="dark:hidden" />
                    <img src={SunriseDarkIcon} alt="sunrise" className="dark:block hidden" />
                    <div>
                        <p className="text-[20px] font-bold">{t.sunrise}</p>
                        <p className="text-[16px] font-semibold">{formatTime(sunrise)}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-[10px] max-w-[130px] w-full">
                    <img src={SunsetLightIcon} alt="sunset" className="dark:hidden" />
                    <img src={SunsetDarkIcon} alt="sunset" className="dark:block hidden" />
                    <div>
                        <p className="text-[20px] font-bold">{t.sunset}</p>
                        <p className="text-[16px] font-semibold">{formatTime(sunset)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SunCycle;
