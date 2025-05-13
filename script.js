// -------------------- Dados e Estado --------------------
let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
let partidas = JSON.parse(localStorage.getItem('partidas')) || [];

// -------------------- Funções de Utilidade --------------------
function salvarDados() {
  localStorage.setItem('jogadores', JSON.stringify(jogadores));
  localStorage.setItem('partidas', JSON.stringify(partidas));
}

function atualizarSelecaoJogadores() {
  const select = document.getElementById('jogadorSelecionado');
  select.innerHTML = '';

  jogadores.forEach((jogador, index) => {
    const option = document.createElement('option');
    option.value = jogador.id;
    option.textContent = jogador.nome;
    select.appendChild(option);
  });
}

function atualizarListaJogadores() {
  const div = document.getElementById('listaJogadores');
  div.innerHTML = '<h3>Jogadores Cadastrados:</h3>';
  jogadores.forEach(j => {
    div.innerHTML += `<p>🧑 ${j.nome} | ${j.idade} anos | Turma: ${j.turma}</p>`;
  });
}

function atualizarListaPartidas() {
  const div = document.getElementById('listaPartidas');
  div.innerHTML = '<h3>Partidas Registradas:</h3>';
  partidas.forEach(p => {
    const jogador = jogadores.find(j => j.id === p.idJogador);
    if (jogador) {
      div.innerHTML += `<p>🎯 ${jogador.nome} - ${p.pontos} pontos em ${p.data}</p>`;
    }
  });
}

function calcularRanking() {
  const ranking = jogadores.map(j => {
    const partidasDoJogador = partidas.filter(p => p.idJogador === j.id);
    const totalPontos = partidasDoJogador.reduce((soma, p) => soma + p.pontos, 0);
    return {
      nome: j.nome,
      turma: j.turma,
      pontos: totalPontos,
      partidas: partidasDoJogador.length
    };
  });

  return ranking.sort((a, b) => b.pontos - a.pontos);
}

function atualizarTabelaRanking() {
  const tbody = document.getElementById('tabelaRanking');
  tbody.innerHTML = '';

  const ranking = calcularRanking();

  ranking.forEach((jogador, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}º</td>
      <td>${jogador.nome}</td>
      <td>${jogador.turma}</td>
      <td>${jogador.pontos}</td>
      <td>${jogador.partidas}</td>
    `;
    tbody.appendChild(tr);
  });
}

function gerarID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// -------------------- Eventos: Cadastro de Jogador --------------------
document.getElementById('formCadastroJogador').addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nomeJogador').value.trim();
  const idade = parseInt(document.getElementById('idadeJogador').value);
  const turma = document.getElementById('turmaJogador').value.trim();

  if (!nome || !idade || !turma) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const novoJogador = {
    id: gerarID(),
    nome,
    idade,
    turma
  };

  jogadores.push(novoJogador);
  salvarDados();

  document.getElementById('formCadastroJogador').reset();
  atualizarSelecaoJogadores();
  atualizarListaJogadores();
  atualizarTabelaRanking();
});

// -------------------- Eventos: Registro de Partida --------------------
document.getElementById('formRegistroPartida').addEventListener('submit', (e) => {
  e.preventDefault();

  const idJogador = document.getElementById('jogadorSelecionado').value;
  const pontos = parseInt(document.getElementById('pontos').value);
  const data = document.getElementById('dataPartida').value;

  if (!idJogador || isNaN(pontos) || !data) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const novaPartida = {
    idJogador,
    pontos,
    data
  };

  partidas.push(novaPartida);
  salvarDados();

  document.getElementById('formRegistroPartida').reset();
  atualizarListaPartidas();
  atualizarTabelaRanking();
});

// -------------------- Navegação entre seções --------------------
function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(secao => {
    secao.classList.remove('ativa');
  });
  document.getElementById(id).classList.add('ativa');
}

// -------------------- Inicialização --------------------
document.addEventListener('DOMContentLoaded', () => {
  atualizarSelecaoJogadores();
  atualizarListaJogadores();
  atualizarListaPartidas();
  atualizarTabelaRanking();
});
