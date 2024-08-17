import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Chats() {
  return (
    <section className="container mx-auto mt-10">
      <div className="grid grid-cols-4 gap-2">
        <div className="chats border-r-2 border-sec space-y-5 col-span-1 bg-gray-100 p-5 rounded-md h-80vh overflow-y-scroll">
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>Ahmed Mohamed</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>Sara Hany</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>John Doe</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>Ahmed Mohamed</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>Sara Hany</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>John Doe</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>Ahmed Mohamed</p>
          </Link>
          <Link className="person flex items-center space-x-4 hover:bg-gray-200 rounded-md duration-300">
            <img
              src="../../../public/assets/images/default.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <p>Sara Hany</p>
          </Link>
        </div>
        <div className="chat col-span-3 ">
          <div className="messages space-y-8 h-60vh overflow-y-scroll relative">
            <div className="me flex items-end ">
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <p className="bg-sec text-white p-2 rounded-lg ml-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta?
              </p>
            </div>
            <div className="receiver flex items-end justify-end ">
              <p className="bg-sec text-white p-2 rounded-lg mr-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
                veritatis.
              </p>
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="me flex items-end ">
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <p className="bg-sec text-white p-2 rounded-lg ml-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta?
              </p>
            </div>
            <div className="receiver flex items-end justify-end ">
              <p className="bg-sec text-white p-2 rounded-lg mr-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
                veritatis.
              </p>
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="me flex items-end ">
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <p className="bg-sec text-white p-2 rounded-lg ml-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta?
              </p>
            </div>
            <div className="receiver flex items-end justify-end ">
              <p className="bg-sec text-white p-2 rounded-lg mr-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
                veritatis.
              </p>
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="me flex items-end ">
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <p className="bg-sec text-white p-2 rounded-lg ml-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta?
              </p>
            </div>
            <div className="receiver flex items-end justify-end ">
              <p className="bg-sec text-white p-2 rounded-lg mr-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
                veritatis.
              </p>
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="me flex items-end ">
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <p className="bg-sec text-white p-2 rounded-lg ml-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta?
              </p>
            </div>
            <div className="receiver flex items-end justify-end ">
              <p className="bg-sec text-white p-2 rounded-lg mr-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
                veritatis.
              </p>
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="me flex items-end ">
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <p className="bg-sec text-white p-2 rounded-lg ml-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta?
              </p>
            </div>
            <div className="receiver flex items-end justify-end ">
              <p className="bg-sec text-white p-2 rounded-lg mr-4 w-1/3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                consequuntur, laborum deserunt ratione blanditiis dicta? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
                veritatis.
              </p>
              <img
                src="../../../public/assets/images/default.jpg"
                alt=""
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>
          <div className="type-msg p-5">
            <form action="" className="flex items-center relative">
              <textarea
                className="w-full resize-none p-3 border bg-gray-200 focus-within:outline-none focus-within:bg-gray-100 rounded-md"
                placeholder="Type something..."
                rows="5"
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="items-center absolute right-10 text-sec cursor-pointer hover:text-sec-active duration-150"
                size="lg"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
