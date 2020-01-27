import React, { useState, useEffect } from "react";
import api from "utils/api";
import { log } from "utils/helpers";

function LikeButton() {
  const [likeCount, setLikeCount] = useState(0);
  const [likeColor, setLikeColor] = useState("gray-500");

  useEffect(() => {
    api.get("/api/likes/calculator.json").then((res) => {
      setLikeCount(res.data.count)
    }).catch(log);
  }, []);

  const onClickLike = () => {
    setLikeColor("red-500");
    api.post("/api/likes/calculator/up.json").then((res) => {
      setLikeCount(res.data.count)
    }).catch(log);
    setTimeout(() => {
      setLikeColor("gray-500");
    }, 300)
  };

  return (
    <div className="fixed bottom-0 right-0 m-6">
      <button onClick={onClickLike}
              className={`flex flex-row items-center rounded-full outline-none focus:outline-none bg-white border border-solid border-${likeColor}`}>
        <svg className={`h-12 w-12 p-3 fill-${likeColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z"/></svg>
        <span className={`pr-3 text-${likeColor}`}>{likeCount}</span>
      </button>
    </div>
  );
}

export default LikeButton;