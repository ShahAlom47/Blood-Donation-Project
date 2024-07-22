
import PropTypes from 'prop-types';
const SectionHeading = ({subTitle,title}) => {
    return (
        <div className=' mt-16 space-y-6 pb-5'>
            <h2 className="text-color-p text-center font-semibold">{subTitle}</h2>
            <h1 className=" lg:text-4xl text-center text-3xl font-bold">{title}</h1>
            
        </div>
    );
};

export default SectionHeading;
SectionHeading.propTypes = {
    subTitle: PropTypes.string,
    title: PropTypes.string
  };