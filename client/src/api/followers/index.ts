import { getAPIInstance } from "../index";

const API = getAPIInstance();

export const retrieveFollowers = (userId: string) =>
  API.get(`/followers/${userId}`);
