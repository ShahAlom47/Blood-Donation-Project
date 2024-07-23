import { IoMdHeart } from "react-icons/io";
import { Tooltip } from "react-tooltip";


const RequestList = () => {
    const handelRequest =(id)=>{
        console.log(id);
    }
   
    return (
        <div className="">
            <h1 className=" text-xl font-bold m-5">Current Blood Request</h1>
            <div className="lg:p-5 md:p-4 p-2">
            {
                data?.map((data,index)=>< div key={index+1}>
                       <div
                       onClick={()=>handelRequest(data.bloodGroup)}
                       data-tooltip-id="my-tooltip" data-tooltip-content="View Details"
                       className=" cursor-pointer flex gap-4 font-semibold p-3 border-b-2 hover:border-color-p hover:bg-slate-200">
                       <IoMdHeart  className="text-red-600"/>
                       <span>{data.bloodGroup}</span>
                       <span> {data.address}</span>
                       <span>({data.date})</span>

                        </div> 

                </div>)
            }
           
             

           <Tooltip id="my-tooltip" />
            </div>

        </div>
    );
};

export default RequestList;
const data = [
    {
        address: "Fujairah",
        bloodGroup: "AB+",
        email: "sahalom@gmail.com",
        message: "kiccu kowar nai",
        name: "sah alom",
        phone: "0123456789",
        date: new Date().toLocaleString()
    },
    {
        address: "Dubai",
        bloodGroup: "A+",
        email: "example1@gmail.com",
        message: "Need blood urgently",
        name: "John Doe",
        phone: "0987654321",
        date: new Date().toLocaleString()
    },
    {
        address: "Sharjah",
        bloodGroup: "B+",
        email: "example2@gmail.com",
        message: "Please donate blood",
        name: "Jane Smith",
        phone: "1234567890",
        date: new Date().toLocaleString()
    },
    {
        address: "Abu Dhabi",
        bloodGroup: "O-",
        email: "example3@gmail.com",
        message: "Urgent blood required",
        name: "Ahmed Khan",
        phone: "2345678901",
        date: new Date().toLocaleString()
    },
    {
        address: "Ajman",
        bloodGroup: "B-",
        email: "example4@gmail.com",
        message: "Looking for donors",
        name: "Emily Davis",
        phone: "3456789012",
        date: new Date().toLocaleString()
    },
    {
        address: "Ras Al Khaimah",
        bloodGroup: "O+",
        email: "example5@gmail.com",
        message: "Blood needed for surgery",
        name: "Michael Brown",
        phone: "4567890123",
        date: new Date().toLocaleString()
    },
    {
        address: "Umm Al Quwain",
        bloodGroup: "A-",
        email: "example6@gmail.com",
        message: "Emergency blood requirement",
        name: "Sarah Wilson",
        phone: "5678901234",
        date: new Date().toLocaleString()
    },
    {
        address: "Al Ain",
        bloodGroup: "AB-",
        email: "example7@gmail.com",
        message: "Looking for rare blood group",
        name: "David Lee",
        phone: "6789012345",
        date: new Date().toLocaleString()
    }
];


