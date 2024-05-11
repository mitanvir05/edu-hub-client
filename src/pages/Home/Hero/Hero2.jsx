import React from "react";
import bgImg1 from "../../../assets/banner/banner2.png";
import { Link } from "react-router-dom";
const Hero2 = () => {
  return (
    <div
      className="min-h-screen bg-cover "
      style={{ backgroundImage: `url(${bgImg1})` }}
    >
      <div className="min-h-screen flex justify-start items-center pl-11 text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4 mb-5">
            <p className="md:text-4xl sm:text-2xl">We Provides</p>
            <h1 className="md:text-6xl text-4xl font-bold">
              Best Online Course
            </h1>
          </div>
          <div className="md:w-1/2">
            <p>
              Discover the Future of Education: Elevate Your Learning Journey
              with Our Online School! Empowering Minds, Inspiring Growth, and
              Fostering Success. Experience Interactive Classes, Innovative
              Resources, and Supportive Community. Let's Embark on a
              Transformative Educational Adventure Together!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 mt-6 mb-3">
            <button className="px-7 py-3 rounded-lg font-bold bg-secondary">
              Join Today{" "}
            </button>
            <button className="px-7 py-3 rounded-lg hover:bg-secondary font-bold uppercase border ">
              <Link to="/classes">View Classes</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
