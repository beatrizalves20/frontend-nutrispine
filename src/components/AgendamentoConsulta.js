import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AgendamentoConsulta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [consultas, setConsultas] = useState([]);

  // Função para carregar as consultas do backend
  const carregarConsultas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/consultas/");
      setConsultas(response.data);
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
      alert("Erro ao carregar as consultas.");
    }
  };

  // Executa uma vez ao montar o componente
  useEffect(() => {
    carregarConsultas();
  }, []);

  // Função para agendar uma nova consulta
  const agendarConsulta = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/agendar/", {
        nome,
        email,
        data,
        horario,
      });
      alert("Consulta agendada com sucesso!");
      // Limpa os campos e recarrega as consultas
      setNome("");
      setEmail("");
      setData("");
      setHorario("");
      carregarConsultas();
    } catch (error) {
      console.error("Erro ao agendar consulta:", error);
      alert("Erro ao agendar a consulta.");
    }
  };

  // Função para cancelar uma consulta por ID
  const cancelarConsulta = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cancelar/${id}/`);
      alert("Consulta cancelada!");
      carregarConsultas();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      alert("Erro ao cancelar a consulta.");
    }
  };

  return (
    <Container className="flex-grow-1 p-5">
       <h2 className="text-center text-success mb-4">Agendamento de Consultas</h2>

      {/* Formulário de Agendamento */}
      <Form onSubmit={agendarConsulta} className="mt-4">
        <Form.Group>
          <Form.Label>Nome do Paciente:</Form.Label>
          <Form.Control value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Data:</Form.Label>
          <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Horário:</Form.Label>
          <Form.Control type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
        </Form.Group>

        <button type="submit" className="btn btn-success w-100 mt-3">
          Agenda
        </button>
      </Form>

      {/* Lista de Consultas */}
      <h4 className="mt-5">Consultas Agendadas</h4>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Email</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.id}</td>
              <td>{consulta.nome}</td>
              <td>{consulta.email}</td>
              <td>{consulta.data}</td>
              <td>{consulta.horario}</td>
              <td>
                <Button variant="danger" onClick={() => cancelarConsulta(consulta.id)}>
                  Cancelar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AgendamentoConsulta;
