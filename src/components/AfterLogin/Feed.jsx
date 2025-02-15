import React, { useEffect, useState } from "react";
import useFeed from "../../utils/hooks/useFeed";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { Toaster } from "react-hot-toast";

const Feed = () => {
  const getFeed = useFeed();
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeed(setError);
  }, []);

  const feed = useSelector((store) => store.feed);

  if (!feed || feed.length === 0) {
    return <div className="text-center mt-20">No more profiles</div>;
  }

  const currentProfile = feed[0];

  return (
    <>
      <Toaster position="top-center" />
      <div className="mt-24 flex flex-col justify-center items-center">
        <FeedCard profile={currentProfile} />
        {error && <div className="text-center mt-20">{error}</div>}
      </div>
    </>
  );
};

export default Feed;
