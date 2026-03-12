import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Modal from './Modal'; // Importa o componente Modal
import './SendEmail.css';

function SendEmail() {
  const navigate = useNavigate();

  const professionsOptions = [
    { value: 'Advogado', label: 'Advogado' },
    { value: 'Médico', label: 'Médico' },
    { value: 'Engenheiro', label: 'Engenheiro' },
    { value: 'Outro', label: 'Outro' },
  ];

  const [selectedProfessions, setSelectedProfessions] = useState<any[]>([]);
  const [tags, setTags] = useState<{ text: string }[]>([]);
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleProfessionChange = (selectedOptions: any) => {
    setSelectedProfessions(selectedOptions);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxLength = 100;

    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newTagText = e.currentTarget.value.trim();
      const tagExists = tags.some(tag => tag.text.toLowerCase() === newTagText.toLowerCase());

      if (!tagExists) {
        const newTag = { text: newTagText };
        setTags([...tags, newTag]);
        e.currentTarget.value = '';
      } else {
        setModalMessage('Esta tag já foi adicionada!'); // Define a mensagem do modal
      }
    } else if (e.currentTarget.value.length >= maxLength && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (selectedProfessions.length === 0 && tags.length === 0) {
      setModalMessage('Por favor, selecione ao menos uma profissão ou adicione um serviço.');
      return;
    }

    if (message.trim() === '') {
      setModalMessage('Por favor, preencha a mensagem.');
      return;
    }

    // Lógica de envio do e-mail
    setModalMessage('E-mail enviado!');
  };

  const handleClearFilters = () => {
    setSelectedProfessions([]);
    setTags([]);
    setMessage('');
  };

  return (
    <div className="send-email-container">
      <div className="send-email-content">
        <h1>Enviar Email</h1>
        <div className="button-container">
          <button className="back-button-send" onClick={() => navigate(-1)}>
            &lt; Voltar
          </button>
          <button className="clear-filters-button" onClick={handleClearFilters}>
            Limpar Filtros
          </button>
        </div>

        <div className="professions-container">
          <label>Selecione as profissões:</label>
          <Select
            isMulti
            options={professionsOptions}
            className="profession-select"
            onChange={handleProfessionChange}
            value={selectedProfessions}
            placeholder="Escolha uma ou mais profissões"
          />
        </div>

        {selectedProfessions.some((option) => option.value === 'Outro') && (
          <div className="filters-container">
            <label className='tituloContainerFiltros'>Digite outros serviços (pressione Enter para adicionar):</label>
            <input
              type="text"
              placeholder="Digite e aperte Enter"
              className="tag-input"
              onKeyDown={handleKeyDown}
              maxLength={100}
            />
            <div className="tags-list">
              {tags.map((tag, index) => (
                <div className="service-filter" key={index}>
                  {tag.text}
                  <button className="remove-filter" onClick={() => handleDelete(index)}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="message-container">
          <textarea
            placeholder="Digite sua mensagem aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-box"
          ></textarea>
        </div>

        <div className="buttons-container">
          <button className="send-button" onClick={handleSend}>
            Enviar
          </button>
        </div>
      </div>

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </div>
  );
}

export default SendEmail;
