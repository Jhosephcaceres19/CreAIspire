// context/MessageContext.tsx
import { createContext, useState, ReactNode } from "react";

interface MessageContextType {
  message: string;
  setMessage: (msg: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string>('');

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
