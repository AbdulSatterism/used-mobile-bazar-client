import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";


const useBuyer = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: isBuyer, isLoading: isBuyerLoading } = useQuery({
        queryKey: ['isBuyer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/buyer/${user?.email}`);
            return res.data.buyer;
        }
    })
    return [isBuyer, isBuyerLoading]
};

export default useBuyer;