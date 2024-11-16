import React from "react";
import Input from "@youApp/shared/input";
import Image from "next/image";
import eye from "@youApp/assets/eye.svg";
import Button from "@youApp/shared/button";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [visible, setVisible] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    if (
      state.username.length > 1 &&
      state.email.length > 1 &&
      state.password.length > 1 &&
      state.confirm_password.length > 1
    ) {
      setDisabled(() => false);
    } else setDisabled(() => true);
  }
  return (
    <div className="flex justify-center pt-32 bg-publish">
      <div>
        <div className="text-[#FFFFFF] text-[24px] font-bold mb-6">
          Register
        </div>
        <Input
          id="email-input__testid"
          name="email"
          type="email"
          classes="mb-6"
          placeholder="Enter Email"
          value={state.email}
          onChange={onChange}
        />
        <Input
          id="username-input__testid"
          name="email"
          type="text"
          classes="mb-6"
          placeholder="Create Username"
          value={state.username}
          onChange={onChange}
        />
        <Input
          id="password-input__testid"
          name="password"
          type="password"
          classes="mb-6"
          placeholder="Create Password"
          value={state.password}
          onChange={onChange}
        >
          <Image
            src={eye}
            alt="eye"
            onClick={() => setVisible(() => !visible)}
          />
        </Input>
        <Input
          id="confirm-password-input__testid"
          name="confirm_password"
          type="password"
          classes="mb-8"
          placeholder="Confirm Password"
          value={state.confirm_password}
          onChange={onChange}
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
        >
          <span>Register</span>
        </Button>
        <div className="flex items-center justify-center">
          <span className="mr-2 text-[#FFFFFF] text-[13px] font-[500]">
            Have an account?
          </span>
          <span
            className="text-gold underline"
            onClick={() => router.push("/")}
          >
            Login Here
          </span>
        </div>
      </div>
    </div>
  );
}
