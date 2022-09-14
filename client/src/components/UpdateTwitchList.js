import React, {useState} from "react";

const UpdateTwitchList = (props) => {
  const [newStreamer, setNewStreamer] = useState("");

// function to on submit add the new streamer to the array and update the database
  const handleSubmit = (e) => {
    e.preventDefault();
    let streamers = props.streamers;
    streamers.push(newStreamer);
    props.toggleAdd();
    props.addStreamer(streamers);
  };

  //function to handle input value

  const handleChange = (e) => {
    const value = e.target.value;
    setNewStreamer(value);
  };
  
  const hide = (e) => {
    e.preventDefault();
    props.toggleAdd();
  }

  return (
    <div className='border-2 border-base-content bg-base-300 p-4 rounded-3xl'>
      {/* form to update twitch streamer list */}

      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a streamer name" className="input input-bordered input-accent w-full max-w-xs" onChange={handleChange}/>
        <div>
        <button type="submit" className="mt-4 btn-xs btn-accent rounded-full">+</button>
        <button type="none" onClick={hide} className="mt-4 btn-xs btn-error rounded-full">X</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateTwitchList