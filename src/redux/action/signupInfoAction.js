import { SIGNUP_INFO } from "../constant";

export const getSignupInfo = (data) => (dispatch) => {
  if (data) {
    dispatch({ type: SIGNUP_INFO, payload: data });
  } else {
    alert("Something went wrong");
  }
};
