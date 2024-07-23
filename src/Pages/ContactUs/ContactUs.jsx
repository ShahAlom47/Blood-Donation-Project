import { IoMdCall } from "react-icons/io";
import ContactForm from "../../Components/ContactForm";
import PageHeading from "../../Components/PageHeading";
import img from '../../assets/image/contact-bg.jpg'
import { MdOutlineAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";


const ContactUs = () => {
    return (
        <div>
            <PageHeading title={'Contact Us'} img={img}></PageHeading>
            <div className="max-w lg:p-10 md:p-5 p-2">
                <div className="shadow-xl lg:p-10 md:p-5 p-2 flex lg:flex-row md:flex-row flex-col gap-6 ">
                    <div className="lg:w-1/2 md:w-1/2">
                        <h1 className="text-2xl font-bold mb-8">Get In Touch</h1>
                        <p className="  mb-4 text-gray-500">We`re here to assist you with any questions or concerns you may have. Whether you need more information about our services or have a specific inquiry, feel free to reach out. Our team is dedicated to providing the support you need. Contact us today, and we`ll be happy to help.</p>
                        <div>
                            <ContactForm></ContactForm>
                        </div>
                    </div>
                    <div className=" flex-1 p-6 bg-color-p text-white flex flex-col justify-around">
                        <h2 className="text-lg font-bold mb-4 ">Blood Excellence!</h2>
                        <h1 className="text-3xl font-bold mb-5">Expanded Blood Donate Services Here</h1>
                        <p className="mb-4 ">Our mission is to make blood donation more accessible and efficient. Whether you`re a first-time donor or a regular contributor, our expanded services are designed to provide you with all the support and information you need. Reach out to us for any assistance or inquiries. Together, we can save lives.</p>
                        <h2 className="text-lg font-semibold flex items-center gap-4"><IoMdCall /> <span>Emergency Line: (002) 012612457</span></h2>
                        <h2 className="text-lg font-semibold flex items-center gap-4"><FaLocationDot /> <span>Location: Street 68, Mahattan,
                            New York</span></h2>
                        <h2 className="text-lg font-semibold flex items-center gap-4"><MdOutlineAccessTime /> <span>Mon - Fri: 8:00 am - 7:00 pm</span></h2>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ContactUs;