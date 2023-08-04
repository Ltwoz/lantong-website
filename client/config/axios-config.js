import axios from "axios";

const instanceApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
    withCredentials: true,
    credentials: "include",
});

export default instanceApi;