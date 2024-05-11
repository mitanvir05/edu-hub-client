import React from "react";
import { Footer } from "flowbite-react";

const MyFooter = () => {
  return (
    <div>
      <div>
        <Footer container>
          <div className=" lg:w-[95%] mx-auto sm:px-6 lg:px-6">
            <div className="grid max-w-screen-2xl justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
              <div className="space-y-4 mb-8">
                <a
                  className="flex text-2xl  font-semibold items-center space-x-3"
                  href="/"
                >
                  <span>EduHUb</span>
                </a>
                <div>
                  <p className="mb-1">Copyright © 2024 EduHub.</p>
                  <p>All rights reserved</p>
                </div>
              </div>
              <div className="grid  grid-cols-2 gap-5 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                  <Footer.Title title="about" />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">EduHub</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="Follow us" />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">Github</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="Legal" />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                  </Footer.LinkGroup>
                </div>
              </div>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default MyFooter;
