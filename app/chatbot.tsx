"use client";

import { useState } from "react";
import styled from "styled-components";
import { Send } from "lucide-react";

// 📌 Estilos com Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a202c, #2d3748);
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Sidebar = styled.div`
  position: fixed;
  inset-y: 0;
  left: 0;
  width: 80px;
  background: linear-gradient(180deg, #3182ce, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  margin-left: 80px;
`;

const Header = styled.div`
  padding: 1.5rem;
  background: linear-gradient(90deg, #3182ce, #2563eb);
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const Message = styled.div<{ $isUser: boolean }>`
  max-width: 60%;
  padding: 12px 16px;
  border-radius: ${({ $isUser }) => ($isUser ? "12px 12px 0 12px" : "12px 12px 12px 0")};
  background: ${({ $isUser }) => ($isUser ? "linear-gradient(135deg, #3182ce, #2563eb)" : "linear-gradient(135deg, #4a5568, #2d3748)")};
  color: white;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(90deg, #3182ce, #2563eb);
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 12px;
  outline: none;
  font-size: 1rem;
  backdrop-filter: blur(5px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  margin-left: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  border: none;
  border-radius: 12px;
  transition: background 0.3s, transform 0.2s;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

//  Componente Principal do Chatbot
export default function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");

// 📌 Função para enviar mensagem
const sendMessage = async () => {
  if (!input.trim()) return;

  // Mensagem do usuário
  const userMessage = { text: input, isUser: true };
  setMessages((prev) => [...prev, userMessage]);

  // Limpar o input
  setInput("");

  try {
    // Enviar a mensagem para o backend
    const response = await fetch('http://127.0.0.1:8000/gpt/chat', {  // Altere para a URL correta do seu backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem');
    }

    // Receber a resposta do backend (OpenAI)
    const data = await response.json();
    const botMessage = { text: data.response, isUser: false };

    console.log(botMessage); // Verifique o conteúdo da resposta
    
    // Adicionar a resposta do bot
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    const errorMessage = { text: 'Desculpe, algo deu errado. Tente novamente mais tarde.', isUser: false };
    setMessages((prev) => [...prev, errorMessage]);
  }
};

  return (
    <Container>
      <Sidebar>🤖</Sidebar>
      <MainContent>
        <Header>Chatbot AI</Header>
        <ChatContainer>
          {messages.map((msg, index) => (
            <Message key={index} $isUser={msg.isUser}>
              {msg.text}
            </Message>
          ))}
        </ChatContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send size={20} color="white" />
          </Button>
        </InputContainer>
      </MainContent>
    </Container>
  );
}