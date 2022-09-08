import React, { useState } from "react";
import classnames from "classnames";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Index = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    email: "",
    password: "",
    status: "login",
    error: "",
  });

  const signUpClass = classnames({
    "w-1/2 pt-4 pb-2  border-b border-l border-solid  hover:bg-neutral-focus rounded-tr-3xl": true,
    "bg-neutral-focus": loginState.status === "signup",
  });
  const loginClass = classnames({
    "w-1/2 pt-4 pb-2  border-b border-r border-solid  hover:bg-neutral-focus rounded-tl-3xl": true,
    "bg-neutral-focus": loginState.status === "login",
  });

  // change status to "login" or "signup" on click when clicking on the login or signup button

  const changeStatus = (status) => {
    setLoginState({
      ...loginState,
      status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className=" flex flex-row justify-center mt-52">
      <div className="bg-base-200 shadow-2xl w-96 h-[370px] border-neutral-content border-solid border rounded-3xl">
        <div className="flex flex-row ">
          <button className={loginClass} onClick={() => changeStatus("login")}>
            LogIn
          </button>
          <button
            className={signUpClass}
            onClick={() => changeStatus("signup")}
          >
            SignUp
          </button>
        </div>
        {loginState.status === "login" && <LogIn />}
        {loginState.status === "signup" && <SignUp />}
      </div>
    </div>
  );
};

export default Index;
