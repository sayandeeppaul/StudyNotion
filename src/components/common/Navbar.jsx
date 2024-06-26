import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/Logo/main_logo.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { BsChevronDown } from "react-icons/bs";
// import { getAllCategories } from "../../services/operations/categoriesAPI";

function Navbar() {
  // const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        console.log(
          "-------------------------------------------------->",
          res.data
        );
        setSubLinks(res.data.data);

        // axios
        //   .get("http://localhost:6000/api/v1/course/showAllCategories")
        //   .then((response) => {
        //     console.log("data:", response.data);
        //   });

        // dispatch(getAllCategories());
      } catch (error) {
        console.log("Could not fetch Categories", error);
      }
      setLoading(false);
    })();
  }, []);

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
                  <>
                    <div
                      className={`relative flex cursor-pointer items-center gap-1 group ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className=" invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-5 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] ">
                        <div className=" absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] tranlate-y-[40%] rotate-45 select-none  bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading..</p>
                        ) : subLinks.length ? (
                          <div>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              .map((subLink, index) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  key={index}
                                  
                                >
                                  <p className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">{subLink.name}</p>
                                </Link>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
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
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
