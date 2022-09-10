import { useState } from "react";

const BookmarkItem = (props) => {
  
  const [showEdit, setShowEdit] = useState(false);
  
  return (
    <>

       <div>
        <a className="text-slate-100" href={props.URL} target="_blank">

          {props.title}
        </a>
      </div>



    </>
  );
};

export default BookmarkItem;
