import React from 'react'
import Markdown from "react-markdown"

const WELCOME_MESSAGE = {
  role:"assistant",
  content:"Hello how can i assist You right now ?" 
}
const Chat = ({ messages }) => {
  return (
    <div className="flex flex-col gap-2 h-full p-2 overflow-y-auto">
      {[WELCOME_MESSAGE ,...messages].map(({ role, content }, index) => (
        <div
          key={index}
          className={`w-[90%] px-4 rounded-2xl text-sm 
            ${role === "user" ? "self-end bg-gray-200" : "self-start "}`}
        >
         <Markdown>{content}</Markdown> 
        </div>
      ))}
    </div>
  )
}

export default Chat
