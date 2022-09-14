import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import TransitItem from "./TransitItem";
import { AiOutlineTwitter } from "react-icons/ai";

export default function TransitList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });
  const [tweetCount, setTweetCount] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [currentTweetIndex, setCurrentTweetIndex] = useState(0);

  const formatTweets = (tweetArr) => {
    const formattedArr = [];
    const maxLength = 135;
    tweetArr.forEach((element) => {
      let tweetText = element.text.slice(0, element.text.indexOf(" http"));
      if (tweetText.length > maxLength) {
        tweetText = tweetText.substring(0, maxLength) + "...";
      }
      formattedArr.push({
        created_at: element.created_at,
        id: element.id,
        text: tweetText,
      });
    });

    return formattedArr;
  };

  const showTweet = (index) => {
    setCurrentTweetIndex(index);
    props.setFocusTweet(tweets.tweetList[index]);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/twitter/transit`) // twitter does not allow frontend requests. use backend route "/twitter/transit"
      .then((res) => {
        console.log("frontend twitter response", res);

        setTweets({
          tweetList: formatTweets(res.data.data),
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("frontend twitter error:", err);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center content-center w-[380px] h-[168px] bg-base-200 rounded-3xl px-2 py-2 shadow-lg shadow-base-content/20">
        {isLoading && (
          <div className="flex" role="status">
            <svg
              aria-hidden="true"
              class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accent"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
          </div>
        )}
        {!isLoading && (
          <section className="flex-col w-full relative">
            <div className="absolute text-2xl right-0 text-accent">
            <AiOutlineTwitter></AiOutlineTwitter>
            </div>

            <div className="text-accent text-center border-b-2 border-accent">
              <h3>TTC Service Alerts</h3>
            </div>
            <div className="carousel">
              {tweets.tweetList.map((item, index) => {
                return (
                  <div id={"tweet" + index} className="carousel-item w-full">
                    <div className="w-full">
                      <TransitItem item={item} key={index} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center w-full pt-4 gap-2">
              {tweetCount.map((item) => {
                return (
                  <a
                    href={`#tweet${item}`}
                    className={`btn btn-xs hover:bg-accent ${
                      item === currentTweetIndex ? "border border-accent" : ""
                    }`}
                    onClick={() => {
                      showTweet(item);
                    }}
                  >
                    {item + 1}
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
