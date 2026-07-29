const options = {
    series: [{
        data: [72, 88, 18]
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
        "#E9D4A0",
        "#DFA06A",
        "#DFA06A"
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
        enabled: false
    }
};

const chart = new ApexCharts(
    document.querySelector("#barrasMensal"),
    options
);

chart.render();