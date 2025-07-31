import React, { useState } from "react";
import Chat from "./components/chat/Chat";
import Control from "./components/controls/Control";
// import { Assistant } from "./assistant/googleai";

import { Assistant } from "./assistant/openai";
import { Loader } from "./components/loader/Loader";

const App = () => {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // updated handleContentSend with history and loader
  const handleContentSend = async (content) => {
    // avoid multiple API calls while loading
    if (isLoading) return;

    // add user message first
    const updatedMessages = [...messages, { content, role: "user" }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // pass updated messages so chat history is preserved
      const result = await assistant.chat(content, updatedMessages);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      // show error message as a system message
      addMessage({
        content:
          error.message ||
          "Sorry, I couldn't process your request.",
        role: "system",
      });
      console.log(error);
    } finally {
      // stop loader
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 h-screen p-4">
      {/* loader */}
      {isLoading && <Loader />}

      <header className="text-center">
        <img src="/chat-bot.png" alt="" className="w-16 h-16" />
        <h2 className="m-0">AI Chatbot</h2>
      </header>

      <div className="flex-grow w-full bg-white rounded-2xl overflow-y-auto">
        <Chat messages={messages} />
      </div>

      {/* disable send if loading */}
      <Control onSend={handleContentSend} disabled={isLoading} />
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
