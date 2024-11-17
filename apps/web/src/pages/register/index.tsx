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
    confirmation: "",
  });
  const [visible, setVisible] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    }).then(async (res) => {
      if (res) {
        router.push("/");
      }
    });
  }

  React.useEffect(() => {
    if (
      state.username.length > 1 &&
      state.email.length > 1 &&
      state.password.length > 1 &&
      state.confirmation.length > 1
    ) {
      if (state.password === state.confirmation) {
        setDisabled(() => false);
      }
    } else setDisabled(() => true);

    if (state.password && state.confirmation) {
      if (state.password === state.confirmation) {
        setInvalidPassword(() => false);
      } else setInvalidPassword(() => true);
    }

    if (state.email) {
      if (
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.email)
      ) {
        setInvalidEmail(() => false);
      } else setInvalidEmail(() => true);
    }
  }, [state]);
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
          classes={invalidEmail ? "" : "mb-6"}
          placeholder="Enter Email"
          value={state.email}
          onChange={onChange}
        />
        {invalidEmail ? (
          <div className="text-xs text-red-500 text-medium mb-4 mt-1 ml-1">
            Invalid Email address
          </div>
        ) : null}
        <Input
          id="username-input__testid"
          name="username"
          type="text"
          classes="mb-6"
          placeholder="Create Username"
          value={state.username}
          onChange={onChange}
        />
        <Input
          id="password-input__testid"
          name="password"
          type={visible ? "password" : "text"}
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
          id="confirmation-input__testid"
          name="confirmation"
          type={visible ? "password" : "text"}
          classes={invalidPassword ? "" : "mb-8"}
          placeholder="Confirm Password"
          value={state.confirmation}
          onChange={onChange}
        >
          <Image
            src={eye}
            alt="eye"
            onClick={() => setVisible(() => !visible)}
          />
        </Input>
        {invalidPassword ? (
          <div className="text-xs text-red-500 text-medium mb-8 mt-1 ml-1">
            Password don't match, please check again
          </div>
        ) : null}
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
