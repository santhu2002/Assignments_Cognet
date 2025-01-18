import { X } from "lucide-react";
import Chatbot from "./Chatbot";
import { useState } from "react";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold p-4">CHATBOT APP</h1>

      {isChatOpen && (
        <div className="fixed bottom-10 right-5">
          <Chatbot />
          <div className="flex justify-end p-5 ">
            <X
              size={40}
              color="white"
              className="cursor-pointer bg-black rounded-full p-2 "
              onClick={openChat}
            />
          </div>
        </div>
      )}
      {!isChatOpen && (
        <div className="fixed bottom-5 right-5" onClick={openChat}>
          <img
            className="w-[100px] h-[100px] cursor-pointer"
            src="chatbot.jpg"
            alt="chatbot"
          />
        </div>
      )}
    </div>
  );
}

export default App;
