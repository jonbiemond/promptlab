"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
};

type HomeProps = {
};

export default function Messages() {

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  // check authentication status
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    // redirect to login or sign up if not authenticated
    if (!isAuthenticated) {
      router.push('/');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

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
        const botResponseJSON = JSON.parse(await response.json());

        const formattedResponse = `
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
        <Link href="/goals">
          Goals
        </Link>
        <Link href="/logout">
          Logout
        </Link>
      </header>

      <div className="wrapper">
        <main className="main-content flex-1 p-4">
        <div className={`chat ${sidebarVisible ? 'with-sidebar' : ''}`}>
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
            <form onSubmit={handleSubmit} className="p-4">
              <input
                type="text"
                id="request"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Send a message"
                className={`p-2 border border-gray-400 rounded mr-2 ${darkMode ? 'inputField' : ''}`}
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
