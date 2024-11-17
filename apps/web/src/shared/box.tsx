import Image from "next/image";
import React from "react";

interface Props {
  id?: string;
  classes?: string;
  children?: React.ReactElement;
  title?: string;
  actionName?: string | null;
  icon?: string;
  onClick?: () => void;
}

export default function Box({ children, ...props }: Props) {
  return (
    <div
      id={props.id}
      className={`w-full bg-box p-2 rounded-[14px] ${props.classes}`}
    >
      {props.title ? (
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-white font-bold">
            {props.title}
          </span>
          {props.icon ? (
            <Image src={props.icon} alt="plain" onClick={props.onClick} />
          ) : null}
          {props.actionName ? (
            <span
              className="text-gold text-[12px] text-gold after:content-none"
              onClick={props.onClick}
            >
              {props.actionName}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
