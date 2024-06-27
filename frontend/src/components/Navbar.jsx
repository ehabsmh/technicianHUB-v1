import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/nav.css";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const menuList = useRef(null);
  const menuListToggle = () => {
    menuList.current.classList.toggle("opacity-0");
    menuList.current.classList.toggle("z-20");
  };

  return (
    <>
      <nav className="py-5 relative lg:static">
        <div className="container w-11/12 mx-auto flex justify-between items-center nunito-medium text-nav-color">
          <div className="logo w-40 md:w-52">
            <Link to="/">
              <img src="assets/images/logo2.png" alt="" className="" />
            </Link>
          </div>
          <div className="menu">
            <FontAwesomeIcon
              icon={faBars}
              className="bars-icon lg:hidden cursor-pointer"
              onClick={menuListToggle}
            />
            <ul
              className="menu-list opacity-0 -z-10 lg:opacity-100 lg:p-0 p-4"
              ref={menuList}
            >
              <li className="lg:px-8 lg:py-0 py-2">
                <Link
                  onClick={menuListToggle}
                  to="/"
                  className="hover:text-sec duration-300"
                >
                  Home
                </Link>
              </li>

              <li className="lg:px-8 lg:py-0 py-2">
                <a
                  onClick={menuListToggle}
                  href="#"
                  className="hover:text-sec duration-300"
                >
                  Technicians
                </a>
              </li>

              <li className="lg:px-8 lg:py-0 py-2">
                <a
                  onClick={menuListToggle}
                  href="#"
                  className="hover:text-sec duration-300"
                >
                  Assigned Technicians
                </a>
              </li>

              <li className="lg:px-8 lg:py-0 py-2">
                <a
                  onClick={menuListToggle}
                  href="#"
                  className="hover:text-sec duration-300"
                >
                  About
                </a>
              </li>

              <li className="lg:px-8 lg:py-0 py-2">
                <a
                  onClick={menuListToggle}
                  href="#"
                  className="hover:text-sec duration-300"
                >
                  Contact
                </a>
              </li>
              <li className="lg:px-3 lg:py-0 py-2">
                <Link
                  onClick={menuListToggle}
                  to="/login"
                  className="hover:text-sec duration-300"
                >
                  Login
                </Link>
              </li>
              <li className="lg:px-3  lg:py-0 py-2">
                <Link
                  onClick={menuListToggle}
                  to="/register"
                  className="hover:text-sec duration-300"
                >
                  Register
                </Link>
              </li>
              <li className="lg:px-3  lg:py-0 py-2">
                <a
                  onClick={menuListToggle}
                  href="#"
                  className="hover:text-sec duration-300"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
