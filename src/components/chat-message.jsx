"use client";
import React from "react";
import { cn } from "@/lib/utils";

export default function ChatMessage({ message }) {
    const isUser = message.sender === "user";

    console.log(message);

    return (
        <div
            className={cn(
                "flex gap-2",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#FFC1DA] text-white flex items-center justify-center text-sm font-medium">
                    AI
                </div>
            )}
            <div
                className={cn(
                    "max-w-[70%] rounded-lg p-3",
                    isUser
                        ? "bg-[#E53888] text-white"
                        : "bg-[#FFC1DA]/50 text-foreground"
                )}
            >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(message.timestamp).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-[#FFC1DA] text-white flex items-center justify-center text-sm font-medium">
                    U
                </div>
            )}
        </div>
    );
}
