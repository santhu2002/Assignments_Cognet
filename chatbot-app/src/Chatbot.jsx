import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Bot } from "lucide-react";
import Messages from "./components/Messages";
import Popup from "./components/Popup";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("John");
  const [email, setEmail] = useState("dummy@gmail.com");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    return name.trim().length >= 3;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidName(name) && isValidEmail(email)) {
      setIsOpen(false);
      setMessages([
        ...messages,
        { text: `${name} Welcome to our chatbot!`, type: "bot" },
      ]);
    } else {
      alert("Please enter a valid name (at least 3 characters) and email.");
    }
  };

  const randomReplies = [
    "Welcome to our chatbot!",
    "How can I assist you today?",
    "Thanks for providing your details!",
    "Have a great day ahead!",
    "Let me know if you need anything else.",
  ];

  const usermessage = () => {
    if (!msg) return;
    const userMessage = { text: msg, type: "user" };
    const botReply = {
      text: randomReplies[Math.floor(Math.random() * randomReplies.length)],
      type: "bot",
    };

    setMessages([...messages, userMessage, botReply]);
    setMsg("");
  };

  const closemodel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex sm:h-[70vh] h-[100vh]">
      <Dialog
          open={isOpen}
        >
          <DialogContent className="w-full sm:max-w-[450px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Chatbot Access</DialogTitle>
                <DialogDescription>Please Enter Your Details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name:
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email:
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!isValidName(name) || !isValidEmail(email)}
                  className="btn btn-primary"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      <div className="flex  max-w-3xl  w-full mx-auto bg-white flex-col md:rounded-t-xl shadow-2xl md:mt-8">
        <div className="bg-gray-400 flex items-center gap-4 text-white p-4 md:rounded-t-xl sticky top-0">
          <Bot size={48} />
          <div>
            <h1 className="text-xl font-bold">Chatbot</h1>
            <p>Hi, I'm Chatbot. How can I help you today?</p>
          </div>
        </div>
        {/* {isOpen && (
          <div>
            <Popup
              open={closemodel}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              handleSubmit={handleSubmit}
              isValidEmail={isValidEmail}
              isValidName={isValidName}
            />
          </div>
        )} */}
        <Messages messages={messages} />

        <div className="bg-gray-200 p-4 flex sticky bottom-0 items-center gap-4">
          <Input
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 bg-white p-5"
          />
          <Button className="p-5" onClick={usermessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
