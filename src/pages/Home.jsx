import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div>
      {/* section 1 */}

      <div className="flex flex-col max-w-maxContent justify-center items-center text-white w-11/12 mx-auto relative">
        <Link to={"/signup"}>
          <div className="mt-16 bg-richblack-800 rounded-full mx-auto font-bold text-richblack-200 w-fit group hover:scale-95 transition-all duration-200 p-1">
            <div className="flex flex-row items-center px-10 py-2 group-hover:bg-richblack-900 transition-all duration-200 gap-2 rounded-full ">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg text-richblack-300">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. In sequi
          laboriosam autem corrupti ab asperiores voluptas. Inventore hic
          deleniti nobis dolorem, quae laborum debitis illo! Voluptas ullam
          quis,
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="my-12 mx-3 shadow-white shadow-lg">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1  */}

        <div className="my-16">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential "} />
                with our courses
              </div>
            }
            subheading={
              "PW Skills is the one-stop destination for your upskilling journey. Brace yourself to find the best job-ready courses and high-end technologies available in the sector. "
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
            </head>
            <body>
              
            </body>
            </html>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code section 2  */}
        <div className="my-16">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential "} />
                with our courses
              </div>
            }
            subheading={
              "PW Skills is the one-stop destination for your upskilling journey. Brace yourself to find the best job-ready courses and high-end technologies available in the sector. "
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
            </head>
            <body>
              
            </body>
            </html>`}
            codeColor={"text-caribbeangreen-300"}
          />
        </div>
        <ExploreMore/>
      </div>

      {/* section 2  */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                <div className="flex items-center gap-3">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 ">
          <div className="flex flex-row gap-10 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                PW Skills is the one-stop destination for your upskilling
                journey. Brace yourself to find the best job-ready courses and
                high-end technologies available in the sector.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 text-white bg-richblack-900">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from Other Learners
        </h2>

        {/* Review Slider here  */}
      </div>

      {/* footer  */}
      <Footer />
    </div>
  );
}

export default Home;
