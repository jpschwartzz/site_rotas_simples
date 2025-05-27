// Classe que representa o multigrafo (várias arestas entre dois nós possíveis)
class Multigrafo {
  constructor() {
    // Inicializa um objeto onde cada chave será uma cidade e o valor será um array de rotas
    this.grafo = {};
  }

  // Adiciona uma nova cidade ao grafo, caso ainda não exista
  adicionarCidade(cidade) {
    if (!this.grafo[cidade]) {
      this.grafo[cidade] = []; // Cria uma nova lista de rotas para a cidade
    }
  }

  // Adiciona uma nova rota entre duas cidades
  adicionarRota(origem, destino, companhia, horario, preco) {
    const rota = { destino, companhia, horario, preco }; // Cria um objeto rota com os dados fornecidos
    if (!this.grafo[origem]) {
      this.adicionarCidade(origem); // Se a cidade de origem não existe, adiciona ao grafo
    }
    this.grafo[origem].push(rota); // Adiciona a nova rota na lista da cidade de origem
  }

  // Gera uma string formatada com todas as rotas cadastradas
  getRotas() {
    let resultado = "";
    for (const origem in this.grafo) {
      resultado += `\nRotas a partir de ${origem}:\n`; // Adiciona o cabeçalho da cidade atual
      this.grafo[origem].forEach((rota, index) => {
        // Adiciona uma linha para cada rota da cidade com todos os detalhes
        resultado += `  ${index + 1}. Para ${rota.destino} com ${
          rota.companhia
        } às ${rota.horario} - R$${rota.preco}\n`;
      });
    }
    return resultado; // Retorna o texto com todas as rotas
  }
}

// Cria uma instância da classe Multigrafo
const multigrafo = new Multigrafo();

// Função chamada ao clicar no botão "Adicionar Cidade"
function adicionarCidade() {
  const cidade = document.getElementById("cidadeInput").value; // Captura o valor digitado no campo de cidade
  if (cidade) {
    multigrafo.adicionarCidade(cidade); // Adiciona a cidade ao grafo
    alert(`Cidade "${cidade}" adicionada!`); // Mostra confirmação ao usuário
    document.getElementById("cidadeInput").value = ""; // Limpa o campo de entrada
  }
}

// Função chamada ao clicar no botão "Adicionar Rota"
function adicionarRota() {
  // Captura os dados dos campos de entrada
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;
  const companhia = document.getElementById("companhia").value;
  const horario = document.getElementById("horario").value;
  const preco = parseFloat(document.getElementById("preco").value); // Converte o preço de string para número

  // Verifica se todos os campos foram preenchidos corretamente
  if (origem && destino && companhia && horario && !isNaN(preco)) {
    multigrafo.adicionarRota(origem, destino, companhia, horario, preco); // Adiciona a nova rota
    alert("Rota adicionada com sucesso!"); // Mostra confirmação
    // Limpa todos os campos após o cadastro da rota
    document.getElementById("origem").value = "";
    document.getElementById("destino").value = "";
    document.getElementById("companhia").value = "";
    document.getElementById("horario").value = "";
    document.getElementById("preco").value = ""; // Limpa o campo de preço
  }
}

// Função que exibe todas as rotas cadastradas
function mostrarRotas() {
  // Define o conteúdo do <pre id="output"> como o retorno da função getRotas()
  document.getElementById("output").textContent = multigrafo.getRotas();
}
