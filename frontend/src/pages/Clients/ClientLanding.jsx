import { Link } from "react-router-dom";
import "../../styles/landing.css";

export default function ClientLanding() {
  return (
    <>
      <header id="hero" className="relative">
        <div className="layer absolute top-0 left-0 right-0 bottom-0">
          <div className="container mx-auto flex items-center justify-center mt-24">
            <div className="text-center flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-5 text-heading-color">
                Welcome to <span className="text-sec">Technicians HUB</span>
              </h1>
              <p className=" text-lg mb-10 text-heading-color">
                Start hire a technician.
              </p>
              <Link to="/technicians">
                <button className="bg-sec rounded-3xl px-10 py-3 text-white hover:bg-cyan-700 duration-300 mb-5">
                  Get Started
                </button>
              </Link>

              <img
                src="../assets/images/get_started.png"
                alt="get started"
                className="w-56 lg:w-auto text-center ml-10"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
