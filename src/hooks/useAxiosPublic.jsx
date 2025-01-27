import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'https://click-n-cash-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;