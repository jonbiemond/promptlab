"use client";

import Image from 'next/image'
import { useState } from 'react';
import Head from 'next/head';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
};

type HomeProps = {
  // Define any props your component may have
};

export default function Home(props: HomeProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userMessage.trim() !== '') {
      setMessages([...messages, { type: 'user', text: userMessage }]);
      setUserMessage('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Head>
        <title>Conscious Learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4 flex justify-between items-center">
        <button onClick={toggleDarkMode} className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
          Toggle Dark Mode
        </button>
        <a className="px-4">Goals</a>
        <a className="px-4">Logout</a>
      </header>

      <div className="wrapper">
        <main className="main-content flex-1 p-4">
          <div className={`chat ${sidebarVisible ? 'with-sidebar' : ''}`}>
            {messages.map((message, index) => (
              <div key={index} className={message.type === 'user' ? 'userMessage' : 'botMessage'}>
                <p className="text-left">{message.text}</p>
              </div>
            ))}
            <form onSubmit={handleSubmit} className="p-4">
              <input
                type="text"
                id="request"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Send a message"
                className="p-2 border border-gray-400 rounded mr-2"
              />
              <input
                type="submit"
                value="Send"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              />
            </form>
          </div>
        </main>
      </div>

      <footer className="p-4 flex justify-center items-center border-t border-gray-300">
        Powered by ChatGPT
      </footer>
    </div>
  );
}
