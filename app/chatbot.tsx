"use client";

import { useState } from "react";
import styled from "styled-components";
import { Send } from "lucide-react";

// Estilos com Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column; /* Mudança aqui para melhor ajuste em telas pequenas */
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a202c, #2d3748);
  color: white;
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden; /* Evita overflow no layout */
  height: 100vh;

  @media (min-width: 768px) {
    padding-left: clamp(20px, 20vw, 600px);
    padding-right: clamp(20px, 20vw, 600px);
  }
`;

const Header = styled.div`
  padding: 0.3rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.0rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 1.5rem;
    font-size: 1.5rem;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
    @media (min-width: 768px) {
    padding-bottom: 20px; /* Aumentei o padding-bottom para mais espaço */
  }
  padding-bottom: 120px; /* Aumentei o padding-bottom para mais espaço */
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

  @media (max-width: 768px) {
    font-size: 0.8rem; /* Ajuste de fonte para telas pequenas */
  }
    
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 1rem; /* Adicionei um padding-top para mais espaço acima do input */
  padding-bottom: 1.5rem; /* Aumentei o padding-bottom para mais espaço abaixo do input */
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;

  @media (min-width: 768px) {
    position: static; /* Remove a posição fixa em telas maiores */
    width: auto;
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  }
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

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste de fonte para telas pequenas */
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

const LoadingMessage = styled.div`
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a202c, #2d3748);
  color: white;
  align-self: flex-start;
  margin-bottom: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  animation: colorChange 0.9s infinite alternate, fadeIn 0.5s ease-in-out;

@keyframes colorChange {
  0% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(45, 55, 72));
  }
  5% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(48, 63, 85));
  }
  10% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(51, 70, 97));
  }
  15% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(55, 77, 108));
  }
  20% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(58, 84, 120));
  }
  25% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(61, 91, 132));
  }
  30% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(64, 98, 143));
  }
  35% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(67, 105, 154));
  }
  40% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(72, 112, 166));
  }
  45% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(75, 119, 178));
  }
  50% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(78, 126, 190));
  }
  55% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(81, 133, 201));
  }
  60% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(84, 140, 213));
  }
  65% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(87, 147, 225));
  }
  70% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(92, 154, 237));
  }
  75% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(95, 161, 248));
  }
  80% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(95, 161, 248));
  }
  85% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(95, 161, 248));
  }
  90% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(95, 161, 248));
  }
  95% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(95, 161, 248));
  }
  100% {
    background: linear-gradient(135deg, rgb(26, 32, 44), rgb(95, 161, 248));
  }
}





  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;



  
;

;

let firstmessage = true;

//  Componente Principal do Chatbot
export default function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! Before we get started, can you tell me what company are you from?", isUser: false } // Mensagem inicial
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  //You can start by asking anything about Vini, such as his age, current projects, job, and more!
const sendMessage = async () => {
  if (!input.trim()) return;

  // Mensagem do usuário
  const userMessage = { text: input, isUser: true };
  setMessages((prev) => [...prev, userMessage]);

  // Limpar o input
  setInput("");
  if(firstmessage){
    const errorMessage = { text: 'Thank you! Now you can start by asking anything about Vini, such as his age, current projects, job, and more!', isUser: false };
    setMessages((prev) => [...prev, errorMessage]);
    firstmessage = false;
  }else{

  try {
    setIsLoading(true);
    // Enviar a mensagem para o backend
    const response = await fetch('https://testdockervinichat.azurewebsites.net/perguntar/', {  // Altere para a URL correta do seu backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pergunta: input }),  // Alterado de "message" para "pergunta"
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem');
    }

    // Receber a resposta do backend (OpenAI)
    const data = await response.json();
    const botMessage = { text: data.resposta, isUser: false };

    console.log(botMessage); // Verifique o conteúdo da resposta

    // Adicionar a resposta do bot
    setIsLoading(false);
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    setIsLoading(false);
    console.error('Erro ao enviar mensagem:', error);
    const errorMessage = { text: 'Sorry, something is wrong :/', isUser: false };
    setMessages((prev) => [...prev, errorMessage]);
  }
}
};

  

  return (
    <Container>
      <MainContent>
        <Header>Vini AI Assistant</Header>
        <ChatContainer>
          {messages.map((msg, index) => (
            <Message key={index} $isUser={msg.isUser}>
              {msg.text}
            </Message>
          ))}
          {isLoading && <LoadingMessage>Thinking</LoadingMessage>}
        </ChatContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Type your message"
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