import React, {
  useReducer,
  useEffect,
} from "react";
import axios from "axios";
import { useQuery } from "react-query";
const initialState = {
  loading: true,
  error: "",
  post: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        post: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        post: {},
        error: "Something Went Wrong!",
      };
    default:
      return state;
  }
};

function LaunchData() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { data } = useQuery("allLaunches", () => {
    axios
      .get(
        "https://api.spacexdata.com/v3/launches?start=2017-06-22&end=2017-06-25"
      )
      .then((response) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data[0],
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_ERROR",
        });
      });
  });
  return (
    <div>
      {state.loading
        ? "Loading"
        : state.post.mission_name}
      {state.error ? state.error : null}
    </div>
  );
}

export default LaunchData;
