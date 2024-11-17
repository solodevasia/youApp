import Image from "next/image";
import chevronLeft from "@youApp/assets/chevron_left.svg";
import { useRouter } from "next/router";
import exit from "@youApp/assets/exit.svg";
import React from "react";

export default function Interest() {
  const router = useRouter();
  const [value, setValue] = React.useState<string>();
  const [state, setState] = React.useState<string[] | null[]>([null]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(() => event.target.value);
  }

  function onSave() {
    const body = new FormData();
    body.append("interest", state.map((item) => item).join("#"));
    fetch("/api/v1/user/profile/updated", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body,
    }).then(async (res) => {
      const data = await res.json();
      if (data.status <= 201) {
        router.push("/profile");
      }
    });
  }

  React.useEffect(() => {
    fetch("/api/v1/user/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(async (res) => {
      const data = await res.json();
      setState(() => [
        ...data.author?.interest
          ?.split("#")
          ?.filter((item: string) => item)
          ?.map((item: string) => item),
        null,
      ]);
    });
  }, []);

  return (
    <div className="pt-16 px-5 bg-interest h-[100vh] overflow-scroll pb-10">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center"
          onClick={() => router.push("/profile")}
        >
          <Image
            src={chevronLeft}
            alt="elipsis"
            className="w-[14px] h-[14px]"
          />
          <span className="text-[14px] font-bold text-white ml-2">Back</span>
        </div>
        <span
          className="text-interest text-[14px] font-semibold"
          onClick={onSave}
        >
          Save
        </span>
      </div>
      <div className="pt-16">
        <span className="text-[14px] font-bold text-gold after:content-none">
          Tell everyone about yourself
        </span>
        <span className="block text-white font-bold text-[20px] mt-2">
          What interest you?
        </span>
      </div>
      <div className="py-2 px-4 mt-2 bg-chips rounded-[10px]">
        <div className="flex items-center flex-wrap">
          {state.map((item, index) =>
            item ? (
              <div
                key={index}
                className="flex items-center bg-chip w-fit p-2 rounded-[5px] mr-2 mb-2"
              >
                <span className="text-[12px] text-white font-semibold mr-4">
                  {item}
                </span>
                <Image src={exit} alt="alt" />
              </div>
            ) : (
              <div key={index}>
                <input
                  id={`add-new-chip-${index}__testid`}
                  name={`add-new-chip-${index}`}
                  type="text"
                  className={`bg-transparent outline-none border-none text-white ${value ? "w-fit" : "w-20"}`}
                  value={value}
                  autoFocus
                  onChange={onChange}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      setState(
                        () =>
                          [
                            ...(state.map((item, key) =>
                              key === index ? value : item
                            ) as string[] | null[]),
                            null,
                          ] as string[] | null[]
                      );
                      setValue(() => "");
                    }
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
