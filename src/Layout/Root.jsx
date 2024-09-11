import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import Footer from "../SharedComponent/Footer";
import { useEffect, useState } from "react";
import Loading from "../SharedComponent/Loading";
import usePageLoading from "../CustomHocks/usePageLoading";
import useGlobalClickListener from "../UtilityFiles/GlobalClickListener";
import useSound from "../CustomHocks/useSound";
import useUser from "../CustomHocks/useUser";
import ChatApp from "../Pages/ChatApp/ChatApp";


const Root = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useUser;

  const { playSound } = useSound()
  useGlobalClickListener(() => {
    playSound('click');
  });

  const { pageLoading } = usePageLoading()

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);
  console.log(user);

  return (
    loading ? <Loading></Loading> :
      <div className="mt-12 relative">
        <Navbar></Navbar>
        {
          pageLoading ? <Loading></Loading> : <Outlet className=''></Outlet>
        }

        <Footer></Footer>
        <ChatApp></ChatApp>



      </div>
  );
};

export default Root;