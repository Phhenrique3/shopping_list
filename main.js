let listaDeItens = [];

const form = document.getElementById("form-itens");
const intensInput = document.getElementById("receber-item");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  salvarItem();
});

function salvarItem() {
  const compraItem = intensInput.value;
  const ValidarIten = listaDeItens.find(
    (elemento) => elemento.valor.toUpperCase === compraItem.toUpperCase
  );

  if (ValidarIten) {
    alert(`O item "${ValidarIten.valor}" já foi cadastrado.`);
  } else {
    listaDeItens.push({
      valor: compraItem,
    });
  }

  console.log(listaDeItens);
}
