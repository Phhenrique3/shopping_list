let listaDeItens = [];

// Referência ao formulário HTML com o ID "form-itens"
const form = document.getElementById("form-itens");

// Referência ao campo de entrada de texto HTML com o ID "receber-item"
const itensInput = document.getElementById("receber-item");

const ulitens = document.getElementById("lista-de-itens");

// Adiciona um ouvinte de evento ao formulário que intercepta o evento de envio (submit)
form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Previne o comportamento padrão de envio do formulário
  salvarItem(); // Chama a função para salvar o item
  mostraItem();
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
    });
  }

  console.log(listaDeItens); // Exibe o conteúdo atualizado de listaDeItens no console
}

function mostraItem() {
  ulitens.innerHTML = "";
  listaDeItens.forEach((elemento, index) => {
    ulitens.innerHTML += `   
    
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
  });
}
