interface Props {
  id: string;
  type: "button" | "submit" | "reset";
  color: "disabled" | "primary";
  disabled?: boolean;
  classes?: string;
  onClick?: (context: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactElement;
}

export default function Button({ children, ...props }: Props) {
  const className = props.disabled
    ? " text-[#FFFFFF] disabled font-bold cursor-no-drop"
    : "";
  return (
    <button
      id={props.id}
      type={props.type}
      disabled={props.disabled}
      className={`w-[331px] h-[48px] rounded-[8px] relative overflow-hidden text-[#FFFFFF] ${props.color} ${props.classes} ${className}`}
      onClick={props.onClick}
    >
      {props.disabled ? (
        <div className="absolute top-0 left-0 w-[100%] h-[100%]"></div>
      ) : null}
      {children}
    </button>
  );
}
