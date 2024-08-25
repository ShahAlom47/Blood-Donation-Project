

const YearlyTotalDonation = () => {
    const date =new Date()
    const year= date.getFullYear()
    return (
        <div className=" m-3 p-3 bg-gray-500 bg-opacity-10">
            <div className=" relative flex justify-center items-center mx-auto p-4 w-52 h-52  rounded-lg">
                <div className="relative flex justify-center items-center w-10/12 h-5/6 m-auto  border-4 border-color-p rounded-full">
                    <div className="absolute top-1 flex justify-center text-center items-center">
                        <span className="font-bold ">Total <br /> Donations</span>
                    </div>
                   
                    <div className="absolute bottom-3 flex justify-center items-center w-full">
                        <span className="font-bold ">{year} Year</span>
                    </div>
                </div>
                <div className=" absolute top-[42%] flex flex-col justify-center items-center bg-color-p text-white w-full h-10  rounded-full z-10">
                        <span className="font-semibold text-xl">500 TK</span>
                    </div>
            </div>

        </div>
    );
};

export default YearlyTotalDonation;