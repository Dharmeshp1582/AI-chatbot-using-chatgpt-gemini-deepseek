import React from 'react'


const WELCOME_MESSAGE = {
  role:"assistant",
  content:"Hello how can i assist You right now ?" 
}
const Chat = ({ messages }) => {
  return (
    <div className="flex flex-col gap-2 h-full p-2 overflow-y-auto">
      {messages.map(({ role, content }, index) => (
        <div
          key={index}
          className={`w-[90%] px-4 rounded-2xl text-sm 
            ${role === "user" ? "self-end bg-gray-200" : "self-start "}`}
        >
          {content}
        </div>
      ))}
    </div>
  )
}

export default Chat
