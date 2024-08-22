import { socket } from "../../socket";
import { useContext, useEffect, useState } from "react";
import ChatBox from "../../components/Technicians/ChatBox";
import AuthContext from "../../components/Global/AuthContext";
import axios from "axios";

export default function Chats() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const { loggedUser: technician } = useContext(AuthContext);
  const [senderId, setSenderId] = useState(null);

  const getChats = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/technicians/chats",
      { headers: { token: localStorage.getItem("token") } }
    );
    setChats(data.chats);
  };

  useEffect(() => {
    getChats();
    socket.on("new-chat", (msgInfo) => {
      getChats();
    });
    socket.on("chat message", (data) => {
      if (data.receiverId !== technician._id) {
        return;
      }
    });
  }, [technician._id]);

  // useEffect(() => {
  //   console.log("xx");

  //   getChats();
  // }, [newMsg]);

  return (
    <>
      <section className="min-h-44vh relative">
        {chatOpen ? (
          <ChatBox setChatOpen={setChatOpen} senderId={senderId} />
        ) : null}
        {chats
          ? chats.map((chat, i) => {
              return (
                <div key={i} className="flex items-center mb-10">
                  <div className="msg-request">
                    <img
                      src="/assets/images/default.jpg"
                      alt={`photo`}
                      className="request-img cursor-pointer w-20"
                      onClick={() => {
                        setChatOpen(true);
                        setSenderId(chat.senderId);
                      }}
                    />
                    <p className="roboto-medium text-sm">
                      {chat.senderData[0].firstName}{" "}
                      {chat.senderData[0].lastName}
                    </p>
                  </div>
                  <p className=" nunito-bold text-gray-600">{chat.message}</p>
                </div>
              );
            })
          : null}
      </section>
    </>
  );
}
