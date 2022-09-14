import React, { useState, useEffect } from "react";
import { FaSearch, FaGoogle, FaYahoo } from "react-icons/fa";
import { DiBingSmall } from "react-icons/di";
import { SiDuckduckgo } from "react-icons/si";
import axios from "axios";

const SearchWidget = (props) => {
  const [searchEngine, setSearchEngine] = useState(props.searchEngine);

  //on submit form reaplce spaces in input with + and redirect to google search
  

  useEffect(() => {
    if (props.searchEngine) {
      setSearchEngine(props.searchEngine);
    }
  }, [props.searchEngine]);
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value.replace(/ /g, "+");

    if (searchEngine === "google") {
      window.location.href = `https://www.google.com/search?q=${search}`;
    }
    if (searchEngine === "duckduckgo") {
      window.location.href = `https://duckduckgo.com/?q=${search}`;
    }
    if (searchEngine === "bing") {
      window.location.href = `https://www.bing.com/search?q=${search}`;
    }
    if (searchEngine === "yahoo") {
      window.location.href = `https://search.yahoo.com/search?p=${search}`;
    }
  };

  //function to update db with new search engine on click
  const handleSearchEngine = (e) => {
    setSearchEngine(e);
    axios
      .put(`http://localhost:8080/api/search/${props.userID}`, { search_engine: e })
      .then((res) => {  
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (

    <div className="w-[400px] flex flex-row border-2 border-base-content h-fit rounded-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row w-full h-8 items-center p-2"
      >
        <div className="rounded-full hover:bg-white/10 mr-2 ">
          <div className="dropdown">
            {searchEngine === "google" && (
              <FaGoogle
                className=" text-accent w-8  text-center mt-[6px]"
                tabIndex={0}
              />
            )}
            {searchEngine === "duckduckgo" && (
              <SiDuckduckgo
                className=" text-accent w-8 mt-[6px] text-center"
                tabIndex={0}
              />
            )}
            {searchEngine === "bing" && (
              <DiBingSmall
                className=" text-accent w-8 mt-[6px] text-center"
                tabIndex={0}
              />
            )}
            {searchEngine === "yahoo" && (
              <FaYahoo
                className=" text-accent w-8 mt-[6px] text-center"
                tabIndex={0}
              />
            )}
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box text-center -left-4"
            >
              <li>
                <button
                  type="button"
                  onClick={() => handleSearchEngine("google")}
                >
                  {" "}
                  <FaGoogle />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSearchEngine("duckduckgo")}
                >
                  {" "}
                  <SiDuckduckgo />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSearchEngine("bing")}
                >
                  {" "}
                  <DiBingSmall />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSearchEngine("yahoo")}
                >
                  {" "}
                  <FaYahoo />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <input
          id="search"
          type="text"
          placeholder="Search"
          name="search"
          className="bg-inherit w-[100%]  outline-button focus:outline-none"
          autoComplete="on"
        /> 
        <div className="rounded-full hover:bg-white/10 ml-2 px-2 py-[2px]">
        <button type="submit" className="" >
          <FaSearch />
        </button>
        </div>
      </form>
    </div>

  );
};

export default SearchWidget;
