import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CadastroPaciente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    CPF: '',
    data: '',
    idade: '',
    email: ''
  });

  const [mensagem, setMensagem] = useState('');

  // Função para atualizar os dados do formulário

  // Função para enviar os dados ao backend
  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensagem(''); // Limpa a mensagem ao enviar

  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/cadastrar/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Garante que o backend envie JSON
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); // Converte a resposta para JSON

    if (response.ok) {
      setMensagem('Paciente cadastrado com sucesso!');
      setFormData({ nome: '', CPF: '', data: '', idade: '', email: '' });
    } else {
      // Trata mensagens de erro vindas do Django
      setMensagem(data.detail || 'Erro ao cadastrar paciente.');
    }
  } catch (error) {
    setMensagem('Erro ao conectar com o servidor.');
  }
};


  return (
    <div className="flex-grow-1 p-5">
      <div className="w-50">
        <h2 className="text-center text-success mb-4">Cadastro de Paciente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              placeholder="Digite o nome do paciente"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">CPF</label>
            <input
              type="text"
              name="cpf"
              className="form-control"
              placeholder="Digite seu CPF"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }} required />
          </div>
          <div>
            <label className="form-label">Data</label>
            <input
              type="date"
              name="data"
              value={formData.name}
              onChange={(e) => ((e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              })(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Idade</label>
            <input
              type="number"
              name="idade"
              className="form-control"
              placeholder="Digite a idade do paciente"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Digite o e-mail"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Cadastrar</button>
        </form>
        {mensagem && <p className="mt-3 alert alert-info">{mensagem}</p>}
      </div>
    </div>
  );
};

export default CadastroPaciente;
