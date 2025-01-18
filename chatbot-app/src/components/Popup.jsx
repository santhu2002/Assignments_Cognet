import React from "react";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Popup = ({
  open,
  name,
  setName,
  email,
  setEmail,
  isValidName,
  isValidEmail,
  handleSubmit,
}) => {
  const modelref = useRef();
  const closeModal = (e) => {
    if (modelref.current === e.target) {
      if (isValidEmail(email) && isValidName(name)) {
        open();
      }
    }
  };

  const [closing, setClosing] = useState(false);

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setClosing(true);
    setTimeout(() => {
      handleSubmit();
      open();
    }, 500);
  };
  return (
    <div
      ref={modelref}
      className={`fixed inset-0 flex items-center justify-center flex-col m-auto bg-black bg-opacity-30 backdrop-blur-sm z-50 ${
        closing ? "animate-slideDown" : "animate-slideUp"
      }`}
    >
      <div className="flex flex-col w-[300px] md:w-[37%] animate-scaleUp">
        <div className="flex  justify-between items-center  rounded-xl rounded-b-none p-4 bg-black ">
          <p className="text-white font-semibold">
            Enter Details to access the chatbot
          </p>
          {/* <Button onClick={open}>
          <X size={20} color="white" />
        </Button> */}
        </div>
        <div className="flex flex-col gap-4 rounded-b-xl p-4 bg-white  ">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className=""
            />
          </div>
          <div className="flex items-center gap-4">
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
          <Button
            disabled={!isValidName(name) || !isValidEmail(email)}
            className="btn btn-primary w-[100px]"
            onClick={handleSubmit1}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
