import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

import logoEvo from '../assets/Logo1.png'; // ajuste o caminho se necessário
import logoSocial from '../assets/Logo2.png'; // ajuste o caminho se necessário

const navItems = [
    { name: "Home", icon: "🏠", path: "/" },
    { name: "Enviar Emails", icon: "✉️", path: "/send-email" },
    { name: "Listar Emails", icon: "📋", path: "/list-emails" }
];

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(navItems.findIndex(item => item.path === location.pathname));
    const [isHovered, setIsHovered] = useState(false); // Estado para hover

    const goto = (index: number) => {
        setActive(index);
        navigate(navItems[index].path);  // Navega para a rota correspondente
    };

    const goHome = () => {
        setActive(0); // Define o item ativo como "Home"
        navigate("/"); // Redireciona para a página inicial
    };

    return (
        <aside className="sidebar"
            onMouseEnter={() => setIsHovered(true)} // Quando o mouse entra
            onMouseLeave={() => setIsHovered(false)} // Quando o mouse sai
        >
            <div className="inner">
                <div className="header">
                    <h1>
                        <img 
                            src={logoEvo} 
                            alt="Evo" 
                            className={`title-image ${isHovered ? 'fade-out' : 'fade-in'}`} 
                            onClick={goHome} // Redireciona para a página inicial ao clicar
                        />
                        <img 
                            src={logoSocial} 
                            alt="Social" 
                            className={`title-image ${isHovered ? 'fade-in' : 'fade-out'}`} 
                            onClick={goHome} // Redireciona para a página inicial ao clicar
                        />
                    </h1>
                </div>
                <nav className="menu" style={{ "--top": `${active * 56}px` } as React.CSSProperties}>
                    {navItems.map((item, index) => (
                        <button
                            className={active === index ? "active" : ""} 
                            key={index}
                            onClick={() => goto(index)}
                        >
                            <span className="icon">{item.icon}</span>
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
