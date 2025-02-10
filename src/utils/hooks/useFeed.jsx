import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import { setFeed } from "../store/feedSlice";

const useFeed = () => {
  const dispatch = useDispatch();
  const getFeed = async (setError) => {
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(setFeed(response?.data?.data));
    } catch (err) {
      setError(err?.response?.data || err.message);
    }
  };
  return getFeed;
};

export default useFeed;
