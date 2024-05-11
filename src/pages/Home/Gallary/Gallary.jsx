import React from "react";
import img1 from "../../../assets/gallery/image1.png";

import img3 from "../../../assets/gallery/image3.png";
import img4 from "../../../assets/gallery/image4.png";
import img5 from "../../../assets/gallery/image5.png";
import img6 from "../../../assets/gallery/image6.png";
const Gallary = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center">Our Gallery</h1>
      </div>
      {/* img container */}
      <div className="md:grid grid-cols-2 items-center justify-center  gap-4">
        <div className="mb-4 md:mb-0 ">
          <img src={img1} alt="" className="md:h-[655px] w-full mx-auto rounded-md" />
        </div>
        <div className="gap-4 grid grid-cols-2 items-start">
          <div>
            <img src={img6} alt="" className="md:h-[320px] rounded-md" />
          </div>
          <div>
            <img src={img3} alt="" className="md:h-[320px]  rounded-md" />
          </div>
          <div>
            <img src={img4} alt="" className="md:h-[320px]  rounded-md" />
          </div>
          <div>
            <img src={img5} alt="" className="md:h-[320px]  rounded-md" />
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Gallary;
