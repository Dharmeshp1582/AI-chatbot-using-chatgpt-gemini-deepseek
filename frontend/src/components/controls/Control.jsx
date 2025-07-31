import React, { useState } from 'react'
import TextareaAutosize from "react-textarea-autosize"

const Control = ({onSend
}) => {
  const [content,setContent] = useState("") 

  const handleContentChange =(event) => {
    setContent(event.target.value) 
  }

  const handleContentSend =() => {
    if(content.length > 0){
      onSend(content)
      setContent("")
    }
  }


  const handleEnterPress = (event) => {
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault()
      handleContentSend()
    }

  }

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-grow px-4 py-2 rounded-2xl bg-white">
        <TextareaAutosize
          className="w-full h-full border-none outline-none resize-none bg-white"
          placeholder="Message Ai chatbot"
          value={content} 
          minRows={1}
          maxRows={4}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      <button className="flex justify-center items-center w-9 h-9 border-none rounded-full outline-none bg-black" onClick={handleContentSend}>
        <SendIcon className="fill-gray-100" />
      </button>
    </div>
  )
}

export default Control

function SendIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      className={className}
    >
      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
    </svg>
  )
}
