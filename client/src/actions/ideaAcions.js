import axios from "axios";

import {
  GET_ERRORS,
  GET_IDEA,
  IDEA_LOADING
  // SET_CURRENT_USER
} from "./types";

// Get ideas
export const getUserIdeas = () => dispatch => {
  // dispatch(setProfileLoading());
  axios
    .get("/api/ideas")
    .then(res =>
      dispatch({
        type: GET_IDEA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IDEA,
        payload: {}
      })
    );
};

// add idea
export const addIdea = (userIdea, history) => dispatch => {
  axios
    .post("/api/ideas", userIdea)
    .then(res => history.push("/ideas"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// edit Idea
export const editIdea = (userIdea, id, history) => dispatch => {
  axios
    .put(`/api/ideas/${id}`, userIdea)
    .then(res => {
      // console.log(res.data);
      history.push("/ideas");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete idea
export const deleteIdea = (id, history) => dispatch => {
  if (window.confirm("Are you sure? you want to delete this! ")) {
    axios
      .delete(`/api/ideas/${id}`)
      .then(res => history.push("/ideas"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// ideas loading
export const setIdeasLoading = () => {
  return {
    type: IDEA_LOADING
  };
};
