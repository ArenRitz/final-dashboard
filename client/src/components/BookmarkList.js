import BookmarkItem from "./BookmarkItem";
import React, { useState } from "react";
import NewBookmark from "./NewBookmark";
import classNames from "classnames";

const BookmarkList = (props) => {
  const [bookmarksItems, setBookmarksItems] = useState(props.bookmarkItems);
  const [showEdit, setShowEdit] = useState(false);


//Edit Buttons classnames

    

  //function to toggle showEdit state on mouseEnter
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };



  let bookmarkList = bookmarksItems.map((bookmark, index) => {
    return (
      <>
        
          {props.mode === "view" && (
            <div className="my-1 bg-slate-400/20 w-full rounded-full shadow-md shadow-black/50 ">
              <BookmarkItem
                title={bookmark.title}
                URL={bookmark.url}
                mode={props.mode}
                categoryID={bookmark.categoryID}
                deleteSingle={props.deleteSingle}
              />
            </div>
          )}
          {props.mode === "edit" && (
            <div className="my-1 bg-slate-400/20 w-full rounded-full shadow-md shadow-black/50 relative group overflow-hidden" onMouseEnter={toggleEdit}>
              <BookmarkItem
                title={bookmark.title}
                URL={bookmark.url}
                mode={props.mode}
                categoryID={bookmark.categoryID}
                deleteSingle={props.deleteSingle}
                
              />
              <button
                className=" bg-red-600 absolute w-20 rounded-full top-0 -right-20 hover:bg-red-300 tranform transition-all group-hover:transform group-hover:transition-all group-hover:-translate-x-11 group-hover:after:translate-x-8 text-start"
                onClick={() =>
                  props.deleteSingle(
                    props.id,
                    bookmark.categoryID,
                    bookmark.title
                  )
                }
              > &nbsp;&nbsp;Del </button>
                <button
                className="bg-primary absolute w-20 rounded-full top-0 -left-20 hover:bg-primary-focus tranform transition-all group-hover:transform group-hover:transition-all group-hover:translate-x-12 group-hover:after:translate-x-8 text-end"
                > Edit&nbsp;&nbsp; </button>


            </div>
          )}

      </>
    );
  });

  // show newboomark when clicked on add button
  const [showNewBookmark, setShowNewBookmark] = useState(false);

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
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BookmarkList;
