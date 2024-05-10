import React from 'react';
import img from '../../../assets/dashboard/instructor.png'
const InstructorCp = () => {
    return (
        <div>
           <div className='h-screen'>
            <img src={img} alt="" className='h-[100%] w-fit' />
           </div>
        </div>
    );
};

export default InstructorCp;