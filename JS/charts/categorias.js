const optionsCategorias = {
    series: [{
        data: [100, 73, 37, 30, 69, 46, 18]
    }],

    chart: {
        type: "bar",
        height: 300,
        background: "transparent",
        toolbar: {
            show: false
        }
    },

    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "55%",
            distributed: true
        }
    },

    colors: [
        "#E9D4A0",
        "#E9D4A0",
        "#E9D4A0",
        "#E9D4A0",
        "#E9D4A0",
        "#E9D4A0",
        "#E9D4A0"
    ],

    dataLabels: {
        enabled: false
    },

    xaxis: {
        categories: [
            "Faculdade",
            "Alimentação",
            "Transporte",
            "Saúde",
            "Lazer",
            "Cabelo",
            "Diversos"
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
        labels: {
            align: "left",
            offsetX: -15,
            offsetY: 4,

            style: {
                colors: "#E9D4A0",
                fontSize: "15px",
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
        enabled: false
    }
};

new ApexCharts(
    document.querySelector("#graficoCategorias"),
    optionsCategorias
).render();