import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProntuarioEletronico = () => {
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        patient_name: "",
        diagnosis: "",
        treatment: "",
        recommendation: "",
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    // Buscar prontuários da API
    const fetchRecords = async () => {
        const response = await axios.get("http://127.0.0.1:5000/records");
        setRecords(response.data);
    };

    // Atualizar valores do formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Enviar prontuário para a API
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:5000/records", formData);
        fetchRecords();
        setFormData({ patient_name: "", diagnosis: "", treatment: "", recommendation: "" });
    };

    return (
        <div className="flex-grow-1 p-5">
            <h2 className="text-center text-success mb-4">Prontuário Eletrônico</h2>

            {/* Formulário para adicionar prontuário */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Nome do Paciente</label>
                    <input type="text" className="form-control" name="patient_name" value={formData.patient_name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Diagnóstico</label>
                    <textarea className="form-control" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tratamento</label>
                    <textarea className="form-control" name="treatment" value={formData.treatment} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Recomendações</label>
                    <textarea className="form-control" name="recommendation" value={formData.recommendation} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-3">Salvar Prontuário</button>
            </form>

            {/* Lista de prontuários cadastrados */}
            <h3 className="text-center text-success mb-4">Histórico de Prontuários</h3>
            <ul className="list-group">
                {records.map((record) => (
                    <li key={record.id} className="list-group-item">
                        <strong>{record.patient_name}</strong> <br />
                        <small>Diagnóstico: {record.diagnosis}</small><br />
                        <small>Tratamento: {record.treatment}</small><br />
                        <small>Recomendações: {record.recommendation}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProntuarioEletronico;
