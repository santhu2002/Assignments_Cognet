import { Bot, UserCircle } from "lucide-react"

function Messages({ messages }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto hide-scrollbar gap-2 p-4 flex-1">
        {messages.map((message, index) => (
            <div key={index} className={`flex gap-2 items-end p-4 ${message.type === "bot" ? "justify-start" : "justify-start flex-row-reverse"}`}>
                {message.type === "bot" ? (
                    <div className="flex items-center gap-2">
                        <Bot size={26} />
                    </div>
                ) : (
                    <UserCircle size={26} />
                )}
                <p className={`w-[50%] ${message.type === "bot" ? "bg-gray-200" : "bg-blue-200"} p-2 rounded-lg`}>{message.text}

                </p>
            </div>  
        ))}
    </div>
  )
}

export default Messages