"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Maximize2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";

import FullscreenChat from "@/components/fullscreen-chat";
import ChatMessage from "@/components/chat-message";
import LoadingDots from "@/components/loading";

// Sample message data
const initialMessages = [
    {
        content: "Halo! Saya adalah asisten virtual Anda. Bagaimana saya bisa membantu Anda hari ini?",
        sender: "bot",
        timestamp: new Date().toISOString(),
    },
];

export default function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null > null);
    const pathname = usePathname();
    const kelasId = pathname?.split("/")[2] || null;

    // const messagesEndRef = useRef(null);

    const handleSendMessage = async () => {
        setError(null);
        if (!inputValue.trim()) return;

        setIsLoading(true);

        const userMessage = {
            content: inputValue,
            sender: "user",
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        try {
            // panggil api (/api/notes)
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                message: inputValue,
                id: kelasId,
                }),
            });

            const data = await response.json();

            const botResponse = {
                content: data.summary,
                sender: "bot",
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            const errorMessage = {
                content:
                    "Sorry, I couldn't process your request. Please try again.",
                sender: "bot",
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            setError(
                error instanceof Error ? error.message : "An error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreenOpen(!isFullscreenOpen);
        setIsOpen(false);
    };

    if (isFullscreenOpen) {
        return (
            <FullscreenChat
                messages={messages}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSendMessage={handleSendMessage}
                onClose={() => setIsFullscreenOpen(false)}
                isLoading={isLoading}
            />
        );
    }

    return (
        <>
            {/* Floating Chat Bubble */}
            <div className="fixed bottom-6 right-2 z-50">
                <AnimatePresence>
                    {!isOpen ? (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="relative"
                        >
                            <Button
                                onClick={() => setIsOpen(true)}
                                size="lg"
                                className=" transition-all duration-300 lg:flex items-center hidden hover:scale-108"
                            >
                                <img
                                    src="/images/chatbot.png"
                                    alt="chatbot"
                                    className="max-w-[150px] w-full"
                                />
                            </Button>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                {/* Chat Window */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden shadow-lg"
                        >
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center justify-between bg-[#E53888]">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <div className="bg-[#FFC1DA] text-white w-full h-full flex items-center justify-center text-sm font-medium">
                                            AI
                                        </div>
                                    </Avatar>
                                    <div className="text-white">
                                        <h3 className="font-medium text-sm">
                                            Chat Assistant
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={toggleFullscreen}
                                    >
                                        <Maximize2 className="h-4 w-4 text-white" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            setIsOpen(false);
                                            setMessages(initialMessages);
                                        }}
                                    >
                                        <X className="h-4 w-4 text-white" />
                                    </Button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message, i) => (
                                    <ChatMessage key={i} message={message} />
                                ))}
                                {isLoading && <LoadingDots />}
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 border-t">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !isLoading
                                            ) {
                                                handleSendMessage();
                                            }
                                        }}
                                        className="flex-1"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        size="icon"
                                        disabled={isLoading}
                                        className="rounded-md bg-[#E53888] text-white hover:bg-[#E53888]/90 transition-all duration-300"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Drawer for small screens */}
            <div className="md:hidden fixed bottom-6 right-6 z-50">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            // size="lg"
                            className="transition-all duration-300 md:hidden"
                        >
                            {/* <MessageSquare className="h-6 w-6" /> */}
                            <img
                                src="/images/logo-chatbot.svg"
                                alt="chatbot"
                                className="h-12 w-12"
                            />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="h-[85vh] bg-[#E53888]">
                        <DrawerTitle className="sr-only">Chatbot</DrawerTitle>
                        <div className="h-full flex flex-col bg-white p">
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center justify-between bg-[#E53888]">
                                <div className="flex items-center text-white gap-2 bor">
                                    <Avatar className="h-8 w-8">
                                        <div className="bg-bg-[#FFC1DA] text-white w-full h-full flex items-center justify-center text-sm font-medium">
                                            AI
                                        </div>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">
                                            Chat Assistant
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleFullscreen}
                                >
                                    <Maximize2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message, i) => (
                                    <ChatMessage key={i} message={message} />
                                ))}
                                {isLoading && <LoadingDots />}
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 border-t">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !isLoading
                                            ) {
                                                handleSendMessage();
                                            }
                                        }}
                                        className="flex-1"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        size="icon"
                                        disabled={isLoading}
                                        className="rounded-md bg-[#E53888] text-white hover:bg-[#E53888]/90 transition-all duration-300"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}
