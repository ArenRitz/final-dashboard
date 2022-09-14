import React from "react";
import { FiEdit, FiSettings } from "react-icons/fi";
import {BsFillCheckCircleFill} from "react-icons/bs";

const Button = (props) => {
  //update visibility on click
  const updateWidgetVisibility = (name, visibility, id) => {
    props.setVisibility(id, name, visibility);
  };
  
  return (
    <>
      {props.type === "hide" && (
        <button
          className="bg-red-600 w-6 rounded-full hover:bg-red-400"
          onClick={props.click}
          name={props.name}
        >
          X
        </button>
      )}
      {props.type === "settings" && (
        <button
          className=" rounded-tl-2xl z-30 pl-2 h-full w-full hover:shadow-inner hover:shadow-black/60 active:bg-white/20 "
          onClick={props.click}
          name={props.name}
        >

          <FiSettings className=" text-accent-content" style={{pointerEvents: 'none'}}/>
     
        </button>
      )}
      {props.type === "edit" && (
        <button
          className=" rounded-bl-2xl  pl-2 h-full w-full hover:shadow-inner hover:shadow-black/60 active:bg-white/20"
          onClick={() => props.click("edit")}
          name={props.name}
        >
          <FiEdit  className="text-accent-content" />

        </button>
      )}
      {props.type === "stopedit" && (
        <button
          className="pl-2 h-full w-full rounded-bl-2xl  hover:shadow-inner hover:shadow-black/60 active:bg-white/20"
          onClick={() => props.click("view")}
          name={props.name}
        >
          <BsFillCheckCircleFill className="text-accent-content" />
        </button>
      )}
      {props.type === "hideshow" && (
        <div className="flex flex-row mt-2 px-8 absolute -top-2">
          <input
            type="checkbox"
            className="toggle"
            onChange={() =>
              updateWidgetVisibility(props.name, props.show, props.userID)
            }
            name={props.name}
            checked={props.show}
          />
        </div>
      )}
    </>
  );
};

export default Button;
