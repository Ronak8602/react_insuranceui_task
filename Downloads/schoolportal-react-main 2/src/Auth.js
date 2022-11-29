const token = localStorage.getItem("studyhox");

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  },
};
export default auth;
