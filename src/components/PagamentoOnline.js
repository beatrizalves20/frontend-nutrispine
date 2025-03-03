import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PagamentoOnline = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
    valor: "",
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

    const response = await fetch("http://127.0.0.1:5000/pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMensagem("Pagamento realizado com sucesso!");
      setFormData({ nome: "", cpf: "", numeroCartao: "", validade: "", cvv: "", valor: "" });
    } else {
      setMensagem("Erro ao processar o pagamento.");
    }
  };

  return (
    <div className="flex-grow-1 p-5">
      <h2 className="text-center text-success mb-4">Pagamento Online</h2>
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
          <label className="form-label">Número do Cartão:</label>
          <input type="text" name="numeroCartao" className="form-control" value={formData.numeroCartao} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Validade:</label>
          <input type="text" name="validade" placeholder="MM/AA" className="form-control" value={formData.validade} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">CVV:</label>
          <input type="text" name="cvv" className="form-control" value={formData.cvv} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor (R$):</label>
          <input type="number" name="valor" className="form-control" value={formData.valor} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Confirmar Pagamento</button>
      </form>
      {mensagem && <p className="mt-3 alert alert-info">{mensagem}</p>}
    </div>
  );
};

export default PagamentoOnline;
