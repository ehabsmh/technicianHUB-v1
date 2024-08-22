import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../components/Global/AuthContext";
import axios from "axios";
import { socket } from "../../socket";

export default function Profile() {
  const location = useLocation();
  const active = location.pathname;
  const { loggedUser: technician, refreshToken } = useContext(AuthContext);
  const { technicianDetails } = technician;
  const [newChat, setNewChat] = useState(false);

  const changeImage = async (e) => {
    e.preventDefault();
    try {
      const oldToken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      await axios.post(
        "http://localhost:3000/api/v1/technicians/updateImage",
        formData,
        { headers: { token: oldToken } }
      );
      refreshToken(localStorage.getItem("token"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshToken(localStorage.getItem("token"));

    socket.on("chat message", (data) => {
      if (data.receiverId !== technician._id) {
        return;
      }
    });

    socket.on("new-chat", (data) => {
      setNewChat(true);
    });
  }, []);

  return (
    <>
      <section className="container w-4/5 mx-auto relative">
        <div className="flex items-center space-x-4 p-3">
          <div className="tech-photo">
            {technician.image ? (
              <>
                <div className="image relative">
                  <img
                    src={`http://localhost:3000/${technician.image}`}
                    alt={`${technician.firstName} ${technician.lastName} photo`}
                    className="w-40 rounded-full min-h-40 max-h-40 cursor-pointer"
                  />
                  <label
                    htmlFor="image"
                    className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
                  >
                    <input
                      id="image"
                      type="file"
                      name="image"
                      className="invisible"
                      onChange={changeImage}
                    />
                  </label>
                </div>
              </>
            ) : (
              <img
                src={"/assets/images/default.jpg"}
                alt={`${technician.firstName} ${technician.lastName} photo`}
                className="w-40 rounded-full min-h-40 max-h-40 cursor-pointer"
              />
            )}

            <p className="text-center nunito-medium text-lg">
              {technician.firstName} {technician.lastName}
            </p>
          </div>
          <div>
            <h3 className="nunito-bold text-2xl">
              {technicianDetails.service}
            </h3>
            <h3 className="nunito-bold text-lg text-sec">
              {technicianDetails.salary}$/hr
            </h3>
            <div className="flex">
              <h3 className=" relative after:absolute after:rounded-full after:h-1 after:w-1 after:bg-sec after:top-1/2 after:-right-4 after:-translate-y-1/2">
                Reviews Count{" "}
                <span className="nunito-bold">
                  {technicianDetails.reviewsCount}
                </span>
              </h3>
              <h3 className="pl-7">
                Rate{" "}
                <span className="nunito-bold">
                  {Number(technicianDetails.rate).toFixed(1)} / 5
                </span>
              </h3>
            </div>
          </div>
        </div>

        <nav className="mt-16 mb-7 relative before:absolute before:-top-5 before:bg-slate-200 before:h-0.5 before:w-full">
          <ul className="flex w-1/2 justify-between p-5 items-center">
            <Link
              to={"about"}
              className={`technician_profile-link ${
                active.includes("about") ? "bg-slate-200" : ""
              }`}
            >
              <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                Bio
              </li>
            </Link>
            <Link
              onClick={() => {
                setNewChat(false);
              }}
              to={"chats"}
              className={`technician_profile-link relative ${
                active.includes("chats") ? "bg-slate-200" : ""
              }`}
            >
              <div
                className={`absolute bg-sec top-0 right-1 w-3 h-3 rounded-full ${
                  newChat ? "" : "hidden"
                }`}
              ></div>
              <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                Chats
              </li>
            </Link>
            <Link
              to={"reviews"}
              className={`technician_profile-link ${
                active.includes("reviews") ? "bg-slate-200" : ""
              }`}
            >
              <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                Reviews
              </li>
            </Link>
            <Link
              to={"requests"}
              className={`technician_profile-link ${
                active.includes("requests") ? "bg-slate-200" : ""
              }`}
            >
              <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                Job requests
              </li>
            </Link>
            <Link
              to={"settings"}
              className={`technician_profile-link ${
                active.includes("settings") ? "bg-slate-200" : ""
              }`}
            >
              <li className="p-10 h-12 flex items-center hover:bg-slate-200 duration-300 rounded-md">
                Settings
              </li>
            </Link>
          </ul>
        </nav>
        <Outlet />
      </section>
    </>
  );
}
