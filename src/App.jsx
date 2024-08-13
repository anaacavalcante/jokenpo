
import './App.css'

import pedra from './assets/moves/pedra.png'
import papel from './assets/moves/papel.png'
import tesoura from './assets/moves/tesoura.png'
import { useState } from 'react'

function App() {
  const [vencedor, setVencedor] = useState('');
  const [escolhaJogador, setEscolhaJogador] = useState(null);
  const [escolhaComputador, setEscolhaComputador] = useState(null);
  const [placarJogador, setPlacarJogador] = useState(0);
  const [placarComputador, setPlacarComputador] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [jogoEncerrado, setJogoEncerrado] = useState(false);

  const movimentosPossiveis = [
    {
      tipo: 'papel',
      rotulo: 'Papel',
      img: papel,
      ganhaDe: 'pedra',
      perdePara: 'tesoura'
    },
    {
      tipo: 'pedra',
      rotulo: 'Pedra',
      img: pedra,
      ganhaDe: 'tesoura',
      perdePara: 'papel'
    },
    {
      tipo: 'tesoura',
      rotulo: 'Tesoura',
      img: tesoura,
      ganhaDe: 'papel',
      perdePara: 'pedra'
    }
  ];

  const fazerJogada = (jogadaJogador) => {
    if (jogoEncerrado) return;

    const jogadaComputador = movimentosPossiveis[Math.floor(Math.random() * movimentosPossiveis.length)];
    setEscolhaJogador(jogadaJogador);
    setEscolhaComputador(jogadaComputador.tipo);

    if (jogadaComputador.tipo === jogadaJogador) {
      setVencedor('Empate');
      setEmpates(empates + 1);
      return;
    }

    const jogadaJogadorValida = movimentosPossiveis.find(jogada => jogada.tipo === jogadaJogador);
    const jogadorGanhou = jogadaJogadorValida.ganhaDe === jogadaComputador.tipo;

    if (jogadorGanhou) {
      setVencedor('Jogador');
      setPlacarJogador(placarJogador + 1);
    } else {
      setVencedor('Computador');
      setPlacarComputador(placarComputador + 1);
    }
  };

  const encerrarJogo = () => {
    setJogoEncerrado(true);
  };

  const jogarNovamente = () => {
    setVencedor('');
    setEscolhaJogador(null);
    setEscolhaComputador(null);
    setJogoEncerrado(false);
    setPlacarJogador(0);
    setPlacarComputador(0);
    setEmpates(0);
  };

  // Determina o vencedor final com base no placar
  const determinarVencedorFinal = () => {
    if (placarJogador > placarComputador) return 'Jogador';
    if (placarComputador > placarJogador) return 'Computador';
    return 'Empate';
  };

  return (
    <div className="app">
      <h1>Jogo de Pedra, Papel e Tesoura</h1>

<div className={`placar ${jogoEncerrado ? 'placar-encerrado' : ''}`}>
  <p>Jogador: {placarJogador}</p>
  <p>Computador: {placarComputador}</p>
  <p>Empates: {empates}</p>
</div>

      {!jogoEncerrado && vencedor && (
        <div className="resultado">
          <div className="escolhas">
            {escolhaJogador && (
              <div className="movimento">
                <h2>Você:</h2>
                <img src={movimentosPossiveis.find(m => m.tipo === escolhaJogador)?.img} alt={escolhaJogador} />
              </div>
            )}
            
            {escolhaComputador && (
              <div className="movimento">
                <h2>Computador:</h2>
                <img src={movimentosPossiveis.find(m => m.tipo === escolhaComputador)?.img} alt={escolhaComputador} />
              </div>
            )}
          </div>
          <h2 style={{ color: vencedor === 'Jogador' ? 'green' : vencedor === 'Computador' ? 'red' : 'black' }}>
            Resultado: {vencedor === 'Jogador' ? 'Você Ganhou!' : vencedor === 'Computador' ? 'Você Perdeu!' : 'Empate'}
          </h2>
        </div>
      )}

      {jogoEncerrado && (
        <div className="estatisticas">
          <h2>Estatísticas Finais</h2>
          <p>Jogador: {placarJogador}</p>
          <p>Computador: {placarComputador}</p>
          <p>Empates: {empates}</p>
          <h3>Resultado Final:</h3>
          <h2 style={{ color: determinarVencedorFinal() === 'Jogador' ? 'green' : determinarVencedorFinal() === 'Computador' ? 'red' : 'black' }}>
      {determinarVencedorFinal() === 'Jogador' ? 'Você Venceu!' : determinarVencedorFinal() === 'Computador' ? 'Você Perdeu!' : 'Empate'}
    </h2>
        </div>
      )}

      {!jogoEncerrado && (
        <div className="botoes">
          {movimentosPossiveis.map((movimento) => (
            <button key={movimento.tipo} onClick={() => fazerJogada(movimento.tipo)} disabled={jogoEncerrado}>
              <img src={movimento.img} alt={movimento.rotulo} />
              <span>{movimento.rotulo}</span>
            </button>
          ))}
        </div>
      )}

      <div className="controle">
        {jogoEncerrado ? (
          <button onClick={jogarNovamente} className="jogar-novamente">Jogar Novamente</button>
        ) : (
          <button onClick={encerrarJogo} disabled={jogoEncerrado}>Encerrar Jogo</button>
        )}
      </div>
    </div>
  );
}

export default App;