
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/blood_bank.jpg';
import BloodCard from "./Components/BloodCard";
import AddBlood from './Components/AddBlood';
import useUser from '../../CustomHocks/useUser';
import useAxios from '../../CustomHocks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const BloodBank = () => {
    const { user } = useUser()
    const AxiosSecure = useAxios()
   

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['bloodGroupSummary'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bloodBank/blood-summary`);
            return res.data;
        }
    });
   

   

    const bloodGroupData = (group) => {
      
        if (!Array.isArray(data)) {
            return null;
        }
        const result = data.find((item) =>item.bloodGroup===group);
    
        return result || null;
    }


 
    return (
        <div className="pb-10">
            <PageHeading title={"Blood Bank"} img={img}></PageHeading>
            <div className="max-w">
                <div className="text-start my-8  flex gap-4 lg:flex-row md:flex-row flex-col justify-between mx-4">
                    <h2 className="lg:text-4xl md:text-3xl text-xl font-bold text-black shadow-lg px-4 rounded-xl">Welcome to Our Blood Bank</h2>
                    {
                        user?.role === 'admin' && <AddBlood  refetch={refetch}></AddBlood>
                    }
                </div>

                {
                    isLoading?<isLoading></isLoading>:
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 my-6 p-4">
                    {['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'].map((group) => (
                        <BloodCard data={bloodGroupData(group)} key={group} group={group} />
                    ))}
                </div>
                }

            </div>
        </div>
    );
};

export default BloodBank;
