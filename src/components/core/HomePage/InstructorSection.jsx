import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";

function InstructorSection() {
  return (
    <div className="my-16">
      <div className="flex flex-row gap-20 items-center">
        <div className="w-[50%]">
          <img src={Instructor} className="shadow-white" alt="" />
        </div>

        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={"Instructor"} />
          </div>

          <div className="font-medium text-[16px] text-richblack-300 w-[80%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            repudiandae fugit laboriosam quae perferendis aut modi quisquam
            omnis,
          </div>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
