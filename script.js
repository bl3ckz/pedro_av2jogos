// Array para armazenar jogadores simulando objetos de classe Python
let jogadores = [];

// Função construtora simulando a classe Python
function Jogador(nome, idade, modalidade) {
    this.nome = nome;
    this.idade = idade;
    this.modalidade = modalidade;
    this.pontuacao = 0;

    // Método verificarNivel simulando o da POO Python
    this.verificarNivel = function() {
        if (this.pontuacao >= 50) return "Avançado";
        else if (this.pontuacao >= 20) return "Intermediário";
        else return "Iniciante";
    }
}

// Função para adicionar novo jogador
document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("nomeJogador").value;
    const idade = parseInt(document.getElementById("idadeJogador").value);
    const modalidade = document.getElementById("modalidadeJogador").value;

    const novoJogador = new Jogador(nome, idade, modalidade);
    jogadores.push(novoJogador);
    alert("Jogador cadastrado com sucesso!");

    this.reset();
    atualizarRanking();
});

// Função para registrar partida e adicionar pontos
document.getElementById("formPartida").addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("nomePartida").value;
    const pontos = parseInt(document.getElementById("pontosPartida").value);

    const jogador = jogadores.find(j => j.nome === nome);
    if (jogador) {
        jogador.pontuacao += pontos;
        alert(`Pontuação adicionada para ${jogador.nome}.`);
    } else {
        alert("Jogador não encontrado.");
    }

    this.reset();
    atualizarRanking();
});

// Função para atualizar o ranking na tela
function atualizarRanking() {
    const tabela = document.getElementById("rankingTable");
    tabela.innerHTML = ""; // Limpa a tabela antes de preencher

    // Ordena jogadores por pontuação decrescente
    const rankingOrdenado = jogadores.sort((a, b) => b.pontuacao - a.pontuacao);

    rankingOrdenado.forEach((jogador, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.modalidade}</td>
            <td>${jogador.pontuacao} (${jogador.verificarNivel()})</td>
            <td><button onclick="excluirJogador('${jogador.nome}')">Excluir</button></td>
        `;

        tabela.appendChild(linha);
    });
}

// Função para excluir jogador pelo nome
function excluirJogador(nome) {
    if (confirm(`Deseja excluir o jogador ${nome}?`)) {
        jogadores = jogadores.filter(j => j.nome !== nome);
        atualizarRanking();
    }
}
