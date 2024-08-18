/* eslint-disable react/prop-types */
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { socket } from "../../socket";

export default function ChatBox({ setChatOpen }) {
  const inputText = useRef(null);
  const sendMsg = (e) => {
    e.preventDefault();
    if (inputText?.current.value) {
      socket.emit("chat message", inputText.current.value);
      inputText.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMsg(e);
    }
  };

  return (
    <div className="chat-box absolute bottom-0 right-20">
      <div className="taskbar bg-gray-300 h-9 w-full border-b relative rounded-sm">
        <FontAwesomeIcon
          icon={faClose}
          size="lg"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sec hover:text-sec-active duration-150 cursor-pointer"
          onClick={() => {
            setChatOpen(false);
          }}
        />
      </div>
      <div className="bg-gray-200 w-72 h-96  overflow-y-scroll p-3">
        <div className="me flex items-end mb-8">
          <img
            src="/assets/images/default.jpg"
            alt=""
            className="w-10 rounded-full"
          />
          <p className="bg-sec text-white p-2 rounded-lg ml-4  text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            consequuntur, laborum deserunt ratione blanditiis dicta?
          </p>
        </div>
        <div className="receiver flex items-end justify-end mb-8">
          <p className="bg-white text-black p-2 rounded-lg mr-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            consequuntur, laborum deserunt ratione blanditiis dicta? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Suscipit, veritatis.
          </p>
          <img
            src="/assets/images/default.jpg"
            alt=""
            className="w-10 rounded-full"
          />
        </div>
        <div className="receiver flex items-end justify-end ">
          <p className="bg-white text-black p-2 rounded-lg mr-4 text-sm">
            Okay!
          </p>
          <img
            src="/assets/images/default.jpg"
            alt=""
            className="w-10 rounded-full"
          />
        </div>
      </div>
      <div className="type-msg w-72">
        <form
          action=""
          className="flex items-center relative"
          onSubmit={sendMsg}
        >
          <textarea
            className="w-full h-14 resize-none p-3 border bg-gray-200 focus-within:outline-none focus-within:bg-gray-100 rounded-md"
            placeholder="Type something..."
            rows="5"
            ref={inputText}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="items-center absolute right-5 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-sec hover:text-sec-active duration-150"
              size="lg"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
