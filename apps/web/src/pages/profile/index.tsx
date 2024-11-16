import Image from "next/image";
import elipsis from "@youApp/assets/elipsis.svg";
import chevronLeft from "@youApp/assets/chevron_left.svg";
import horoscope from "@youApp/assets/Horoscope.svg";
import zodiac from "@youApp/assets/Zodiac.svg";
import Chip from "@youApp/shared/chip";

export default function Profile() {
  return (
    <div className="pt-16 px-5 bg-internal">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={chevronLeft}
            alt="elipsis"
            className="w-[14px] h-[14px]"
          />
          <span className="text-[14px] font-bold text-white ml-2">Back</span>
        </div>
        <span className="text-[14px] font-semibold text-white">@Jhondoe</span>
        <Image src={elipsis} alt="elipsis" />
      </div>
      <div className="w-full h-[190px] relative bg-background mt-6 rounded-[16px] flex items-start justify-end flex-col p-4">
        <Image
          src=""
          alt="background"
          className="absolute top-0 left-0 w-full h-full"
        />
        <div>
          <div className="text-[16px] text-white font-bold">@johndoe, 28</div>
          <div className="text-[13px] font-medium text-white my-1">Male</div>
          <div className="flex items-center">
            <Chip image={horoscope} text="Virgo" />
            <Chip image={zodiac} text="Pig" classes="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
