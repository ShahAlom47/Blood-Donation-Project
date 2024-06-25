const Card = ({ img, title, description, onReadMore }) => {
    return (
        <div className=" bg-white shadow-md  flex flex-col justify-between ">
           <div className="p-3 ">
           <img src={img} alt={title} className="w-full  h-40 object-cover " />
            <h3 className="text-lg font-semibold text-center  mt-2">{title}</h3>
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

export default Card;