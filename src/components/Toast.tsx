import React, { useEffect } from 'react';
import './Toast.css'; // Certifique-se de ter esse CSS

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning'; // Novos tipos para a notificação
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Efeito para remover o toast após um determinado tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // O toast desaparecerá após 3 segundos

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
