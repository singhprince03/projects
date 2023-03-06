import React from 'react';
import { IoSchoolOutline } from 'react-icons/io5';
import ReactStars from 'react-rating-stars-component';
import igg from '../../assets/images/heroimg2.jpg';

const CourseCard = () => {
  return (
    <div className='bg-white w-64 rounded-md p-3 shadow-lg group relative cursor-pointer'>
      <div className='bg-white rounded-md  overflow-hidden relative'>
        <img
          src={igg}
          alt=''
          className='object-cover w-full h-44 object-center'
        />
        <div className='absolute right-2 bottom-2 bg-mustard h-8 w-24 p-1 rounded-md text-xs flex justify-center items-center font-semibold'>
          Rs 250/month
        </div>
      </div>
      <h1 className='text-xl font-semibold py-3'>
        Teach Your Kids Math In The Simple Way
      </h1>
      <div className='flex items-center justify-between'>
        <p className='flex items-center gap-2'>
          <IoSchoolOutline /> <span className='text-sm'>42 Students</span>
        </p>
        <span>
          <ReactStars
            count={5}
            size={16}
            value={4}
            activeColor='#ffd700'
            isHalf={true}
            edit={false}
          />
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
