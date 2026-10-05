/* ================================
   PRODUTOS
================================ */

const produtos = [
    { nome: "Café moído na hora", categoria: "mercearia", descricao: "Café puro do grão, moído na hora.", preco: 15.90, imagem: "imagem/cafe.jpg" },
    { nome: "Carne alcatra", categoria: "ofertas", descricao: "Oferta da semana: carne alcatra fresca, preço por kg.", preco: 49.90, imagem: "imagem/carne.jpg" },
    { nome: "Goiaba fresca", categoria: "novidades", descricao: "Novidade do Baratão: goiaba fresca, preço por kg.", preco: 8.90, imagem: "imagem/goiaba.jpg" },
    { nome: "Arroz", categoria: "mercearia", descricao: "Arroz para o dia a dia.", preco: 25.90, imagem: "imagem/arroz.jpg" },
    { nome: "Feijão", categoria: "mercearia", descricao: "Feijão para suas refeições.", preco: 8.90, imagem: "imagem/feijao.jpg" },
    { nome: "Macarrão", categoria: "mercearia", descricao: "Macarrão para preparar suas refeições.", preco: 5.90, imagem: "imagem/macarrao.jpg" },
    { nome: "Açúcar", categoria: "mercearia", descricao: "Açúcar para sua casa.", preco: 4.99, imagem: "imagem/acucar.jpg" },
    { nome: "Leite", categoria: "bebidas", descricao: "Leite para o café da manhã.", preco: 5.49, imagem: "imagem/leite.jpg" },
    { nome: "Refrigerante", categoria: "bebidas", descricao: "Refrigerante gelado para acompanhar suas refeições.", preco: 8.99, imagem: "imagem/refrigerante.jpg" },
    { nome: "Suco", categoria: "bebidas", descricao: "Suco para refrescar o seu dia.", preco: 6.99, imagem: "imagem/suco.jpg" },
    { nome: "Água mineral", categoria: "bebidas", descricao: "Água mineral para o seu dia.", preco: 2.99, imagem: "imagem/agua.jpg" },
    { nome: "Biscoito", categoria: "mercearia", descricao: "Biscoito para o café ou lanche.", preco: 4.50, imagem: "imagem/biscoito.jpg" },
    { nome: "Sabonete", categoria: "higiene", descricao: "Sabonete para higiene pessoal.", preco: 2.99, imagem: "imagem/sabonete.jpg" },
    { nome: "Shampoo", categoria: "higiene", descricao: "Shampoo para cuidados com os cabelos.", preco: 12.90, imagem: "imagem/shampoo.jpg" },
    { nome: "Creme dental", categoria: "higiene", descricao: "Creme dental para higiene bucal.", preco: 6.90, imagem: "imagem/creme_dental.jpg" },
    { nome: "Detergente", categoria: "limpeza", descricao: "Detergente para limpeza da sua casa.", preco: 3.49, imagem: "imagem/detergente.jpg" },
    { nome: "Sabão em pó", categoria: "limpeza", descricao: "Sabão em pó para lavar suas roupas.", preco: 14.90, imagem: "imagem/sabao_em_po.jpg" },
    { nome: "Papel higiênico", categoria: "higiene", descricao: "Papel higiênico para sua casa.", preco: 9.90, imagem: "imagem/papel_higienico.jpg" },
    { nome: "Óleo de cozinha", categoria: "mercearia", descricao: "Óleo para preparar suas refeições.", preco: 7.90, imagem: "imagem/oleo_de_cozinha.jpg" },
    { nome: "Farinha de trigo", categoria: "mercearia", descricao: "Farinha de trigo para suas receitas.", preco: 5.99, imagem: "imagem/farinha_de_trigo.jpg" },
    { nome: "Molho de tomate", categoria: "mercearia", descricao: "Molho de tomate para suas refeições.", preco: 3.99, imagem: "imagem/molho_de_tomate.jpg" }
];


/* ================================
   ELEMENTOS DA PÁGINA
================================ */

const listaProdutos = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("campoPesquisa");
const botaoCarrinho = document.querySelector(".carrinho");
const contadorCarrinho = document.querySelector(".carrinho span");
const links = document.querySelectorAll(".categorias a");


/* ================================
   ESTADO
================================ */

let carrinho = [];
let categoriaAtual = "todos";


/* ================================
   FORMATAR PREÇO
================================ */

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}


/* ================================
   MOSTRAR PRODUTOS NA TELA
   (aplica busca + categoria juntas)
================================ */

function mostrarProdutos() {

    const texto = campoPesquisa.value.toLowerCase().trim();

    const lista = produtos
        .map((produto, indice) => ({ produto, indice }))
        .filter(({ produto }) =>
            (categoriaAtual === "todos" || produto.categoria === categoriaAtual) &&
            (
                produto.nome.toLowerCase().includes(texto) ||
                produto.descricao.toLowerCase().includes(texto)
            )
        );

    if (lista.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    // Se alguma imagem não existir, mostra a imagem padrão no lugar
    listaProdutos.innerHTML = lista.map(({ produto, indice }) => `
        <article class="produto">
            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                onerror="this.onerror=null; this.src='imagens/image(1).jpg';"
            >
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <strong>${formatarPreco(produto.preco)}</strong>
            <button type="button" data-indice="${indice}">
                Adicionar
            </button>
        </article>
    `).join("");
}


/* ================================
   PESQUISA
================================ */

campoPesquisa.addEventListener("input", mostrarProdutos);


/* ================================
   FILTRO POR CATEGORIA
================================ */

links.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        categoriaAtual = link.textContent.toLowerCase().trim();

        links.forEach(l => l.classList.remove("ativa"));
        link.classList.add("ativa");

        mostrarProdutos();

    });

});


/* ================================
   CARRINHO
================================ */

function atualizarContador() {
    contadorCarrinho.textContent = carrinho.length;
}

listaProdutos.addEventListener("click", function (event) {

    const botao = event.target.closest("button[data-indice]");

    if (!botao) return;

    carrinho.push(produtos[botao.dataset.indice]);

    atualizarContador();

    botao.textContent = "Adicionado ✓";

    setTimeout(function () {
        botao.textContent = "Adicionar";
    }, 1000);

});

botaoCarrinho.addEventListener("click", function () {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const total = carrinho.reduce((soma, p) => soma + p.preco, 0);

    const resumo = carrinho
        .map(p => `• ${p.nome} - ${formatarPreco(p.preco)}`)
        .join("\n");

    alert(`Seu carrinho:\n\n${resumo}\n\nTotal: ${formatarPreco(total)}`);

});


/* ================================
   ROLAGEM SUAVE
   (ignora os links de categoria)
================================ */

document.querySelectorAll('a[href^="#"]:not(.categorias a)').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            event.preventDefault();
            destino.scrollIntoView({ behavior: "smooth" });
        }

    });

});


/* ================================
   ANO AUTOMÁTICO
================================ */

const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.innerHTML = `&copy; ${new Date().getFullYear()} Baratão de Vilatur`;
}


/* ================================
   LOGIN
================================ */

const botaoEntrar = document.getElementById("botaoEntrar");
const modalLogin = document.getElementById("modalLogin");
const fecharLogin = document.getElementById("fecharLogin");
const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

botaoEntrar.addEventListener("click", function () {
    modalLogin.style.display = "flex";
});

fecharLogin.addEventListener("click", function () {
    modalLogin.style.display = "none";
});

// Fecha ao clicar fora da caixa
modalLogin.addEventListener("click", function (event) {
    if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
});

// Fecha com a tecla ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        modalLogin.style.display = "none";
    }
});

formLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    // Demonstração: ainda não existe servidor para validar a senha
    mensagemLogin.style.color = "green";
    mensagemLogin.textContent = `Bem-vindo, ${email}!`;

    setTimeout(function () {
        modalLogin.style.display = "none";
        mensagemLogin.textContent = "";
        formLogin.reset();
    }, 1500);

});


/* ================================
   INICIAR
================================ */

links[0].classList.add("ativa");

mostrarProdutos();

console.log("Baratão de Vilatur carregado com sucesso!");
