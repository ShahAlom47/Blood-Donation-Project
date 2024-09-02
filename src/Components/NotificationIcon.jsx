import { RxBell } from "react-icons/rx";
import PropTypes from 'prop-types';
import useAxios from "../CustomHocks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../CustomHocks/useUser";
import Loading from "../SharedComponent/Loading";
import { IoIosArrowForward } from "react-icons/io";

const NotificationIcon = () => {
  const AxiosSecure = useAxios();
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getAllNotification'],
    queryFn: async () => {
      if (user.role === 'user') {
        const res = await AxiosSecure.get(`/notification/getUserNotification/${user?.email}`);
        return res.data;
      }
      const res = await AxiosSecure.get(`/notification/getAllNotification`);
      return res.data;
    },
    refetchInterval: 60000, // 60 seconds
  });

  const handelRead = async (id) => {
    const res = await AxiosSecure.patch(`/notification/updateNotificationStatus/${id}`)

    if (res.data?.state === true)
      refetch()
  }

  // Filter unread notifications
  const unreadCount = data?.filter(notification => notification?.status === 'unread').length || 0;

  return (
    <div>
      <label htmlFor="my-drawer-4" className="drawer-button ">
        <div className="relative inline-flex items-center p-1 rounded-full hover:bg-gray-300  text-white hover:text-color-p ">
          <RxBell className=" text-xl" />
          <span className="absolute -top-1 -right-1 block min-w-5 lg:text-[10px] md:text-[8px] text-[6px] bg-black bg-opacity-90 rounded-full lg:mt-0 md:mt-0  mt-1 p-1 text-center text-white ">
            {unreadCount > 10 ? '10+' : unreadCount}
          </span>
        </div>
      </label>

      <div className="drawer drawer-end  ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side top-10  ">
       
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
         <div className="flex">
         <label htmlFor="my-drawer-4" className="drawer-button absolute left-0 top-1/2 h-10 w-4 rounded-r-md bg-color-p flex items-center text-white text-xl cursor-pointer"> <IoIosArrowForward /> </label>
          <ul className=" menu bg-white  text-base-content min-h-screen max-h-dvh overflow-x-scroll  w-80 p-4 pt-0  border-l-4 border-color-p">
            {isLoading ? <Loading /> : (
              <div className="">
                <h1 className=" text-xl font-bold mb-4">Notifications</h1>
                {data?.map(notification => (
                  <li
                    onClick={() => handelRead(notification?._id)}
                    className={` ${notification?.status === 'unread' && 'bg-slate-200'} border hover:border-black rounded-sm pl-2 text-l shadow-lg mb-2 py-2 cursor-pointer`} key={notification._id}>
                    {notification.message}
                  </li>
                ))}
              </div>
            )}
          </ul>
         </div>

        </div>
      </div>
    </div>
  );
};

NotificationIcon.propTypes = {
  value: PropTypes.number
};

export default NotificationIcon;
