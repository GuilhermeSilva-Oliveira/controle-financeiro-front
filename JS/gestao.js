window.onload = async function () {
    const [renda, despesa, saldo] = await Promise.all([
        buscarRenda(),
        buscarDespesa(),
        buscarSaldo(),
        buscarRendas(),
        buscarDespesas(),
        buscarMovimentacoes()
    ]);

    destacarMesesPassados();
    preencherAnos();
    buscarNomeUsuario();
    preencherMovimentacoes();
    preencherRendas();
    preencherDespesas();
};

// ============= BUSCAR RENDA =============
async function buscarRenda() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/renda");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const renda = await response.json();

        document.getElementById("rendaMensal").textContent =
            renda.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        return renda;

    } catch (erro) {
        console.error("Erro ao buscar renda:", erro);
        return 0;
    }
}

// ============= BUSCAR DESPESA =============
async function buscarDespesa() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/despesa");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const despesa = await response.json();

        document.getElementById("despesaMensal").textContent =
            despesa.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        return despesa;

    } catch (erro) {
        console.error("Erro ao buscar despesa:", erro);
        return 0;
    }
}

// ============= BUSCAR SALDO =============
async function buscarSaldo() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/saldo");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const saldo = await response.json();

        document.getElementById("saldoAtual").textContent =
            saldo.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        return saldo;

    } catch (erro) {
        console.error("Erro ao buscar saldo:", erro);
        return 0;
    }
}

// ============= BUSCAR LISTA RENDAS =============
let listaRendas = [];

async function buscarRendas() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/lista/controle/rendas");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        listaRendas = await response.json();

        return listaRendas;

    } catch (erro) {
        console.error("Erro ao buscar lista de rendas:", erro);
        listaRendas = [];
        return [];
    }
}

// ============= BUSCAR NOME DO USUÁRIO =============
async function buscarNomeUsuario() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/usuario");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const nome = (await response.text()).trim();

        document.getElementById("usuarioName").textContent = nome;

        const iniciais = nome
            .split(/\s+/) // separa por espaços
            .filter(parte => parte.length > 0)
            .map(parte => parte[0].toUpperCase())
            .slice(0, 2) // pega apenas as duas primeiras iniciais
            .join("");

        document.getElementById("usuarioIcon").textContent = iniciais;
        return nome;

    } catch (erro) {
        console.error("Erro ao buscar nome do usuário:", erro);

        document.getElementById("usuarioName").textContent = "";
        document.getElementById("usuarioIcon").textContent = "";

        return "";
    }
}

// ============= CALENDÁRIO =============
function destacarMesesPassados() {

    // Janeiro = 0, Fevereiro = 1, ...
    const mesAtual = new Date().getMonth();

    const meses = document.querySelectorAll(".second .card");

    meses.forEach((card, index) => {

        if (index < mesAtual) {
            card.style.backgroundColor = "#e5d1a6";
            card.style.color = "#000";
        }
    });
}

function preencherAnos() {
    const anoAtual = new Date().getFullYear();
    document.querySelector(".first-line p").textContent = anoAtual - 1;
    document.querySelector(".second-line p").textContent = anoAtual;

}

// ============= BUSCAR LISTA DESPESAS =============
let listaDespesas = [];
async function buscarDespesas() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/lista/controle/despesas");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        listaDespesas = await response.json();

        return listaDespesas;

    } catch (erro) {
        console.error("Erro ao buscar lista de despesas:", erro);
        listaDespesas = [];
        return [];
    }
}

// ============= BUSCAR LISTA MOVIMENTAÇÕES =============
let listaMovimentacoes = [];
async function buscarMovimentacoes() {
    try {
        const response = await fetch("http://localhost:8081/v1/frontend/lista/controle/movimentacoes");

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        listaMovimentacoes = await response.json();

        return listaMovimentacoes;

    } catch (erro) {
        console.error("Erro ao buscar lista de despesas:", erro);
        listaMovimentacoes = [];
        return [];
    }
}

// ============= PREENCHIMENTO DE CARDS =============
function preencherMovimentacoes() {

    const container = document.getElementById("colunaMovimentacoes");

    // Remove todos os cards existentes
    container.querySelectorAll(".card").forEach(card => card.remove());

    listaMovimentacoes.forEach((registro) => {

        const card = document.createElement("div");
        card.className = "card";

        const data = new Date(registro.dataMovimentacao).toLocaleDateString("pt-BR");

        const corValor = registro.tipo.toUpperCase() === "ENTRADA"
            ? "rgba(0, 128, 0, 0.723)"
            : "rgba(255, 53, 53, 0.581)";

        card.innerHTML = `
            <div class="colunas">

                <div class="coluna">
                    <p class="header">Descrição</p>
                    <p class="text-content">${registro.descricao}</p>
                </div>

                <div class="coluna data-two">
                    <p class="header">Tipo</p>
                    <p class="text-content">${registro.tipo}</p>
                </div>

                <div class="coluna data">
                    <p class="header">Data Movimentação</p>
                    <p class="text-content">${data}</p>
                </div>

                <div class="coluna">
                    <p class="header">Valor</p>
                    <p class="text-content" style="color: ${corValor};">
                        ${registro.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </p>
                </div>

            </div>
        `;

        // Adiciona o card antes do botão
        container.insertBefore(card, container.querySelector("button"));
    });

}
function preencherRendas() {

    const container = document.getElementById("colunaRendas");
    container.innerHTML = "";

    listaRendas.forEach((registro, index) => {

        const card = document.createElement("div");
        card.className = "card";

        if (index === listaRendas.length - 1) {
            card.style.border = "none";
        }

        const ultimoRegistro = registro.ultimoRegistro
            ? new Date(registro.ultimoRegistro).toLocaleDateString("pt-BR")
            : "-";

        card.innerHTML = `
            <div class="colunas">

                <div class="coluna motivo">
                    <p class="header">Motivo</p>
                    <p class="text-content">${registro.motivo}</p>
                </div>

                <div class="coluna">
                    <p class="header">Período</p>
                    <p class="text-content">${registro.periodo}</p>
                </div>

                <div class="coluna">
                    <p class="header">Último Registro</p>
                    <p class="text-content">${ultimoRegistro}</p>
                </div>

                <div class="coluna">
                    <p class="header">Valor</p>
                    <p class="text-content" style="color: rgba(0, 128, 0, 0.723);">
                        ${registro.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </p>
                </div>

            </div>
        `;

        container.appendChild(card);
    });
}

function preencherDespesas() {

    const container = document.getElementById("colunaDespesas");
    container.innerHTML = "";

    listaDespesas.forEach((registro, index) => {

        const card = document.createElement("div");
        card.className = "card";

        if (index === listaDespesas.length - 1) {
            card.style.border = "none";
        }

        const proximoVencimento = registro.proximoVencimento
            ? new Date(registro.proximoVencimento).toLocaleDateString("pt-BR")
            : "-";

        card.innerHTML = `
            <div class="colunas">

                <div class="coluna">
                    <p class="header">Descrição</p>
                    <p class="text-content">${registro.descricao}</p>
                </div>

                <div class="coluna">
                    <p class="header">Tipo</p>
                    <p class="text-content">${registro.tipo}</p>
                </div>

                <div class="coluna">
                    <p class="header">Próximo Vencimento</p>
                    <p class="text-content">${proximoVencimento}</p>
                </div>

                <div class="coluna">
                    <p class="header">Valor</p>
                    <p class="text-content" style="color: rgba(255, 53, 53, 0.581);">
                        ${registro.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </p>
                </div>

            </div>
        `;

        container.appendChild(card);
    });

}