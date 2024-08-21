
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useEffect } from "react";

import useUser from "./useUser";
import Swal from "sweetalert2";






const axiosSecure = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const useAxios = () => {
  const { logout} = useUser()
 
  const navigate = useNavigate()


  useEffect(() => {

    axiosSecure.interceptors.request.use(function (config) {
      const token= localStorage.getItem('token')
      config.headers.authorization=`bearer ${token}`
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      const status= error.response?.status
      if(status===401|| status===403){
        console.log(error.response.data.message);
        Swal.fire(error.response.data.message)
       logout()
        .then(()=>{
         
          navigate('/login')
        })
        
      }
      return Promise.reject(error);
    });
  
  }, [navigate,logout])
  return axiosSecure
};

export default useAxios;
