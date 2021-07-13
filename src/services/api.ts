import axios from "axios";
export const api = axios.create({
  baseURL: "https://podcastr-server-ian.herokuapp.com/",
});
