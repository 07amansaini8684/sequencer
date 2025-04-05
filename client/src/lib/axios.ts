import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: "http://localhost:6060/api",
// })
// export const axiosInstance = axios.create({
//     baseURL: "https://sequencer-gbvb.onrender.com/api",
// })


// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL",
// })
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:6060/api" : "/api",
})