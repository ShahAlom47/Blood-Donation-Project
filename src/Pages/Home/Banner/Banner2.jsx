import { useState } from 'react';
import 'daisyui';
import Card from '../../../Components/Banner2Card';




const Banner2 = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent('');
    };

    const data = [
        {
            img: 'https://i.ibb.co/7zLHy0Y/luann-hunt-X20g2-GQs-Vd-A-unsplash-1.jpg',
            title: 'Become a Donor',
            description: 'Become a donor today and join our mission to save lives. By donating blood, you provide critical support to patients in need, offering them a second chance at life. Your generosity can make a significant difference in emergency situations and ongoing medical treatments. Take the step to become a hero in someone\'s story. Register now and be a part of a community dedicated to making a positive impact. Every drop counts, and your contribution is invaluable. Donate today and help us build a healthier, stronger future for everyone.'
        },
        {
            img: 'https://i.ibb.co/7zLHy0Y/luann-hunt-X20g2-GQs-Vd-A-unsplash-1.jpg',
            title: 'Why Give Blood?',
            description: 'Giving blood is one of the most selfless acts you can do to help others. Every donation you make can save up to three lives. Blood is always in high demand for surgeries, cancer treatments, chronic illnesses, and traumatic injuries. By donating, you ensure that hospitals and emergency medical services have a steady supply of blood to save lives every day. It\'s a small act of kindness with a huge impact. Plus, donating blood has health benefits for donors too, such as reduced risk of certain diseases. Be a part of this lifesaving journey.'
        },
        {
            img: 'https://i.ibb.co/7zLHy0Y/luann-hunt-X20g2-GQs-Vd-A-unsplash-1.jpg',
            title: 'How Donations Help',
            description: 'Blood donations are crucial for a functioning healthcare system. They help in a variety of medical situations, from routine surgeries to emergency trauma care. Donations are used in treating patients with cancer, anemia, and other serious health conditions. Blood is also vital for mothers and newborns during complicated childbirth. Your donation can provide platelets, plasma, and red blood cells, each serving a unique purpose in patient care. By donating blood, you are directly contributing to saving lives and improving health outcomes for countless individuals. Your support matters immensely.'
        }
    ];

    return (
        <div className="bg-gray-200 pt-20">
            <div className="card-section  mx-auto">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-5">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            img={item.img}
                            title={item.title}
                            description={item.description}
                            onReadMore={() => openModal(item.description)}
                        />
                    ))}
                </div>
            </div>
            {modalIsOpen && (
                <div className="modal modal-open z-50 top-5">
                    <div className="modal-box">
                        <p>{modalContent}</p>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn btn-error">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner2;

