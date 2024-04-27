import React from 'react';
import HeroContainer from './Home/Hero/HeroContainer';
import Gallary from './Home/Gallary/Gallary';

const Home = () => {
    return (
        <section>
            <HeroContainer/>
            <div className='max-w-screen-xl mx-auto'>
                <Gallary/>
            </div>
        </section>
    );
};

export default Home;