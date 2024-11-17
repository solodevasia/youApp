interface Props {
  id: string;
  name: string;
  classes?: string;
  inputClasses?: string;
  type: "text" | "email" | "password";
  label?: string;
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
      className={`flex items-center justify-between w-full ${props.classes}`}
    >
      {props.label ? (
        <div className="text-label text-[13px] font-medium">{props.label}</div>
      ) : null}
      <div
        className={
          props.label
            ? `w-[202px] h-[36px] rounded-[8px] border border-input flex items-center justify-end px-4 bg-input`
            : `w-[327px] h-[51px] rounded-[9px] bg-[#FFFFFF0F] flex items-center px-4`
        }
      >
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          className={
            props.label
              ? `bg-transparent text-right text-[13px] text-input border-none outline-none ${props.value ? "!text-white" : ""} ${props.inputClasses}`
              : `bg-transparent text-[13px] w-full outline-none border-none text-[#FFFFFF66] ${props.value ? "!text-white" : ""} ${props.inputClasses}`
          }
          autoComplete="off"
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        {children}
      </div>
    </div>
  );
}
