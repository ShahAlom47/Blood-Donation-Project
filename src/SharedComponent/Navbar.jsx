/* eslint-disable no-unused-vars */

import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo/blood logo2.png';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineMenuFold } from "react-icons/ai";

import { useEffect, useRef, useState } from 'react';
import 'animate.css';
import { BiLogIn } from 'react-icons/bi';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import useUser from '../CustomHocks/useUser';
import NotificationIcon from '../Components/NotificationIcon';
import { IoIosArrowDown } from 'react-icons/io';
import useSound from '../CustomHocks/useSound';

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [btn,setBtn]=useState(false)
    const [visible, setVisible] = useState(true);
    const [theme, setTheme] = useState(true);
    const [themData, setThemeData] = useState(null);
    const [donateBtn, setDonateBtn] = useState(false);
    const { user, logout } = useUser();
    const location = useLocation();
    const { playSound } = useSound()
    const dropdownRef = useRef(null)

    useEffect(() => {
        let prevSPos = window.pageYOffset;

        const handleScroll = () => {
            const currentSPos = window.pageYOffset;
            const isVisible = prevSPos > currentSPos;
            setVisible(isVisible);
            if (isOpen) {
                setOpen(false);
            }
            prevSPos = currentSPos;
        };


        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setOpen(false)
            }
        };


        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, isOpen]);

    const handleToggleDropdown = () => {
        setOpen(prevOpen => !prevOpen);
    };

    useEffect(() => {
        const themeData = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', JSON.parse(themeData));
        setThemeData(JSON.parse(themeData));
    }, [theme, themData]);

    const themeControl = () => {
        setTheme(!theme);
        theme ? localStorage.setItem('theme', JSON.stringify('dark')) : localStorage.setItem('theme', JSON.stringify('light'));
    };

    const nav = <>

        <NavLink
            to="/"
            className={({ isActive }) =>
                `nav-link hover:underline px-3 rounded-sm ${isActive ? 'bg-slide-animation is-active' : ''}`
            }
        >Home</NavLink>

        <NavLink

            to="/allRequest"
            className={({ isActive }) =>
                `nav-link hover:underline px-3 rounded-sm ${isActive ? 'bg-slide-animation is-active' : ''}`
            }
        >Blood Request</NavLink>

        <div className={`nav-link dropdown dropdown-bottom ${location.pathname === '/donateBlood' || location.pathname === '/donateMoney' ? 'bg-slide-animation is-active' : ''}`}>
            <div onClick={() => setDonateBtn(!donateBtn)} tabIndex={0} role="button" className={`hover:text-black px-3 rounded-sm flex items-center`}>
                Donate <IoIosArrowDown />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-color-p rounded-sm z-[1] w-40 mt-1 p-2 shadow">
                <li><Link to="/donateBlood">Donate Blood</Link></li>
                <li><Link to="/donateMoney">Donate Money</Link></li>
            </ul>
        </div>

        <NavLink
            to="/bloodBank"
            className={({ isActive }) =>
                `nav-link hover:underline px-3 rounded-sm ${isActive ? 'bg-slide-animation is-active' : ''}`
            }
        >Blood Bank</NavLink>

        <NavLink
            to="/contact"
            className={({ isActive }) =>
                `nav-link hover:underline px-3 rounded-sm ${isActive ? 'bg-slide-animation is-active' : ''}`
            }
        >Contact Us</NavLink>

        <NavLink
            to="/about"
            className={({ isActive }) =>
                `nav-link hover:underline px-3 rounded-sm ${isActive ? 'bg-slide-animation is-active' : ''}`
            }
        >About Us</NavLink>

        <label onClick={themeControl} className="flex cursor-pointer gap-2 items-center ml-3 hover:text-black">
            {themData === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
        </label>
    </>


    return (
        <div className={` flex lg:h-[50px] md:h-[40px] h-[35px] border-b- shadow-md shadow-black  bg-gradient-to-t from-[#00000000] to-[#0000004f]  w-full m-auto" p-0  z-50 fixed  ${visible ? 'top-0 transition-all' : '-top-20 transition-all'} duration-1000 `}>
            <div className=" bg-gray-100 w-3/12 flex justify-evenly items-center"><img className=' h-full' src={logo} alt="" /></div>
            <div onClick={() => playSound('click')} className=' bg-color-p flex justify-end items-center w-full font-medium'>
                <div className="  hidden bg-color- text-white max-w flex-1 lg:flex md:flex  justify-center font-light items-center gap-2 md:gap-1 pl-5 lg:text-xl md:text-sm">
                    {nav}
                </div>
                <div className=' lg:mr-5 md:mr-5 mr-0'>
                    {
                        user ?
                            <div className=' flex items-center justify-end gap-4'>
                                <div className='pt-2'>
                                    <NotificationIcon value={8 || 0} userEmail={user?.email}></NotificationIcon>
                                </div>
                                <div className="dropdown dropdown-end p-0 m-0">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar p-0 m-0">
                                        <div className="w-8 rounded-full">
                                            <img alt="profile phot" src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="-mt-1 z-[1] text-white p-2 shadow menu menu-sm dropdown-content bg-color-p rounded-sm w-32">
                                        <li className='border-b-2 pl-2  uppercase' >{user?.name} </li>
                                        <li><Link to={'/dashBoard'}><a>My Profile</a></Link></li>
                                        <li><a onClick={() => logout()}>Logout</a></li>
                                      
                                    </ul>
                                </div>

                            </div> :
                            <div>
                                <Link
                                    to={'/login'}
                                    data-tooltip-id="my-tooltip" data-tooltip-content="LogIn"
                                    className='text-white font-light hover:bg-transparent hover:text-lg btn btn-sm p-0 bg-transparent border-none text-xl lg:mr-2 md:mr-2 '><BiLogIn /> </Link>

                            </div>
                    }

                </div>
      {!isOpen?      
                    <button onClick={() => setOpen(!isOpen)} className=' md:hidden lg:hidden flex  mx-1 px-1 hover:text-black  rounded-sm bg-opacity-5 text-white text-2xl btn btn-sm bg-transparent border-none '><RxHamburgerMenu className='' /></button>
           :         <p  className=' md:hidden lg:hidden text-white flex  mx-1 px-1 hover:text-black  rounded-sm bg-opacity-5 text-2xl btn btn-sm bg-transparent border-none '><AiOutlineMenuFold className='' /></p>


                }
                <div ref={dropdownRef} id="drop-down" className={` text-white font-light overflow-hidden flex flex-col absolute bg-color-p p-2 top-[100%] w-0.5  
             ${isOpen ? ' lg:w-0 md:w-0 lg:-left-16 md:-left-16  top-10 left-0 w-[150px] max-w-full transition-all duration-1000 ease-in-out' : '-left-10 top-10 max-w-0 transition-all duration-1000 ease-in-out'}`}
                >
                    {nav}
                </div>



            </div>


            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default Navbar;