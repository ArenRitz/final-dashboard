import BookmarkItem from "./BookmarkItem";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const BookmarkList = (props) => {
  const [bookmarks, setBookmarks] = useState(props.bookmarkItems);

  let bookmarkList = bookmarks.map((bookmark, index) => {
    return (
      <Draggable
        key={bookmark.title}
        draggableId={bookmark.title}
        index={index}
      >
        {(provided) => (
          <div
            className="my-1 bg-slate-400/20 w-full rounded-full shadow-md shadow-black/50 "
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <a
              className="text-slate-100"
              href={bookmark.url}
            >
              {bookmark.title}
            </a>
          </div>
        )}
      </Draggable>
    );
  })
function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(bookmarks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBookmarks(items);
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bookmarks">
          {(provided) => (
            <div
              className="flex flex-col items-center justify-center"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {bookmarkList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
 
    
    </>
  );
};

export default BookmarkList;