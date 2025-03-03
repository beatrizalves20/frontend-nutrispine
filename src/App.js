import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CadastroPaciente from './components/CadastroPaciente'
import CadastroProfissional from './components/CadastroProfissional'
import AgendamentoConsulta from './components/AgendamentoConsulta'
import ProntuarioEletronico from './components/ProntuarioEletronico'
import PagamentoOnline from './components/PagamentoOnline'
import ContatoSuporte from './components/ContatoSuporte'
import PlanoTratamento from './components/PlanoTratamentos'
import  PesquisarMedico from './components/PesquisarMedico'

import 'bootstrap/dist/css/bootstrap.min.css';



const Navbar = () => (
  <div className="bg-success text-white p-4" style={{ width: '250px' }}>
    <h2 className="mb-4">NutriSpine</h2>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <Link to="/cadastro-paciente" className="nav-link text-white">Cadastro de Paciente</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/cadastro-profissional" className="nav-link text-white">Cadastro de Profissional</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/agendamento" className="nav-link text-white">Agendamento de Consulta</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/prontuario-eletronico" className="nav-link text-white">Prontuario Eletronico</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/pagamento-online" className="nav-link text-white">Pagamento Online</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/contato-suporte" className="nav-link text-white">Contato para Suporte</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/plano-tratamento" className="nav-link text-white">Plano de Tratamento</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/pesquisar-medico" className="nav-link text-white"> Pesquisar por Medico</Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link text-white">Login</Link>
      </li>
    </ul>
  </div>
);

const Login = () => (
  <div className="flex-grow-1 d-flex justify-content-center align-items-center">
    <div className="w-50">
      <h2 className="text-center text-success mb-4">Login</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" placeholder="Digite seu e-mail" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" placeholder="Digite sua senha" />
        </div>
        <button type="submit" className="btn btn-success w-100">Entrar</button>
      </form>
    </div>
  </div>
);


const App = () => {
  return (
    <Router>
      <div className="d-flex vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
          <Route path="/cadastro-profissional" element={<CadastroProfissional />} />
          <Route path="/agendamento" element={<AgendamentoConsulta />} />
          <Route path="/prontuario-eletronico" element={<ProntuarioEletronico/>}/>
          <Route path="/pagamento-online" element={<PagamentoOnline/>}/>
          <Route path="/contato-suporte" element={<ContatoSuporte/>}/>
          <Route path="/plano-tratamento" element={<PlanoTratamento/>}/>
          <Route path="/pesquisar-medico" element={< PesquisarMedico/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
