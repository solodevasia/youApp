import React from "react";
import Image from "next/image";
import ChevronLeft from "@youApp/assets/chevron_left.svg";

interface Props {
  id: string;
  name: string;
  label?: string;
  labelClasses?: string;
  valueClasses?: string;
  value?: string | null;
  placeholder?: string;
  data?: string[];
  icon?: boolean;
  onSelect: (values: { name: string; value: unknown }) => void;
}

export default function Select({ ...props }: Props) {
  const [active, setActive] = React.useState(false);

  function onShow(value?: unknown) {
    setActive(() => !active);
    if (value) {
      props.onSelect({ name: props.name, value });
    }
  }
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
        className={`w-[202px] h-[36px] rounded-[8px] border border-input flex items-center justify-end px-4 bg-input`}
        onClick={() => onShow()}
      >
        <span
          className={`text-[13px] font-medium ${props.value ? "text-white" : "text-input"} ${props.valueClasses}`}
        >
          {props.value || props.placeholder}
        </span>
        {props.icon ? (
          <div className="relative w-3 h-3 flex items-center justify-center ml-2">
            <Image
              src={ChevronLeft}
              alt="chevron-down"
              className="w-3 h-3 absolute bottom-0 left-0 rotate-[-91.4deg]"
            />
          </div>
        ) : null}
      </div>
      {active ? (
        <div className="fixed top-0 left-0 flex items-end w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full"
            onClick={() => onShow(props.value)}
          ></div>
          <div className="w-full h-48 bg-gray-200 py-4 flex items-center justify-center z-10">
            <div className="w-full h-40 overflow-x-scroll">
              {props.data?.map((item, index) => (
                <div
                  key={index}
                  className={`w-full text-[14] text-black text-center font-medium w-full py-[2px] ${index === 0 ? "border-l border-r border-b border-gray-300" : index !== 0 ? "border-l border-r border-b border-gray-300" : "border border-gray-300"}`}
                  onClick={() => onShow(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
