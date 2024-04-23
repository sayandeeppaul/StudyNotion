import React from "react";
import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most Popular",
  "Skills paths",
  "Career paths",
];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      <div>
        <div className="text-4xl font-semibold text-center my-10">
          Lorem, ipsum.
          <HighlightText text={"Lorem, ipsum dolor "} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
      </div>

      {/* tab screen */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-8">
        {tabName.map((ele, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 hover:text-richblack-5 cursor-pointer`}
              key={index}
              onClick={() => setCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      <div className="lg:block hidden lg:h-[200px]"></div>

      {/* cards group  */}
      <div className="gap-10 justify-center flex lg:gap-0 lg:justify-between flex-wrap lg:px-0 px-3 mb-7 w-full lg:absolute lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMore;
