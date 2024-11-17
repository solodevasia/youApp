import Image from "next/image";

interface Props {
  id: string;
  name: string;
  icon: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IconUpload(props: Props) {
  return (
    <div className="relative">
      <Image src={props.icon} alt={props.icon} />
      <input
        id={props.id}
        name={props.name}
        type="file"
        className="youAppUpload absolute top-0 left-0"
        onChange={props.onChange}
      />
    </div>
  );
}
