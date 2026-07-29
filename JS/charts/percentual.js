const optionsRadial = {
    series: [60],

    chart: {
        type: "radialBar",
        height: 130,
        background: "transparent"
    },

    colors: ["#E9D4A0"],

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
                        return val + "%";
                    }
                }
            }
        }
    },

    stroke: {
        lineCap: "round"
    },

    tooltip: {
        enabled: false
    }
};

new ApexCharts(
    document.querySelector("#graficoPercentual"),
    optionsRadial
).render();