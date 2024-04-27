import React from 'react';
import HeroContainer from './Home/Hero/HeroContainer';
import Gallary from './Home/Gallary/Gallary';
import PopularClasses from './Home/PopularClasses/PopularClasses';

const Home = () => {
    return (
        <section>
            <HeroContainer/>
            <div className='max-w-screen-xl mx-auto'>
                <Gallary/>
                <PopularClasses/>
            </div>
        </section>
    );
};

export default Home;