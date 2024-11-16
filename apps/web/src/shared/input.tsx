interface Props {
  id: string;
  name: string;
  classes?: string;
  inputClasses?: string;
  type: "text" | "email" | "password";
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onChange?: (context: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (context: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactElement;
}

export default function Input({ children, ...props }: Props) {
  return (
    <div
      className={"w-[327px] h-[51px] rounded-[9px] bg-[#FFFFFF0F] flex items-center px-4 ".concat(
        props.classes || ""
      )}
    >
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        className={"bg-transparent text-[13px] w-full outline-none border-none text-[#FFFFFF66] ".concat(
          props.inputClasses || ""
        )}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {children}
    </div>
  );
}
