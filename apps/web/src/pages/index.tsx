import React from "react";
import Input from "@youApp/shared/input";
import Image from "next/image";
import eye from "@youApp/assets/eye.svg";
import Button from "@youApp/shared/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });
  const [visible, setVisible] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    if (state.username.length > 1 && state.password.length > 1) {
      setDisabled(() => false);
    } else setDisabled(() => true);
  }

  function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (state.username === "admin" && state.password === "admin") {
      router.push("/profile");
    }
  }
  return (
    <div className="flex justify-center pt-32 bg-publish">
      <div>
        <div className="text-[#FFFFFF] text-[24px] font-bold mb-6">Login</div>
        <Input
          id="login-input__testid"
          name="username"
          type="text"
          classes="mb-4"
          value={state.username}
          onChange={onChange}
          placeholder="Enter Username/Email"
        />
        <Input
          id="login-input__testid"
          name="password"
          classes="mb-6"
          type={visible ? "text" : "password"}
          value={state.password}
          onChange={onChange}
          placeholder="Enter Password"
        >
          <Image
            src={eye}
            alt="eye"
            onClick={() => setVisible(() => !visible)}
          />
        </Input>
        <Button
          id="button-login__testid"
          type="button"
          color="primary"
          classes="mb-10"
          disabled={disabled}
          onClick={onSubmit}
        >
          <span>Register</span>
        </Button>
        <div className="flex items-center justify-center">
          <span className="mr-2 text-[#FFFFFF] text-[13px] font-[500]">
            No Account?
          </span>
          <span
            className="text-gold underline"
            onClick={() => router.push("/register")}
          >
            Register Here
          </span>
        </div>
      </div>
    </div>
  );
}
