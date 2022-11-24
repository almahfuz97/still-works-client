import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import logo from "../../logo192.png";

export default function Navbar() {
    const [toggleBurger, setToggleBurger] = useState(false);
    const handleBurger = () => {
        console.log(toggleBurger);
        setToggleBurger((prev) => !prev);
    };

    return (
        <div>
            <nav className=" px-8 my-8 flex justify-between items-center">
                <div className=" flex items-center">
                    {/* <img src={logo} alt="logo" className="w-10 mr-2" /> */}
                    <h1 className=" font-bold text-2xl text-yellow-500">
                        <span>Still</span> <span>Works</span>
                    </h1>
                </div>
                <ul
                    className={`md:flex lg:border-none lg:shadow-none  md:visible absolute md:relative right-9 duration-500 md:mt-0 shadow shadow-yellow-500 ${toggleBurger ? "mt-40" : "-mt-96"
                        } bg-slate-50 border md:bg-transparent md:border-none p-4 rounded`}
                >
                    <li
                        onClick={handleBurger}
                        className="mr-6 hover:text-purple-400 text-yellow-600 mb-2"
                    >
                        <NavLink
                            to={"/blog"}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-purple-400  ease duration-100"
                                    : "ease duration-100"
                            }
                        >
                            Blog
                        </NavLink>{" "}
                    </li>

                    <li
                        onClick={handleBurger}
                        className="mr-6 hover:text-purple-400 text-yellow-600 mb-2"
                    >
                        <NavLink
                            to={"/stats"}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-purple-400  ease duration-100"
                                    : "ease duration-100"
                            }
                        >
                            Login
                        </NavLink>{" "}
                    </li>

                </ul>
                {/* making hamburger */}
                <div
                    onClick={handleBurger}
                    className=" md:hidden relative cursor-pointer"
                >
                    <div
                        className={`w-6 h-0.5  duration-300 mb-1 bg-yellow-500  ${toggleBurger
                            ? "rotate-45 origin-center absolute right-0.5 p-0.5"
                            : "rotate-0 relative"
                            }`}
                    ></div>
                    <div
                        className={`w-6 h-0.5 duration-300 mb-1 bg-yellow-500  ${toggleBurger ? "hidden" : "visible"
                            }`}
                    ></div>
                    <div
                        className={`w-6 h-0.5 mb-1 duration-300 bg-yellow-500  ${toggleBurger
                            ? "-rotate-45 origin-center absolute right-0.5 p-0.5"
                            : "rotate-0 relative"
                            }`}
                    ></div>
                </div>
            </nav>
        </div>
    );
}