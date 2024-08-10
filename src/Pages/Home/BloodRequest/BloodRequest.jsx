
import { useEffect, useState } from "react";
import SectionHeading from "../../../Components/SectionHeading";
import banner from '../../../assets/image/blood-request-banner.jpg'
import RequestForm from "./RequestForm/RequestForm";
import RequestList from "./RequestList/RequestList";
import { Link, useLocation } from "react-router-dom";
import useSound from "../../../CustomHocks/useSound";

const BloodRequest = () => {
const [refetchData,setRefetchData]=useState(false)
const location= useLocation()
const {playSound}=useSound()
console.log(location);

useEffect(()=>{


},[refetchData])


    return (
        <div className="mb-10 ">
            <div className="relative min-h-[250px] bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="relative z-10 flex justify-center items-center h-full">
                    <SectionHeading subTitle={'BLOOD OWNER'} title={'We Are Blood Donor Group'} titleColor={'text-white'} />
                </div>
            </div>
            <div className={`max-w  justify-end lg:pt-10 md:pt-5 pt-3 pr-5   ${location.pathname.includes('allRequest')?'flex':'hidden'}`}>
                <Link onClick={()=>playSound('click')} to={'/bloodBank'}><button className=" btn-p mr-8" style={{width:'200px'}} >Check Blood Bank</button></Link>
            </div>
            <div className="max-w lg:p-10 md:p-5 p-2 gap-5 flex lg:flex-row md:flex-row flex-col pt-0 ">
                <div className="flex-1  bg-white shadow-xl min-h-full ">
                <RequestList refetchData={refetchData}></RequestList>
                </div>
                <div className="lg:w-1/2 md:w-1/2 bg-white shadow-xl h-full ">
                <RequestForm setRefetchData={setRefetchData} refetchData={refetchData}></RequestForm>

                </div>
            </div>
        </div>
    );
};

export default BloodRequest;
