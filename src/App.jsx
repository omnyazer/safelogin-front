import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const text = await response.text();
    setMessage(text);
    setIsError(!text.includes("succès"));
  };

  const login = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const text = await response.text();

    if (text.includes("Connexion réussie")) {
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      setMessage(text);
      setIsError(true);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>SafeLogin</h1>
        <p>Connexion sécurisée avec React + Java</p>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="buttons">
          <button onClick={login}>Se connecter</button>
          <button onClick={register}>S’inscrire</button>
        </div>

        {message && (
          <div className={isError ? "message error" : "message success"}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardPage() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

 if (!username) {
  return <Navigate to="/" replace />;
}

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="page">
      <div className="card dashboard">
        <h1>Bienvenue, {username} 👋</h1>
        <p>Vous êtes connecté à votre espace sécurisé.</p>

        <div className="dashboard-box">
          <h2>Tableau de bord</h2>
          <p>Votre authentification React + Java fonctionne correctement.</p>
        </div>

        <button onClick={logout}>Se déconnecter</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;