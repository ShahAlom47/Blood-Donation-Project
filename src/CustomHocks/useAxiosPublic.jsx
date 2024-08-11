
import axios from "axios";

const axiosPublic=axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://blood-donation-server-zeta.vercel.app',

  // withCredentials: true,
})

const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;
