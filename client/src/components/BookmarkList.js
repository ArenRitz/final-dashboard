import BookmarkItem from "./BookmarkItem";
import React, { useState } from "react";
import NewBookmark from "./NewBookmark";
import classNames from "classnames";

const BookmarkList = (props) => {
  const [bookmarksItems, setBookmarksItems] = useState(props.bookmarkItems);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewBookmark, setShowNewBookmark] = useState(false);




    

  //function to toggle showEdit state on mouseEnter
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };




  let bookmarkList = bookmarksItems.map((bookmark, index) => {
    return (
      <>
      <div className="relative w-full">
            <div key={index} className="my-1 bg-slate-400/20 rounded-full shadow-md shadow-black/50 group overflow-hidden w-full" onMouseEnter={toggleEdit}>
              <BookmarkItem
              key={index}
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

      </>
    );
  });


  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        {bookmarkList}

        {props.mode === "edit" && (
          <>
            <button
              className="btn btn-primary btn-sm my-4"
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
