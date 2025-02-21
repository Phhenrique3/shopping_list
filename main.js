let listaDeItens = [];
let itemAEditar;

// Referência ao formulário HTML com o ID "form-itens"
const form = document.getElementById("form-itens");

// Referência ao campo de entrada de texto HTML com o ID "receber-item"
const itensInput = document.getElementById("receber-item");

// Referência ao elemento <ul> HTML com o ID "lista-de-itens"
const ulitens = document.getElementById("lista-de-itens");

// Referência ao elemento <ul> HTML com o ID "itens-comprados"
const ulItensComprados = document.getElementById("itens-comprados");

const listaRecuperada = localStorage.getItem("listaDeItens")




function atualizarLocalStorage() {
  localStorage.setItem("listaDeItens", JSON.stringify(listaDeItens));
}

if(listaRecuperada){
    listaDeItens = JSON.parse(listaRecuperada)
    mostraItem()
}else{
  listaDeItens = []
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
            <input type="text" class="is-size-5" style="color: red;" value="${
              elemento.valor
            }"${index !== Number(itemAEditar) ? "disabled" : ""} ></input>
          </div>
          <div>
          ${
            index === Number(itemAEditar)
              ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
              : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
          }
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
      const valorDoElemento =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens[valorDoElemento].checar = evento.target.checked; // Atualiza a propriedade "checar" do item correspondente
      console.log(listaDeItens[valorDoElemento].checar); // Exibe o estado atualizado do item no console
      mostraItem(); // Atualiza a lista exibida
    });
  });

  const deletarObjetos = document.querySelectorAll(".deletar");

  deletarObjetos.forEach((i) => {
    i.addEventListener("click", (evento) => {
      const valorDoElemento =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens[valorDoElemento].checar = evento.target.checked;
      listaDeItens.splice(valorDoElemento, 1);
      mostraItem();
    });
  });

  const editarItens = document.querySelectorAll(".editar");

  editarItens.forEach((i) => {
    i.addEventListener("click", (evento) => {
      itemAEditar =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      mostraItem();
      console.log(itemAEditar);
    });
  });

  atualizarLocalStorage()

}


function salvarEdicao() {
  const itemEditado = document.querySelector(
    `[data-value="${itemAEditar}"] input[type="text"]`
  );
  listaDeItens[itemAEditar].valor = itemEditado.value;
  console.log(listaDeItens);
  itemAEditar = -1;
  mostraItem();

}
