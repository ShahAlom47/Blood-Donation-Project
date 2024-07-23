import { useState } from "react";
import SectionHeading from "../../../Components/SectionHeading";
import img1 from '../../../assets/image/s1.jpg'
import img2 from '../../../assets/image/s2.jpg'
import img3 from '../../../assets/image/s3.jpg'

const OurServices = () => {
   const [readMore,setReadMore]=useState(false)

    return (
        <div className="max-w">
            <SectionHeading subTitle={'WHAT WE DO'} title={'Our Best Services'}></SectionHeading>
            <div className="my-9 p-6">
                {
                    servicesData.map((data, index) => <div 
                    className={`flex   gap-8 mb-10 ${index===1 ?'md:flex-row-reverse lg:flex-row-reverse':'md:flex-row lg:flex-row'}  flex-col `}
                    key={index}>
                        <div className="lg:w-5/12 md:w-5/12 w-full"> 
                            <img className="w-full " src={data.img} alt="" />
                        </div>
                        <div className="lg:w-5/12 md:w-5/12 w-full space-y-5 flex flex-col justify-center ">
                            <h1 className="text-7xl text-gray-300 font-bold">0{data.id}</h1>
                            <h1 className="text-black hover:text-color-p text-2xl font-bold">{data.title}</h1>
                            <p className=" text-lg font-medium">{readMore? data.description:data.description.slice(0,200)}</p>
                            <button onClick={()=> setReadMore(!readMore)} className="btn-p">Read More</button>

                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default OurServices;
const servicesData = [
    {
      id: 1,
      title: "Blood Donation",
      img: img1,
      description: "Join our blood donation program and become a hero to those in need. Blood donation is a simple, safe, and effective way to make a significant impact on the lives of people suffering from severe illnesses or injuries. Our program ensures that every drop of blood you donate is used to save lives and improve health conditions. Regular blood donations are crucial in maintaining an adequate blood supply in hospitals and emergency clinics. By donating blood, you can help accident victims, surgical patients, and individuals with chronic diseases. Be a part of this life-saving mission and experience the joy of giving."
    },
    {
      id: 2,
      title: "Blood Bank",
      img: img2,
      description: "Our blood bank plays a vital role in healthcare by ensuring a stable and safe supply of blood for medical emergencies. We collect, test, process, and store blood and its components to meet the needs of patients requiring blood transfusions. With state-of-the-art facilities and stringent quality control measures, we guarantee the safety and availability of blood for those in need. Our blood bank not only supports hospitals and clinics but also works with community organizations to promote awareness about the importance of blood donation. Together, we can build a reliable blood reserve to address the constant demand for blood and save countless lives."
    },
    {
      id: 3,
      title: "Health Check",
      img: img3,
      description: "Regular health check-ups are essential for maintaining overall well-being and detecting potential health issues early. Our comprehensive health check services offer a range of tests and screenings to assess your health status and identify any underlying conditions. From blood tests and imaging studies to physical examinations and consultations with specialists, our health check program covers all aspects of preventive healthcare. Early detection of health problems can lead to timely treatment and better outcomes. Take control of your health by scheduling regular check-ups with us and ensure a healthier, happier future for you and your loved ones."
    }
  ];