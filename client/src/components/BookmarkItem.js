import { useState } from "react";
import NewBookmark from "./NewBookmark";

const BookmarkItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      {props.mode === "view" && (
        
        <div className="flex flex-row  ">

        <a
          className="text-slate-100 w-96 overflow-x-hidden "
          href={props.URL}
          target="_blank"
          rel="noreferrer"
        >
          {props.title}
        </a>
  

      </div>
      
      
      
      )}


      {props.mode === "edit" && (
            <div className="flex flex-row  ">
            <button
              className="bg-primary z-10  relative w-full rounded-full top-0 -left-20 hover:bg-primary-focus tranform transition-all group-hover:transform group-hover:transition-all group-hover:translate-x-[5rem] group-hover:after:translate-x-8 text-end  text-sm"
              onClick={toggleEdit}
            >
              Edit&nbsp;&nbsp;
            </button>
            <a
              className="text-slate-100 w-96 overflow-x-hidden "
              href={props.URL}
              target="_blank"
              rel="noreferrer"
            >
              {props.title}
            </a>
      
            <button
              className=" bg-red-600  w-full rounded-full  z-10 relative -right-16 hover:bg-red-300 tranform transition-all group-hover:transform group-hover:transition-all group-hover:-translate-x-[4rem] group-hover:after:translate-x-8 text-start text-sm"
              onClick={() =>
                props.deleteSingle(props.userID, props.categoryID, props.title)
              }
            >
              &nbsp;&nbsp;Del
            </button>
      
            {showEdit && (
              <div className="absolute top-8 -left-6 z-10">
                <NewBookmark
                  type="edit"
                  bookmarkId={props.bookmarkId}
                  categoryID={props.categoryID}
                  title={props.title}
                  URL={props.URL}
                  editSingle={props.editSingle}
                  userID={props.userID}
                />
              </div>
            )}
          </div>
      
      
      
      
      
      
      
      
      )}



    </>
  );
};

export default BookmarkItem;
