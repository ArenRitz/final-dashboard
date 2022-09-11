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
      <div  key={index} className="relative w-full">
            <div className="my-1 bg-slate-400/20 rounded-full shadow-md shadow-black/50 group overflow-hidden w-full" onMouseEnter={toggleEdit}>
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

      </>
    );
  });


  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
      {props.mode === "edit" && (
        <>
        <button className="btn btn-primary btn-sm absolute -top-8 -left-0 z-20" onClick={toggleEditCatMode}> EDIT </button>
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
