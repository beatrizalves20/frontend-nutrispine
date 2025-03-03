import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CadastroProfissional = () => {
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        especialidade: "",
        registroProfissional: "",
    });

    const [mensagem, setMensagem] = useState('');

    // Função para atualizar os dados do formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função para enviar os dados ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem(''); // Resetar mensagem ao enviar

        try {
            const response = await fetch('http://127.0.0.1:5000/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMensagem('Profissional cadastrado com sucesso!');
                setFormData({ nome: '', idade: '', email: '', telefone: '', especialidade: '', registroProfissional: '' });
            } else {
                setMensagem('Erro ao cadastrar o profissional.');
            }
        } catch (error) {
            setMensagem('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className="flex-grow-1 p-5">
            <div className="w-50">
                <h2 className="text-center text-success mb-4">Cadastro do Profissional</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome Completo</label>
                        <input
                            type="text"
                            name="nome"
                            className="form-control"
                            placeholder="Digite o nome do paciente"
                            value={formData.nome}
                            onChange={handleChange}
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
                            value={formData.cpf}
                            onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Digite o e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            className="form-control"
                            placeholder="Digite o numero do seu telefone"
                            value={formData.telefone}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Especialidade</label>
                        <input
                            type="text"
                            name="especialidade"
                            className="form-control"
                            placeholder="Digite a sua especialidade"
                            value={formData.especialidade}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registro Profissional</label>
                        <input
                            type="text"
                            name="registroProfissional"
                            className="form-control"
                            placeholder="Digite o seu Registro Profissional"
                            value={formData.registroProfissional}
                            onChange={handleChange} required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Cadastrar</button>
                </form>
                {mensagem && <p className="mt-3 alert alert-info">{mensagem}</p>}
            </div>
        </div>
    );
};

export default CadastroProfissional;