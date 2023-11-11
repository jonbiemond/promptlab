import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // send if the message isn't blank
    if (userMessage.trim() !== '') {
      setMessages([...messages, { type: 'user', text: userMessage }]);
      setUserMessage('');
    }
  };

  // dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <Head>
        <title>Conscious Learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
          <button onClick={toggleDarkMode} className="toggle-button">
                  Toggle Dark Mode
          </button>
          <a>Goals </a>
          <a>Logout </a>
      </header>
      <div className="wrapper">

        <br></br>
        <main className="main-content">
          <div className={`chat ${sidebarVisible ? 'with-sidebar' : ''}`}>
            {messages.map((message, index) => (
              <div key={index} className={message.type === 'user' ? 'userMessage' : 'botMessage'}>
                <p>{message.text}</p>
              </div>
            ))}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="request"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Send a message"
              />
              <input type="submit" value="Send" />
            </form>
          </div>
        </main>
      </div>

      <footer>
        Powered by ChatGPT
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .wrapper {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 25%;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: width 0.3s;
        }

        .toggle-button {
          background-color: ${darkMode ? '#333' : '#fff'};
          color: ${darkMode ? '#fff' : '#333'};
          border: none;
          padding: 8px;
          cursor: pointer;
        }

        .main-content {
          flex: 1;
          padding: 20px;
        }

        .chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin: 0;
          margin-left: 25%;
          margin-right: 25%;
          overflow-y: auto;
        }

        .chat p {
          text-align: left;
        }

        .prompt,
        footer {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        footer {
          height: 50px;
          min-height: 50px;
          border-top: 1px solid #eaeaea;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          line-height: 1.6;
          font-size: 18px;
          background-color: ${darkMode ? '#333' : '#fff'};
          color: ${darkMode ? '#fff' : '#333'};
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
