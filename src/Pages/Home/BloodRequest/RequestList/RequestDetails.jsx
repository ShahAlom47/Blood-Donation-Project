import { useParams } from "react-router-dom";
import PageHeading from "../../../../Components/PageHeading";
import bg from '../../../../assets/image/blood-request-banner.jpg'
import useAxiosPublic from "../../../../CustomHocks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../SharedComponent/Loading";


const RequestDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()

    const { data, isLoading } = useQuery({
        queryKey: ['bloodRequestDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation/getBloodRequest/details/${id}`);
            return res.data;
        }
    });
console.log(data);
    return (
        <div>
            <PageHeading title={'Request Details'} img={bg}></PageHeading>
            <div className="max-w lg:p-10 md:p-8  p-2">
                {
                isLoading?<Loading></Loading>:<div className="lg:w-8/12 md:w-10/12 w-full m-auto rounded-sm lg:p-10 md:p-8  p-2 border-2 shadow-xl">
                    <h1 className="text-2xl">{data.address}</h1>
                </div>
                }
                
            </div>

        </div>
    );
};

export default RequestDetails;