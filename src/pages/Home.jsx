import React from 'react';
import HeroContainer from './Home/Hero/HeroContainer';
import Gallary from './Home/Gallary/Gallary';
import PopularClasses from './Home/PopularClasses/PopularClasses';
import PopularTeacher from './Home/PopularTeacher/PopularTeacher';
import useAuth from '../hooks/useAuth';
import MyFooter from '../components/MyFooter';

const Home = () => {
    //const{user}=useAuth()
   // console.log(user)
    return (

        <section>
            <HeroContainer/>
            <div className='max-w-screen-xl mx-auto'>
                <Gallary/>
                <PopularClasses/>
                <PopularTeacher/>
                
            </div>
            <MyFooter/>
        </section>
    );
};

export default Home;