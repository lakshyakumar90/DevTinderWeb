import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants/constants";

const useSendRequest = () => {
  const sendRequest = async (id, status, setError) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };
  return sendRequest;
};

export default useSendRequest;
