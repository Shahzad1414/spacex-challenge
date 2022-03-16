import React, {
  useReducer,
  useState,
  useEffect,
} from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import axios from "axios";
import "./launch.css";
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
const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
function LaunchData() {
  const [startdate, setStartDate] =
    useState("2017-06-22");
  const [enddate, setEndDate] =
    useState("2017-06-25");

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleSelect = (ranges) => {
    setStartDate(
      ranges.selection.startDate
        .toISOString()
        .slice(0, 10)
    );
    setEndDate(
      ranges.selection.endDate
        .toISOString()
        .slice(0, 10)
    );
  };
  useEffect(() => {
    axios
      .get(
        `https://api.spacexdata.com/v3/launches?start=${startdate}&end=${enddate}`
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
  }, []);
  return (
    <div class="container mx-auto px-4 py-4">
      <div class="grid grid-cols-1">
        <div class="mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
        </div>
        <div class="mx-auto">
          <table
            id="customers"
            class="table-auto"
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Launch_Success</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {state.loading
                    ? "Loading"
                    : state.post.mission_name
                    ? state.post.mission_name
                    : null}
                  {state.error
                    ? state.error
                    : null}
                </td>
                <td>
                  {state.loading
                    ? "Loading"
                    : state.post.launch_date_local
                    ? state.post.launch_date_local
                    : null}
                  {state.error
                    ? state.error
                    : null}
                </td>
                <td>
                  {state.loading
                    ? "Loading"
                    : state.post.launch_success
                    ? state.post.launch_success
                    : null}
                  {state.error
                    ? state.error
                    : null}
                </td>
                <td>
                  {state.loading
                    ? "Loading"
                    : state.post.details
                    ? state.post.details
                    : null}
                  {state.error
                    ? state.error
                    : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaunchData;
