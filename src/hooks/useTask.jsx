import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTask = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const { data : tasks = [] } = useQuery({
        queryKey : ['tasks'],
        queryFn : async () =>{
            const res = await axiosSecure.get('/tasks')
            return res.data;
        }
    })
    return [tasks]
};

export default useTask;