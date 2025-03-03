import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PlanoTratamento = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    planoAlimentar: "",
    tratamentoPersonalizado: ""
  });

  const [mensagem, setMensagem] = useState("");

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar os dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(""); // Resetar mensagem ao enviar

    const response = await fetch("http://127.0.0.1:5000/cadastrar-plano-tratamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMensagem("Plano e Tratamento cadastrados com sucesso!");
      setFormData({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        planoAlimentar: "",
        tratamentoPersonalizado: ""
      });
    } else {
      setMensagem("Erro ao cadastrar Plano e Tratamento.");
    }
  };

  return (
    <div  className="flex-grow-1 p-5">
     <h2 className="text-center text-success mb-4">Cadastro de Plano Alimentar e Tratamento Personalizado</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input type="text" name="nome" className="form-control" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">CPF:</label>
          <input type="text" name="cpf" className="form-control" value={formData.cpf} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail:</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone:</label>
          <input type="text" name="telefone" className="form-control" value={formData.telefone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Plano Alimentar:</label>
          <textarea name="planoAlimentar" className="form-control" value={formData.planoAlimentar} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tratamento Personalizado:</label>
          <textarea name="tratamentoPersonalizado" className="form-control" value={formData.tratamentoPersonalizado} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Cadastrar</button>
      </form>
      {mensagem && <p className="mt-3 alert alert-info">{mensagem}</p>}
    </div>
  );
};

export default PlanoTratamento;
