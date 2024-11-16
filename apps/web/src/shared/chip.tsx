import Image from "next/image";

interface Props {
  classes?: string;
  image?: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Chip(props: Props) {
  return (
    <div
      className={`backdrop-blur-[blur(50px)] bg-background px-4 py-2 flex items-center rounded-full ${props.classes}`}
      onClick={props.onClick}
    >
      {props.image ? (
        <Image src={props.image} alt={props.image} className="mr-2" />
      ) : null}
      <div className="text-white text-[14px] font-semibold">{props.text}</div>
    </div>
  );
}
