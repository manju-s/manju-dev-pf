import { useLayoutEffect, useRef, useState } from 'react';
import { IconMessage } from '@tabler/icons-react';
import AiChat from './AiChat';
import './ChatModal.css';

const FLOATING_CHAT_BUTTON_SIZE = 48;
const FLOATING_CHAT_BUTTON_MARGIN = 12;
const FLOATING_CHAT_BUTTON_GAP = 40;
const FLOATING_CHAT_LABEL_HEIGHT = 42;
const FLOATING_CHAT_LABEL_GAP = 8;
const FLOATING_CHAT_BUTTON_RIGHT = 24;

const ChatModal = ({ isDarkMode, themeToggleRef }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatPromptTop, setChatPromptTop] = useState(null);
    const promptRef = useRef(null);
    const chatDragStateRef = useRef({
        isDragging: false,
        hasMoved: false,
        offsetY: 0,
        pointerId: null,
    });

    const clampChatPromptTop = (top) => {
        const maxY = window.innerHeight - FLOATING_CHAT_BUTTON_SIZE - FLOATING_CHAT_BUTTON_MARGIN;

        return Math.min(Math.max(top, FLOATING_CHAT_BUTTON_MARGIN), Math.max(maxY, FLOATING_CHAT_BUTTON_MARGIN));
    };

    const handleChatButtonPointerDown = (event) => {
        if (event.button !== 0) {
            return;
        }

        const promptRect = promptRef.current?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();

        chatDragStateRef.current = {
            isDragging: true,
            hasMoved: false,
            offsetY: event.clientY - promptRect.top,
            pointerId: event.pointerId,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handleChatButtonPointerMove = (event) => {
        const dragState = chatDragStateRef.current;

        if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
            return;
        }

        const nextTop = clampChatPromptTop(event.clientY - dragState.offsetY);

        if (Math.abs(nextTop - chatPromptTop) > 2) {
            chatDragStateRef.current.hasMoved = true;
        }

        setChatPromptTop(nextTop);
    };

    const handleChatButtonPointerUp = (event) => {
        const dragState = chatDragStateRef.current;

        if (dragState.pointerId === event.pointerId && event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        chatDragStateRef.current.isDragging = false;
        chatDragStateRef.current.pointerId = null;
    };

    const handleChatButtonClick = () => {
        if (chatDragStateRef.current.hasMoved) {
            chatDragStateRef.current.hasMoved = false;
            return;
        }

        setIsChatOpen((currentValue) => !currentValue);
    };

    useLayoutEffect(() => {
        const setInitialPosition = () => {
            setChatPromptTop((currentTop) => {
                if (currentTop !== null) {
                    return clampChatPromptTop(currentTop);
                }

                if (themeToggleRef.current) {
                    const themeToggleRect = themeToggleRef.current.getBoundingClientRect();

                    return clampChatPromptTop(
                        themeToggleRect.bottom +
                        FLOATING_CHAT_BUTTON_GAP +
                        FLOATING_CHAT_LABEL_HEIGHT +
                        FLOATING_CHAT_LABEL_GAP
                    );
                }

                return currentTop;
            });
        };

        setInitialPosition();
        window.addEventListener('resize', setInitialPosition);

        return () => {
            window.removeEventListener('resize', setInitialPosition);
        };
    }, [themeToggleRef]);

    return (
        <>
            {chatPromptTop !== null && !isChatOpen && (
                <div
                    ref={promptRef}
                    className="floating-chat-prompt"
                    style={{
                        right: `${FLOATING_CHAT_BUTTON_RIGHT}px`,
                        top: `${chatPromptTop}px`,
                    }}
                >
                    <div className="floating-chat-label">Why hire me?</div>
                    <button
                        type="button"
                        className="floating-chat-button"
                        onClick={handleChatButtonClick}
                        onPointerDown={handleChatButtonPointerDown}
                        onPointerMove={handleChatButtonPointerMove}
                        onPointerUp={handleChatButtonPointerUp}
                        onPointerCancel={handleChatButtonPointerUp}
                        aria-label="Open AI chat"
                    >
                        <span className="floating-chat-unread-indicator" aria-hidden="true" />
                        <IconMessage stroke={1.5} color={isDarkMode ? 'white' : 'black'} />
                    </button>
                </div>
            )}

            <AiChat
                isChatOpen={isChatOpen}
                setIsChatOpen={setIsChatOpen}
                isDarkMode={isDarkMode}
            />
        </>
    );
};

export default ChatModal;
