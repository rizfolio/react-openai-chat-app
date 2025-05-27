import { useState } from "react";
import axios from "axios";
import OpenAI from "openai/index.mjs";


const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages([...messages, userMessage]);
        setInput("");
        setIsLoading(true);
        setError(null);

        const client = new OpenAI({
            dangerouslyAllowBrowser: true,
            apiKey: apiKey,
        });

        client.responses.create({
            model: 'gpt-4o',
            instructions: 'You are a coding assistant that talks like a pirate',
            input: input,
        })
            .then((response) => {
                const aiMessage = { role: "assistant", content: response.output_text };
                setMessages((prev) => [...prev, aiMessage]);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error sending message:", err);
                setError("Failed to send message.");
                setIsLoading(false);
            });
    }


    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };



    return (

        <>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                    <h1 className="text-lg font-bold">Chat with AI</h1>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <p>No messages yet.</p>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className={`mb-2 p-2 rounded-lg ${msg.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                                <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Start the conversation!</p>
                    )}
                </div>
                <div className="p-4 border-t">
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message..." onKeyDown={handleKeyPress}
                        />
                        <button
                            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700" onClick={handleSend}   >
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </>

    )

};

export default Chat;