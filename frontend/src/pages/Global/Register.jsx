import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import "../../styles/register.css";
import TechRegisterInputs from "../../components/Technicians/TechRegisterInputs";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [userRole, setUserRole] = useState("client");
  const client = useRef(null);
  const technician = useRef(null);

  return (
    <>
      <section id="register" className="bg-gray-100">
        <div className="container w-11/12 md:w-4/5 mx-auto p-4">
          <div className="block md:grid md:grid-cols-2">
            <div className="hidden md:block features w-4/5">
              <h2 className="feature-title text-2xl nunito-bold">
                Hire your technician
              </h2>
              <div className="card">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Illum expedita voluptates adipisci odio voluptatem obcaecati
                  dignissimos omnis eius natus animi?
                </p>
              </div>
            </div>
            <div className="create-account rounded-lg bg-white py-10">
              <h2 className="feature-title text-xl md:text-2xl lg:text-4xl nunito-bold mb-10 text-center">
                Create an account
              </h2>
              <div className="acc-form flex flex-col w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
                <div className="flex justify-center mb-5 gap-3">
                  <button
                    id="client"
                    ref={client}
                    onClick={() => {
                      setUserRole("client");
                      client.current.classList.add("active");
                      technician.current.classList.remove("active");
                    }}
                    className="active bg-sec hover:bg-sec-active active:bg-sec-active register-buttons"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Client
                  </button>
                  <button
                    id="technician"
                    ref={technician}
                    onClick={() => {
                      setUserRole("technician");
                      client.current.classList.remove("active");
                      technician.current.classList.add("active");
                    }}
                    className="bg-sec hover:bg-sec-active active:bg-sec-active register-buttons"
                  >
                    <FontAwesomeIcon icon={faWrench} className="mr-2" />
                    Technician
                  </button>
                </div>
                <div>
                  <form action="">
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      className="register-inputs"
                      name="firstName"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      className="register-inputs"
                      name="lastName"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      className="register-inputs"
                      name="email"
                    />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className="register-inputs"
                      name="password"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Phone Number"
                      className="register-inputs"
                      name="phone"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Address"
                      className="register-inputs"
                      name="address"
                    />
                    <input
                      type="date"
                      required
                      className="register-inputs"
                      name="birthDate"
                    />
                    <label htmlFor="image" className="nunito-bold">
                      Profile Picture
                    </label>
                    <input
                      id="image"
                      type="file"
                      className="register-inputs"
                      name="picture"
                    />
                    {userRole === "technician" ? <TechRegisterInputs /> : ""}
                    <input type="checkbox" required />
                    <label htmlFor="terms" className="nunito-medium ml-2">
                      {" "}
                      I agree to the terms and conditions
                    </label>
                    <button
                      type="submit"
                      className="bg-black register-buttons w-full mt-5"
                    >
                      Create an account
                    </button>
                  </form>
                  <h5 className="mt-5">
                    Already have account?{" "}
                    <Link to={"/login"} className="text-sec nunito-bold">
                      Login
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
