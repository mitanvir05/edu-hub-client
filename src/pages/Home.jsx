import React from 'react';
import HeroContainer from './Home/Hero/HeroContainer';
import Gallary from './Home/Gallary/Gallary';
import PopularClasses from './Home/PopularClasses/PopularClasses';
import PopularTeacher from './Home/PopularTeacher/PopularTeacher';

const Home = () => {
    return (
        <section>
            <HeroContainer/>
            <div className='max-w-screen-xl mx-auto'>
                <Gallary/>
                <PopularClasses/>
                <PopularTeacher/>
            </div>
        </section>
    );
};

export default Home;