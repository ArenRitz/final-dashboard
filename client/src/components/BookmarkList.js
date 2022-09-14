import BookmarkItem from "./BookmarkItem";
import React, { useState } from "react";
import NewBookmark from "./NewBookmark";

import NewCategory from "./NewCategory";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const BookmarkList = (props) => {
  const [bookmarksItems, setBookmarksItems] = useState(props.bookmarkItems);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewBookmark, setShowNewBookmark] = useState(false);
  const [editCatMode, setEditCatMode] = useState(false);

  // toggle edit category mode
  const toggleEditCatMode = () => {
    setEditCatMode(!editCatMode);
  };

  //function to toggle showEdit state on mouseEnter
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  let bookmarkList = bookmarksItems.map((bookmark, index) => {

    return (
      <>
        {bookmark.title && (
          <div key={index} className="relative w-40">
            <div
              className="my-1 rounded-full shadow-md border-b-2 border-base-content/20 shadow-base-content/10 bg-base-300 group overflow-hidden w-full hover:text-accent hover:border-accent"
              onMouseEnter={toggleEdit}
            >
              <BookmarkItem
                title={bookmark.title}
                URL={bookmark.url}
                mode={props.mode}
                userID={props.id}
                bookmarkId={bookmark.bookmarkID}
                categoryID={bookmark.categoryID}
                deleteSingle={props.deleteSingle}
                editSingle={props.editSingle}
              />
            </div>
          </div>
        )}
      </>
    );
  });

  //set listCount to count

  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        {props.mode === "edit" && (
          <>
          <div className="overflow-hidden flex w-full justify-between absolute -top-[42px] rounded-t-[21px] group h-[32px]">

           <div className=" z-20 w-20 rounded-full h-full bg-success tranform -translate-x-[5rem] 
               transition-all group-hover:transform group-hover:transition-all group-hover:-translate-x-[3rem] group-hover:after:translate-x-8 ">
            <button
              className=" text-xl font-bold flex text-success-content justify-end items-center hover:bg-white/20 w-full h-full rounded-full"
              onClick={toggleEditCatMode}
            >
              <div className="mr-2">
              <AiOutlineEdit />
              </div>
            </button>
            </div>
            <div className="  z-20 h-full w-20 rounded-full bg-error tranform translate-x-[6rem] 
               transition-all group-hover:transform group-hover:transition-all group-hover:translate-x-[3rem] group-hover:after:translate-x-6" >
            <button
              className=" text-lg font-bold text-error-content hover:bg-white/20 w-full h-full rounded-full ml-2"
              onClick={() =>
                props.deleteCategory(props.id, props.categoryID)
              }
            >
              <BsTrashFill/>
            </button>
            </div>
            </div>
            {editCatMode && (
              <NewCategory
                type="editCat"
                userID={props.id}
                categoryID={props.categoryID}
                editCategory={props.editCategory}
                category={props.category}
                toggleEditCatMode={toggleEditCatMode}
              />
            )}
          </>
        )}

        {bookmarkList}


        {props.mode === "edit" && (
          <>
            <button
              className="btn btn-accent btn-sm my-4 rounded-full"
              onClick={() => setShowNewBookmark(!showNewBookmark)}
            >
              +
            </button>
            {showNewBookmark && (
              <NewBookmark
                addBookmark={props.addSingle}
                id={props.id}
                categoryID={props.categoryID}
                type="new"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BookmarkList;
