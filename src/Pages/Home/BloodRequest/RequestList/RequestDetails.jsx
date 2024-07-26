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

    return (
        <div>
            <PageHeading title={'Request Details'} img={bg}></PageHeading>
            <div className="">
                {
                isLoading?<Loading></Loading>:<div>

                </div>
                }
                
            </div>

        </div>
    );
};

export default RequestDetails;