import axios from "axios";
import { useState } from "react";
import Spinner from "../../components/Spinner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user] = useState({});
  const [errormsg, setErrormsg] = useState("");

  const collectUserData = (e) => {
    user[e.target.name] = e.target.value;
    console.log(user);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        user
      );
      setLoading(false);
      setErrormsg("");
      localStorage.setItem("token", data.token);
    } catch (error) {
      if (error.response) {
        setErrormsg(error.response.data.error);
      }
      setLoading(false);
    }
  };
  return (
    <>
      <section id="login" className="bg-gray-100 h-screen">
        <div className="container w-11/12 md:w-4/5 mx-auto p-4">
          <div className="">
            <div className="create-account rounded-lg bg-white py-10">
              <h2 className="feature-title text-xl md:text-2xl lg:text-4xl nunito-bold mb-10 text-center">
                Login
              </h2>

              <h3
                id="errorMessage"
                className="text-red-600 text-md nunito-bold text-center mb-7"
              >
                {errormsg}
              </h3>

              <h3
                id="confirmEmailMsg"
                className="text-green-600 text-md nunito-bold text-center mb-7"
              ></h3>
              <div className="acc-form flex flex-col w-64 md:w-2/3 lg:w-1/5 mx-auto">
                <div>
                  <form
                    action=""
                    onSubmit={submitLogin}
                    onChange={collectUserData}
                  >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
