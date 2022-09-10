import React from "react";

const NewBookmark = (props) => {
  // function to add new bookmark to database for specific user id by bookmark title and category name and update bookmarks state
  const addBookmark = (e) => {
    e.preventDefault();
    props.addBookmark(
      props.id,
      props.categoryID,
      e.target.title.value,
      e.target.url.value
    );

  };



  return (
    // div to contain the form for adding a new bookmark

    <div className="h-10 w-64">
      <div className="flex flex-col items-center justify-center bg-base-200 w-fit px-4 rounded-3xl shadow-md  shadow-black border border-base-content hover:border-2 hover:sha">
        <form className="flex flex-col items-center justify-center" onSubmit={addBookmark}>
          <div className="form-control w-full max-w-xs my-2">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs"
              name="title"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="URL"
              className="input input-bordered w-full max-w-xs"
              name="url"
            />
          </div>
          <button
            className="btn btn-primary btn-sm my-2"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBookmark;
