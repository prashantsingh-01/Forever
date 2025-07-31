import React from 'react'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets.js'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full max-w-[450px]' src={assets.about_img} alt="About Image" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Welcome to Forever, your one-stop destination for timeless style, everyday essentials, and trend-forward finds. Born from a passion for quality and a love for fashion, Forever brings you a curated collection of clothing, accessories, and lifestyle products designed to elevate your everyday.</p>
              <p>At Forever, we believe great style should be accessible, effortless, and lasting—just like our name suggests. Whether you're shopping for a wardrobe refresh or searching for that perfect gift, our goal is to make your experience seamless, enjoyable, and inspiring.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>At Forever, our mission is to inspire confidence through style. We are committed to providing high-quality, fashion-forward clothing that empowers individuals to express themselves boldly and authentically. By blending timeless trends with modern design, we aim to create a seamless online shopping experience where everyone can find pieces they love — and feel great wearing them. Sustainability, affordability, and inclusivity guide everything we do, because we believe fashion should be for everyone, forever.</p>
          </div>
      </div>

      <div className='text-xl py-4'>
          <Title text1={"WHY"} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quanlity Assurance</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      
      <NewsLetterBox />

    </div>
  )
}

export default About