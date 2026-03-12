import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SendEmail from './components/SendEmail';
import ListEmails from './components/ListEmails';
import { Sidebar } from './components/sidebar'; // Importando o componente Sidebar

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Inclua a sidebar aqui */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/send-email" element={<SendEmail />} />
            <Route path="/list-emails" element={<ListEmails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
