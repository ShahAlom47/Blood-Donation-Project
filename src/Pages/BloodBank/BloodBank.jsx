import React, { useState } from 'react';
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/blood_bank.jpg';
import BloodCard from "./Components/BloodCard";

const BloodBank = () => {
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
                <div className="text-start my-8 ml-3">
                    <h2 className="text-4xl font-bold text-black border-b border-color-p">Welcome to Our Blood Bank</h2>
                   
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 my-6 p-4">
                    {['A(+)', 'A( - )', 'AB(+)', 'AB( - )', 'B(+)', 'B( - )', 'O(+)', 'O( - )'].map((group) => (
                        <BloodCard key={group} group={group} handleBloodCardClick={handleBloodCardClick} />
                    ))}
                </div>
                {selectedGroup && (
                    <div className="text-center mt-8">
                        <h3 className="text-2xl">Selected Blood Group: {selectedGroup}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodBank;
