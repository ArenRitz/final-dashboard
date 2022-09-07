import React, { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import Button from "./Button";
import axios from "axios";


const BookmarkCategory = (props) => {
  const [bookmarks, setBookmarks] = useState({});



  useEffect(() => {



    const formatData = (data) => {
      let result = {};
      data.forEach((item) => {
        if (!result[item.category_name]) {
          result[item.category_name] = [];
        }
        result[item.category_name].push({
          title: item.bookmark_title,
          url: item.bookmark_url,
        });
      });
      return result;
    };
    


    axios
      .get("http://localhost:8080/bookmarks/1")
      .then((res) => {
        setBookmarks({...formatData(res.data)});
      })
      .catch((err) => {
        console.log(err);
      });



    

  }, []);
  console.log('LOOK HERE LOOK HERE', bookmarks)


  let category = Object.keys(bookmarks).map((category, index) => {
    return (
      <div key={category} className="mx-5 figma-bookmark-back text-center">
        <h1 className="text-2xl font-bold figma-bookmark-label">{category}</h1>
        <BookmarkList
          key={category}
          category={category}
          bookmarkItems={bookmarks[category]}
          index={index}
        />
      </div>
    );
  });

  return (
    <>
      <Button type="hide" click={props.click} name="Bookmarks" />
      <div className="flex flex-row justify-between w-fit figma-bookmark-container px-5 py-5">
        {category}
      </div>
    </>
  );
};

export default BookmarkCategory;
