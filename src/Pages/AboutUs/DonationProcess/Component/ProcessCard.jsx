import { useState } from 'react';
import PropTypes from 'prop-types';


const ProcessCard = ({ title, description, position, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`p-8  mb-4 min-h-36 relative transition-colors duration-300 ${isHovered ? 'bg-color-p text-white' : 'bg-white text-black'}`}
            style={{ boxShadow: '0 0px 20px 0 #0001, 0 10px 40px 0 #0009' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`h-10 w-10 rotate-45 absolute top-[40%] ${position === 'right' ? '-right-5 ' : '-left-5'} ${isHovered ? 'bg-color-p text-white' : 'bg-white text-black'} transition-colors duration-300`}
            >
                <h1 className='text-xl font-bold text-center -rotate-45 my-auto flex items-center justify-center pr-2 pt-1 rounded-full'>{index}</h1>
            </div>
            <h1 className='text-xl font-bold mb-4'>{title}</h1>
            <p className='font-medium'>{description}</p>
        </div>
    );
};

export default ProcessCard;

ProcessCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.string,
    index: PropTypes.number,
};
