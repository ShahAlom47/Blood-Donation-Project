import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import Footer from "../SharedComponent/Footer";
import { useEffect, useState } from "react";
import Loading from "../SharedComponent/Loading";
import usePageLoading from "../CustomHocks/usePageLoading";


const Root = () => {
    const [loading, setLoading] = useState(true);
const {pageLoading}=usePageLoading()
    useEffect(() => {
      const loadData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      };
  
      loadData();
    }, []);
  
    return (
        loading?<Loading></Loading>:
        <div className="mt-12">
            <Navbar></Navbar>
            {
              pageLoading?<Loading></Loading>: <Outlet className=''></Outlet>
            }
           
            <Footer></Footer>
            
        </div>
    );
};

export default Root;