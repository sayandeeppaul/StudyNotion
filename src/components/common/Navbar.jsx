import React from "react";
import logo from "../../assets/Logo/main_logo.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath(
      {
        path: route,
      },
      location.pathname
    );
  };
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Image  */}
        <Link to="/">
          <img src={logo} alt="" width={170} height={42} />
        </Link>

        {/* Nav Links  */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div></div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/Signup/Dashboard  */}
        <div className="flex gap-x-4 items-center">
          {
            user && user?.accountType != "Instructor" && 
            (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            )
          }
          {
            token === null && 
            (
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">Log in</button>
              </Link>
            )
          }
          {
            token === null && 
            (
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">Sign up</button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
