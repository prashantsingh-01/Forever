import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='my-10 mt-40 text-sm'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14'>
        {/* Column 1: Logo and Description */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt='Logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            assumenda blanditiis sint numquam commodi delectus possimus dolor!
            Delectus harum tempore quos consequatur sapiente? Quos modi, qui
            earum sed similique minima?
          </p>
        </div>

        {/* Column 2: Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 1234567890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
