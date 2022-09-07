import React from "react";






const Button = (props) => {
  
  return (
    <>
      {props.type === "hide" && (
        <button
          className="bg-red-600 w-6 rounded-full hover:bg-red-400"
          onClick={props.click}
          name={props.name}
        >
          {" "}
          X{" "}
        </button>
      )}
      {props.type === "settings" && (
        <button
          className="w-full rounded-tl-2xl h-1/2 click:bg-slate-200/30 hover:shadow-inner hover:shadow-black/60 active:bg-white/20 "
          onClick={props.click}
          name={props.name}
        >
          ⚙️
        </button>
      )}
      {props.type === "edit" && (
        <button
          className="w-full rounded-bl-2xl h-1/2 click:bg-slate-200/30 hover:shadow-inner hover:shadow-black/60 active:bg-white/20"
          onClick={props.click}
          name={props.name}
        >
          ✏️
        </button>
      )}
      {props.type === "hideshow" && (
          <div className="flex flex-row mt-2">
          <p className="text-black ml-5 w-30 mr-10"> Toggle visibility</p>
          <input type="checkbox" className="toggle" onClick={props.click} name={props.name} checked={props.show}/>
          </div>
     


      )}
    </>
  );
};

export default Button;
