import { RxBell } from "react-icons/rx";
import PropTypes from 'prop-types';
import useAxios from "../CustomHocks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../CustomHocks/useUser";
import Loading from "../SharedComponent/Loading";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const NotificationIcon = () => {
  const AxiosSecure = useAxios();
  const { user } = useUser();
  const [page, setPage] = useState(1); 
  const itemsPerPage = 10;

  const token = localStorage.getItem('token');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getAllNotification', page], 
    queryFn: async () => {
      const url = user.role === 'user'
        ? `/notification/getUserNotification/${user?.email}?page=${page}&limit=${itemsPerPage}`
        : `/notification/getAllNotification?page=${page}&limit=${itemsPerPage}`;

      const res = await AxiosSecure.get(url);
      return res.data;
    },
    enabled: !!token, 
    refetchInterval: 50000, 
  });

  const handelRead = async (id) => {
    const res = await AxiosSecure.patch(`/notification/updateNotificationStatus/${id}`)

    if (res.data?.state === true)
      refetch()
  }
  console.log(data?.pages,page);
  // Filter unread notifications
  const unreadCount = data?.notifications?.filter(notification => notification?.status === 'unread').length || 0;

  return (
    <div>
      <label htmlFor="my-drawer-4" className="drawer-button ">
        <div className="relative inline-flex items-center p-1 rounded-full hover:bg-gray-300 text-white hover:text-color-p ">
          <RxBell className="text-xl" />
          <span className="absolute -top-1 -right-1 block min-w-5 lg:text-[10px] md:text-[8px] text-[6px] bg-black bg-opacity-90 rounded-full lg:mt-0 md:mt-0 mt-1 p-1 text-center text-white">
            {unreadCount > 10 ? '10+' : unreadCount}
          </span>
        </div>
      </label>

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side top-11 h-screen">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex">
            <label htmlFor="my-drawer-4" className="drawer-button absolute left-0 top-1/2 h-10 w-4 rounded-r-md bg-color-p flex items-center text-white text-xl cursor-pointer">
              <IoIosArrowForward />
            </label>
            <h1 className="text-xl font-bold mb-4 absolute left-1 top-0 bg-white z-50 w-full px-4 py-1">Notifications</h1>

            <div className="flex gap-1 justify-center absolute bottom-2 z-50  left-2 w-full bg-white text-white">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-1 bg-color-p rounded-l-full ${page === 1 ?'bg-opacity-50 cursor-not-allowed':'hover:bg-rose-900'} `}>
                Previous
              </button>
              <button
               disabled={page === data?.pages}
                onClick={() => setPage(prev => prev + 1)}
                className={`px-4 py-1 bg-color-p  rounded-r-full  ${page === data?.pages?'bg-opacity-50 cursor-not-allowed':'hover:bg-rose-900'} `}>
                See More
              </button>
            </div>

            <ul className="menu bg-white text-base-content h-[90dvh]  overflow-y-scroll w-80 p-4  py-8 border-l-4 border-b-4 border-color-p rounded-sm">
              {isLoading ? <Loading /> : (data?.notifications?.length> 0?


                <div className="my-5">
                  
                  {data?.notifications?.map(notification => (
                    <li
                      onClick={() => handelRead(notification?._id)}
                      className={` ${notification?.status === 'unread' && 'bg-slate-200'} border hover:border-black rounded-sm pl-2 text-l shadow-lg mb-2 py-2 cursor-pointer`}
                      key={notification._id}>
                      {notification.message}
                    </li>
                  ))}
                 
                
                </div>:

                 <h1 className=" m-auto font-semibold">Notification Not Available</h1>
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
