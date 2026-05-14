import React, { useState, useEffect, useRef } from 'react';
import { Paper, Group, Text, ActionIcon, ScrollArea, TextInput } from '@mantine/core';
import { IconX, IconSend, IconMicrophone } from '@tabler/icons-react';

interface AiChatProps {
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
    isDarkMode: boolean;
}

type Message = {
    sender: 'bot' | 'user';
    text: string;
};

type AiStreamEvent =
    | { type: 'chunk'; data: string }
    | { type: 'done' };

const AI_CHAT_API_BASE_URL = (import.meta as any).env.VITE_AI_CHAT_API_BASE_URL?.replace(/\/$/, '');

const AiChat: React.FC<AiChatProps> = ({ isChatOpen, setIsChatOpen, isDarkMode }) => {
    const [messages, setMessages] = useState<Message[]>([{ sender: 'bot', text: "Hi! I’m Manju’s AI assistant.\nI can help you learn about his skills, projects, experience, and career journey. \nSelf hosted by Manju" }]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!isChatOpen) {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            setMessages([{ sender: 'bot', text: "Hi! I’m Manju’s assistant helping him to get hired.\nI can help you learn about his skills, projects, experience, and career journey. \nSelf hosted by Manju" }]);
            setInputText('');
            setIsTyping(false);
        }
    }, [isChatOpen]);

    // Scroll to bottom of chat when new messages appear or chat opens
    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isChatOpen]);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const newUserMsg: Message = { sender: 'user', text: inputText };
        
        setMessages((prev) => [...prev, newUserMsg]);
        setInputText('');
        setIsTyping(true);

        // Add empty bot message to append streamed text to
        setMessages((prev) => [...prev, { sender: 'bot', text: '' }]);

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        try {
            if (!AI_CHAT_API_BASE_URL) {
                throw new Error('Missing VITE_AI_CHAT_API_BASE_URL environment variable');
            }

            const response = await fetch(`${AI_CHAT_API_BASE_URL}/api/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: abortControllerRef.current.signal,
                body: JSON.stringify({
                    query: inputText
                }),
            });

            if (response.status === 429) {
                throw new Error('429');
            }

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            if (!response.body) throw new Error('No response body');

            const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                if (value) {
                    buffer += value;
                    const lines = buffer.split('\n');
                    
                    // Keep the last partial line in the buffer
                    buffer = lines.pop() || '';

                    for (let line of lines) {
                        line = line.trim();
                        if (line.startsWith('data:')) {
                            const dataPayload = line.substring(5).trim();

                            try {
                                const parsed = JSON.parse(dataPayload) as AiStreamEvent;

                                if (parsed.type === 'done') {
                                    continue;
                                }

                                if (parsed.type !== 'chunk') {
                                    continue;
                                }

                                setMessages((prev) => {
                                    const updated = [...prev];
                                    const lastIndex = updated.length - 1;
                                    updated[lastIndex] = {
                                        ...updated[lastIndex],
                                        text: updated[lastIndex].text + parsed.data
                                    };
                                    return updated;
                                });
                            } catch (e) {
                                console.error('Invalid AI stream event:', dataPayload, e);
                            }
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return;
            }
            console.error('Error communicating with backend:', error);
            setMessages((prev) => {
                const updated = [...prev]
                if (error.message === '429') {
                    updated[updated.length - 1].text += "\nUh-oh looks like Manju's server is overloaded, try again after some time";
                } else {
                    updated[updated.length - 1].text += "\nUh-oh, looks like there is an issue with Manju's server, no worries I'll be back up soon!";
                }
                return updated;
            });
        } finally {
            setIsTyping(false);
        }
    };

    const handleVoiceInput = () => {
        if (isListening) return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const currentTranscript = Array.from(event.results)
                .map((result: any) => result[0].transcript)
                .join('');
            setInputText(currentTranscript);
        };

        recognition.onend = () => setIsListening(false);

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    if (!isChatOpen) return null;

    return (
        <Paper
            shadow="xl"
            p="md"
            withBorder
            style={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                width: '350px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1000,
                backgroundColor: isDarkMode ? '#1A1B1E' : '#FFFFFF',
                borderColor: isDarkMode ? '#2C2E33' : '#E9ECEF',
            }}
        >
            <Group justify="space-between" mb="md">
                <Text fw={700} c={isDarkMode ? 'white' : 'black'}>AI Assistant</Text>
                <ActionIcon onClick={() => setIsChatOpen(false)}>
                    <IconX size={18} color={isDarkMode ? 'white' : 'black'} />
                </ActionIcon>
            </Group>

            <ScrollArea viewportRef={chatScrollRef} style={{ flex: 1, paddingRight: '10px' }} offsetScrollbars>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.sender === 'user' ? '#1971C2' : (isDarkMode ? '#2C2E33' : '#F1F3F5'),
                                color: msg.sender === 'user' ? 'white' : (isDarkMode ? '#C1C2C5' : 'black'),
                                padding: '8px 12px',
                                borderRadius: '8px',
                                maxWidth: '80%',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                        <Text size="sm">
                            {msg.text.split(/(Self hosted by Manju)/).map((part, i) =>
                                part === 'Self hosted by Manju' ? (
                                    <span key={i} style={{ fontSize: '0.8em', fontStyle: 'italic', opacity: 0.7 }}>
                                        {part}
                                    </span>
                                ) : (
                                    part
                                )
                            )}
                        </Text>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={{ alignSelf: 'flex-start' }}>
                            <Text size="xs" c="dimmed">Typing...</Text>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
            >
                <TextInput
                    placeholder="Ask me anything..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ flex: 1 }}
                    disabled={isTyping}
                    styles={{
                        input: {
                            backgroundColor: isDarkMode ? '#2C2E33' : '#FFFFFF',
                            color: isDarkMode ? '#FFFFFF' : '#000000',
                            borderColor: isDarkMode ? '#424242' : '#E9ECEF',
                        }
                    }}
                />
                <ActionIcon
                    type="button"
                    onClick={handleVoiceInput}
                    color={isListening ? 'red' : 'gray'}
                    variant={isListening ? 'filled' : 'subtle'}
                    disabled={isTyping}
                    style={{ width: '36px', height: '36px' }}
                    title="Voice Search"
                >
                    <IconMicrophone size={18} />
                </ActionIcon>
                <ActionIcon
                    type="submit"
                    color="blue"
                    variant="filled"
                    disabled={!inputText.trim() || isTyping}
                    style={{ width: '36px', height: '36px' }}
                >
                    <IconSend size={18} />
                </ActionIcon>
            </form>
        </Paper>
    );
};

export default AiChat;
