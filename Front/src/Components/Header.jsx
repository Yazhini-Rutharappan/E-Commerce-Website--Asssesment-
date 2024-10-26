import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { FaPlus, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="w-full bg-voguish-brown shadow-md sticky top-0 z-50"
      style={{ backgroundColor: "#E0F7FA" }}
    >
      <Navbar className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-4xl text-black-400 ml-2">
              Voguish Trends
            </span>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        <div
          className={`md:flex items-center space-x-6 ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mr-10 gap-6">
            <Link
              to="/"
              className={`text-md font-medium ${
                pathname === "/" ? "text-black" : "text-black"
              } hover:text-blue-700 transition`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-md font-medium text-black hover:text-blue-700 transition"
            >
              About
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            {currentUser ? (
              <>
                <Link to="/create" className="w-full md:w-auto">
                  <Button className="flex items-center space-x-5 bg-blue-600 hover:bg-blue-500 text-white transition-all w-full md:w-auto justify-center gap-3">
                    <FaPlus className="mr-2 h-5 w-5" />
                    <span>Create</span>
                  </Button>
                </Link>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                      className="cursor-pointer"
                    />
                  }
                >
                  <Dropdown.Item onClick={handleSignout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <Link to="/signin" className="w-full md:w-auto">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white w-full md:w-auto transition-all">
                  Login
                  <a
                    href="#"
                    className="text-blue-800 hover:text-blue-900 transition-all underline"
                  ></a>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}
