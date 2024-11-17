import Image from "next/image";
import elipsis from "@youApp/assets/elipsis.svg";
import chevronLeft from "@youApp/assets/chevron_left.svg";
import horoscope from "@youApp/assets/Horoscope.svg";
import zodiac from "@youApp/assets/Zodiac.svg";
import Chip from "@youApp/shared/chip";
import Box from "@youApp/shared/box";
import Edit from "@youApp/assets/edit-2.svg";
import React from "react";
import AddImage from "@youApp/shared/AddImage";
import Input from "@youApp/shared/input";
import Select from "@youApp/shared/Select";
import DateInput from "@youApp/shared/Date";
import IconUpload from "@youApp/shared/IconUpload";
import moment from "moment";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [files, setFile] = React.useState<any>();
  const [state, setState] = React.useState({
    avatar: "",
    nickname: "",
    gender: "",
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
    interest: "",
  });
  const [zodiacData, setZodiac] = React.useState([]);
  const [aboutEdit, setAboutEdit] = React.useState(false);

  function onAboutUpdated() {
    const body = new FormData();

    if (aboutEdit) {
      console.log(state.avatar);
      body.append("file", files?.[0]);
      body.append("nickname", state.nickname);
      body.append("birthday", state.birthday);
      body.append("height", state.height?.split(" ")[0]);
      body.append("weight", state.weight?.split(" ")[0]);
      body.append("horoscope", zodiacData[Number(state.horoscope)] || null);
      body.append("zodiac", zodiacData[Number(state.zodiac)] || null);
      body.append("gender", state.gender);
      fetch("/api/v1/user/profile/updated", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }).then(async (res) => {
        const data = await res.json();
        console.log(data);
      });
    }
    setAboutEdit(() => !aboutEdit);
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    formData.append("file", (event.target.files as unknown as any)[0]);
    fetch("/api/v1/user/upload/avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      setState((prevState) => ({
        ...prevState,
        avatar: data.path,
      }));
    });
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "avatar") {
      setFile(() => event.target.files);
    }
    setState((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.name === "avatar"
          ? URL.createObjectURL(
              (event.target.files as unknown as MediaSource[])[0]
            )
          : event.target.value,
    }));
  }

  function onSelect(values: { name: string; value: unknown }) {
    setState((prevState) => ({
      ...prevState,
      [values.name]: values.value,
    }));
  }

  React.useEffect(() => {
    fetch("/api/v1/public/zodiac").then(async (res) => {
      const data = await res.json();
      setZodiac(() => data);
    });

    fetch("/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setState((prevState) => ({
        ...prevState,
        ...data.author,
        height: data.author?.height ? `${data.author.height} cm` : "",
        weight: data.author?.weight ? `${data.author.weight} kg` : "",
        avatar: data.author?.avatar,
      }));
    });
  }, []);

  return (
    <div className="pt-16 px-5 bg-internal overflow-scroll pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={chevronLeft}
            alt="elipsis"
            className="w-[14px] h-[14px]"
          />
          <span className="text-[14px] font-bold text-white ml-2">Back</span>
        </div>
        {state.nickname ? (
          <span className="text-[14px] font-semibold text-white">
            {state.nickname ? `@${state.nickname}` : null}
          </span>
        ) : null}
        <Image src={elipsis} alt="elipsis" />
      </div>
      <div className="w-full h-[190px] relative bg-background mt-6 rounded-[16px] flex items-start justify-end flex-col p-4 overflow-hidden">
        {state.avatar ? (
          <img
            src={
              state.avatar?.indexOf("avatar") > -1
                ? `/assets${state.avatar}`
                : state.avatar
            }
            alt="background"
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : null}
        <div className="absolute top-3 right-4">
          <IconUpload
            id="background-upload__testid"
            name="background-upload"
            icon={Edit}
            onChange={uploadAvatar}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="text-[16px] text-white font-bold">
            {state.nickname ? `@${state.nickname}` : null},
            {state.birthday
              ? moment(new Date()).locale("id").diff(state.birthday, "year")
              : null}
          </div>
          {state.gender ? (
            <div className="text-[13px] font-medium text-white my-1">
              {state.gender}
            </div>
          ) : null}
          <div className="flex items-center">
            {typeof state.horoscope === "number" ? (
              <Chip
                image={horoscope}
                text={zodiacData[Number(state.horoscope)]}
              />
            ) : null}
            {typeof state.zodiac === "number" ? (
              <Chip
                image={zodiac}
                text={zodiacData[Number(state.zodiac)]}
                classes="ml-2"
              />
            ) : null}
          </div>
        </div>
      </div>
      <Box
        title="About"
        icon={aboutEdit ? null : Edit}
        actionName={aboutEdit ? "Save & Update" : null}
        classes="mt-6 pt-4 pl-6 pr-4"
        onClick={onAboutUpdated}
      >
        {aboutEdit ? (
          <div className="mt-8">
            <AddImage
              id="add-avatar__testid"
              name="avatar"
              image={
                state.avatar?.indexOf("avatar") > -1
                  ? `/assets${state.avatar}`
                  : state.avatar
              }
              title="Add image"
              onChange={onChange}
            />
            <div className="mt-8">
              <Input
                id="display-name-input__testid"
                name="nickname"
                type="text"
                label="Display Name:"
                placeholder="Enter name"
                value={state.nickname}
                onChange={onChange}
              />
            </div>
            <div className="mt-3">
              <Select
                id="display-gender-input__testid"
                name="gender"
                label="Gender:"
                placeholder="Select Gender"
                data={["Male", "Female"]}
                icon={true}
                value={state.gender}
                onSelect={onSelect}
              />
            </div>
            <div className="mt-3">
              <DateInput
                id="display-birthday-input__testid"
                name="birthday"
                label="Birthday:"
                placeholder="DD MM YYYY"
                value={state.birthday}
                onChange={onChange}
              />
            </div>
            <div className="mt-3">
              <Select
                id="display-horoscope-input__testid"
                name="horoscope"
                label="Horoscope:"
                placeholder="--"
                value={state.horoscope}
                valueClasses="!text-label"
                data={zodiacData}
                onSelect={onSelect}
              />
            </div>
            <div className="mt-3">
              <Select
                id="display-zodiac-input__testid"
                name="zodiac"
                label="Zodiac:"
                placeholder="--"
                value={state.zodiac}
                valueClasses="!text-label"
                data={zodiacData}
                onSelect={onSelect}
              />
            </div>
            <div className="mt-3">
              <Select
                id="display-height-input__testid"
                name="height"
                label="Height:"
                placeholder="Add Height"
                data={
                  Array.from(Array(201).keys()).map(
                    (item) => `${item} cm`
                  ) as unknown as string[]
                }
                value={state.height}
                onSelect={onSelect}
              />
            </div>
            <div className="mt-3">
              <Select
                id="display-weight-input__testid"
                name="weight"
                label="Weight:"
                placeholder="Add Weight"
                data={
                  Array.from(Array(101).keys())

                    .map((item) => `${item} kg`) as unknown as string[]
                }
                value={state.weight}
                onSelect={onSelect}
              />
            </div>
          </div>
        ) : (
          <div className="py-4 w-[280px]">
            {Object.keys(state).filter(
              (key) => (state as unknown as { [key: string]: string })[key]
            )[0] ? (
              <div>
                {state.birthday ? (
                  <div className="mb-1">
                    <span className="text-label text-[13px] font-medium">
                      Birthday:
                    </span>
                    <span className="text-[13px] text-white font-medium ml-2">
                      {`${state.birthday.split("-").reverse().join(" / ")} (Age ${moment(new Date()).locale("id").diff(state.birthday, "year")})`}
                    </span>
                  </div>
                ) : null}
                {typeof state.horoscope === "number" ? (
                  <div className="mb-1">
                    <span className="text-label text-[13px] font-medium">
                      Horoscope:
                    </span>
                    <span className="text-[13px] text-white font-medium ml-2">
                      {zodiacData[Number(state.horoscope)]}
                    </span>
                  </div>
                ) : null}
                {typeof state.zodiac === "number" ? (
                  <div className="mb-1">
                    <span className="text-label text-[13px] font-medium">
                      Zodiac:
                    </span>
                    <span className="text-[13px] text-white font-medium ml-2">
                      {zodiacData[Number(state.zodiac)]}
                    </span>
                  </div>
                ) : null}
                {state.height ? (
                  <div className="mb-1">
                    <span className="text-label text-[13px] font-medium">
                      Height:
                    </span>
                    <span className="text-[13px] text-white font-medium ml-2">
                      {state.height}
                    </span>
                  </div>
                ) : null}
                {state.weight ? (
                  <div className="mb-1">
                    <span className="text-label text-[13px] font-medium">
                      Weight:
                    </span>
                    <span className="text-[13px] text-white font-medium ml-2">
                      {state.weight}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : (
              <span className="text-[14px] font-medium text-info">
                Add in your your to help others know you better
              </span>
            )}
          </div>
        )}
      </Box>
      <Box
        title="Interest"
        icon={Edit}
        onClick={() => router.push("/interest")}
        classes="mt-6 pt-4 pl-6 pr-4"
      >
        <div className="pt-4 pb-0 w-[280px] flex items-center flex-wrap">
          {state.interest ? (
            state.interest
              ?.split("#")
              ?.filter((item) => item)
              ?.map((item, index) => (
                <Chip key={index} classes="w-fit mr-2 mb-3" text={item} />
              ))
          ) : (
            <span className="text-[14px] font-medium text-info">
              Add in your interest to find a better match
            </span>
          )}
        </div>
      </Box>
    </div>
  );
}
