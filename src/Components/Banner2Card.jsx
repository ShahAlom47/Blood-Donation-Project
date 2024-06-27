import { useState } from "react";
import PropTypes from 'prop-types';
import { MdOutlineBloodtype } from "react-icons/md";

const Card = ({ img, title, description, onReadMore, index }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    function handleMouseOver(index) {
        setHoveredIndex(index);
    }

    function handleMouseOut() {
        setHoveredIndex(null);
    }

    return (
        <div className="bg-white shadow-md flex flex-col justify-between"
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
        >
            <div className="p-3">
                <div className="overflow-hidden relative w-full">
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-40 object-cover z-10"
                        style={{ transition: 'transform 0.9s ease', transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)' }}
                    />
                    <div className="w-full flex justify-center text-center bottom-8">
                        <div className={`${hoveredIndex === index ? 'bg-color-p' : 'bg-black'} text-white p-4 text-6xl z-20 -mt-8`}
                            style={{ transition: 'background-color 1.1s ease' }}
                        >
                            <MdOutlineBloodtype className="font-light" />
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-center mt-2">{title}</h3>
                <p className="text-gray-600 text-center text-sm mt-1">
                    {description.slice(0, 100)}...
                </p>
            </div>
            <button
                onClick={onReadMore}
                style={{ width: '100%', borderRadius: '0' }}
                className="btn-p w-full btn-primary mt-2"
            >
                Read More
            </button>
        </div>
    );
};

Card.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onReadMore: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default Card;
