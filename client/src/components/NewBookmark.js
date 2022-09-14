import {useState} from "react";

const NewBookmark = (props) => {
  //assign value to state
  const [bookmarkInfo, setBookmarkInfo] = useState({
    title: props.title,
    url: props.URL,
  });

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

  const editBookmark = (e) => {
    e.preventDefault();
    props.editSingle(
      props.bookmarkId,
      e.target.title.value,
      e.target.url.value,
      props.userID
    );
  };

  // function to handle input change
  const handleChange = (e) => {
    setBookmarkInfo({
      ...bookmarkInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    {props.type === "new" && (

    <div className="h-10 w-64">
      <div className="flex flex-col items-center justify-center bg-base-200 w-fit px-4 rounded-3xl shadow-md  shadow-black border border-base-content hover:border-2 ">
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
    )}
    {props.type === "edit" && (
 <div className="h-10 w-64 absolute">
      <div className="flex flex-col items-center justify-center bg-base-200 w-fit px-4 rounded-3xl shadow-md  shadow-black border border-base-content hover:border-2 ">
        <form className="flex flex-col items-center justify-center" onSubmit={editBookmark}>
          <div className="form-control w-full max-w-xs my-2">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs"
              name="title"
              value={bookmarkInfo.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="URL"
              className="input input-bordered w-full max-w-xs"
              name="url"
              value={bookmarkInfo.url}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary btn-sm my-2"
            type="submit"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
    )}
</>
  );
};

export default NewBookmark;
