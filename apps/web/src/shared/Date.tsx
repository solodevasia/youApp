interface Props {
  id: string;
  name: string;
  label: string;
  labelClasses?: string;
  value?: string;
  valueClasses?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Date(props: Props) {
  return (
    <div className="flex items-center justify-between w-full">
      {props.label ? (
        <div
          className={`text-label text-[13px] font-medium ${props.labelClasses}`}
        >
          {props.label}
        </div>
      ) : null}
      <div
        className={`w-[202px] h-[36px] rounded-[8px] border border-input flex items-center justify-end px-4 bg-input relative`}
      >
        <span
          className={`text-[13px] font-medium ${props.value ? "text-white" : "text-input"} ${props.valueClasses}`}
        >
          {props.value?.split("-")?.reverse()?.join(" ") || props.placeholder}
        </span>
        <input
          type="date"
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          className="youAppDate outline-none border-none absolute top-0 left-0 w-full h-full bg-transparent"
        />
      </div>
    </div>
  );
}
