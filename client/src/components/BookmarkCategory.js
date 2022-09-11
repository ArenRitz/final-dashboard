import React, { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import Button from "./Button";
import axios from "axios";

const BookmarkCategory = (props) => {
  const [bookmarks, setBookmarks] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(
      "BOOKMARKS LOADING **********************************************"
    );
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

  let category = Object.keys(bookmarks).map((category, index) => {
    return (
      <div key={category} className="mx-5 figma-bookmark-back text-center">
        <h1 className="text-2xl font-bold figma-bookmark-label">{category}</h1>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <BookmarkList
            key={category}
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
          />
        )}
      </div>
    );
  });

  return (
    <>
      <div>
        <Button type="hide" click={props.click} name="Bookmarks" />
        <div className="flex flex-row justify-between w-fit figma-bookmark-container px-5 py-5">
          {category}
        </div>
      </div>
    </>
  );
};

export default BookmarkCategory;
