// import { useState, useRef } from "react";
// import Link from "next/link";
// import Layout from "@/components/Layout";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// export default function Dashboard() {
//   const [messages, setMessages] = useState<
//     { sender: "user" | "bot"; text: string }[]
//   >([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatBodyRef = useRef<HTMLDivElement>(null);

//   const userIcon = "https://cdn-icons-png.flaticon.com/512/236/236831.png";
//   const botIcon = "https://cdn-icons-png.flaticon.com/512/387/387569.png";

//   function scrollToBottom() {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }

//   const sendMessage = async () => {
//     const msg = input.trim();
//     if (!msg) return;

//     // Add user message
//     setMessages((prev) => [...prev, { sender: "user", text: msg }]);
//     setInput("");
//     setLoading(true);
//     scrollToBottom();

//     try {
//       // Show typing indicator
//       setMessages((prev) => [...prev, { sender: "bot", text: "..." }]);
//       scrollToBottom();

//       const res = await fetch("/api/aicoach", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: msg }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       // Remove typing indicator
//       setMessages((prev) =>
//         prev.filter((m) => !(m.sender === "bot" && m.text === "..."))
//       );

//       // Add bot reply
//       setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
//       scrollToBottom();
//     } catch (err) {
//       console.error("Coach error:", err);
//       setMessages((prev) =>
//         prev.filter((m) => !(m.sender === "bot" && m.text === "..."))
//       );
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Sorry, something went wrong." },
//       ]);
//       scrollToBottom();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout title="AI Health Dashboard">
//       <div className="max-w-3xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow">
//         <Link
//           href="/dashboard"
//           className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
//         >
//           ← Back to Home
//         </Link>

//         <h2 className="text-xl font-bold text-gray-800 mt-4">
//           🧠 Ask Your AI Health Coach
//         </h2>

//         <div className="border rounded-lg overflow-hidden flex flex-col h-[500px]">
//           {/* Chat Body */}
//           <div
//             className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2"
//             ref={chatBodyRef}
//           >
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex items-end gap-2 ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {msg.sender === "bot" && (
//                   <img
//                     src={botIcon}
//                     alt="Bot"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 )}

//                 <div
//                 className={`p-2 rounded-lg max-w-xs break-words ${
//                     msg.sender === "user"
//                     ? "bg-teal-600 text-white rounded-br-none"
//                     : "bg-white text-gray-800 rounded-bl-none"
//                 }`}
//                 >
//                 {msg.sender === "bot" ? (
//                     <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                     {msg.text}
//                     </ReactMarkdown>
//                 ) : (
//                     msg.text
//                 )}
//                 </div>

//                 {msg.sender === "user" && (
//                   <img
//                     src={userIcon}
//                     alt="User"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="flex border-t p-2 gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Type your question..."
//               className="flex-1 border rounded px-3 py-2"
//               disabled={loading}
//             />
//             <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
//             >
//             {loading ? "…" : <FontAwesomeIcon icon={faPaperPlane} />}
//             </button>
//           </div>
//         </div>
//       Important Disclaimer: Please remember that I am an AI assistant and not a medical doctor. My analysis is based on the information you provide and is for informational purposes only. For a definitive diagnosis and treatment plan, it is essential to consult with a licensed healthcare professional. If you are experiencing a medical emergency, please contact your local emergency services immediately.
//       </div>
//     </Layout>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Layout from "@/components/Layout";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// export default function Dashboard() {
//   const [messages, setMessages] = useState<
//     { sender: "user" | "bot"; text: string }[]
//   >([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatBodyRef = useRef<HTMLDivElement>(null);

//   const userIcon = "https://cdn-icons-png.flaticon.com/512/236/236831.png";
//   const botIcon = "https://cdn-icons-png.flaticon.com/512/387/387569.png";

//   // Auto-scroll to bottom whenever messages change
//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     const msg = input.trim();
//     if (!msg) return;

//     setMessages((prev) => [...prev, { sender: "user", text: msg }]);
//     setInput("");
//     setLoading(true);

//     // Add animated typing indicator
//     setMessages((prev) => [...prev, { sender: "bot", text: "__typing__" }]);

//     try {
//       const res = await fetch("/api/aicoach", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: msg }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       // Remove typing indicator and add reply
//       setMessages((prev) =>
//         prev
//           .filter((m) => !(m.sender === "bot" && m.text === "__typing__"))
//           .concat({ sender: "bot", text: data.reply })
//       );
//     } catch (err) {
//       console.error("Coach error:", err);
//       setMessages((prev) =>
//         prev
//           .filter((m) => !(m.sender === "bot" && m.text === "__typing__"))
//           .concat({
//             sender: "bot",
//             text: "⚠️ Sorry, something went wrong. Please try again.",
//           })
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMessage = (msg: { sender: "user" | "bot"; text: string }, i: number) => {
//     const isUser = msg.sender === "user";

//     // Typing animation
//     if (msg.text === "__typing__") {
//       return (
//         <div key={i} className="flex items-end gap-2 justify-start">
//           <img src={botIcon} alt="Bot" className="w-8 h-8 rounded-full" />
//           <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm flex space-x-1">
//             <span className="animate-bounce">•</span>
//             <span className="animate-bounce delay-100">•</span>
//             <span className="animate-bounce delay-200">•</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         key={i}
//         className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
//       >
//         {!isUser && (
//           <img src={botIcon} alt="Bot" className="w-8 h-8 rounded-full" />
//         )}

//         <div
//           className={`p-3 max-w-md break-words shadow-sm transition-transform hover:scale-[1.01] rounded-2xl ${
//             isUser
//               ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-sm"
//               : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
//           }`}
//         >
//           {isUser ? (
//             msg.text
//           ) : (
//             <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
//           )}
//         </div>

//         {isUser && (
//           <img src={userIcon} alt="User" className="w-8 h-8 rounded-full" />
//         )}
//       </div>
//     );
//   };

//   return (
//     <Layout title="AI Health Dashboard">
//       <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-xl space-y-6">
//   <Link
//     href="/dashboard"
//     className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
//   >
//     ← Back to Home
//   </Link>

//   <h2 className="text-2xl font-bold text-gray-800 mt-2 flex items-center justify-center gap-2">
//     🧠 Ask Your AI Health Coach
//   </h2>

//   <div className="border rounded-3xl overflow-hidden flex flex-col h-[520px] shadow-inner bg-gradient-to-b from-gray-50 to-white">
//     {/* Chat Body */}
//     <div
//       ref={chatBodyRef}
//       className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100"
//     >
//       {messages.map((msg, i) => {
//         const isUser = msg.sender === "user";

//         if (msg.text === "__typing__") {
//           return (
//             <div key={i} className="flex items-end gap-3 justify-start animate-pulse">
//               <img src={botIcon} alt="Bot" className="w-8 h-8 rounded-full" />
//               <div className="bg-gray-200 p-3 rounded-2xl w-16 flex justify-around">
//                 <span className="animate-bounce">•</span>
//                 <span className="animate-bounce delay-100">•</span>
//                 <span className="animate-bounce delay-200">•</span>
//               </div>
//             </div>
//           );
//         }

//         return (
//           <div
//             key={i}
//             className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}
//           >
//             {!isUser && <img src={botIcon} alt="Bot" className="w-8 h-8 rounded-full" />}
//             <div
//               className={`p-3 max-w-md break-words shadow-md transition-transform hover:scale-[1.02] rounded-3xl backdrop-blur-sm ${
//                 isUser
//                   ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-sm"
//                   : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
//               }`}
//             >
//               {isUser ? msg.text : <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>}
//             </div>
//             {isUser && <img src={userIcon} alt="User" className="w-8 h-8 rounded-full" />}
//           </div>
//         );
//       })}
//     </div>

//     {/* Input Bar */}
//     <div className="flex items-center gap-3 p-3 bg-white sticky bottom-0 rounded-t-3xl shadow-lg border-t">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         placeholder="Type your question..."
//         className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
//         disabled={loading}
//       />
//       <button
//         onClick={sendMessage}
//         disabled={loading}
//         className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-5 py-3 font-medium transition disabled:opacity-50 shadow-lg"
//       >
//         {loading ? "…" : <FontAwesomeIcon icon={faPaperPlane} />}
//       </button>
//     </div>
//   </div>

//   <p className="text-xs text-center text-gray-500 italic border-t pt-3">
//     ⚠️ Important: I am an AI assistant, not a medical doctor. For medical emergencies, contact local emergency services.
//   </p>
// </div>

//     </Layout>
//   );
// }



"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const userIcon = "https://cdn-icons-png.flaticon.com/512/236/236831.png";
  const botIcon = "https://cdn-icons-png.flaticon.com/512/387/387569.png";

  // Auto-scroll
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, typing]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    setTyping(true);

    try {
      const res = await fetch("/api/aicoach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: trimmed }] }),
      });
      const data = await res.json();
      const reply = (data.reply as string) || "⚠️ No response";

      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "⚠️ Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const renderMessage = (msg: ChatMessage, i: number) => {
    const isUser = msg.role === "user";
    return (
      <div
        key={i}
        className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}
      >
        {!isUser && <img src={botIcon} alt="Bot" className="w-8 h-8 rounded-full" />}
        <div
          className={`p-3 max-w-md break-words shadow-md rounded-3xl transition-transform hover:scale-[1.02] ${
            isUser
              ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-sm"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
          }`}
        >
          {isUser ? msg.content : <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>}
        </div>
        {isUser && <img src={userIcon} alt="User" className="w-8 h-8 rounded-full" />}
      </div>
    );
  };

  return (
    <Layout title="AI Health Dashboard">
      <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-xl space-y-6">
        <Link
          href="/dashboard"
          className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mt-2 text-center">
          🧠 Ask Your AI Health Coach
        </h2>

        <div className="border rounded-3xl overflow-hidden flex flex-col h-[520px] shadow-inner bg-gradient-to-b from-gray-50 to-white">
          {/* Chat Body */}
          <div
            ref={chatBodyRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100"
          >
            {messages.map(renderMessage)}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-3 justify-start animate-pulse">
                <img src={botIcon} alt="Bot" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-200 p-3 rounded-2xl w-16 flex justify-around">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 p-3 bg-white sticky bottom-0 rounded-t-3xl shadow-lg border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-5 py-3 font-medium transition disabled:opacity-50 shadow-lg"
            >
              {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPaperPlane} />}
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 italic border-t pt-3">
          ⚠️ I am an AI assistant, not a medical doctor. For emergencies, contact local services.
        </p>
      </div>
    </Layout>
  );
}
