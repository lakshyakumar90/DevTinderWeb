import React, { useEffect } from "react";
import useFeed from "../../utils/hooks/useFeed";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";

const Feed = () => {
  const getFeed = useFeed();

  useEffect(() => {
    getFeed();
  }, []);

  const feed = useSelector((store) => store.feed);

  if (!feed || feed.length === 0) {
    return <div className="text-center mt-20">No more profiles</div>;
  }

  const currentProfile = feed[0];

  return (
    <div className="mt-20 flex flex-col items-center">
      <FeedCard profile={currentProfile}/>
      
    </div>
  );
};

export default Feed;
