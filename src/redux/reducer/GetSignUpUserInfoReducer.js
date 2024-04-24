import { SIGNUP_INFO } from "../constant";

export const GetSignUpUserInfoReducer = (state = null, action) => {
  switch (action.type) {
    case SIGNUP_INFO:
      return action.payload;
    default:
      return state;
  }
};
