import { CLEAR_ERROR } from "../constants";

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
