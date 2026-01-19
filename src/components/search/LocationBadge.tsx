import CurrentLocationIcon from "../../assets/current location icon.svg";
import { useGeolocation } from "../../hooks/useGeolocation.ts";
import type { CallbackPropsForLocation } from "../response/Responses.ts";
import { useI18n } from "../../hooks/useI18n.ts";

const LocationBadge = ({ onLocationUpdate }: CallbackPropsForLocation) => {
    const location = useGeolocation();
    const [language] = useI18n();

    const texts = {
        en: {
            label: "Current Location",
        },
        ru: {
            label: "Текущее местоположение",
        },
    };

    const t = texts[language];

    return (
        <button
            onClick={() => {
                onLocationUpdate(location);
            }}
            className="flex-1 relative items-center w-full max-w-[300px]"
        >
            <img
                src={CurrentLocationIcon}
                alt="Current location icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[40px] h-[46px] pointer-events-none"
            />
            <p
                className="
                    rounded-[40px]
                    px-[33px] py-[15px] pl-[70px]
                    font-poppins text-1.1 font-extrabold
                    bg-[#4CBB17]
                    text-white
                    text-center
                "
            >
                {t.label}
            </p>
        </button>
    );
};

export default LocationBadge;
