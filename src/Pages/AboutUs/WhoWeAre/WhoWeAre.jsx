import React, { useState } from 'react';
import img from '../../../assets/image/who_we Are.jpg';

const WhoWeAre = () => {
    const [showFullText, setShowFullText] = useState(false);

    const handleToggleText = () => {
        setShowFullText(!showFullText);
    };

    const fullText = `
        Our mission is to create connections through the lifesaving act of blood donation. We provide a platform where users can request blood, register to donate, and connect with blood banks. By leveraging our extensive blood bank database, users can easily find the blood they need and registered donors can conveniently offer their blood.
        Through our platform, we aim to make the process of blood donation swift, simple, and efficient. We strive to encourage blood donation and bring positive changes to people’s lives. We believe that through the act of donating blood, we can save many lives and support those in urgent medical need.

        Your Support is Vital: Your valuable support and blood donations are essential to the success of our initiative. Join us, donate blood, contribute financially, and make a difference in people’s lives.

        Our Goal: To eliminate blood shortages, save lives, and build a strong, supportive community where blood donation is a common and accepted practice.

        Stay connected with us and help create life-saving connections through blood donation.
    `;

    const previewText = fullText.substring(0, 350);

    return (
        <div>
            <div id="section1" className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-start py-6">
                <div className='px-10'>
                    <h1 className='text-4xl font-bold mb-3 text-black'>Who We Are</h1>
                    <h3 className='text-lg font-semibold mb-3'>Connecting Lives Through Blood Donation</h3>
                  <div className="text-gray-600 font-medium">
                  <p>
                        {showFullText ? fullText : `${previewText}`}
                    </p>
                    {!showFullText && (
                      <span>  <br />
                       <strong> Your Support is Vital:</strong> Your valuable support and blood donations are essential to the success of our initiative. Join us, donate blood, contribute financially, and make a difference in people’s lives.</span>
                       
                        
                    )}
                    {showFullText && (
                        <div>
                            <strong>Your Support is Vital:</strong> Your valuable support and blood donations are essential to the success of our initiative. Join us, donate blood, contribute financially, and make a difference in people’s lives.<br /><br />
                            <strong>Our Goal:</strong> To eliminate blood shortages, save lives, and build a strong, supportive community where blood donation is a common and accepted practice.<br /><br />
                            Stay connected with us and help create life-saving connections through blood donation.
                        </div>
                    )}
                  </div>
                    <button 
                        onClick={handleToggleText} 
                        className="btn-p mt-3"
                    >
                        {showFullText ? 'Read Less' : 'Read More'}
                    </button>
                </div>
                <div>
                    <img className='w-full' src={img} alt="Who We Are" />
                </div>
            </div>
        </div>
    );
};

export default WhoWeAre;
