import React, { useState } from "react";

const Login = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    email: "",
    password: "",
    status: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-base-200 shadow-2xl w-96 h-80 border-neutral-content border-solid border rounded-3xl">
      <div className="flex flex-row ">
        <button className="w-1/2 pt-4 pb-2 border-b border-r border-solid hover:bg-neutral-focus rounded-tl-3xl"> LogIn </button>
        <button className="w-1/2 pt-4 pb-2  border-b border-l border-solid"> SignUp </button>
      </div>
    </div>
  );
};

export default Login;
