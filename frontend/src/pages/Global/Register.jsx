import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import "../../styles/register.css";
import TechRegisterInputs from "../../components/Technicians/TechRegisterInputs";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Joi from "joi";

export default function Register() {
  const [userRole, setUserRole] = useState("user");
  const [registrationError, setRegistrationError] = useState("");
  const [confirmEmailMsg, setConfirmEmailMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const client = useRef(null);
  const technician = useRef(null);

  const createUser = (e) => {
    if (!e.target.name) return;
    if (e.target.name.includes("technicianDetails")) {
      const [, field] = e.target.name.split(".");
      newUser.technicianDetails[field] = e.target.value;
    } else {
      newUser[e.target.name] = e.target.value;
    }
    newUser.role = userRole;
  };

  const userRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formValidation()) {
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        newUser
      );

      setRegistrationError("");
      setLoading(false);
      setConfirmEmailMsg(data.message);
      localStorage.setItem("confirmEmailToken", data.token);
    } catch (error) {
      if (error?.response.data) {
        setRegistrationError(error.response.data.error);
      }
      setLoading(false);
    }
  };

  const formValidation = () => {
    const firstNameSchema = Joi.object({
      firstName: Joi.string().min(3).max(15).required(),
    }).extract("firstName");
    const lastNameSchema = Joi.object({
      lastName: Joi.string().min(3).max(15).required(),
    }).extract("lastName");

    const emailSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    }).extract("email");

    const pwSchema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("[A-Za-z]{1}\\d{6,}"))
        .message(
          "Password must contain only 1 character and at least 6 numbers"
        ),
    }).extract("password");

    if (firstNameSchema.validate(newUser.firstName).error) {
      setFirstNameError(
        firstNameSchema.validate(newUser.firstName).error.message
      );
      return false;
    } else setFirstNameError("");

    if (lastNameSchema.validate(newUser.lastName).error) {
      setLastNameError(lastNameSchema.validate(newUser.lastName).error.message);
      return false;
    } else setLastNameError("");

    if (emailSchema.validate(newUser.email).error) {
      setEmailError(emailSchema.validate(newUser.email).error.message);
      return false;
    } else setEmailError("");

    if (pwSchema.validate(newUser.password).error) {
      setPwError(pwSchema.validate(newUser.password).error.message);
      return false;
    } else setPwError("");

    return true;
  };

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
              {registrationError ? (
                <h3
                  id="errorMessage"
                  className="text-red-600 text-md nunito-bold text-center mb-7"
                >
                  {registrationError}
                </h3>
              ) : (
                <h3
                  id="confirmEmailMsg"
                  className="text-green-600 text-md nunito-bold text-center mb-7"
                >
                  {confirmEmailMsg}
                </h3>
              )}
              <div className="acc-form flex flex-col w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
                <div className="flex justify-center mb-5 gap-3">
                  <button
                    id="client"
                    ref={client}
                    onClick={() => {
                      setUserRole("user");
                      newUser.role = "user";
                      client.current.classList.add("active");
                      technician.current.classList.remove("active");
                      if (newUser.technicianDetails) {
                        delete newUser.technicianDetails;
                      }
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
                      newUser.role = "technician";
                      client.current.classList.remove("active");
                      technician.current.classList.add("active");
                      setNewUser({
                        ...newUser,
                        technicianDetails: { service: "plumber" },
                      });
                    }}
                    className="bg-sec hover:bg-sec-active active:bg-sec-active register-buttons"
                  >
                    <FontAwesomeIcon icon={faWrench} className="mr-2" />
                    Technician
                  </button>
                </div>
                <div>
                  <form
                    action=""
                    onSubmit={userRegistration}
                    onChange={createUser}
                  >
                    {firstNameError ? (
                      <h4 className="text-red-500 nunito-medium">
                        {firstNameError}
                      </h4>
                    ) : (
                      ""
                    )}
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      className={
                        firstNameError
                          ? "register-inputs border border-red-500"
                          : "register-inputs"
                      }
                      name="firstName"
                    />
                    {lastNameError ? (
                      <h4 className="text-red-500 nunito-medium">
                        {lastNameError}
                      </h4>
                    ) : (
                      ""
                    )}
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      className={
                        lastNameError
                          ? "register-inputs border border-red-500"
                          : "register-inputs"
                      }
                      name="lastName"
                    />
                    {emailError ? (
                      <h4 className="text-red-500 nunito-medium">
                        {emailError}
                      </h4>
                    ) : (
                      ""
                    )}
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      className={
                        emailError
                          ? "register-inputs border border-red-500"
                          : "register-inputs"
                      }
                      name="email"
                    />
                    {pwError ? (
                      <h4 className="text-red-500 nunito-medium">{pwError}</h4>
                    ) : (
                      ""
                    )}
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className={
                        pwError
                          ? "register-inputs border border-red-500"
                          : "register-inputs"
                      }
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
                    {userRole === "technician" ? <TechRegisterInputs /> : null}
                    <input type="checkbox" required />
                    <label htmlFor="terms" className="nunito-medium ml-2">
                      I agree to the terms and conditions
                    </label>
                    {loading ? (
                      <button
                        type="submit"
                        className="bg-black register-buttons w-full mt-5"
                      >
                        <Spinner
                          spinnerColor="#388da8"
                          spinnerSize="20px"
                          spinnerClassName="register-spinner"
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-black register-buttons w-full mt-5"
                      >
                        Create an account
                      </button>
                    )}
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
