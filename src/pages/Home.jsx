import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";

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
      </div>

      {/* section 2  */}

      {/* section 3 */}

      {/* footer  */}
    </div>
  );
}

export default Home;
