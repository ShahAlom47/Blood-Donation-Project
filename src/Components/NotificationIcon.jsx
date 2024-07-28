import { RxBell } from "react-icons/rx";
import PropTypes from 'prop-types'


const NotificationIcon = ({ value }) => {
  return (
    <div>
      <label htmlFor="my-drawer-4" className="drawer-button ">
        <div className="relative inline-flex items-center p-1 rounded-full hover:bg-gray-300  text-white hover:text-color-p ">
          <RxBell className=" text-xl" />

          <span className="absolute -top-1 -right-1 block min-w-5 text-[8px] bg-black bg-opacity-90 rounded-full p-1 text-center text-white ">{value > 10 ? '10+' : value}</span>
        </div>
      </label>

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side top-12">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-color-p text-base-content min-h-screen  w-80 p-4">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationIcon;
NotificationIcon.propTypes = {
  value: PropTypes.number.isRequired
};