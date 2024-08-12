import { useState } from 'react';
import bg from '../../../../assets/image/blood-request-banner.jpg';
import PropTypes from 'prop-types';
import useUser from '../../../../CustomHocks/useUser';

import Swal from 'sweetalert2';
import PageHeading from '../../../../Components/PageHeading';
import useAxios from '../../../../CustomHocks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router-dom';

const RequestDetails = ({ data, closeModal, refetch }) => {
    const { user } = useUser();
    const AxiosSecure = useAxios()
    const navigate = useNavigate()
    const location = useLocation()




    const {
        _id,
        name,
        bloodGroup,
        email,
        phone,
        address,
        message,
        requestedDate,
        requireDate,
        status,
        userEmail,
        userName,
        donors,
    } = data;

    // State to manage alert messages
    const [alertMessage, setAlertMessage] = useState('');

    const handleDonate = async () => {
        const requestGroup = bloodGroup.toUpperCase();
        const userGroup = user?.bloodGroup.toUpperCase();
        const userLastDonate = new Date(user?.lastDonate);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        if (!user) {
            Swal.fire({
                title: "You are not logged in!",
                text: "To request blood, please log in first",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location.pathname } });
                }
            });
            return;
        }
        if (user.email === userEmail) {
            Swal.fire({
                title: 'Its Your Own Request ',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
            });
            setAlertMessage('');
            refetch()
            return
        }

        if (requestGroup === userGroup) {
            if (userLastDonate <= threeMonthsAgo) {
                try {

                    const res = await updateDonationRequestAndNotify();


                    if (res.success) {
                        Swal.fire({
                            title: res.message,
                            width: 600,
                            padding: '3em',
                            color: '#716add',
                            background: '#fff url(/images/trees.png)',
                        });
                        setAlertMessage('');
                        refetch()
                    }
                    else {
                        Swal.fire({
                            title: res.message,
                            width: 600,
                            padding: '3em',
                            color: '#716add',
                            background: '#fff url(/images/trees.png)',
                        });
                        setAlertMessage(res.message);
                    }

                } catch (error) {
                    console.error('Error volunteering to donate:', error);
                    setAlertMessage('There was an error processing your request. Please try again.');
                }
            } else {
                Swal.fire({
                    title: `Your Last Donate Date ${user.lastDonate}`,
                    text: 'You can only donate blood once every 3 months. Please wait before donating again.',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                });
                setAlertMessage('You can only donate blood once every 3 months. Please wait before donating again.');
            }
        } else {
            Swal.fire({
                title: `Your Blood Group Is ${user?.bloodGroup}`,
                text: 'Your blood group does not match the requested blood group.',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
            });
            setAlertMessage('Your blood group does not match the requested blood group.');
        }
    };


    const updateDonationRequestAndNotify = async () => {
        try {
            const response = await AxiosSecure.put('/donation/updateDonationRequest', {
                donorEmail: user?.email,
                donorName: user?.name,
                status: "Pending",
                id: _id,
                notificationData: {
                    donorEmail: user?.email,
                    requesterEmail: userEmail,
                    message: ` New donation volunteer: ${user?.name}`,
                    type: "donation_interest",
                    status: "unread",
                    timestamp: new Date().toISOString()
                }

            });

            return response.data;
        } catch (error) {
            console.error('Error updating donation request and sending notification:', error);
            throw error;
        }
    };

    return (
        <div>
            <PageHeading title={'Request Details'} img={bg} />
            <div className="max-w lg:p-10 md:p-8 p-0">
                <div className="lg:w-10/12 md:w-11/12 w-full m-auto rounded-sm lg:p-10 md:p-5 p-2 border-2 shadow-xl">
                    <div className="flex lg:flex-row md:flex-row flex-col gap-4 items-center justify-between mb-4 border-b-4 pb-3">
                        <div className="flex gap-4 items-center justify-start pl-4 w-full">
                            <img className="h-10 w-10 rounded-full border-4" src="" alt="user Profile" />
                            <div>
                                <h1 className="font-semibold text-xl">{userName}</h1>
                                <p className="text-sm">{requestedDate}</p>
                            </div>
                        </div>
                        <div className="flex lg:justify-end md:justify-end justify-start gap-5 w-full">
                            <button onClick={handleDonate} className="btn-p font-medium">Donate Blood</button>
                            <button style={{ backgroundColor: 'black' }} className="btn-p rounded-sm" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between flex-wrap">
                            <div className="mb-4 text-xl">
                                <h3 className="text-xl font-bold border-b-2 border-color-p mb-4">Blood Group Information</h3>
                                <p><strong>Blood Group:</strong> <span className="text-2xl text-color-p font-semibold">{bloodGroup}</span></p>
                                <p><strong>Status:</strong> <span className="text-xl bg-yellow-200 px-2 rounded-sm">{status}</span></p>
                                <p><strong>Require Date:</strong> {requireDate}</p>
                                <p><strong>Message:</strong> {message}</p>
                                <p><strong>Ready Donor:</strong></p>
                                <ul className="list-disc list-inside mt-2">
                                    {donors.length > 0 ? (
                                        donors.map((donor, index) => (
                                            <li key={index} className="mt-1">
                                                <span className="font-semibold">{donor.donorName}</span> - <span className="text-sm text-gray-600">{donor.donorEmail}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No donors available</p>
                                    )}
                                </ul>
                            </div>
                            <div className="mb-4 text-xl">
                                <h3 className="text-xl font-bold border-b-2 border-color-p mb-4">Requester Information</h3>
                                <p><strong>Name:</strong> {name}</p>
                                <p><strong>Email:</strong> {email}</p>
                                <p><strong>Phone:</strong> {phone}</p>
                                <p><strong>Address:</strong> {address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Display alert messages */}
                {alertMessage && <div className="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded">{alertMessage}</div>}
            </div>
        </div>
    );
};

RequestDetails.propTypes = {
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired
};

export default RequestDetails;
