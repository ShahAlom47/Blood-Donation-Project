import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import Footer from "../SharedComponent/Footer";
import { useEffect, useState } from "react";
import Loading from "../SharedComponent/Loading";


const Root = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      };
  
      loadData();
    }, []);
  
    return (
        loading?<Loading></Loading>:
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;