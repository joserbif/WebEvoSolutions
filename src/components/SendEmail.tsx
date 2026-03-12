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
  const [subject, setSubject] = useState('');  // Estado para o assunto do e-mail
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
    setSubject('');  // Limpar o estado do assunto
  };

  const handleSuggest = () => {
    const messages = [
      `Olá, Meu nome é [Seu Nome] e faço parte da equipe da [Nome da Sua Empresa]. 
      Estamos entrando em contato pois gostaríamos de anunciar os seus serviços em nossa plataforma. Acreditamos que sua atuação como [profissão ou área de atuação] pode beneficiar muitas pessoas que acessam nosso sistema em busca de profissionais confiáveis e de qualidade. 
      Caso tenha interesse em saber mais ou anunciar seus serviços conosco, basta responder a este e-mail e teremos o prazer de explicar todos os detalhes.
      Ficamos no aguardo e agradecemos pela atenção!
      Atenciosamente,  
      [Seu Nome]  
      [Cargo, se quiser]  
      [Nome da Empresa]  
      [E-mail de contato]  
      [Telefone, opcional]  
      [Site, opcional]`,
  
      `Olá, espero que esteja bem! Aqui é [Seu Nome] da [Nome da Sua Empresa]. 
      Estamos entrando em contato para apresentar uma oportunidade de divulgação para o seu serviço na nossa plataforma. Temos uma grande base de usuários que podem se beneficiar do seu trabalho. 
      Caso tenha interesse, basta responder a este e-mail para obter mais informações. 
      Aguardamos seu retorno!
      Atenciosamente, 
      [Seu Nome] 
      [Cargo] 
      [Nome da Empresa] 
      [E-mail]`,
  
      `Prezado(a) [Nome], 
      Meu nome é [Seu Nome] e trabalho na [Nome da Sua Empresa]. Estamos procurando profissionais qualificados para divulgar seus serviços em nossa plataforma. 
      Acreditamos que sua experiência como [profissão] seria de grande valor para nossa comunidade. Se tiver interesse, por favor, entre em contato para saber mais sobre como podemos colaborar.
      Agradecemos desde já e esperamos sua resposta. 
      Atenciosamente, 
      [Seu Nome] 
      [Cargo] 
      [E-mail de contato]`
    ];
  
    // Escolhe uma mensagem aleatória da lista
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
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
          <br />
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

        
        <div className="subject-container">
          <label htmlFor="email-subject" className="tituloContainerFiltros"></label>
          <input
            id="email-subject"
            type="text"
            className ="subject-input"
            placeholder="Digite o assunto do e-mail"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}  
          />
        </div>

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
          <button className="suggest-button" onClick={handleSuggest}>
            Sugerir
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
