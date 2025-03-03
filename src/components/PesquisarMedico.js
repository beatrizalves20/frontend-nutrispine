import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PesquisarMedico = () => {
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
  });

  const [resultado, setResultado] = useState([]);
  const [mensagem, setMensagem] = useState("");

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar a busca ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await fetch("http://127.0.0.1:5000/pesquisar-medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResultado(data.medicos);
        if (data.medicos.length === 0) {
          setMensagem("Nenhum médico encontrado.");
        }
      } else {
        setMensagem("Erro ao buscar médicos.");
      }
    } catch (error) {
      setMensagem("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div  className="flex-grow-1 p-5">
      <h2 className="text-center text-success mb-4">Pesquisar por Médico</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Nome do Médico:</label>
          <input type="text" name="nome" className="form-control" value={formData.nome} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Especialidade:</label>
          <input type="text" name="especialidade" className="form-control" value={formData.especialidade} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success w-100">Pesquisar</button>
      </form>

      {mensagem && <p className="mt-3 alert alert-info">{mensagem}</p>}

      {resultado.length > 0 && (
        <div className="mt-4">
          <h4>Resultados:</h4>
          <ul className="list-group">
            {resultado.map((medico, index) => (
              <li key={index} className="list-group-item">
                {medico.nome} - {medico.especialidade}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PesquisarMedico;
