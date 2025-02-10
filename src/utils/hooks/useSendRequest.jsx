import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants/constants";

const useSendRequest = () => {
    console.log("ejwfcwh");
  const sendRequest = async (id, status, setError) => {
    console.log("sendRequest");
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return sendRequest;
};

export default useSendRequest;
