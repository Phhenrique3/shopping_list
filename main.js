let listaDeItens = []; // Array que armazena os itens adicionados
let itemAEditar = -1; // Índice do item que está sendo editado

// Referência ao formulário HTML com o ID "form-itens"
const form = document.getElementById("form-itens");

// Referência ao campo de entrada de texto HTML com o ID "receber-item"
const itensInput = document.getElementById("receber-item");

// Referência ao elemento <ul> HTML com o ID "lista-de-itens"
const ulitens = document.getElementById("lista-de-itens");

// Referência ao elemento <ul> HTML com o ID "itens-comprados"
const ulItensComprados = document.getElementById("itens-comprados");

// Recupera a lista de itens do localStorage
const listaRecuperada = localStorage.getItem("listaDeItens");

// Função para atualizar o localStorage com a lista de itens atualizada
function atualizarLocalStorage() {
  localStorage.setItem("listaDeItens", JSON.stringify(listaDeItens));
}

// Verifica se há uma lista de itens salva no localStorage
if (listaRecuperada) {
  listaDeItens = JSON.parse(listaRecuperada); // Converte a string JSON em um array
  mostraItem(); // Exibe os itens recuperados
} else {
  listaDeItens = []; // Inicializa a lista de itens como um array vazio
}

// Adiciona um ouvinte de evento ao formulário que intercepta o evento de envio (submit)
form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Previne o comportamento padrão de envio do formulário
  salvarItem(); // Chama a função para salvar o item
  mostraItem(); // Chama a função para exibir os itens atualizados
});

// Função responsável por salvar um novo item na lista de compras
function salvarItem() {
  const compraItem = itensInput.value; // Obtém o valor do item a partir do campo de entrada

  // Verifica se o item já existe na lista comparando os valores em maiúsculas
  const ValidarIten = listaDeItens.find(
    (elemento) => elemento.valor.toUpperCase() === compraItem.toUpperCase()
  );

  if (ValidarIten) {
    // Se o item já existir, exibe um alerta informando que o item já foi cadastrado
    alert(`O item "${ValidarIten.valor}" já foi cadastrado.`);
  } else {
    // Se o item não existir, adiciona o novo item ao array listaDeItens
    listaDeItens.push({
      valor: compraItem,
      checar: false,
    });
  }

  itensInput.value = ""; // Limpa o campo de entrada
  console.log(listaDeItens); // Exibe o conteúdo atualizado de listaDeItens no console
}

// Função responsável por exibir os itens da lista de compras na interface do usuário
function mostraItem() {
  ulitens.innerHTML = ""; // Limpa o conteúdo atual do elemento <ul> "lista-de-itens"
  ulItensComprados.innerHTML = ""; // Limpa o conteúdo atual do elemento <ul> "itens-comprados"

  // Itera sobre cada item na lista de itens
  listaDeItens.forEach((elemento, index) => {
    if (elemento.checar) {
      // Adiciona um novo item <li> ao elemento <ul> "itens-comprados" com os detalhes do item de compra
      ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" checked class="is-clickable" />
            <input type="text" class="is-size-5" style="text-decoration: line-through;" value="${elemento.valor}"></input>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    } else {
      // Adiciona um novo item <li> ao elemento <ul> "lista-de-itens" com os detalhes do item de compra
      ulitens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" style="color: red;" value="${elemento.valor}" ${index !== Number(itemAEditar) ? "disabled" : ""}></input>
          </div>
          <div>
            ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    }
  });

  // Seleciona todos os checkboxes dos itens de compra
  const inuptCheck = document.querySelectorAll('input[type="checkbox"]');

  // Adiciona um ouvinte de evento de clique a cada checkbox
  inuptCheck.forEach((i) => {
    i.addEventListener("click", (evento) => {
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens[valorDoElemento].checar = evento.target.checked; // Atualiza a propriedade "checar" do item correspondente
      console.log(listaDeItens[valorDoElemento].checar); // Exibe o estado atualizado do item no console
      mostraItem(); // Atualiza a lista exibida
    });
  });

  // Seleciona todos os ícones de lixeira para deletar itens
  const deletarObjetos = document.querySelectorAll(".deletar");

  // Adiciona um ouvinte de evento de clique a cada ícone de lixeira
  deletarObjetos.forEach((i) => {
    i.addEventListener("click", (evento) => {
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens.splice(valorDoElemento, 1); // Remove o item da lista
      mostraItem(); // Atualiza a lista exibida
    });
  });

  // Seleciona todos os ícones de edição para editar itens
  const editarItens = document.querySelectorAll(".editar");

  // Adiciona um ouvinte de evento de clique a cada ícone de edição
  editarItens.forEach((i) => {
    i.addEventListener("click", (evento) => {
      itemAEditar = evento.target.parentElement.parentElement.getAttribute("data-value");
      mostraItem(); // Atualiza a lista exibida para permitir a edição
      console.log(itemAEditar); // Exibe o índice do item a ser editado no console
    });
  });

  atualizarLocalStorage(); // Atualiza o localStorage com a lista de itens atualizada
}

// Função responsável por salvar a edição de um item na lista de compras
function salvarEdicao() {
  const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
  listaDeItens[itemAEditar].valor = itemEditado.value; // Atualiza o valor do item editado
  console.log(listaDeItens); // Exibe a lista de itens atualizada no console
  itemAEditar = -1; // Reseta o índice do item a ser editado
  mostraItem(); // Atualiza a lista exibida
}