/* eslint-disable react/prop-types */
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import AuthContext from "./AuthContext";
import TechnicianContext from "./Store";
import axios from "axios";

export default function ChatBox({ setChatOpen }) {
  const { loggedUser } = useContext(AuthContext);
  const technician = useContext(TechnicianContext);
  const [conversation, setConversation] = useState(null);
  const inputText = useRef(null);
  const chatMsgs = useRef(null);
  const msgsEnd = useRef(null);

  const scrollToBottom = () => {
    msgsEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const chatInfo = {
      senderId: loggedUser._id,
      receiverId: technician._id,
    };
    if (inputText?.current.value) {
      chatInfo.message = inputText.current.value;
      // socket.emit("new chat", chatInfo);
      socket.emit("chat message", chatInfo);

      inputText.current.value = "";
      scrollToBottom(); // Scroll to bottom after sending a message
    }
  };

  const getConversation = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/conversation/${technician._id}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    setConversation(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMsg(e);
      scrollToBottom();
    }
  };

  useEffect(() => {
    getConversation();
    socket.emit("joinRoom", {
      clientId: loggedUser._id,
      technicianId: technician._id,
    });
    socket.on("chat message", (msgInfo) => {
      // setMsgs((prev) => [...prev, msg]);
      setConversation((prev) => [...prev, msgInfo]);
    });
    return () => {
      socket.emit("leaveRoom", {
        clientId: loggedUser._id,
        technicianId: technician._id,
      });
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

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
      <div
        className="bg-gray-200 w-72 h-96 overflow-y-scroll p-3"
        ref={chatMsgs}
      >
        {conversation?.map((msg, i) => {
          if (msg.senderId === loggedUser._id) {
            return (
              <div key={i} className="flex items-end mb-8 gap-x-3">
                <img
                  src="/assets/images/default.jpg"
                  alt=""
                  className="w-7 rounded-full"
                />

                <p
                  className="bg-sec text-white p-2 rounded-lg text-sm max-w-44"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {msg.message}
                </p>
              </div>
            );
          }
          return (
            <div
              key={i}
              className="flex items-end justify-start mb-8 flex-row-reverse gap-x-3"
            >
              <img
                src={`http://localhost:3000/${technician.image}`}
                alt=""
                className="w-7 rounded-full"
              />

              <p
                className="bg-white text-black p-2 rounded-lg text-sm max-w-44"
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {msg.message}
              </p>
            </div>
          );
        })}
        <div style={{ float: "left", clear: "both" }} ref={msgsEnd}></div>
      </div>
      <div className="type-msg w-72">
        <form
          action=""
          className="flex items-center relative"
          onSubmit={sendMsg}
        >
          <textarea
            className="w-full h-14 resize-none p-3 border bg-gray-200 focus-within:outline-none focus-within:bg-gray-100 rounded-md text-sm"
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
