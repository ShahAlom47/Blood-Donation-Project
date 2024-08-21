import { RxBell } from "react-icons/rx";
import PropTypes from 'prop-types';
import useAxios from "../CustomHocks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../CustomHocks/useUser";
import Loading from "../SharedComponent/Loading";

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
console.log( data );
  const handelRead = async (id) => {
    const res = await AxiosSecure.patch(`/notification/updateNotificationStatus/${id}`)
    console.log(res.data);
    if(res.data?.state===true)
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

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side top-12">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-white border-8 border-color-p text-base-content min-h-screen  w-80 p-4">
            {isLoading ? <Loading /> : (
              <div>
                <h1 className=" text-xl font-bold mb-4">Notifications</h1>
                {data?.map(notification => (
                  <li
                   onClick={() => handelRead(notification?._id)}
                   className={` ${notification?.status === 'unread' && 'bg-slate-200'} hover:border border-black pl-1 text-l shadow-lg mb-2 py-2`} key={notification._id}>
                    <p className="">{notification.message}</p>
                    </li>
                ))}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

NotificationIcon.propTypes = {
  value: PropTypes.number
};

export default NotificationIcon;
