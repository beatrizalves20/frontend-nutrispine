import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ContatoSuporte = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [resposta, setResposta] = useState("");

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar os dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResposta(""); // Resetar mensagem ao enviar

    const response = await fetch("http://127.0.0.1:5000/contato-suporte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setResposta("Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
    } else {
      setResposta("Erro ao enviar a mensagem.");
    }
  };

  return (
    <div className="flex-grow-1 p-5">
      <h2 className="text-center text-success mb-4">Contato e Suporte</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone (Opcional):</label>
          <input
            type="text"
            name="telefone"
            className="form-control"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensagem:</label>
          <textarea
            name="mensagem"
            className="form-control"
            rows="4"
            value={formData.mensagem}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100 mt-3">Enviar</button>
      </form>
      {resposta && <p className="mt-3 alert alert-info">{resposta}</p>}
    </div>
  );
};

export default ContatoSuporte;
