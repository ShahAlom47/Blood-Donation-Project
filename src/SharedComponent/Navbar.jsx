
// import logo from '../assets/logo/blood logo.png'
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo/blood logo2.png'

const nav = <>
    <NavLink>Home</NavLink>
    <NavLink>About Us</NavLink>
    <NavLink>Campaign</NavLink>
    <NavLink>Blog</NavLink>
    <NavLink>Contact Us</NavLink>

</>


const Navbar = () => {
    return (
        <div className=' flex h-[50px] '>
            <div className=" bg-gray-100 w-3/12 flex justify-evenly items-center"><img className=' h-full' src={logo} alt="" /></div>
          <div className=' bg-color-p flex justify-center items-center w-full font-medium'>
          <div className=" bg-color- max-w flex-1 flex text-white justify-center items-center gap-4 pl-5">{nav}</div>
          </div>

        </div>
    );
};

export default Navbar;