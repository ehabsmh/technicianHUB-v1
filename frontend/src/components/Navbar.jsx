/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/nav.css";
import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./Global/AuthContext";

export default function Navbar() {
  const menuList = useRef(null);
  const menuListToggle = () => {
    menuList.current.classList.toggle("opacity-0");
    menuList.current.classList.toggle("z-20");
  };
  const { loggedUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname;
  console.log(active);

  return (
    <>
      <nav className="py-5 relative lg:static">
        <div className="container w-11/12 mx-auto flex justify-between items-center nunito-medium text-nav-color">
          <div className="logo w-40 md:w-52">
            <Link to={loggedUser?.role === "technician" ? "/tech" : "/client"}>
              <img src="/assets/images/logo2.png" alt="" className="" />
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
              {loggedUser ? (
                <>
                  <li className="lg:px-8 lg:py-0 py-2">
                    <Link
                      onClick={menuListToggle}
                      to={
                        loggedUser?.role === "technician" ? "/tech" : "/client"
                      }
                      className={`hover:text-sec duration-300 ${
                        active.endsWith("/tech") ||
                        active.endsWith("/client") ||
                        active === "/"
                          ? "text-sec"
                          : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  {loggedUser?.role === "user" && (
                    <li className="lg:px-8 lg:py-0 py-2">
                      <Link
                        to="/technicians/plumber"
                        onClick={menuListToggle}
                        className={`hover:text-sec duration-300 ${
                          active.startsWith("/technicians/") ? "text-sec" : ""
                        }`}
                      >
                        Technicians
                      </Link>
                    </li>
                  )}

                  {/* {loggedUser?.role === "user" && (
                    <li className="lg:px-8 lg:py-0 py-2">
                      <a
                        onClick={menuListToggle}
                        href="#"
                        className="hover:text-sec duration-300"
                      >
                        Assigned Technicians
                      </a>
                    </li>
                  )} */}
                  {loggedUser.role === "technician" && (
                    <li className="lg:px-8 lg:py-0 py-2">
                      <Link
                        to={"/chats"}
                        onClick={menuListToggle}
                        className={`hover:text-sec duration-300 ${
                          active.startsWith("/chats") ? "text-sec" : ""
                        }`}
                      >
                        Chats
                      </Link>
                    </li>
                  )}
                  {loggedUser.role === "client" && (
                    <li className="lg:px-8 lg:py-0 py-2">
                      <Link
                        to={"/inbox"}
                        onClick={menuListToggle}
                        className={`hover:text-sec duration-300 ${
                          active.startsWith("/chats") ? "text-sec" : ""
                        }`}
                      >
                        Chats
                      </Link>
                    </li>
                  )}

                  {/* <li className="lg:px-8 lg:py-0 py-2">
                    <a
                      onClick={menuListToggle}
                      className="hover:text-sec duration-300"
                    >
                      About
                    </a>
                  </li>

                  <li className="lg:px-8 lg:py-0 py-2">
                    <a
                      onClick={menuListToggle}
                      className="hover:text-sec duration-300"
                    >
                      Contact
                    </a>
                  </li> */}
                  <li className="lg:px-3  lg:py-0 py-2">
                    <a
                      onClick={() => {
                        menuListToggle();
                        logout(navigate);
                      }}
                      className="hover:text-sec duration-300 cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="lg:px-3 lg:py-0 py-2">
                    <Link
                      onClick={menuListToggle}
                      to="/login"
                      className={`hover:text-sec duration-300 ${
                        active.includes("/login") ? "text-sec" : ""
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="lg:px-3  lg:py-0 py-2">
                    <Link
                      onClick={menuListToggle}
                      to="/register"
                      className={`hover:text-sec duration-300 ${
                        active.includes("/register") ? "text-sec" : ""
                      }`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
