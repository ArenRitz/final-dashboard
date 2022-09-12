import React, {useState} from "react";

const NewCategory = (props) => {

 const [newCategoryName, setNewCategoryName] = useState("");
 const [editCategoryName, setEditCategoryName] = useState("");

  const handleNewCategoryName = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleEditCategoryName = (e) => {
    setEditCategoryName(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();
    props.addCategory(props.id, newCategoryName);
    props.toggleAddCatMode();
  };


  const editCategory = (e) => {
    e.preventDefault();
    props.editCategory(props.userID, props.categoryID, editCategoryName);
    props.toggleEditCatMode();
  };





  return (
    <>
    {props.type === "addCat" && (

    <div className="h-10 w-64 absolute top-[2rem] -right-[7rem]">
    <div className="flex flex-col items-center justify-center bg-base-200 w-fit px-4 py-2 rounded-3xl shadow-md shadow-black border border-base-content hover:border-2 ">
      <form onSubmit={addCategory}>
      <div className="form-control w-full max-w-xs">
        <input
          name="newCat"
          type="text"
          placeholder="Category Name"
          className="input input-bordered w-full max-w-xs"
          onChange={handleNewCategoryName}
        />
      </div>
      <button className="btn btn-primary btn-sm my-2" type="submit">Add</button>

      </form>
    </div>
  </div>
)}
{props.type === "editCat" && (
      <div className="h-10 w-64 absolute z-20">
      <div className="flex flex-col items-center justify-center bg-base-200 w-fit px-4 py-2 rounded-3xl shadow-md shadow-black border border-base-content hover:border-2 ">
      <form onSubmit={editCategory}>
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            name="editCat"
            placeholder={props.category}
            className="input input-bordered w-full max-w-xs"
            onChange={handleEditCategoryName}
          />


        </div>
        <button className="btn btn-primary btn-sm my-2" type="submit">Edit</button>
        </form>
      </div>
    </div>
  )}

  </>
  );
};

export default NewCategory;
