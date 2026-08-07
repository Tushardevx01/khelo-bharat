"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search, ArrowLeft } from "lucide-react";
import { useState, useTransition, useEffect, useRef } from "react";
import { sendMessage, markAsRead } from "@/actions/message.actions";
import { useRouter } from "next/navigation";

interface MessagesViewProps {
  conversations: any[];
  activeChatId?: string;
  activeMessages: any[];
  currentUserId: string;
}

export function MessagesView({ conversations, activeChatId, activeMessages, currentUserId }: MessagesViewProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const activeConversation = conversations.find(c => {
    const otherUser = c.lastMessage.senderId === currentUserId ? c.lastMessage.receiver : c.lastMessage.sender;
    return otherUser.id === activeChatId;
  });

  const otherUser = activeConversation 
    ? (activeConversation.lastMessage.senderId === currentUserId ? activeConversation.lastMessage.receiver : activeConversation.lastMessage.sender) 
    : null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChatId) return;

    const content = message;
    setMessage(""); // optimistic clear

    startTransition(async () => {
      await sendMessage(activeChatId, content);
      router.refresh(); // reload to get new messages
    });
  };

  const handleSelectChat = (chatId: string) => {
    startTransition(async () => {
      // Mark as read when opening
      await markAsRead(chatId);
      router.push(`/messages?chatId=${chatId}`);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3" style={{ minHeight: "calc(100vh - 280px)" }}>
      {/* Sidebar - Conversations List */}
      <Card className={`lg:col-span-1 flex flex-col overflow-hidden ${activeChatId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 border-b border-border bg-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1 bg-card">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No conversations yet.</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const other = conv.lastMessage.senderId === currentUserId ? conv.lastMessage.receiver : conv.lastMessage.sender;
              return (
                <div
                  key={other.id}
                  onClick={() => handleSelectChat(other.id)}
                  className={`flex items-center gap-3 p-4 border-b border-border hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer ${
                    activeChatId === other.id ? 'bg-neutral-50 dark:bg-neutral-900' : ''
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={other.avatar || undefined} />
                    <AvatarFallback>{other.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {other.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conv.lastMessage.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${conv.unreadCount > 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      {conv.lastMessage.senderId === currentUserId ? "You: " : ""}{conv.lastMessage.content}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {conv.unreadCount}
                    </Badge>
                  )}
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className={`lg:col-span-2 flex flex-col overflow-hidden ${!activeChatId ? 'hidden lg:flex' : 'flex'} bg-card`}>
        {!activeChatId ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 lg:hidden"
                  onClick={() => router.push('/messages')}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                {otherUser && (
                  <>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={otherUser.avatar || undefined} />
                      <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{otherUser.name}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {activeMessages.map((msg) => {
                const isOwn = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-xl px-4 py-2 ${
                        isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      <p className="text-sm break-words">{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                  disabled={isPending}
                />
                <Button type="submit" size="icon" disabled={isPending || !message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
