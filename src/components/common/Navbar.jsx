import React from "react";
import logo from "../../assets/Logo/main_logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Image  */}
        <Link to="/">
          <img src={logo} alt="" width={170} height={42} />
        </Link>

        {/* Nav Links  */}
        
      </div>
    </div>
  );
}

export default Navbar;
