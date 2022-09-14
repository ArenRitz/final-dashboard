import { useState } from "react";
import NewBookmark from "./NewBookmark";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";


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
            className=" w-96 overflow-x-hidden "
            href={props.URL}
            target="_blank"
            rel="noreferrer"
          >
            {props.title}
          </a>
        </div>
      )}

      {props.mode === "edit" && (
        <div className="flex flex-row group ">
          <div className="mx-0 my-0 relative">
            <button
              className="bg-success flex flex-row justify-end items-center text-success-content z-10 absolute w-10 top-0 -left-20 pl-2 tranform
               transition-all group-hover:transform group-hover:transition-all group-hover:translate-x-[4.4rem] group-hover:after:translate-x-8 text-end h-full text-sm rounded-r-full"
              onClick={toggleEdit}
            >
              <div className="mr-2">
               <AiOutlineEdit />
               </div>
            </button>
          </div>

          <a
            className=" w-40 overflow-x-hidden text-center"
            href={props.URL}
            target="_blank"
            rel="noreferrer"
          >
            {props.title}
          </a>

          <div className="mx-0 my-0 py-0 px-0 relative">
            <button
              className=" bg-error w-12 h-full text-error-content z-10 absolute -right-16 -top-0 tranform transition-all group-hover:transform group-hover:transition-all group-hover:-translate-x-[3rem] pr-4 pl-0 group-hover:after:translate-x-8  text-start text-sm rounded-l-full"
              onClick={() =>
                props.deleteSingle(props.userID, props.categoryID, props.title)
              }
            >
              <div className="ml-2">
              <BsTrashFill/>
              </div>
            </button>
          </div>
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
