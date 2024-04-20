import React from "react";
import HighlightText from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../HomePage/Button";

function LearningLanguageSection() {
  return (
    <div className="mb-32 mt-[120px]">
      <div className="flex flex-col gap-5 ">
        <div className="text-4xl font-semibold text-center">
          Lorem ipsum dolor sit
          <HighlightText text={"ipsum dolor sit"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis repudiandae fugit laboriosam quae perferendis aut modi quisquam omnis, adipisci incidunt! Lorem ipsum dolor sit amet.
        </div>

        <div className="flex flex-row items-center justify-center mt-5">
            <img src={Know_your_progress} alt="" className="object-contain -mr-32" />
            <img src={Compare_with_others} alt="" className=" object-contain " />
            <img src={Plan_your_lessons} alt="" className=" object-contain -ml-36" />
        </div>

        <div className="w-fit mx-auto">
            <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
            </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default LearningLanguageSection;
