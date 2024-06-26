export default function Navbar() {
  return (
    <>
      <nav className="py-5">
        <div className="container w-3/4 mx-auto flex justify-between nunito-medium text-nav-color">
          <div className="logo">
            <a href="#">
              <img src="assets/images/logo2.png" alt="" className="w-52" />
            </a>
          </div>
          <ul className="flex items-center">
            <li className="px-8">
              <a href="#" className="hover:text-secondary duration-300">
                Home
              </a>
            </li>

            <li className="px-8">
              <a href="#" className="hover:text-secondary duration-300">
                Technicians
              </a>
            </li>

            <li className="px-8">
              <a href="#" className="hover:text-secondary duration-300">
                Assigned Technicians
              </a>
            </li>

            <li className="px-8">
              <a href="#" className="hover:text-secondary duration-300">
                About
              </a>
            </li>

            <li className="px-8">
              <a href="#" className="hover:text-secondary duration-300">
                Contact
              </a>
            </li>
          </ul>
          <ul className="flex items-center">
            <li className="px-3">
              <a href="#" className="hover:text-secondary duration-300">
                Login
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="hover:text-secondary duration-300">
                Register
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="hover:text-secondary duration-300">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
