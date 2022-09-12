import BookmarkItem from "./BookmarkItem";
import React, { useState } from "react";
import NewBookmark from "./NewBookmark";

import NewCategory from "./NewCategory";

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
              className="my-1 rounded-full shadow-md border-2 border-base-content shadow-base-content/10 bg-base-300 group overflow-hidden w-full hover:text-accent hover:border-accent"
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
           <div className="absolute right-2 -top-[4.5rem] -left-0 z-20 h-[25px] w-[45px] rounded-full bg-success" >
            <button
              className=" text-sm text-success-content"
              onClick={toggleEditCatMode}
            >
              {" "}
              EDIT{" "}
            </button>
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
