import React, { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import Button from "./Button";
import axios from "axios";
import NewCategory from "./NewCategory";

const BookmarkCategory = (props) => {
  const [bookmarks, setBookmarks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [addCatMode, setAddCatMode] = useState(false);



  const formatData = (data) => {
    let result = {};
    data.forEach((item) => {
      if (!result[item.category_name]) {
        result[item.category_name] = [];
      }
      result[item.category_name].push({
        title: item.bookmark_title,
        url: item.bookmark_url,
        categoryID: item.user_category_id,
        bookmarkID: item.id,
      });
    });
    return result;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/bookmarks/${props.userID}`)
      .then((res) => {
        setBookmarks({ ...formatData(res.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function to delete bookmark from database for specific user id by bookmark title and category name and update bookmarks state
  const deleteBookmark = (id, category_id, title) => {
    setIsLoading(true);
    axios
      .delete(
        `http://localhost:8080/api/bookmarks/${id}/${category_id}/${title}`
      )
      .then((data) => {
        setBookmarks({ ...formatData(data.data) });
        setIsLoading(false);
      });
  };

  const addBookmark = (id, category_id, title, url) => {
    setIsLoading(true);
    axios
      .put(`http://localhost:8080/api/bookmarks/${id}/${category_id}`, {
        title,
        url,
      })
      .then((data) => {
        setBookmarks({ ...formatData(data.data) });
        setIsLoading(false);
      });
  };

  // edit bookmark function
  const editBookmark = (bookmark_id, title, url, userId) => {
    setIsLoading(true);

    axios
      .put(`http://localhost:8080/api/bookmarks/${bookmark_id}`, {
        title,
        url,
        user_id: userId,
      })
      .then((data) => {
        setBookmarks({ ...formatData(data.data) });
        console.log(
          "BOOKMARKS DONE LOADING **********************************************"
        );
        setIsLoading(false);
      });
  };

  // function to delete category from database for specific user id by category id and update bookmarks state
  const deleteCategory = (id, category_id) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:8080/api/categories/${id}/${category_id}`)
      .then((data) => {
        setBookmarks({ ...formatData(data.data) });
        setIsLoading(false);
      });
  };
  

  // function to add category to database for specific user id by category name and update bookmarks state
  const addCategory = (id, category_name) => {
    setIsLoading(true);
    axios
      .put(`http://localhost:8080/api/categories/${id}`, {
        category_name,
      })
      .then((data) => {
        setBookmarks({ ...formatData(data.data) });
        setIsLoading(false);
      });
  };

  // function to edit category to database for specific user id by category name and update bookmarks state
  const editCategory = (id, category_id, category_name) => {
    setIsLoading(true);
    console.log("EDIT CATEGORY FUNCTION CALLED");
    console.log("ID", id);
    console.log("CATEGORY ID", category_id);
    console.log("CATEGORY NAME", category_name);
    axios
      .put(`http://localhost:8080/api/categories/${id}/${category_id}`, {
        category_name,
      })
      .then((data) => {
        setBookmarks({ ...formatData(data.data) });
        setIsLoading(false);
      });
  };


  // toggle add category mode
  const toggleAddCatMode = () => {
    setAddCatMode(!addCatMode);
  };






  let category = Object.keys(bookmarks).map((category, index) => {
    return (
      <div key={index} className="mx-5 figma-bookmark-back text-center">
        <div  className="relative">

        <h1 className="text-2xl font-bold figma-bookmark-label">{category}</h1>
        { props.mode === 'edit' && <button className="absolute right-0 top-0 btn btn-primary btn-sm" onClick={() => deleteCategory(props.userID, bookmarks[category][0].categoryID)}> DEL </button> }
        </div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <BookmarkList

            category={category}
            bookmarkItems={bookmarks[category]}
            index={index}
            deleteSingle={deleteBookmark}
            addSingle={addBookmark}
            editSingle={editBookmark}
            id={props.userID}
            state={bookmarks}
            categoryID={bookmarks[category][0].categoryID}
            mode={props.mode}

            editCategory={editCategory}


          />
        )}
      </div>
    );
  });

  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between w-fit figma-bookmark-container px-5 py-5">
          {category}
         
          {props.mode === "edit" && (
        <button className="btn btn-primary btn-sm" onClick={toggleAddCatMode}> ADD </button>
      )}
      {addCatMode && (
        <div className="relative">
        <NewCategory
          type="addCat"
          id={props.userID}
          addCategory={addCategory}
          toggleAddCatMode={toggleAddCatMode}
        />
        </div>
      )}

        
       
        
        </div>
      </div>
    </>
  );
};

export default BookmarkCategory;
