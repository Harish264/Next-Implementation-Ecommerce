import axios from "axios";

export const getUserData = async () => {
  const res = await axios.get("/api/profile");
  return res;
};
