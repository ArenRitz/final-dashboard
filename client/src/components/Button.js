import React from "react";




const Button = (props) => {
  
//update visibility on click
const updateWidgetVisibility = (name, visibility, id) => {

  props.setVisibility(id, name, visibility);
};


  return (
    <div >
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
          onClick={() => props.click("edit")}
          name={props.name}
        >
          ✏️
        </button>
      )}
            {props.type === "stopedit" && (
        <button
          className="w-full rounded-bl-2xl h-1/2 click:bg-slate-200/30 hover:shadow-inner hover:shadow-black/60 active:bg-white/20"
          onClick={() => props.click("view")}
          name={props.name}
        >
          ✅
        </button>
      )}
      {props.type === "hideshow" && (
          <div className="flex flex-row mt-2 px-8 absolute -top-2">
          <input type="checkbox" className="toggle" onChange={() => updateWidgetVisibility(props.name, props.show, props.userID)}  name={props.name} checked={props.show}/>
          </div>
     


      )}
    </div>
  );
};

export default Button;
