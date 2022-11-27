import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import watch from '../../assets/watch.png'
import { Navbar } from "flowbite-react";


export default function Navbar2() {
    const { user, loading, logOut } = useContext(AuthContext);
    const [toggleBurger, setToggleBurger] = useState(false);
    const navigate = useNavigate();
    const handleBurger = () => {
        console.log(toggleBurger);
        setToggleBurger((prev) => !prev);
    };

    const handleSignOut = () => {
        logOut()
            .then((result) => {
                console.log(result)
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="mb-8 md:mb-16">
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="https://flowbite.com/">
                    <img
                        src={watch}
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Still Works
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary-color block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' : `block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Home</NavLink>

                    <NavLink
                        to="/blog"
                        className={({ isActive }) => isActive ? 'text-primary-color block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' : `block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Blog</NavLink>
                    {
                        user?.uid ?
                            <>
                                <li>
                                    <NavLink to="/dashboard"
                                        className={({ isActive }) => isActive ? 'text-primary-color block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' : `block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/signOut'
                                        onClick={handleSignOut}
                                        className={({ isActive }) => isActive ? 'text-primary-color block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' : `block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Sign Out</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/login"
                                        className={({ isActive }) => isActive ? 'text-primary-color block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' : `block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-color md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Login</NavLink>
                                </li>
                            </>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
