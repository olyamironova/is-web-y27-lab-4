import {useState, useEffect} from "react";
import type {DateCardProps} from "../response/Responses.ts";
import {useI18n} from "../../hooks/useI18n.ts";

const DateCard = ({city, timezone}: DateCardProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [lang] = useI18n();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    const localTime = new Date(currentDate.getTime() + ((timezone ?? 0) + new Date().getTimezoneOffset() * 60) * 1000);

    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = localTime.getMinutes().toString().padStart(2, "0");
    const dayName = localTime.toLocaleDateString(lang, { weekday: "long" });
    const day = localTime.getDate();
    const monthName = localTime.toLocaleDateString(lang, { month: "short" });

    return (
        <div
            className="flex flex-col items-center justify-center bg-[#D9D9D9] dark:bg-[#444444] rounded-[30px] px-[100px] py-[55px] shadow-[10px_10px_4px_0_rgba(0,0,0,0.5)] w-full max-w-[510px] transition-colors duration-300 leading-[1]">
            <h2 className="text-[36px] font-bold mb-[63px]">{city}</h2>
            <p className="text-[96px] font-bold mb-[5px]">
                {hours}:{minutes}
            </p>
            <p className="text-[20px] font-normal">
                {dayName}, {day} {monthName}
            </p>
        </div>
    );
};

export default DateCard;
