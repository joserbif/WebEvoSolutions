import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="content">
        <h1 className="title">Escolha uma opção:</h1>
        <div className="options">
          <Link to="/send-email" className="option-link">Enviar Email</Link>
          <Link to="/list-emails" className="option-link">Listar Emails</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
