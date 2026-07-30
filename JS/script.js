window.onload = async function () {
    const [renda, despesa, saldo] = await Promise.all([
        buscarRenda(),
        buscarDespesa(),
        buscarSaldo(),
        buscarRendas(),
        buscarDespesas()
    ]);

    preencherRendas();
    preencherDespesas();

    gerarGraficoBarras(renda, despesa, saldo);
    gerarGraficoPizza(despesa, saldo);

    destacarMesesPassados();
    preencherAnos();

    buscarNomeUsuario();
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
        const response = await fetch("http://localhost:8081/v1/frontend/lista/renda");

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
        const response = await fetch("http://localhost:8081/v1/frontend/lista/despesa");

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

// ============= PREENCHIMENTO DE CARDS =============
function preencherRendas() {
    const container = document.getElementById("cardsRendas");
    container.innerHTML = "";

    listaRendas.forEach((registro, index) => {

        const card = document.createElement("div");
        card.className = "card";

        if (index === listaRendas.length - 1) {
            card.style.border = "none";
        }

        card.innerHTML = `
            <p class="motivo">${registro.motivo}</p>
            <p class="valor" id="p-renda">
                ${registro.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>
        `;

        container.appendChild(card);
    });
}

function preencherDespesas() {
    const container = document.getElementById("cardsDespesas");
    container.innerHTML = "";

    listaDespesas.forEach((registro, index) => {

        const card = document.createElement("div");
        card.className = "card";

        if (index === listaDespesas.length - 1) {
            card.style.border = "none";
        }

        card.innerHTML = `
            <p class="motivo">${registro.motivo}</p>
            <p class="valor" id="p-despesa">
                ${registro.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>
        `;

        container.appendChild(card);
    });
}

// ============= GRÁFICO DE BARRAS =============
function gerarGraficoBarras(renda, despesa, saldo) {

    const options = {

        series: [{
            name: "",
            data: [
                despesa,
                renda,
                saldo
            ]
        }],

        chart: {
            type: "bar",
            height: 130,
            background: "transparent",
            toolbar: {
                show: false
            }
        },

        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                borderRadius: 0,
                barHeight: "70%"
            }
        },

        colors: [
            "rgba(255, 53, 53, 0.581)",
            "rgba(0, 128, 0, 0.723)",
            "#E9D4A0"
        ],

        dataLabels: {
            enabled: false
        },

        xaxis: {
            categories: [
                "Despesa Mensal",
                "Renda Mensal",
                "Saldo Restante"
            ],

            labels: {
                show: false
            },

            axisBorder: {
                show: false
            },

            axisTicks: {
                show: false
            }
        },

        yaxis: {
            axisBorder: {
                show: true,
                color: "#E9D4A0"
            },

            labels: {
                align: "left",
                offsetX: -15,
                offsetY: 4,
                style: {
                    colors: "#E9D4A0",
                    fontSize: "18px",
                    fontFamily: "Poppins"
                }
            }
        },

        grid: {
            show: false
        },

        legend: {
            show: false
        },

        tooltip: {
            enabled: true,

            y: {
                formatter: function (value) {
                    return value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    });
                }
            }
        }

    };

    const chart = new ApexCharts(
        document.querySelector("#barrasMensal"),
        options
    );

    chart.render();
}

// ============= GRÁFICO DE PIZZA =============
function gerarGraficoPizza(despesa, saldo) {

    const percentual = saldo > 0
        ? Math.min((despesa / saldo) * 100, 100)
        : 0;

    const optionsRadial = {

        series: [percentual],
        labels: [""],

        chart: {
            type: "radialBar",
            height: 130,
            background: "transparent"
        },

        colors: ["rgba(255, 53, 53, 0.581)"],

        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: 360,

                hollow: {
                    size: "52%"
                },

                track: {
                    background: "#e5d1a635",
                    opacity: 1,
                    strokeWidth: "100%"
                },

                dataLabels: {
                    name: {
                        show: false
                    },

                    value: {
                        fontSize: "25px",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        color: "#E9D4A0",
                        offsetY: 12,

                        formatter: function (val) {
                            return val.toFixed(0) + "%";
                        }
                    }
                }
            }
        },

        stroke: {
            lineCap: "round"
        },

        tooltip: {
            enabled: true,

            y: {
                formatter: function () {
                    return `Despesa: ${despesa.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}`;
                }
            }
        }
    };

    new ApexCharts(
        document.querySelector("#graficoPercentual"),
        optionsRadial
    ).render();
}