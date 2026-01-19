import type {CurrentProps} from "../response/Responses.ts";

const AqiCard = ({ current }: CurrentProps) => {
    if (!current) {
        return <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"/>;
    }

    const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    const description = current.weather[0].description;

    return (
        <div className="flex flex-col items-center justify-center">
            <img src={iconUrl} alt={description} />
            <h2 className="text-[32px] font-bold text-center">
                {description}
            </h2>
        </div>
    );
};

export default AqiCard;
