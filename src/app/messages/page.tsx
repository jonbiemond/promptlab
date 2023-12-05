"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Footer from '../_components/Footer';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
};


export default function Messages() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userMessage.trim() !== '') {
      // add the user message to the chat
      setMessages([...messages, { type: 'user', text: userMessage }]);
      setUserMessage('');

      try {
        // sending the POST request to the API endpoint
        const response = await fetch('/api/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        // handling the response from the api
        const botResponse = await response.json();

        // attempts to convert the response into JSON,
        // checks if ChatGPT output the correct string
        let botResponseJSON;
        try {
          botResponseJSON = JSON.parse(botResponse);
        } catch (error) {
          throw new Error('ChatGPT output incorrect JSON formatting, try again.');
        }

        const formattedResponse = 
        `
          <br>
          <div style="max-width: 50%;">
            <p><strong>Response:</strong> ${botResponseJSON.query_response}</p>
            <br>
            <p><strong>Feedback:</strong></p>
            <ul style="word-wrap: break-word;">
              <li><strong>Clarity:</strong> ${botResponseJSON.feedback.clarity}</li>
              <li><strong>Scope:</strong> ${botResponseJSON.feedback.scope}</li>
              <li><strong>Improvement:</strong> ${botResponseJSON.feedback.improvement}</li>
            </ul>
          </div>
          <br>
        `;

        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'bot', text: formattedResponse },
        ]);
        // error handling
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (session && status === 'authenticated') {
    return (
      <div className={`container ${darkMode ? 'bg-black text-white w-screen' : 'bg-white text-black w-screen'}`}>
        <Head>
          <title>Conscious Learning</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="p-4 flex justify-between items-center w-screen">
          <button onClick={toggleDarkMode} className="btn btn-wide hover:btn-primary hover:text-white text-white cursor-pointer">
            Toggle Dark Mode
          </button>
          <Link className='btn btn-wide hover:btn-primary hover:text-white text-white' href="/goals">
            Goals
          </Link>

          <Link className='btn btn-wide hover:btn-primary hover:text-white text-white' href="/logout">
            Logout
          </Link>
        </header>

        <div className="wrapper w-screen flex">
          <main className="main-content flex-1 p-4 h-screen ">
            <section className='text-4xl font-semithin'>
              Welcome <strong>{session.user?.name}</strong> :)
              <div className='divider divider-primary' ></div>
            </section>
            <section className={`chat ${sidebarVisible ? 'with-sidebar' : ''}`}>
            {messages.map((message, index) => (
              // distinguishes between user and bot messages
              // to use dangerouslySetInnerHTML for bot messages ONLY
              // to restrict user messages to only strings to avoid potential XSS attacks
              <div key={index} className={message.type === 'user' ? 'userMessage' : 'botMessage'}>
                {message.type === 'user' ? (
                <p className="text-left">{message.text}</p>
                ) : ( 
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
                )}
      </div>
            ))}
              <form onSubmit={handleSubmit} className="p-4 flex items-center justify-center ">
                <input
                  type="text"
                  id="request"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Send a message"
                  className=" text-white py-2 input input-bordered w-full mr-5"
                />
                <button
                  type="submit"
                  value="Send"
                  className="btn btn-primary text-white px-10 cursor-pointer"
                >
                  Send
                </button>
              </form>
            </section>
            <Footer />
          </main>
        </div>
      </div>
    );
  } else {
    redirect('./login')
  }
}
