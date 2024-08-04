import  { useState } from 'react';
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/blood_bank.jpg';
import BloodCard from "./Components/BloodCard";
import AddBlood from './Components/AddBlood';
import useUser from '../../CustomHocks/useUser';

const BloodBank = () => {
    const {user}=useUser()
    const [selectedGroup, setSelectedGroup] = useState('');

    const handleBloodCardClick = (group) => {
        console.log(group);
        setSelectedGroup(group);
       
    };
    console.log(selectedGroup);
    return (
        <div className="pb-10">
            <PageHeading title={"Blood Bank"} img={img}></PageHeading>
            <div className="max-w">
                <div className="text-start my-8  flex gap-4 lg:flex-row md:flex-row flex-col justify-between mx-4">
                    <h2 className="lg:text-4xl md:text-3xl text-xl font-bold text-black shadow-lg px-4 rounded-xl">Welcome to Our Blood Bank</h2>
                  {
                    user?.role==='admin'&& <AddBlood></AddBlood>
                  }
                  
                  
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 my-6 p-4">
                    {['A(+)', 'A( - )', 'AB(+)', 'AB( - )', 'B(+)', 'B( - )', 'O(+)', 'O( - )'].map((group) => (
                        <BloodCard key={group} group={group} handleBloodCardClick={handleBloodCardClick} />
                    ))}
                </div>
              
            </div>
        </div>
    );
};

export default BloodBank;
