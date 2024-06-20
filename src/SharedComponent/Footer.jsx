import { NavLink } from 'react-router-dom';
import logo from '../../src/assets/logo/blood logo2.png'

const Footer = () => {
    return (
        <footer className="bg-[#e7e7e5] text-white">
 <div className="footer p-10 max-w text-gray-800">
 <aside className=' flex justify-center items-center flex-col h-full'>
  <div className='h-10 w-18'>
    <img className=' w-full h-full' src={logo} alt="" />
  </div>

     <p>Donate Blood, Donate Life: Join Us Today</p>
  </aside> 
  <nav>
    <h6 className="footer-title">Services</h6> 
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav> 
  <nav>
    <h6 className="footer-title">Company</h6> 
    <NavLink className={'hover:underline'}>Home</NavLink>
    <NavLink className={'hover:underline'}>About Us</NavLink>
    <NavLink className={'hover:underline'}>Campaign</NavLink>
    <NavLink className={'hover:underline'}>Blog</NavLink>
    <NavLink className={'hover:underline'}>Contact Us</NavLink>
  </nav> 
  <nav>
    <h6 className="footer-title">Legal</h6> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
 </div>
</footer>
    );
};

export default Footer;