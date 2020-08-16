import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-96fd2.firebaseio.com/",
});

export default instance;
