import Image from "next/image";
import plus from "@youApp/assets/plus.svg";

interface Props {
  id: string;
  name: string;
  image?: string | null;
  title?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddImage(props: Props) {
  return (
    <div className="flex items-center">
      <div className="bg-imageBackground w-[57px] h-[57px] flex items-center justify-center rounded-[17px] relative overflow-hidden">
        {props.image ? (
          <img
            src={props.image}
            alt="addImage"
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <Image src={plus} alt="plus" />
        )}
        <input
          id={props.id}
          name={props.name}
          type="file"
          className="youAppUpload absolute top-0 left-0 w-full h-full"
          onChange={props.onChange}
        />
      </div>
      <span className="text-[12px] text-white font-medium ml-4">
        {props.title}
      </span>
    </div>
  );
}
