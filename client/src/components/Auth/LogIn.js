import React from 'react'

const Login = () => {
  return (
    <>
    <form className="w-full">
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-xs mt-8">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Example: JohnDoe@email.com "
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

</div>
        <div className="flex flex-row justify-end mr-8 mt-4">
          <button className="btn btn-sm btn-primary" type="submit">Login</button>
        </div>
      </form>
    </>
  );
};


export default Login