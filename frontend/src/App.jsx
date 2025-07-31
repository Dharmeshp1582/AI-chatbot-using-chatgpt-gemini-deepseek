import React, { useState } from "react";
import Chat from "./components/chat/Chat";
import Control from "./components/controls/Control";
import { Assistant } from "./assistant/googleai";

const App = () => {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // const handleContentSend = async (content) => {
  //   addMessage({ content, role: "user" });
  //   try {
  //     const result = await assistant.chat(content);
  //     addMessage({ content: result, role: "assistant" });
  //   } catch (error) {
  //     console.log(error);
  //     addMessage({
  //       content: "sorry i couldnt process your request",
  //       role: "system",
  //     });
  //   }
  // };


  const handleContentSend = async (content) => {
  addMessage({ content, role: "user" });
  try {
    const result = await assistant.sendMessage(content); // updated
    addMessage({ content: result, role: "assistant" });
  } catch (error) {
    addMessage({
      content: "Sorry, I couldn't process your request.",
      role: "system",
    });
    console.log(error)
  }
};


  return (
    <div className="flex flex-col items-center gap-4 h-screen p-4">
      <header className="text-center">
        <img src="/chat-bot.png" alt="" className="w-16 h-16" />
        <h2 className="m-0">AI Chatbot</h2>
      </header>
      <div className="flex-grow w-full bg-white rounded-2xl overflow-y-auto">
        <Chat messages={messages} />
      </div>
      <Control onSend={handleContentSend} />
    </div>
  );
};

const MESSAGES = [
  {
    role: "user",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    role: "assistant",
    content:
      "Sure! Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    role: "user",
    content: "Can you explain why it's so popular among designers?",
  },
  {
    role: "assistant",
    content:
      "Designers use it as placeholder text to focus on layout without distraction from real content.",
  },
  {
    role: "user",
    content: "Does it have any real meaning?",
  },
  {
    role: "assistant",
    content:
      "Not really. It's derived from a scrambled passage of Latin but doesn’t hold any significant meaning.",
  },
  {
    role: "user",
    content: "Thanks, that makes sense!",
  },
  {
    role: "assistant",
    content:
      "You're welcome! Would you like me to show an example of how it looks in a paragraph?",
  },
];

export default App;
